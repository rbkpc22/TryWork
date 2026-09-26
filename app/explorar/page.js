"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@/components/Icons";
import { Avatar, RequireAuth, Screen } from "@/components/UI";
import { useApp } from "@/context/AppContext";
import { CATEGORIES, boostActive, formatBoostLeft, money } from "@/data/seed";

export default function ExplorarPage() {
  return (
    <RequireAuth>
      <ExplorarInner />
    </RequireAuth>
  );
}

function ExplorarInner() {
  const { user, jobs, notifications } = useApp();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("todo");
  const [now, setNow] = useState(() => Date.now());
  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const filtered = useMemo(() => {
    return jobs
      .filter((j) => {
        const matchCat = cat === "todo" || j.category === cat;
        const q = query.trim().toLowerCase();
        const matchQ =
          !q ||
          j.title.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q) ||
          j.categoryLabel.toLowerCase().includes(q);
        return matchCat && matchQ;
      })
      .sort((a, b) => {
        const aOn = boostActive(a, now);
        const bOn = boostActive(b, now);
        if (aOn !== bOn) return aOn ? -1 : 1;
        if (aOn && bOn) return (b.boostedAt || 0) - (a.boostedAt || 0);
        return 0;
      });
  }, [jobs, query, cat, now]);

  return (
    <Screen nav className="bg-[#f7f8fa]">
      <div className="px-5 pt-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar src={user.avatar} size={46} alt={user.name} />
            <div>
              <p className="text-[12px] text-zinc-400">Bienvenido,</p>
              <p className="flex items-center gap-1 text-[16px] font-extrabold">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: "#22c55e" }}
                />
                {user.name}
              </p>
            </div>
          </div>
          <Link
            href="/notificaciones"
            className="relative grid h-11 w-11 place-items-center rounded-full bg-white shadow-soft"
            aria-label="Notificaciones"
          >
            <Icon name="bell" size={20} color="#111827" />
            {unread > 0 ? (
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            ) : null}
          </Link>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="field flex-1 bg-white shadow-soft">
            <Icon name="search" size={18} color="#C0C6D0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar trabajos cercanos..."
            />
          </div>
          <button
            className="grid h-12 w-12 place-items-center rounded-[16px] bg-white shadow-soft"
            aria-label="Filtros"
          >
            <Icon name="sliders" size={18} color="#FF8A00" />
          </button>
        </div>
      </div>

      <CategoryRail cat={cat} setCat={setCat} />

      <div className="mt-4 space-y-5 px-5 pb-6">
        {filtered.length === 0 ? (
          <p className="py-10 text-center text-sm text-zinc-400">
            No hay trabajos para “{query || cat}”
          </p>
        ) : null}
        {filtered.map((job) => (
          <JobCard key={job.id} job={job} now={now} />
        ))}
      </div>
    </Screen>
  );
}

function CategoryRail({ cat, setCat }) {
  const ref = useRef(null);
  const drag = useRef({ active: false, startX: 0, scroll: 0, moved: false });

  function onPointerDown(e) {
    if (e.pointerType === "touch") return;
    const el = ref.current;
    drag.current = {
      active: true,
      startX: e.clientX,
      scroll: el.scrollLeft,
      moved: false,
    };
    el.setPointerCapture?.(e.pointerId);
  }

  function onPointerMove(e) {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 6) drag.current.moved = true;
    ref.current.scrollLeft = drag.current.scroll - dx;
  }

  function onPointerUp() {
    drag.current.active = false;
  }

  return (
    <div
      ref={ref}
      className="h-scroll no-scrollbar mt-4 flex w-full gap-2 px-5 pb-2"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {CATEGORIES.map((c) => (
        <button
          key={c.id}
          type="button"
          className={`chip ${cat === c.id ? "chip-on" : "chip-off"}`}
          onClick={() => {
            if (drag.current.moved) {
              drag.current.moved = false;
              return;
            }
            setCat(c.id);
          }}
        >
          <Icon
            name={c.icon}
            size={14}
            color={cat === c.id ? "#fff" : "#FF8A00"}
          />
          {c.label}
        </button>
      ))}
    </div>
  );
}

function JobCard({ job, now }) {
  const { user, applyToJob, boostJob } = useApp();
  const router = useRouter();
  const [confirmBoost, setConfirmBoost] = useState(false);
  const mine = job.publishedBy === user.id;
  const applied = (job.applicants || []).some((a) => a.userId === user.id);
  const hired = job.assignment?.workerId === user.id;
  const requests = (job.applicants || []).length;
  const boostPrice = Math.round((Number(job.pay) || 0) * 0.2 * 100) / 100;
  const active = boostActive(job, now);
  const card = (
    <article className="overflow-hidden rounded-[28px] bg-white shadow-card">
      <Link href={`/trabajos/${job.id}`} className="block">
        <div className="relative h-[168px]">
          <img src={job.image} alt="" className="h-full w-full object-cover" />
          {active ? <span className="boost-tab">BOOST ⚡</span> : null}
          {mine && active ? (
            <span className="absolute bottom-3 left-3 rounded-full bg-black/75 px-3 py-1 text-[11px] font-extrabold text-[#ffe56a]">
              Te quedan {formatBoostLeft(job.boostedUntil - now)}
            </span>
          ) : null}
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-zinc-700">
            {job.categoryLabel}
          </span>
          <span className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[12px] font-extrabold" style={{ color: "#FF8A00" }}>
            {job.payLabel}
          </span>
        </div>
      </Link>
      <div className="px-4 pb-4 pt-3">
        <div className="flex items-start justify-between gap-3">
          <Link href={`/trabajos/${job.id}`} className="min-w-0">
            <h3 className="text-[18px] font-extrabold leading-6">{job.title}</h3>
          </Link>
          <span className="shrink-0 text-[12px] text-zinc-400">{job.duration}</span>
        </div>
        <p className="mt-1 flex items-center gap-1 text-[13px] text-zinc-400">
          <Icon name="pin" size={14} color="#FF8A00" />
          {job.location}
        </p>
        <div className="mt-3 flex items-center gap-3">
          <div className="flex items-center">
            <Avatar src={job.client.avatar} size={36} alt={job.client.name} />
            {requests > 0 ? (
              <span className="ml-2 text-[12px] font-semibold text-zinc-400">
                +{requests}
              </span>
            ) : null}
          </div>
          {mine ? (
            <button
              type="button"
              className="btn-primary h-11 flex-1 text-[15px]"
              onClick={() => router.push(`/trabajos/${job.id}`)}
            >
              Ver solicitudes
            </button>
          ) : hired ? (
            <button
              type="button"
              className="btn-primary h-11 flex-1 text-[15px]"
              onClick={() => router.push(`/seguimiento/${job.id}`)}
            >
              Ver tarea
            </button>
          ) : (
            <button
              type="button"
              className="btn-primary h-11 flex-1 text-[15px]"
              disabled={applied || Boolean(job.assignment)}
              onClick={() => applyToJob(job.id)}
            >
              {applied ? "Enviada" : "Aplicar"}
              <span className="grid h-5 w-5 place-items-center rounded-full border border-white/70">
                <Icon name="check" size={12} color="#fff" />
              </span>
            </button>
          )}
        </div>
        {mine && !active ? (
          <button type="button" className="membership-btn mt-3" onClick={() => setConfirmBoost(true)}>
            Membresía · {money(boostPrice)}
          </button>
        ) : null}
      </div>
    </article>
  );

  return (
    <>
      {active ? <div className="boost-frame">{card}</div> : card}
      {confirmBoost ? (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h3 className="text-[18px] font-extrabold">Membresía de esta oferta</h3>
            <p className="mt-2 text-[14px] leading-5 text-zinc-500">
              Destaca solo “{job.title}” durante 24 horas. Cuesta {money(boostPrice)}, el 20% de lo que pagarás al trabajador. La cuenta regresiva solo la ves tú.
            </p>
            <button
              type="button"
              className="btn-primary mt-4"
              onClick={() => {
                if (boostJob(job.id)) setConfirmBoost(false);
              }}
            >
              Pagar membresía
            </button>
            <button
              type="button"
              className="mt-2 w-full py-3 font-semibold text-zinc-400"
              onClick={() => setConfirmBoost(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
