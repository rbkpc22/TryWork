"use client";

import { Screen, TopBar } from "@/components/UI";

export default function PrivacidadPage() {
  return (
    <Screen>
      <TopBar title="Privacidad" />
      <div className="px-6 pb-10 text-[14px] leading-6 text-zinc-600">
        <h2 className="text-[22px] font-extrabold text-zinc-900">Política de Privacidad</h2>
        <p className="mt-2 text-[12px] text-zinc-400">TRYWORK · México</p>
        <p className="mt-5">
          Recopilamos tu nombre, foto, ubicación, datos de contacto y actividad
          dentro de la app para conectar trabajadores con empleadores cercanos.
        </p>
        <p className="mt-3">
          La geolocalización se usa únicamente para mostrar trabajos próximos y
          el seguimiento activo de un trabajo aceptado. Puedes desactivarla en
          cualquier momento desde tu dispositivo.
        </p>
        <p className="mt-3">
          No vendemos tu información. Compartimos datos mínimos con la
          contraparte de un trabajo (nombre, foto, calificación y ubicación
          aproximada) para que la coordinación sea posible.
        </p>
        <p className="mt-3">
          Los pagos se procesan mediante métodos tokenizados. TRYWORK no
          almacena el número completo de tu tarjeta.
        </p>
      </div>
    </Screen>
  );
}
