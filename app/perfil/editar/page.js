"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { RequireAuth, Screen, TopBar } from "@/components/UI";
import { useApp } from "@/context/AppContext";

export default function EditarPerfilPage() {
  return (
    <RequireAuth>
      <EditarInner />
    </RequireAuth>
  );
}

function EditarInner() {
  const { user, updateProfile } = useApp();
  const router = useRouter();
  const fileRef = useRef(null);
  const [form, setForm] = useState({
    name: user.name,
    profession: user.profession,
    location: user.location,
    phone: user.phone,
    rate: user.rate,
    avatar: user.avatar,
    specialties: (user.specialties || []).join(", "),
  });

  function set(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  return (
    <Screen nav>
      <TopBar title="Editar Perfil" />
      <form
        className="px-5 pb-8"
        onSubmit={(e) => {
          e.preventDefault();
          updateProfile({
            ...form,
            rate: Number(form.rate) || user.rate,
            specialties: form.specialties
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          });
          router.push("/perfil");
        }}
      >
        <div className="flex flex-col items-center">
          <button type="button" onClick={() => fileRef.current?.click()}>
            <img src={form.avatar} alt="" className="h-24 w-24 rounded-full object-cover" />
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => set("avatar", reader.result);
              reader.readAsDataURL(file);
            }}
          />
        </div>
        {[
          ["name", "Nombre Completo"],
          ["profession", "Profesión"],
          ["location", "Ubicación"],
          ["phone", "Teléfono"],
          ["rate", "Tarifa por hora (MXN)"],
          ["specialties", "Especialidades (separadas por coma)"],
        ].map(([k, label]) => (
          <div key={k} className="mt-4">
            <label className="label">{label}</label>
            <div className="field">
              <input value={form[k]} onChange={(e) => set(k, e.target.value)} />
            </div>
          </div>
        ))}
        <button className="btn-primary mt-6" type="submit">
          Guardar cambios
        </button>
      </form>
    </Screen>
  );
}
