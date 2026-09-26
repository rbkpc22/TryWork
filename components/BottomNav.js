"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./Icons";

const ITEMS = [
  { href: "/explorar", label: "Explorar", icon: "search" },
  { href: "/publicar", label: "Publicar", icon: "plus" },
  { href: "/mensajes", label: "Mensajes", icon: "chat" },
  { href: "/perfil", label: "Perfil", icon: "user" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav">
      {ITEMS.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-item ${active ? "active" : ""}`}
          >
            <Icon
              name={item.icon}
              size={22}
              color={active ? "#FF8A00" : "#B0B6C0"}
              stroke={active ? 2.2 : 1.8}
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
