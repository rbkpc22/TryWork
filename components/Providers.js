"use client";

import { AppProvider, useApp } from "@/context/AppContext";
import { BottomNav } from "@/components/BottomNav";
import { usePathname } from "next/navigation";

const NAV_PREFIXES = [
  "/explorar",
  "/publicar",
  "/mensajes",
  "/perfil",
  "/trabajos",
  "/pagos",
  "/seguimiento",
  "/notificaciones",
  "/calificar",
  "/postulantes",
];

function Shell({ children }) {
  const pathname = usePathname();
  const { toast } = useApp();
  const showNav = NAV_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
  const hideNav = pathname?.startsWith("/mensajes/");

  return (
    <div className="app-root">
      <div className="phone">
        {children}
        {showNav && !hideNav ? <BottomNav /> : null}
        {toast ? <div className="toast">{toast}</div> : null}
      </div>
    </div>
  );
}

export function Providers({ children }) {
  return (
    <AppProvider>
      <Shell>{children}</Shell>
    </AppProvider>
  );
}
