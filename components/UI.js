"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { Icon } from "./Icons";

export function TopBar({ title, back = true, right, dark = false }) {
  const router = useRouter();

  return (
    <header
      className="flex items-center justify-between px-4 pt-4 pb-3"
      style={{ color: dark ? "#fff" : "#111827" }}
    >
      {back ? (
        <button
          type="button"
          aria-label="Regresar"
          onClick={() => router.back()}
          className="w-10 h-10 grid place-items-center rounded-full"
        >
          <Icon name="back" size={24} color={dark ? "#fff" : "#111827"} />
        </button>
      ) : (
        <div className="w-10" />
      )}
      <h1 className="text-[17px] font-bold tracking-tight">{title}</h1>
      <div className="min-w-10 flex justify-end">{right}</div>
    </header>
  );
}

export function Screen({ children, nav = false, className = "", scroll = true }) {
  return (
    <div className={`page ${className}`}>
      <div
        className={`page-main ${scroll ? "page-scroll" : "page-fit"} ${nav ? "has-nav" : ""}`}
      >
        {children}
      </div>
    </div>
  );
}

export function Avatar({ src, size = 40, alt = "" }) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="rounded-full object-cover bg-zinc-200"
      style={{ width: size, height: size }}
    />
  );
}

export function RequireAuth({ children }) {
  const { user, hydrated } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !user) router.replace("/");
  }, [hydrated, user, router]);

  if (!hydrated) {
    return (
      <div className="page grid place-items-center">
        <p className="text-sm text-zinc-400">Cargando…</p>
      </div>
    );
  }
  if (!user) return null;
  return children;
}
