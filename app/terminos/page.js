"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/Icons";
import { Screen, TopBar } from "@/components/UI";
import { useApp } from "@/context/AppContext";

export default function TerminosPage() {
  const router = useRouter();
  const { setTermsAccepted, showToast } = useApp();
  const [checked, setChecked] = useState(false);

  return (
    <Screen>
      <TopBar title="Legal" />
      <div className="px-6 pb-8">
        <div className="flex flex-col items-center text-center">
          <div
            className="grid h-14 w-14 place-items-center rounded-2xl"
            style={{ background: "#FFF1E0" }}
          >
            <Icon name="gavel" size={24} color="#FF8A00" />
          </div>
          <h2 className="mt-3 text-[22px] font-extrabold">Términos y Condiciones</h2>
          <p className="mt-1 text-[12px] text-zinc-400">Última actualización: 24 Octubre, 2023</p>
        </div>

        <article className="mt-6 space-y-5 text-[13px] leading-5 text-zinc-600">
          <section>
            <h3 className="mb-1 font-bold text-zinc-900">1. Introducción</h3>
            <p>
              Bienvenido a TRYWORK. Al descargar, acceder o utilizar nuestra
              aplicación móvil, aceptas estar sujeto a estos Términos y Condiciones.
              Nuestra plataforma conecta a personas que buscan trabajos temporales
              inmediatos (“Trabajadores”) con personas o empresas que necesitan
              ayuda (“Empleadores”).
            </p>
          </section>
          <section>
            <h3 className="mb-1 font-bold text-zinc-900">2. Elegibilidad</h3>
            <p>
              Para utilizar los servicios de TRYWORK, debes tener al menos 18 años
              de edad y la capacidad legal para celebrar contratos vinculantes. Al
              registrarte, garantizas que toda la información proporcionada es veraz
              y precisa.
            </p>
          </section>
          <section>
            <h3 className="mb-1 font-bold text-zinc-900">3. Naturaleza del Servicio</h3>
            <p>
              TRYWORK actúa exclusivamente como una plataforma tecnológica de
              intermediación. No somos una agencia de empleo ni empleadores
              directos. La relación laboral se establece directamente entre el
              Trabajador y el Empleador.
            </p>
            <ul className="mt-2 list-disc pl-4">
              <li>No garantizamos la calidad del trabajo realizado.</li>
              <li>No garantizamos el pago fuera de la plataforma si se acuerda así.</li>
              <li>Recomendamos siempre verificar referencias dentro de la app.</li>
            </ul>
          </section>
          <section>
            <h3 className="mb-1 font-bold text-zinc-900">4. Pagos y Tarifas</h3>
            <p>
              Los pagos pueden procesarse a través de la plataforma o acordarse
              en efectivo. TRYWORK puede cobrar una tarifa de servicio por cada
              transacción exitosa conectada a través de la aplicación, la cual será
              visible antes de confirmar el trabajo.
            </p>
          </section>
          <section>
            <h3 className="mb-1 font-bold text-zinc-900">5. Seguridad y Conducta</h3>
            <p>
              Esperamos que todos los usuarios mantengan un comportamiento
              profesional y respetuoso. Nos reservamos el derecho de suspender o
              eliminar cuentas que violen nuestras normas de comunidad, reportes
              de acoso, o actividades fraudulentas.
            </p>
          </section>
          <section>
            <h3 className="mb-1 font-bold text-zinc-900">6. Privacidad de Datos</h3>
            <p>
              Tu privacidad es importante para nosotros. Recopilamos y procesamos
              tus datos personales de acuerdo con nuestra Política de Privacidad,
              incluyendo geolocalización para conectar trabajos cercanos.
            </p>
          </section>
          <p className="py-4 text-center text-[11px] tracking-[0.2em] text-zinc-300">
            FIN DEL DOCUMENTO
          </p>
        </article>

        <label className="mt-2 flex items-start gap-3 text-[12px] leading-5 text-zinc-500">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 accent-[#FF8A00]"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          He leído y acepto los Términos y Condiciones así como la Política de
          Privacidad de TRYWORK.
        </label>

        <button
          className="btn-primary mt-5"
          onClick={() => {
            if (!checked) {
              showToast("Debes aceptar los términos para continuar");
              return;
            }
            setTermsAccepted(true);
            router.push("/registro");
          }}
        >
          Aceptar y Continuar →
        </button>
        <button
          className="mt-3 w-full py-3 text-center text-[14px] font-semibold text-zinc-400"
          onClick={() => router.push("/")}
        >
          Rechazar
        </button>
      </div>
    </Screen>
  );
}
