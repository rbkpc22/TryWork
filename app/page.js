"use client";

import Link from "next/link";
import { Icon, LogoMark } from "@/components/Icons";
import { CATEGORIES } from "@/data/seed";

export default function WelcomePage() {
  return (
    <div className="page relative text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1400&q=80')",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,10,16,.28) 0%, rgba(8,10,16,.18) 32%, rgba(8,10,16,.55) 62%, rgba(8,10,16,.88) 100%)",
        }}
      />

      <div className="page-main page-scroll relative z-10">
      <div className="flex min-h-full flex-col px-6 pb-8 pt-10">
        <div className="flex items-center gap-3">
          <LogoMark size={46} />
          <span className="text-[22px] font-extrabold tracking-[0.04em]">
            TRYWORK
          </span>
        </div>

        <div className="mt-auto pb-4">
          <h1 className="text-[38px] font-extrabold leading-[1.12] tracking-tight">
            El trabajo que
            <br />
            necesitas,{" "}
            <span style={{ color: "#FF8A00" }}>cuando</span>
            <br />
            <span style={{ color: "#FF8A00" }}>lo necesitas</span>
          </h1>
          <p className="mt-4 max-w-[320px] text-[15px] leading-6 text-white/85">
            Conectamos talento urbano con oportunidades inmediatas. Tu próximo
            trabajo está a un clic.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <Link href="/login" className="btn-primary">
              Iniciar sesión
            </Link>
            <Link href="/registro" className="btn-ghost grid place-items-center">
              Registrarse
            </Link>
          </div>

          <div className="mt-6 flex items-center justify-center gap-8 text-[13px] text-white/75">
            <Link href="/terminos">Términos</Link>
            <Link href="/privacidad">Privacidad</Link>
            <Link href="/ayuda">Ayuda</Link>
          </div>
        </div>
      </div>

      <section className="bg-white px-6 py-8 text-zinc-900">
        <p className="text-[12px] font-extrabold tracking-wide" style={{ color: "#FF8A00" }}>
          CÓMO FUNCIONA
        </p>
        <h2 className="mt-1 text-[26px] font-extrabold leading-8">Elige tu lado desde el registro</h2>
        <div className="mt-4 grid gap-3">
          <div className="rounded-[24px] bg-[#f7f8fa] p-4">
            <p className="text-[15px] font-extrabold">Trabajador</p>
            <ol className="mt-2 list-decimal space-y-1 pl-4 text-[13px] leading-5 text-zinc-500">
              <li>Te registras para trabajar.</li>
              <li>Aplicas a una oferta. Nadie te elige solo.</li>
              <li>Si te eligen, acuerdan hora y lugar en el chat. El tiempo empieza a esa hora.</li>
            </ol>
            <Link href="/registro?rol=trabajador" className="btn-primary mt-4 h-11 text-[14px]">
              Registrarme para trabajar
            </Link>
          </div>
          <div className="rounded-[24px] bg-[#fff6eb] p-4">
            <p className="text-[15px] font-extrabold">Empleador</p>
            <ol className="mt-2 list-decimal space-y-1 pl-4 text-[13px] leading-5 text-zinc-500">
              <li>Te registras para contratar.</li>
              <li>Publicas la oferta. Pagas en la app el sueldo más 10% de comisión.</li>
              <li>Eliges a alguien. BOOST, si lo quieres, dura 24 horas.</li>
            </ol>
            <Link href="/registro?rol=empleador" className="btn-primary mt-4 h-11 text-[14px]">
              Registrarme para contratar
            </Link>
          </div>
        </div>
        <p className="mt-3 text-[12px] leading-5 text-zinc-400">
          El pago se cobra en TRYWORK. No hay efectivo para estos trabajos: así se cobra la comisión y se puede revisar un reclamo.
        </p>

        <h2 className="mt-8 text-[22px] font-extrabold">Categorías</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {CATEGORIES.filter((c) => c.id !== "todo").map((c) => (
            <span key={c.id} className="chip chip-off">
              <Icon name={c.icon} size={14} color="#FF8A00" />
              {c.label}
            </span>
          ))}
        </div>

        <div className="mt-8 rounded-[28px] bg-red-50 p-4">
          <p className="text-[12px] font-extrabold tracking-wide text-red-500">SOS</p>
          <h2 className="mt-1 text-[22px] font-extrabold leading-7">Emergencia en el seguimiento</h2>
          <p className="mt-2 text-[13px] leading-5 text-zinc-600">
            Cuando un trabajo ya está en curso, Seguimiento tiene un botón rojo. Lo mantienes 3 segundos y confirmas. Avisamos a tus contactos de emergencia y al equipo de TRYWORK con tu ubicación de ese momento.
          </p>
        </div>

        <h2 className="mt-8 text-[22px] font-extrabold">Reseñas en la app</h2>
        <div className="mt-3 space-y-3">
          {[
            ["Ana García", "Excelente trabajo, muy rápido."],
            ["Oficina Central", "Dejó la instalación lista el mismo día."],
            ["Sofía Ruiz", "Muy cuidadoso con los muebles. Lo recomiendo."],
          ].map(([name, text]) => (
            <figure key={name} className="rounded-[24px] bg-[#f7f8fa] p-4">
              <blockquote className="text-[14px] leading-5">“{text}”</blockquote>
              <figcaption className="mt-2 text-[12px] font-bold text-zinc-400">{name}</figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <Link href="/registro" className="btn-primary">
            Crear cuenta
          </Link>
          <Link href="/ayuda" className="text-center text-[14px] font-bold" style={{ color: "#FF8A00" }}>
            Ver preguntas frecuentes
          </Link>
        </div>
      </section>
      </div>
    </div>
  );
}
