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
          La geolocalización se usa para mostrar trabajos próximos, el mapa y el
          seguimiento de un trabajo activo. La dirección exacta del servicio se
          acuerda en el chat. Si mantienes SOS 3 segundos y confirmas, esa
          ubicación se comparte con tus contactos de emergencia y con el equipo
          de TRYWORK.
        </p>
        <p className="mt-3">
          La verificación de identidad usa el nombre, la foto y la identificación
          que envías desde Perfil. No marcamos un perfil como verificado hasta
          revisar esos datos.
        </p>
        <p className="mt-3">
          No vendemos tu información. Compartimos datos mínimos con la
          contraparte de un trabajo (nombre, foto, calificación y ubicación
          aproximada) para que la coordinación sea posible.
        </p>
        <p className="mt-3">
          Los pagos del trabajo se cobran en la app. No operamos pagos en
          efectivo para esas ofertas. TRYWORK no almacena el número completo de
          tu tarjeta. La comisión del 10% y el BOOST opcional se muestran antes
          de pagarlos.
        </p>
      </div>
    </Screen>
  );
}
