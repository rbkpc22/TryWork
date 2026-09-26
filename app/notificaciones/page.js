"use client";

import Link from "next/link";
import { RequireAuth, Screen, TopBar } from "@/components/UI";
import { useApp } from "@/context/AppContext";

export default function NotificacionesPage() {
  return (
    <RequireAuth>
      <Inner />
    </RequireAuth>
  );
}

function Inner() {
  const { notifications, markNotificationsRead } = useApp();

  return (
    <Screen nav className="bg-[#f7f8fa]">
      <TopBar
        title="Notificaciones"
        right={
          <button
            className="text-[11px] font-bold"
            style={{ color: "#FF8A00" }}
            onClick={markNotificationsRead}
          >
            Leídas
          </button>
        }
      />
      <div className="px-4 pb-8">
        {notifications.map((n) => (
          <Link
            key={n.id}
            href={n.href || "/explorar"}
            className="mb-3 block rounded-[24px] bg-white p-4 shadow-soft"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-bold">{n.title}</p>
                <p className="mt-1 text-[13px] text-zinc-500">{n.body}</p>
              </div>
              {!n.read ? <span className="mt-1 h-2 w-2 rounded-full bg-[#FF8A00]" /> : null}
            </div>
            <p className="mt-2 text-[11px] text-zinc-400">{n.time}</p>
          </Link>
        ))}
      </div>
    </Screen>
  );
}
