"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icons";
import { Avatar, RequireAuth, Screen, TopBar } from "@/components/UI";
import { useApp } from "@/context/AppContext";

export default function SeguimientoPage() {
  return (
    <RequireAuth>
      <SeguimientoInner />
    </RequireAuth>
  );
}

function SeguimientoInner() {
  const { id } = useParams();
  const router = useRouter(); // used for chat navigation
  const { jobs, triggerSos, showToast } = useApp();
  const job = jobs.find((j) => j.id === id);
  const agreedAt = job?.assignment?.agreedAt || null;
  const [now, setNow] = useState(Date.now());
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const holdRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  let mode = "pending";
  let elapsed = 0;
  if (agreedAt) {
    const diff = now - agreedAt;
    if (diff < 0) {
      mode = "countdown";
      elapsed = Math.floor(-diff / 1000);
    } else {
      mode = "active";
      elapsed = Math.floor(diff / 1000);
    }
  }

  function format(s) {
    const h = String(Math.floor(s / 3600)).padStart(2, "0");
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return { h, m, sec };
  }
  const t = format(elapsed);

  function startHold() {
    setHolding(true);
    const began = Date.now();
    holdRef.current = setInterval(() => {
      const p = Math.min(100, ((Date.now() - began) / 3000) * 100);
      setProgress(p);
      if (p >= 100) {
        clearInterval(holdRef.current);
        setHolding(false);
        setProgress(0);
        setConfirm(true);
      }
    }, 50);
  }
  function endHold() {
    clearInterval(holdRef.current);
    setHolding(false);
    setProgress(0);
  }

  if (!job) {
    return (
      <Screen nav>
        <TopBar title="Seguimiento del Trabajo" />
        <p className="px-6 text-sm text-zinc-400">No encontramos este trabajo.</p>
      </Screen>
    );
  }

  const workerName = job.assignment?.workerName || job.client?.name || "Trabajador";
  const statusLabel =
    mode === "active" ? "En curso" : mode === "countdown" ? "Programado" : "Por acordar hora";
  const timerLabel =
    mode === "active" ? "TIEMPO ACTIVO" : mode === "countdown" ? "EMPIEZA EN" : "SIN HORA ACORDADA";

  return (
    <Screen nav scroll={false}>
      <TopBar title="Seguimiento del Trabajo" />
      <div className="relative min-h-0 flex-1">
        <iframe
          title="Mapa de seguimiento"
          className="absolute inset-0 h-full w-full border-0"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-99.18%2C19.40%2C-99.08%2C19.48&layer=mapnik&marker=19.445%2C-99.14"
        />
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <button className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-soft">+</button>
          <button className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-soft">−</button>
        </div>
        <div className="pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center">
            <div className="rounded-full border-4 border-white shadow-card overflow-hidden">
              <Avatar
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                size={54}
                alt="Trabajador"
              />
            </div>
            <div className="mt-1 h-0 w-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#FF8A00]" />
          </div>
        </div>

        <div className="absolute bottom-2 left-3 right-3 space-y-3">
          <div className="flex items-center gap-3 rounded-[24px] bg-white p-3 shadow-card">
            <div className="relative">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-emerald-50">
                <Icon name="person" size={22} color="#22c55e" />
              </div>
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-extrabold">{job.title}</p>
              <p className="truncate text-[12px] text-zinc-400">
                {workerName} • {statusLabel}
              </p>
              <p className="text-[13px] font-bold">{job.payLabel.includes("MXN") ? job.payLabel : `${job.payLabel} MXN`}</p>
              {job.assignment?.exactLocation ? (
                <p className="truncate text-[11px] text-zinc-400">{job.assignment.exactLocation}</p>
              ) : null}
            </div>
            <button
              className="grid h-11 w-11 place-items-center rounded-full bg-[#FFF1E0]"
              onClick={() => showToast("Llamando…")}
              aria-label="Llamar"
            >
              <Icon name="phone" size={18} color="#FF8A00" />
            </button>
            <button
              className="grid h-11 w-11 place-items-center rounded-full bg-[#FFF1E0]"
              onClick={() => {
                const chatId = job.assignment?.chatId;
                if (!chatId) {
                  showToast("El chat se abre cuando elijas a un aplicante");
                  return;
                }
                router.push(`/mensajes/${chatId}`);
              }}
              aria-label="Mensajes"
            >
              <Icon name="chat" size={18} color="#FF8A00" />
            </button>
          </div>

          <div className="grid grid-cols-[1.2fr_1fr] gap-3">
            <div className="rounded-[24px] bg-white px-4 py-3 text-center shadow-card">
              <p className="font-extrabold tracking-wider">
                <span>{t.h}</span>
                <span className="mx-1 text-zinc-300">H</span>
                <span>{t.m}</span>
                <span className="mx-1 text-zinc-300">M</span>
                <span className="text-red-500">{t.sec}</span>
                <span className="ml-1 text-[11px] text-red-400">S</span>
              </p>
              <p className="mt-1 text-[10px] font-bold tracking-[0.14em] text-zinc-400">
                {timerLabel}
              </p>
            </div>
            <button
              className="relative overflow-hidden rounded-[24px] text-white shadow-card"
              style={{ background: "#ef4444" }}
              onMouseDown={startHold}
              onMouseUp={endHold}
              onMouseLeave={endHold}
              onTouchStart={(e) => {
                e.preventDefault();
                startHold();
              }}
              onTouchEnd={endHold}
            >
              <span
                className="absolute inset-y-0 left-0 bg-black/20"
                style={{ width: `${progress}%` }}
              />
              <span className="relative z-10 flex h-full flex-col items-center justify-center">
                <Icon name="alert" size={22} color="#fff" />
                <span className="text-[18px] font-extrabold">SOS</span>
                <span className="text-[10px] opacity-90">Mantener 3s</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {confirm ? (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h3 className="text-[18px] font-extrabold">¿Enviar alerta SOS?</h3>
            <p className="mt-2 text-[14px] text-zinc-500">
              Se notificará a contactos de emergencia y al equipo de seguridad de
              TRYWORK con tu ubicación actual. Úsalo solo en una emergencia real.
            </p>
            <button
              className="mt-4 h-12 w-full rounded-full bg-red-500 font-bold text-white"
              onClick={() => {
                triggerSos();
                setConfirm(false);
              }}
            >
              Confirmar alerta
            </button>
            <button
              className="mt-2 w-full py-3 font-semibold text-zinc-400"
              onClick={() => setConfirm(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : null}
    </Screen>
  );
}
