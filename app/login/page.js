"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/Icons";
import { Screen, TopBar } from "@/components/UI";
import { useApp } from "@/context/AppContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useApp();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    if (!identifier || !password) return;
    if (login(identifier, password)) router.push("/explorar");
  }

  return (
    <Screen>
      <TopBar title="Iniciar Sesión" />
      <form onSubmit={onSubmit} className="px-6 pb-10">
        <div className="mt-6 flex flex-col items-center text-center">
          <div
            className="grid place-items-center rounded-full"
            style={{ width: 92, height: 92, background: "#FFF4E5" }}
          >
            <Icon name="briefcase" size={36} color="#FF8A00" />
          </div>
          <h2 className="mt-5 text-[26px] font-extrabold tracking-tight">
            Bienvenido a TRYWORK
          </h2>
          <p className="mt-2 max-w-[240px] text-[14px] leading-5 text-zinc-400">
            Conectando talento con oportunidades inmediatas
          </p>
        </div>

        <div className="mt-10">
          <label className="label">Correo o Teléfono</label>
          <div className="field">
            <Icon name="mail" size={18} color="#C0C6D0" />
            <input
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="ej. usuario@email.com"
              autoComplete="username"
            />
          </div>
        </div>

        <div className="mt-5">
          <label className="label">Contraseña</label>
          <div className="field">
            <Icon name="lock" size={18} color="#C0C6D0" />
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              autoComplete="current-password"
            />
            <button type="button" onClick={() => setShow((v) => !v)} aria-label="Mostrar contraseña">
              <Icon name={show ? "eye-off" : "eye"} size={18} color="#C0C6D0" />
            </button>
          </div>
        </div>

        <div className="mt-3 text-right">
          <Link href="/recuperar" className="text-[13px] font-semibold" style={{ color: "#FF8A00" }}>
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <button type="submit" className="btn-primary mt-8">
          Entrar
        </button>

        <p className="mt-6 text-center text-[14px] text-zinc-500">
          ¿No tienes una cuenta?{" "}
          <Link href="/registro" className="font-bold" style={{ color: "#FF8A00" }}>
            Regístrate
          </Link>
        </p>

        <p className="mt-8 text-center text-[11px] text-zinc-400">
          Demo: alex@trywork.com · 123456
        </p>
      </form>
    </Screen>
  );
}
