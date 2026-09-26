"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/Icons";
import { Avatar, RequireAuth, Screen } from "@/components/UI";
import { useApp } from "@/context/AppContext";

export default function PerfilPage() {
  return (
    <RequireAuth>
      <PerfilInner />
    </RequireAuth>
  );
}

function PerfilInner() {
  const router = useRouter();
  const { user, history, jobs, logout, showToast, updateProfile } = useApp();

  const myJobs = jobs.filter(
    (j) => j.publishedBy === user.id || j.assignment?.workerId === user.id
  );

  return (
    <Screen nav className="bg-[#f7f8fa]">
      <header className="flex items-center justify-between px-4 pt-4">
        <button type="button" onClick={() => router.back()} aria-label="Regresar">
          <Icon name="back" size={22} />
        </button>
        <h1 className="text-[17px] font-bold">Mi Perfil</h1>
        <button
          type="button"
          onClick={() => showToast("Ajustes: notificaciones y privacidad")}
          aria-label="Ajustes"
        >
          <Icon name="settings" size={20} />
        </button>
      </header>

      <div className="px-5 pb-8">
        <div className="flex flex-col items-center pt-3 text-center">
          <div className="relative">
            <Avatar src={user.avatar} size={108} alt={user.name} />
            <span className="absolute bottom-1 right-1 grid h-6 w-6 place-items-center rounded-full bg-[#FF8A00] text-white">
              <Icon name="check" size={12} color="#fff" />
            </span>
            <button
              className="absolute -left-6 top-2 rounded-full px-3 py-1 text-[11px] font-bold text-white"
              style={{ background: "#22c55e" }}
              onClick={() => {
                updateProfile({ verified: true });
                showToast("Perfil verificado");
              }}
            >
              Verificar perfil
            </button>
          </div>
          <h2 className="mt-3 text-[22px] font-extrabold">{user.name}</h2>
          <p className="text-[13px] text-zinc-400">{user.profession}</p>
          <p className="mt-1 flex items-center gap-1 text-[12px] text-zinc-400">
            <Icon name="pin" size={12} color="#c0c6d0" /> {user.location}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          <Stat value={user.rating.toFixed(1)} label={`${user.reviews} Reseñas`} icon="star" />
          <Stat value={`${user.completedPct}%`} label="Completados" icon="check" />
          <Stat value={`$${user.rate}`} label="Por hora" icon="card" />
        </div>

        <div className="mt-4 flex gap-2">
          <Link href="/perfil/editar" className="btn-primary flex-1 h-12 text-[15px]">
            Editar Perfil
          </Link>
          <button
            className="grid h-12 w-12 place-items-center rounded-full bg-white shadow-soft"
            onClick={async () => {
              try {
                await navigator.share?.({ title: "TRYWORK", text: user.name, url: location.href });
                showToast("Perfil listo para compartir");
              } catch {
                showToast("Enlace de perfil copiado");
              }
            }}
            aria-label="Compartir"
          >
            <Icon name="share" size={18} color="#111827" />
          </button>
        </div>

        <section className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-extrabold">Especialidades</h3>
            <span className="text-[12px] font-semibold" style={{ color: "#FF8A00" }}>
              Ver todas
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(user.specialties || []).map((s) => (
              <span
                key={s}
                className="rounded-full bg-white px-3 py-2 text-[13px] font-semibold shadow-soft"
              >
                {s === "Carpintería" ? "🪚 " : s === "Electricidad" ? "⚡ " : s === "Reparaciones" ? "🔧 " : "🎨 "}
                {s}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h3 className="mb-3 font-extrabold">Historial de Trabajo</h3>
          <div className="space-y-3">
            {history.map((h) => (
              <div key={h.id} className="rounded-[24px] bg-white p-4 shadow-soft">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#FFF1E0]">
                      <Icon name={h.icon} size={18} color="#FF8A00" />
                    </div>
                    <div>
                      <p className="font-bold">{h.title}</p>
                      <p className="text-[12px] text-zinc-400">
                        Para {h.client} • {h.duration}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-bold text-emerald-600">
                    {h.status}
                  </span>
                </div>
                <p className="mt-2 flex items-center gap-1 text-[13px]">
                  <Icon name="star" size={13} color="#FF8A00" /> {h.rating.toFixed(1)}
                  {h.comment ? <span className="text-zinc-400"> “{h.comment}”</span> : null}
                </p>
              </div>
            ))}
          </div>
        </section>

        {myJobs.length > 0 ? (
          <section className="mt-6">
            <h3 className="mb-3 font-extrabold">Mis trabajos</h3>
            <div className="space-y-3">
              {myJobs.map((job) => {
                const mine = job.publishedBy === user.id;
                const agreed = job.assignment?.agreedAt;
                const detail = mine
                  ? job.assignment
                    ? agreed
                      ? "Hora acordada"
                      : "Por acordar hora"
                    : `${(job.applicants || []).length} solicitudes`
                  : agreed
                    ? "Hora acordada"
                    : "Te eligieron";
                return (
                <Link
                  key={job.id}
                  href={job.assignment ? `/seguimiento/${job.id}` : `/trabajos/${job.id}`}
                  className="block rounded-[24px] bg-white p-4 shadow-soft"
                >
                  <p className="font-bold">{job.title}</p>
                  <p className="text-[12px] text-zinc-400">
                    {mine ? "Tu oferta" : "Asignado"} · {detail} · {job.payLabel}
                  </p>
                </Link>
                );
              })}
            </div>
          </section>
        ) : null}

        <section className="mt-6">
          <h3 className="mb-3 font-extrabold">Métodos de Cobro</h3>
          <div className="space-y-3">
            {(user.paymentMethods || []).map((m) => (
              <Link
                key={m.id}
                href="/pagos"
                className="flex items-center justify-between rounded-[24px] bg-white p-4 shadow-soft"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#f4f6f8]">
                    <Icon name={m.type === "card" ? "card" : "bank"} size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-[14px]">{m.label}</p>
                    <p className="text-[12px] text-zinc-400">{m.subtitle}</p>
                  </div>
                </div>
                <Icon name="chevron" size={18} color="#c0c6d0" />
              </Link>
            ))}
            <button
              className="w-full py-3 text-center text-[14px] font-bold"
              style={{ color: "#FF8A00" }}
              onClick={() =>
                showToast("En un producto real aquí se tokeniza una nueva tarjeta")
              }
            >
              + Agregar nuevo método
            </button>
          </div>
        </section>

        <button
          className="mt-6 flex w-full items-center justify-center gap-2 py-3 text-[14px] font-bold text-zinc-400"
          onClick={() => {
            logout();
            router.replace("/");
          }}
        >
          <Icon name="logout" size={16} color="#b0b6c0" />
          Cerrar sesión
        </button>
      </div>
    </Screen>
  );
}

function Stat({ value, label, icon }) {
  return (
    <div className="rounded-[22px] bg-white py-3 text-center shadow-soft">
      <p className="flex items-center justify-center gap-1 text-[18px] font-extrabold">
        {icon === "star" ? <Icon name="star" size={14} color="#FF8A00" /> : null}
        {icon === "check" ? <Icon name="check" size={14} color="#22c55e" /> : null}
        {value}
      </p>
      <p className="text-[11px] text-zinc-400">{label}</p>
    </div>
  );
}
