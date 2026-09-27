"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/Icons";
import { Screen, TopBar } from "@/components/UI";
import { useApp } from "@/context/AppContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithProvider, showToast } = useApp();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [provider, setProvider] = useState(null);
  const [socialEmail, setSocialEmail] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    if (!identifier || !password) return;
    if (login(identifier, password)) router.push("/explorar");
  }

  function continueSocial(e) {
    e.preventDefault();
    const email = socialEmail.trim();
    if (!email || !provider) {
      showToast("Escribe el correo de esa cuenta");
      return;
    }
    const result = loginWithProvider(email, provider);
    if (result === true) {
      router.push("/explorar");
      return;
    }
    if (result === "missing") {
      router.push(`/registro?proveedor=${provider}&email=${encodeURIComponent(email)}`);
    }
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

        <div className="mt-8 flex flex-col gap-2">
          <button
            type="button"
            className="flex h-12 items-center justify-center rounded-full border border-zinc-200 text-[14px] font-bold"
            onClick={() => setProvider("google")}
          >
            Continuar con Google
          </button>
          <button
            type="button"
            className="flex h-12 items-center justify-center rounded-full border border-zinc-200 bg-zinc-900 text-[14px] font-bold text-white"
            onClick={() => setProvider("apple")}
          >
            Continuar con Apple
          </button>
        </div>

        {provider ? (
          <div className="mt-4 rounded-3xl bg-[#f7f8fa] p-4">
            <p className="text-[13px] font-extrabold">
              Correo de tu cuenta {provider === "apple" ? "Apple" : "Google"}
            </p>
            <div className="field mt-3">
              <Icon name="mail" size={18} color="#C0C6D0" />
              <input
                type="email"
                value={socialEmail}
                onChange={(e) => setSocialEmail(e.target.value)}
                placeholder="tu@correo.com"
              />
            </div>
            <button type="button" className="btn-primary mt-3" onClick={continueSocial}>
              Continuar
            </button>
          </div>
        ) : null}

        <p className="mt-5 text-center text-[12px] text-zinc-400">o con correo y contraseña</p>

        <div className="mt-4">
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
      </form>
    </Screen>
  );
}
