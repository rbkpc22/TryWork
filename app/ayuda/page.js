"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/Icons";
import { Screen, TopBar } from "@/components/UI";
import { useApp } from "@/context/AppContext";

const FAQ = [
  {
    q: "¿Cómo aplico a un trabajo?",
    a: "Entra a Explorar, abre la oferta y pulsa Aplicar. Quien la publicó ve tu perfil y decide si te elige. Nadie queda seleccionado solo.",
  },
  {
    q: "¿Cómo publico una oferta?",
    a: "Si te registraste para contratar, ve a Publicar, completa el trabajo y envía la oferta. Tú eliges después a quién contratar.",
  },
  {
    q: "¿Cómo se calculan las comisiones?",
    a: "La comisión es el 10% de lo que va a recibir el trabajador, y la paga quien publica, encima de ese monto. Si ofreces $450, la comisión es $45 y el total en la app es $495. Quien aplica solo ve los $450. Destacar la oferta con BOOST es opcional: cuesta el 20% del pago al trabajador, dura 24 horas y la cuenta regresiva solo la ve quien publicó.",
  },
  {
    q: "¿Puedo pagar en efectivo?",
    a: "No. El pago del trabajo se cobra en TRYWORK. Si el dinero sale de la app no podemos cobrar la comisión ni revisar un reclamo sobre ese pago.",
  },
  {
    q: "¿Qué pasa si hay una disputa o el servicio salió mal?",
    a: "Al terminar, las dos personas pueden calificar. Si el trabajo no se cumplió, escríbenos en esta página con el nombre de la oferta. Revisamos el chat, la hora acordada y el pago que sí pasó por la app. Según eso, el pago puede retenerse o devolverse. Un mal servicio también puede verse en las reseñas del perfil.",
  },
  {
    q: "¿Cómo cancelo un trabajo?",
    a: "Quien publicó, o quien ya fue elegido, puede cancelar desde el detalle del trabajo mientras no haya una hora acordada. Si ya acordaron hora, cancela escribiendo a soporte antes de que empiece el tiempo. Cuando el tiempo ya está corriendo, el caso se atiende por soporte.",
  },
  {
    q: "¿Cómo funciona la verificación de identidad?",
    a: "No es automática. En Perfil pulsas Solicitar verificación y TRYWORK revisa tu nombre, tu foto y una identificación oficial. Mientras tanto el perfil dice En revisión. Solo después de aprobarse aparece como Verificado.",
  },
  {
    q: "¿Qué hago en una emergencia?",
    a: "En Seguimiento, mantén el botón rojo SOS durante 3 segundos y confirma. La alerta lleva tu ubicación de ese momento a tus contactos de emergencia y al equipo de TRYWORK. Úsalo solo si es una emergencia real.",
  },
  {
    q: "¿Dónde veo el mapa?",
    a: "El mapa muestra trabajos cerca de ti. Durante un trabajo activo, Seguimiento usa esa ubicación. La dirección exacta del servicio se acuerda en el chat, no se publica en la oferta.",
  },
];

export default function AyudaPage() {
  const { showToast } = useApp();
  const [open, setOpen] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function sendSupport(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      showToast("Escribe tu nombre, correo y qué pasó");
      return;
    }
    setSent(true);
  }

  return (
    <Screen>
      <TopBar title="Ayuda" />
      <div className="px-6 pb-10">
        <h2 className="text-[22px] font-extrabold">Centro de ayuda</h2>
        <p className="mt-2 text-[14px] leading-5 text-zinc-500">
          Respuestas sobre comisiones, cancelaciones, verificación y emergencias.
        </p>
        <div className="mt-6 space-y-2">
          {FAQ.map((item, index) => {
            const visible = open === index;
            return (
              <div key={item.q} className="rounded-3xl bg-[#f7f8fa] px-4 py-3 shadow-soft">
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-3 text-left"
                  onClick={() => setOpen(visible ? -1 : index)}
                  aria-expanded={visible}
                >
                  <span className="text-[14px] font-bold">{item.q}</span>
                  <Icon name={visible ? "back" : "chevron"} size={16} color="#a1a1aa" />
                </button>
                {visible ? <p className="mt-2 text-[13px] leading-5 text-zinc-500">{item.a}</p> : null}
              </div>
            );
          })}
        </div>

        <section className="mt-8 rounded-[28px] border border-zinc-100 p-4">
          <h3 className="text-[16px] font-extrabold">Hablar con soporte</h3>
          <p className="mt-1 text-[13px] leading-5 text-zinc-500">
            Si tu caso no está arriba, te contesta una persona del equipo. Correo directo:{" "}
            <a href="mailto:soporte@trywork.com" className="font-bold" style={{ color: "#FF8A00" }}>
              soporte@trywork.com
            </a>
          </p>
          {sent ? (
            <p className="mt-4 rounded-2xl bg-emerald-50 px-3 py-3 text-[13px] leading-5 text-emerald-700">
              Recibimos tu mensaje. Soporte te escribe a {form.email}. Si estás en un trabajo y es una emergencia, usa SOS en Seguimiento.
            </p>
          ) : (
            <form onSubmit={sendSupport} className="mt-4 space-y-3">
              <div className="field">
                <input
                  placeholder="Tu nombre"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="field">
                <input
                  type="email"
                  placeholder="Tu correo"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="field textarea">
                <textarea
                  placeholder="Cuéntanos qué pasó"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
              <button type="submit" className="btn-primary">
                Enviar a soporte
              </button>
            </form>
          )}
        </section>

        <Link href="/login" className="btn-ghost mt-6 grid place-items-center" style={{ background: "#f4f6f8", borderColor: "#eceff3", color: "#3f3f46" }}>
          Ir a iniciar sesión
        </Link>
      </div>
    </Screen>
  );
}
