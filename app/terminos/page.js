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
          <p className="mt-1 text-[12px] text-zinc-400">Última actualización: 26 de septiembre de 2026</p>
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
              TRYWORK también es para adolescentes. Puedes registrarte sin ser
              mayor de edad. Al crear la cuenta, garantizas que la información
              que das es veraz y precisa.
            </p>
          </section>
          <section>
            <h3 className="mb-1 font-bold text-zinc-900">3. Naturaleza del Servicio</h3>
            <p>
              TRYWORK actúa exclusivamente como una plataforma tecnológica de
              intermediación. No somos una agencia de empleo ni empleadores
              directos. La relación se establece entre quien publica la oferta
              (“Empleador”) y quien la realiza (“Trabajador”).
            </p>
            <ul className="mt-2 list-disc pl-4">
              <li>No garantizamos la calidad del trabajo realizado.</li>
              <li>El pago de un trabajo publicado aquí se cobra dentro de la app.</li>
              <li>Las reseñas del perfil sirven para revisar referencias.</li>
            </ul>
          </section>
          <section>
            <h3 className="mb-1 font-bold text-zinc-900">4. Pagos y comisiones</h3>
            <p>
              No se acepta efectivo ni un pago fuera de TRYWORK para un trabajo
              acordado en la app. La comisión solo puede cobrarse si el pago pasa
              por la plataforma.
            </p>
            <ul className="mt-2 list-disc pl-4">
              <li>
                Quien publica paga el monto del trabajador más una comisión del
                10% de ese monto. Quien aplica solo ve lo que va a recibir.
              </li>
              <li>
                Destacar una oferta (BOOST) es opcional, dura 24 horas y cuesta el
                20% del pago al trabajador. La cuenta regresiva solo la ve quien
                publicó.
              </li>
              <li>
                TRYWORK no guarda el número completo de la tarjeta. El cobro se
                muestra antes de confirmar.
              </li>
            </ul>
          </section>
          <section>
            <h3 className="mb-1 font-bold text-zinc-900">5. Cancelación, disputas y reseñas</h3>
            <p>
              Quien publicó, o quien ya fue elegido, puede cancelar desde el
              detalle del trabajo mientras no exista una hora acordada. Si ya hay
              hora acordada, la cancelación se pide a soporte antes de que empiece
              el tiempo.
            </p>
            <p className="mt-2">
              Si el servicio no se cumple, cualquiera de las dos personas puede
              escribir a soporte desde Ayuda. Revisamos el chat, la hora acordada
              y el pago registrado en la app. Con eso el pago puede retenerse o
              devolverse. Al cerrar el trabajo, ambas partes pueden dejar una
              reseña.
            </p>
          </section>
          <section>
            <h3 className="mb-1 font-bold text-zinc-900">6. Verificación de identidad</h3>
            <p>
              La verificación no es automática. Desde Perfil se solicita la
              revisión de nombre, foto e identificación oficial. Hasta que
              TRYWORK la apruebe, el perfil permanece sin verificar o en revisión.
            </p>
          </section>
          <section>
            <h3 className="mb-1 font-bold text-zinc-900">7. Mapa, ubicación y SOS</h3>
            <p>
              El mapa sirve para mostrar trabajos cercanos. En un trabajo activo,
              Seguimiento usa la ubicación del momento. La dirección exacta del
              servicio se acuerda en el chat y no se publica en la oferta.
            </p>
            <p className="mt-2">
              En Seguimiento hay un botón SOS. Hay que mantenerlo 3 segundos y
              confirmar. La alerta incluye la ubicación de ese momento y se envía
              a los contactos de emergencia y al equipo de TRYWORK. Es solo para
              una emergencia real.
            </p>
          </section>
          <section>
            <h3 className="mb-1 font-bold text-zinc-900">8. Seguridad y conducta</h3>
            <p>
              Esperamos un trato profesional y respetuoso. Podemos suspender
              cuentas por acoso, fraude o por intentar cobrar un trabajo de la
              app fuera de la plataforma.
            </p>
          </section>
          <section>
            <h3 className="mb-1 font-bold text-zinc-900">9. Privacidad de datos</h3>
            <p>
              Tratamos nombre, foto, contacto, identificaciones enviadas a
              verificación, actividad y ubicación según la Política de Privacidad,
              incluso la ubicación que viaja con una alerta SOS.
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
