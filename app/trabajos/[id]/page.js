"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/Icons";
import { Avatar, RequireAuth, Screen, TopBar } from "@/components/UI";
import { useApp } from "@/context/AppContext";
import { boostActive, formatBoostLeft, money } from "@/data/seed";

export default function JobDetailPage() {
  return (
    <RequireAuth>
      <JobDetailInner />
    </RequireAuth>
  );
}

function JobDetailInner() {
  const { id } = useParams();
  const router = useRouter();
  const { user, jobs, applyToJob, hireApplicant } = useApp();
  const job = jobs.find((j) => j.id === id);
  const mine = job?.publishedBy === user.id;
  const applicants = job?.applicants || [];
  const myApplication = applicants.find((a) => a.userId === user.id);
  const hiredMe = job?.assignment?.workerId === user.id;
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!job) {
    return (
      <Screen nav>
        <TopBar title="Trabajo" />
        <p className="px-6 text-sm text-zinc-400">Este trabajo ya no está disponible.</p>
      </Screen>
    );
  }

  const active = boostActive(job, now);

  return (
    <Screen nav>
      <TopBar title="Detalle" />
      <div className="px-5 pb-8">
        <div className={active ? "boost-frame" : ""}>
          <div className="relative overflow-hidden rounded-[28px] shadow-card">
            <img src={job.image} alt="" className="h-48 w-full object-cover" />
            {active ? <span className="boost-tab">BOOST ⚡</span> : null}
          </div>
        </div>
        {mine && active ? (
          <p className="mt-3 text-center text-[12px] font-extrabold" style={{ color: "#9a7200" }}>
            Te quedan {formatBoostLeft(job.boostedUntil - now)} de BOOST
          </p>
        ) : null}
        <div className="mt-4 flex items-start justify-between">
          <div>
            <p className="text-[12px] font-bold" style={{ color: "#FF8A00" }}>
              {job.categoryLabel}
            </p>
            <h2 className="text-[24px] font-extrabold leading-7">{job.title}</h2>
          </div>
          <p className="text-[16px] font-extrabold" style={{ color: "#FF8A00" }}>
            {job.payLabel}
          </p>
        </div>
        <div className="mt-3 space-y-2 text-[14px] text-zinc-500">
          <p className="flex items-center gap-2">
            <Icon name="pin" size={16} color="#FF8A00" /> {job.location}
          </p>
          <p className="flex items-center gap-2">
            <Icon name="clock" size={16} color="#FF8A00" /> {job.duration} · {job.datetime}
          </p>
        </div>

        <h3 className="mt-5 text-[15px] font-extrabold">Descripción</h3>
        <p className="mt-1 text-[14px] leading-6 text-zinc-500">{job.description}</p>

        <h3 className="mt-5 text-[15px] font-extrabold">Requisitos</h3>
        <ul className="mt-1 list-disc pl-5 text-[14px] text-zinc-500">
          {job.requirements?.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>

        {mine ? (
          <div className="mt-4 space-y-1 rounded-[24px] bg-[#f7f8fa] px-4 py-3 text-[13px]">
            <p className="flex justify-between text-zinc-500">
              <span>Pago al trabajador</span>
              <span className="font-bold text-zinc-800">{money(job.pay)}</span>
            </p>
            <p className="flex justify-between text-zinc-500">
              <span>Comisión TRYWORK 10%</span>
              <span className="font-bold text-zinc-800">{money(job.fee ?? Number(job.pay) * 0.1)}</span>
            </p>
            <p className="flex justify-between border-t border-zinc-200 pt-2 font-extrabold">
              <span>Total que pagas</span>
              <span style={{ color: "#FF8A00" }}>{money(job.total ?? Number(job.pay) * 1.1)}</span>
            </p>
          </div>
        ) : null}

        <div className="mt-5 flex items-center gap-3 rounded-3xl bg-[#f7f8fa] p-3">
          <Avatar src={job.client.avatar} size={48} alt={job.client.name} />
          <div className="flex-1">
            <p className="font-bold">{job.client.name}</p>
            <p className="flex items-center gap-1 text-[13px] text-zinc-400">
              <Icon name="star" size={13} color="#FF8A00" /> {job.client.rating} · Cliente
            </p>
          </div>
        </div>

        {mine ? (
          <section className="mt-6">
            <h3 className="text-[15px] font-extrabold">Solicitudes</h3>
            <p className="mt-1 text-[13px] text-zinc-400">
              Elige quién realizará el trabajo. El chat se abre al confirmar.
            </p>
            {applicants.length === 0 ? (
              <p className="mt-3 text-[14px] text-zinc-400">Aún no hay solicitudes.</p>
            ) : (
              <div className="mt-3 space-y-3">
                {applicants.map((a) => (
                  <div key={a.userId} className="rounded-[24px] bg-[#f7f8fa] p-3">
                    <div className="flex items-start gap-3">
                      <Link href={`/postulantes/${a.userId}`} className="flex min-w-0 flex-1 items-center gap-3">
                        <Avatar src={a.avatar} size={48} alt={a.name} />
                        <div className="min-w-0 flex-1">
                          <p className="font-bold">{a.name}</p>
                          <p className="text-[12px] text-zinc-400">{a.profession}</p>
                          <p className="flex items-center gap-1 text-[13px] text-zinc-500">
                            <Icon name="star" size={13} color="#FF8A00" /> {a.rating}
                            <span className="font-bold" style={{ color: "#FF8A00" }}>· Ver perfil</span>
                          </p>
                        </div>
                      </Link>
                      {a.status === "elegido" ? (
                        <span className="rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-bold text-emerald-600">
                          Elegido
                        </span>
                      ) : null}
                    </div>
                    {a.status === "elegido" && job.assignment?.chatId ? (
                      <Link href={`/mensajes/${job.assignment.chatId}`} className="btn-primary mt-3 h-11 text-[14px]">
                        Abrir chat
                      </Link>
                    ) : !job.assignment ? (
                      <button
                        type="button"
                        className="btn-primary mt-3 h-11 text-[14px]"
                        onClick={() => {
                          const chatId = hireApplicant(job.id, a.userId);
                          if (chatId) router.push(`/mensajes/${chatId}`);
                        }}
                      >
                        Elegir
                      </button>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
            {job.assignment ? (
              <Link href={`/seguimiento/${job.id}`} className="mt-3 block text-center text-[13px] font-bold text-[#FF8A00]">
                Ver tiempo de la tarea
              </Link>
            ) : null}
          </section>
        ) : hiredMe || myApplication?.status === "elegido" ? (
          <div className="mt-5 rounded-3xl bg-emerald-50 p-4 text-center">
            <p className="font-bold text-emerald-700">Te eligieron para este trabajo</p>
            <p className="mt-1 text-[13px] text-emerald-700/80">
              Acuerden la hora en el chat. El tiempo empieza a esa hora.
            </p>
            {job.assignment?.chatId ? (
              <Link href={`/mensajes/${job.assignment.chatId}`} className="btn-primary mt-4">
                Abrir chat
              </Link>
            ) : null}
            <Link href={`/seguimiento/${job.id}`} className="mt-3 block text-[13px] font-bold text-emerald-700">
              Ver tiempo de la tarea
            </Link>
          </div>
        ) : myApplication ? (
          <div className="mt-5 rounded-3xl bg-[#f7f8fa] p-4 text-center">
            <p className="font-bold">Solicitud enviada</p>
            <p className="mt-1 text-[13px] text-zinc-500">
              Quien publicó la oferta decidirá si te elige.
            </p>
          </div>
        ) : (
          <button
            type="button"
            className="btn-primary mt-5"
            disabled={Boolean(job.assignment)}
            onClick={() => applyToJob(job.id)}
          >
            Aplicar a este trabajo
          </button>
        )}
      </div>
    </Screen>
  );
}
