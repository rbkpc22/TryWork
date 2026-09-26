"use client";

import Link from "next/link";
import { LogoMark } from "@/components/Icons";

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
      </div>
    </div>
  );
}
