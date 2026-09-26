"use client";

import Link from "next/link";
import { Screen, TopBar } from "@/components/UI";

export default function AyudaPage() {
  return (
    <Screen>
      <TopBar title="Ayuda" />
      <div className="px-6 pb-10">
        <h2 className="text-[22px] font-extrabold">Centro de ayuda</h2>
        <p className="mt-2 text-[14px] text-zinc-500">
          Encuentra respuestas rápidas sobre TRYWORK.
        </p>
        <div className="mt-6 space-y-3">
          {[
            ["¿Cómo acepto un trabajo?", "Abre Explorar, elige una oferta y pulsa Aceptar."],
            ["¿Cómo publico una oferta?", "Ve a Publicar, completa los datos y envía la oferta."],
            ["¿Qué hago en una emergencia?", "En Seguimiento, mantén SOS 3 segundos y confirma."],
            ["Pagos", "Los pagos confirmados aparecen en Perfil → historial y en Pagos."],
          ].map(([q, a]) => (
            <div key={q} className="rounded-3xl bg-[#f7f8fa] p-4 shadow-soft">
              <p className="font-bold text-[14px]">{q}</p>
              <p className="mt-1 text-[13px] text-zinc-500">{a}</p>
            </div>
          ))}
        </div>
        <Link href="/login" className="btn-primary mt-8">
          Ir a iniciar sesión
        </Link>
      </div>
    </Screen>
  );
}
