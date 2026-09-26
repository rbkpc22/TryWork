"use client";

import Link from "next/link";
import { Avatar, RequireAuth, Screen, TopBar } from "@/components/UI";
import { useApp } from "@/context/AppContext";

export default function MensajesPage() {
  return (
    <RequireAuth>
      <MensajesInner />
    </RequireAuth>
  );
}

function MensajesInner() {
  const { conversations } = useApp();

  return (
    <Screen nav className="bg-[#f7f8fa]">
      <TopBar title="Mensajes" back={false} />
      <div className="px-4 pb-6">
        {conversations.length === 0 ? (
          <p className="px-6 py-16 text-center text-sm text-zinc-400">
            Todavía no hay chats. Cuando elijas a alguien para tu oferta, el chat empieza vacío.
          </p>
        ) : null}
        {conversations.map((c) => (
          <Link
            key={c.id}
            href={`/mensajes/${c.id}`}
            className="mb-3 flex items-center gap-3 rounded-[24px] bg-white p-3 shadow-soft"
          >
            <div className="relative">
              <Avatar src={c.avatar} size={52} alt={c.name} />
              {c.online ? (
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
              ) : null}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <p className="font-extrabold">{c.name}</p>
                <span className="text-[11px] text-zinc-400">{c.time}</span>
              </div>
              <p className="truncate text-[13px] text-zinc-400">{c.lastMessage || "Sin mensajes"}</p>
            </div>
            {c.unread ? (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#FF8A00] px-1 text-[10px] font-bold text-white">
                {c.unread}
              </span>
            ) : null}
          </Link>
        ))}
      </div>
    </Screen>
  );
}
