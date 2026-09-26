"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Icon } from "@/components/Icons";
import { Screen, TopBar } from "@/components/UI";
import { useApp } from "@/context/AppContext";
import Link from "next/link";

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80";

export default function RegistroPage() {
  const router = useRouter();
  const { register, showToast } = useApp();
  const fileRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    location: "Ciudad de México, MX",
    password: "",
    avatar: DEFAULT_AVATAR,
  });
  const [show, setShow] = useState(false);

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
    const required = ["name", "age", "phone", "email", "location", "password"];
    if (required.some((k) => !String(form[k]).trim())) {
      showToast("Completa todos los campos obligatorios");
      return;
    }
    if (register({ ...form, profession: "Profesional independiente" })) {
      router.push("/explorar");
    }
  }

  return (
    <Screen>
      <TopBar title="Registro" />
      <form onSubmit={onSubmit} className="px-6 pb-10">
        <div className="flex flex-col items-center text-center">
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
          <h2 className="mt-4 text-[22px] font-extrabold">Sube tu foto</h2>
          <p className="mt-1 max-w-[260px] text-[13px] text-zinc-400">
            Elige una foto clara y reciente para tu perfil
          </p>
        </div>

        <div className="mt-7">
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

        <div className="mt-4">
          <label className="label">Correo Electrónico</label>
          <div className="field">
            <Icon name="mail" size={18} color="#C0C6D0" />
            <input
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="ejemplo@correo.com"
            />
          </div>
        </div>

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
              placeholder="********"
            />
            <button type="button" onClick={() => setShow((v) => !v)}>
              <Icon name={show ? "eye-off" : "eye"} size={18} color="#C0C6D0" />
            </button>
          </div>
        </div>

        <button type="submit" className="btn-primary mt-8">
          Registrarse →
        </button>
      </form>
    </Screen>
  );
}
