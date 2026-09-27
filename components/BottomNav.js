"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { Icon } from "./Icons";

const ITEMS = [
  { href: "/explorar", label: "Explorar", icon: "search" },
  { href: "/publicar", label: "Publicar", icon: "plus" },
  { href: "/mensajes", label: "Mensajes", icon: "chat" },
  { href: "/perfil", label: "Perfil", icon: "user" },
];

export function BottomNav() {
  const pathname = usePathname();
  const { user, notifications, conversations } = useApp();
  const unreadNotes = notifications.some((n) => !n.read);
  const unreadChats = conversations.some((c) => c.unread);

  return (
    <nav className="bottom-nav" aria-label="Navegación principal">
      {ITEMS.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        const dot =
          (item.href === "/perfil" && unreadNotes) ||
          (item.href === "/mensajes" && unreadChats);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-label={item.label}
            className={`nav-item ${active ? "active" : ""}`}
          >
            <span className="nav-glyph">
              {item.href === "/perfil" && user?.avatar ? (
                <img className="nav-avatar" src={user.avatar} alt="" />
              ) : (
                <Icon name={item.icon} size={22} color="currentColor" stroke={2} />
              )}
              {dot ? <span className="nav-dot" /> : null}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
