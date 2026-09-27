"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icons";
import { Screen, TopBar } from "@/components/UI";
import { useApp } from "@/context/AppContext";

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80";

const PASSWORD_RULES = [
  { id: "len", label: "Mínimo 8 caracteres", ok: (value) => value.length >= 8 },
  { id: "letter", label: "Al menos una letra", ok: (value) => /[A-Za-zÁÉÍÓÚáéíóúÑñ]/.test(value) },
  { id: "number", label: "Al menos un número", ok: (value) => /\d/.test(value) },
];

export default function RegistroPage() {
  const router = useRouter();
  const { register, showToast, termsAccepted } = useApp();
  const fileRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    location: "Ciudad de México, MX",
    password: "",
    avatar: DEFAULT_AVATAR,
    role: "",
  });
  const [show, setShow] = useState(false);
  const [accept, setAccept] = useState(false);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    if (termsAccepted) setAccept(true);
  }, [termsAccepted]);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const rol = q.get("rol");
    const via = q.get("proveedor");
    const email = q.get("email");
    setForm((f) => ({
      ...f,
      role: rol === "empleador" || rol === "trabajador" ? rol : f.role,
      email: email || f.email,
    }));
    if (via === "google" || via === "apple") setProvider(via);
  }, []);

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function onPhoto(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => set("avatar", reader.result);
    reader.readAsDataURL(file);
  }

  function onSubmit(e) {
    e.preventDefault();
    if (form.role !== "trabajador" && form.role !== "empleador") {
      showToast("Elige si quieres trabajar o contratar");
      return;
    }
    if (!accept) {
      showToast("Acepta los términos y la privacidad para crear la cuenta");
      return;
    }
    if (provider) {
      if (!form.name.trim() || !form.email.trim()) {
        showToast("Completa nombre y correo");
        return;
      }
    } else {
      const required = ["name", "age", "phone", "email", "location", "password"];
      if (required.some((k) => !String(form[k]).trim())) {
        showToast("Completa todos los campos obligatorios");
        return;
      }
      if (PASSWORD_RULES.some((rule) => !rule.ok(form.password))) {
        showToast("La contraseña no cumple los requisitos");
        return;
      }
    }
    const ok = register({
      ...form,
      authProvider: provider || "email",
      profession: form.role === "empleador" ? "Empleador" : "Profesional independiente",
    });
    if (ok) router.push(form.role === "empleador" ? "/publicar" : "/explorar");
  }

  const providerLabel = provider === "apple" ? "Apple" : "Google";

  return (
    <Screen>
      <TopBar title="Registro" />
      <form onSubmit={onSubmit} className="px-6 pb-10">
        <p className="text-[13px] font-bold text-zinc-400">¿Cómo vas a usar TRYWORK?</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {[
            ["trabajador", "Quiero trabajar", "Aplico a ofertas"],
            ["empleador", "Quiero contratar", "Publico ofertas"],
          ].map(([id, title, hint]) => (
            <button
              key={id}
              type="button"
              onClick={() => set("role", id)}
              className="rounded-2xl border px-3 py-3 text-left"
              style={{
                borderColor: form.role === id ? "#FF8A00" : "#eceff3",
                background: form.role === id ? "#FFF4E5" : "#fff",
              }}
            >
              <span className="block text-[13px] font-extrabold">{title}</span>
              <span className="mt-1 block text-[11px] text-zinc-400">{hint}</span>
            </button>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <button
            type="button"
            className="flex h-12 items-center justify-center gap-2 rounded-full border border-zinc-200 text-[14px] font-bold"
            onClick={() => setProvider("google")}
          >
            Continuar con Google
          </button>
          <button
            type="button"
            className="flex h-12 items-center justify-center gap-2 rounded-full border border-zinc-200 bg-zinc-900 text-[14px] font-bold text-white"
            onClick={() => setProvider("apple")}
          >
            Continuar con Apple
          </button>
          {provider ? (
            <button
              type="button"
              className="text-[12px] font-semibold text-zinc-400"
              onClick={() => setProvider(null)}
            >
              Prefiero registrarme con correo
            </button>
          ) : (
            <p className="text-center text-[12px] text-zinc-400">o con tu correo</p>
          )}
        </div>

        {provider ? (
          <p className="mt-4 rounded-2xl bg-[#f7f8fa] px-3 py-2 text-[12px] leading-5 text-zinc-500">
            Con {providerLabel} no creas contraseña. Usa el nombre y el correo de esa cuenta.
          </p>
        ) : (
          <div className="mt-6 flex flex-col items-center text-center">
            <div className="relative">
              <img
                src={form.avatar}
                alt="Foto de perfil"
                className="h-[108px] w-[108px] rounded-full object-cover"
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="absolute bottom-1 right-0 grid h-8 w-8 place-items-center rounded-full"
                style={{ background: "#FF8A00" }}
                aria-label="Subir foto"
              >
                <Icon name="pencil" size={14} color="#fff" />
              </button>
              <input ref={fileRef} type="file" accept="image/*" hidden onChange={onPhoto} />
            </div>
          </div>
        )}

        <div className="mt-5">
          <label className="label">Nombre Completo</label>
          <div className="field">
            <Icon name="user" size={18} color="#C0C6D0" />
            <input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Ej. Juan Pérez"
            />
          </div>
        </div>

        {provider ? null : (
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <label className="label">Edad</label>
              <div className="field">
                <Icon name="calendar" size={18} color="#C0C6D0" />
                <input
                  inputMode="numeric"
                  value={form.age}
                  onChange={(e) => set("age", e.target.value)}
                  placeholder="Ej. 25"
                />
              </div>
            </div>
            <div>
              <label className="label">Teléfono</label>
              <div className="field">
                <Icon name="phone" size={18} color="#C0C6D0" />
                <input
                  inputMode="tel"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="55 1234 5678"
                />
              </div>
            </div>
          </div>
        )}

        <div className="mt-4">
          <label className="label">Correo Electrónico</label>
          <div className="field">
            <Icon name="mail" size={18} color="#C0C6D0" />
            <input
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="ejemplo@correo.com"
              autoComplete="email"
            />
          </div>
        </div>

        {provider ? null : (
          <>
            <div className="mt-4">
              <label className="label">Ubicación</label>
              <div className="field">
                <Icon name="pin" size={18} color="#C0C6D0" />
                <input
                  value={form.location}
                  onChange={(e) => set("location", e.target.value)}
                  placeholder="Ciudad de México, MX"
                />
                <Link
                  href="/mapa?from=registro"
                  className="text-[12px] font-extrabold"
                  style={{ color: "#FF8A00" }}
                >
                  MAPA
                </Link>
              </div>
            </div>

            <div className="mt-4">
              <label className="label">Contraseña</label>
              <div className="field">
                <Icon name="lock" size={18} color="#C0C6D0" />
                <input
                  type={show ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => set("password", e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  autoComplete="new-password"
                />
                <button type="button" onClick={() => setShow((v) => !v)} aria-label="Mostrar contraseña">
                  <Icon name={show ? "eye-off" : "eye"} size={18} color="#C0C6D0" />
                </button>
              </div>
              <ul className="mt-2 space-y-1">
                {PASSWORD_RULES.map((rule) => {
                  const met = rule.ok(form.password);
                  return (
                    <li
                      key={rule.id}
                      className="text-[12px] font-semibold"
                      style={{ color: met ? "#16a34a" : "#a1a1aa" }}
                    >
                      {met ? "✓" : "○"} {rule.label}
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        )}

        <label className="mt-4 flex items-start gap-3 text-[12px] leading-5 text-zinc-500">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 accent-[#FF8A00]"
            checked={accept}
            onChange={(e) => setAccept(e.target.checked)}
          />
          <span>
            Acepto los{" "}
            <Link href="/terminos" className="font-bold" style={{ color: "#FF8A00" }}>
              Términos y Condiciones
            </Link>{" "}
            y la{" "}
            <Link href="/privacidad" className="font-bold" style={{ color: "#FF8A00" }}>
              Política de Privacidad
            </Link>
            .
          </span>
        </label>

        <button type="submit" className="btn-primary mt-6">
          {provider ? `Crear cuenta con ${providerLabel}` : "Registrarse →"}
        </button>
      </form>
    </Screen>
  );
}
