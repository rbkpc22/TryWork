"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/Icons";
import { RequireAuth, Screen, TopBar } from "@/components/UI";
import { useApp } from "@/context/AppContext";
import { CATEGORIES, money } from "@/data/seed";

export default function PublicarPage() {
  return (
    <RequireAuth>
      <PublicarInner />
    </RequireAuth>
  );
}

function PublicarInner() {
  const router = useRouter();
  const { publishJob, showToast } = useApp();
  const [form, setForm] = useState({
    title: "",
    description: "",
    pay: "",
    duration: "",
    location: "",
    category: "otros",
  });
  const [ok, setOk] = useState(false);

  const payNum = Number(form.pay) || 0;
  const fee = Math.round(payNum * 0.1 * 100) / 100;
  const total = Math.round((payNum + fee) * 100) / 100;

  function set(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function submit(e) {
    e.preventDefault();
    if (!form.title || !form.description || !form.pay || !form.duration || !form.location) {
      showToast("Completa todos los campos para publicar");
      return;
    }
    const cat = CATEGORIES.find((c) => c.id === form.category);
    publishJob({
      title: form.title,
      description: form.description,
      pay: Number(form.pay),
      payLabel: `$${Number(form.pay).toLocaleString("es-MX")} MXN`,
      duration: form.duration,
      location: form.location,
      category: form.category,
      categoryLabel: cat?.label || "Otros",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      requirements: ["Según descripción del empleador"],
      datetime: "Por coordinar",
    });
    setOk(true);
  }

  if (ok) {
    return (
      <Screen nav>
        <TopBar title="Publicar Trabajo" />
        <div className="grid flex-1 place-items-center px-8 text-center">
          <div>
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-50">
              <Icon name="check" size={36} color="#22c55e" stroke={2.4} />
            </div>
            <h2 className="mt-4 text-[22px] font-extrabold">¡Oferta publicada correctamente!</h2>
            <p className="mt-2 text-[14px] text-zinc-500">
              Los aplicantes verán {money(payNum)}. Tú pagas {money(total)}, incluida la comisión del 10%.
            </p>
            <button className="btn-primary mt-6" onClick={() => router.push("/explorar")}>
              Ver en explorar
            </button>
          </div>
        </div>
      </Screen>
    );
  }

  return (
    <Screen nav className="bg-[#f7f8fa]">
      <TopBar title="Publicar Trabajo" />
      <form onSubmit={submit} className="px-5 pb-8">
        <section className="rounded-[28px] bg-white p-5 shadow-soft">
          <h3 className="text-[16px] font-extrabold">Detalles del Trabajo</h3>
          <p className="text-[12px] text-zinc-400">Información básica para los aplicantes</p>

          <div className="mt-4">
            <label className="label">Título del trabajo</label>
            <div className="field">
              <input
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="Ej: Ayuda mudanza"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="label">Descripción</label>
            <div className="field textarea">
              <textarea
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Describe las tareas y requisitos..."
              />
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-[28px] bg-white p-5 shadow-soft">
          <h3 className="text-[16px] font-extrabold">Logística</h3>
          <p className="text-[12px] text-zinc-400">Dónde y cuándo se realizará</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <label className="label">Pago ($)</label>
              <div className="field">
                <span className="text-zinc-400">$</span>
                <input
                  inputMode="decimal"
                  value={form.pay}
                  onChange={(e) => set("pay", e.target.value)}
                  placeholder="0.00"
                />
              </div>
            </div>
            <div>
              <label className="label">Duración</label>
              <div className="field">
                <Icon name="clock" size={16} color="#C0C6D0" />
                <input
                  value={form.duration}
                  onChange={(e) => set("duration", e.target.value)}
                  placeholder="Ej: 2 hrs"
                />
              </div>
            </div>
          </div>
          {payNum > 0 ? (
            <div className="mt-3 space-y-1 rounded-2xl bg-[#f7f8fa] px-3 py-3 text-[13px]">
              <p className="flex justify-between text-zinc-500">
                <span>Pago al trabajador</span>
                <span className="font-bold text-zinc-800">{money(payNum)}</span>
              </p>
              <p className="flex justify-between text-zinc-500">
                <span>Comisión TRYWORK 10%</span>
                <span className="font-bold text-zinc-800">{money(fee)}</span>
              </p>
              <p className="flex justify-between border-t border-zinc-200 pt-2 font-extrabold">
                <span>Total que pagas</span>
                <span style={{ color: "#FF8A00" }}>{money(total)}</span>
              </p>
              <p className="pt-1 text-[11px] leading-4 text-zinc-400">
                Quien aplique solo verá lo que va a recibir: {money(payNum)}.
              </p>
            </div>
          ) : null}
          <div className="mt-4">
            <label className="label">Dirección</label>
            <div className="field">
              <Icon name="pin" size={16} color="#C0C6D0" />
              <input
                value={form.location}
                onChange={(e) => set("location", e.target.value)}
                placeholder="Dirección del trabajo"
              />
              <Link href="/mapa?from=publicar" className="text-[12px] font-extrabold" style={{ color: "#FF8A00" }}>
                MAPA
              </Link>
            </div>
            <div className="relative mt-3 overflow-hidden rounded-[22px]" style={{ height: 140 }}>
              <iframe
                title="Mapa de la oferta"
                className="map-frame"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-99.20%2C19.38%2C-99.08%2C19.48&layer=mapnik&marker=19.4326%2C-99.1332"
              />
              <button
                type="button"
                className="absolute bottom-3 left-3 rounded-full bg-white px-3 py-1 text-[12px] font-bold shadow-soft"
                onClick={() => {
                  set("location", "Ciudad de México, MX");
                  showToast("Usando ubicación actual");
                }}
              >
                Usar ubicación actual
              </button>
            </div>
          </div>
        </section>

        <button type="submit" className="btn-primary mt-6">
          Publicar Oferta →
        </button>
      </form>
    </Screen>
  );
}
