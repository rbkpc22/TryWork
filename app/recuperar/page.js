"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/Icons";
import { Screen, TopBar } from "@/components/UI";
import { useApp } from "@/context/AppContext";

export default function RecuperarPage() {
  const { showToast } = useApp();
  const router = useRouter();
  const [email, setEmail] = useState("");

  return (
    <Screen>
      <TopBar title="Recuperar acceso" />
      <form
        className="px-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (!email) return showToast("Ingresa tu correo o teléfono");
          showToast("Te enviamos un enlace de recuperación");
          router.push("/login");
        }}
      >
        <p className="text-[14px] text-zinc-500">
          Escribe el correo o teléfono asociado a tu cuenta y te enviaremos
          instrucciones para restablecer la contraseña.
        </p>
        <div className="mt-6">
          <label className="label">Correo o Teléfono</label>
          <div className="field">
            <Icon name="mail" size={18} color="#C0C6D0" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ej. usuario@email.com"
            />
          </div>
        </div>
        <button className="btn-primary mt-8" type="submit">
          Enviar enlace
        </button>
      </form>
    </Screen>
  );
}
