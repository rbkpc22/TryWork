export function Icon({ name, size = 22, color = "currentColor", stroke = 1.8 }) {
  const p = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  switch (name) {
    case "back":
      return (
        <svg {...p}>
          <path d="M15 18l-6-6 6-6" />
        </svg>
      );
    case "bell":
      return (
        <svg {...p}>
          <path d="M6 8a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9" />
          <path d="M10 20a2 2 0 0 0 4 0" />
        </svg>
      );
    case "search":
      return (
        <svg {...p}>
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3-3" />
        </svg>
      );
    case "sliders":
      return (
        <svg {...p}>
          <path d="M4 8h16M4 16h16" />
          <circle cx="9" cy="8" r="2" fill={color} />
          <circle cx="15" cy="16" r="2" fill={color} />
        </svg>
      );
    case "pin":
      return (
        <svg {...p}>
          <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
          <circle cx="12" cy="10" r="2.2" />
        </svg>
      );
    case "mail":
      return (
        <svg {...p}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 7 9-7" />
        </svg>
      );
    case "lock":
      return (
        <svg {...p}>
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
      );
    case "eye":
      return (
        <svg {...p}>
          <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "eye-off":
      return (
        <svg {...p}>
          <path d="M3 3l18 18" />
          <path d="M10.6 10.6A3 3 0 0 0 12 15a3 3 0 0 0 2.4-4.4" />
          <path d="M9.9 5.1A10.8 10.8 0 0 1 12 5c6 0 10 7 10 7a18 18 0 0 1-4.2 4.8" />
          <path d="M6.1 6.1C3.8 7.8 2 12 2 12s4 7 10 7c1.3 0 2.5-.2 3.6-.6" />
        </svg>
      );
    case "user":
      return (
        <svg {...p}>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 19a7 7 0 0 1 14 0" />
        </svg>
      );
    case "phone":
      return (
        <svg {...p}>
          <path d="M22 16.9v2a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h2a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.5 2.1L7.1 9.4a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.8.3 1.6.5 2.5.6A2 2 0 0 1 22 16.9z" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...p}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M8 3v4M16 3v4M3 10h18" />
        </svg>
      );
    case "plus":
      return (
        <svg {...p}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case "chat":
      return (
        <svg {...p}>
          <path d="M21 12a8 8 0 0 1-8 8H7l-4 3V12a8 8 0 1 1 18 0z" />
        </svg>
      );
    case "briefcase":
      return (
        <svg {...p} fill={color} stroke="none">
          <path d="M9 7V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1h3a2 2 0 0 1 2 2v3H4V9a2 2 0 0 1 2-2h3zm11 7v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4h16z" />
        </svg>
      );
    case "briefcase-clock":
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden>
          <rect x="10" y="18" width="28" height="18" rx="4" stroke="white" strokeWidth="2.4" />
          <path d="M18 18v-3a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v3" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="31" cy="31" r="6.2" fill="#FF8A00" stroke="white" strokeWidth="2" />
          <path d="M31 28.6V31l1.8 1.2" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "paw":
      return (
        <svg {...p} fill={color} stroke="none">
          <circle cx="7" cy="10" r="2.2" />
          <circle cx="12" cy="7.5" r="2.2" />
          <circle cx="17" cy="10" r="2.2" />
          <ellipse cx="12" cy="16.5" rx="4.4" ry="3.3" />
        </svg>
      );
    case "bag":
      return (
        <svg {...p}>
          <path d="M6 8h12l-1 12H7L6 8z" />
          <path d="M9 8V7a3 3 0 0 1 6 0v1" />
        </svg>
      );
    case "box":
      return (
        <svg {...p}>
          <path d="M3 8l9-4 9 4-9 4-9-4z" />
          <path d="M3 8v8l9 4 9-4V8" />
          <path d="M12 12v8" />
        </svg>
      );
    case "spark":
      return (
        <svg {...p}>
          <path d="M5 20l5-5M14 4l1.5 4.5L20 10l-4.5 1.5L14 16l-1.5-4.5L8 10l4.5-1.5L14 4z" />
        </svg>
      );
    case "wrench":
      return (
        <svg {...p}>
          <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 0 0 5.4-5.4L15 12l-3-3 2.7-2.7z" />
        </svg>
      );
    case "grid":
      return (
        <svg {...p}>
          <rect x="4" y="4" width="7" height="7" rx="1.5" />
          <rect x="13" y="4" width="7" height="7" rx="1.5" />
          <rect x="4" y="13" width="7" height="7" rx="1.5" />
          <rect x="13" y="13" width="7" height="7" rx="1.5" />
        </svg>
      );
    case "dots":
      return (
        <svg {...p} fill={color} stroke="none">
          <circle cx="6" cy="12" r="1.6" />
          <circle cx="12" cy="12" r="1.6" />
          <circle cx="18" cy="12" r="1.6" />
        </svg>
      );
    case "check":
      return (
        <svg {...p}>
          <path d="M5 12l5 5L20 7" />
        </svg>
      );
    case "star":
      return (
        <svg {...p} fill={color} stroke="none">
          <path d="M12 3l2.6 5.4 6 .9-4.3 4.2 1 6L12 16.8 6.7 19.5l1-6L3.4 9.3l6-.9L12 3z" />
        </svg>
      );
    case "share":
      return (
        <svg {...p}>
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="M8.6 13.5l6.8 4M8.6 10.5l6.8-4" />
        </svg>
      );
    case "settings":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9c.3.6.9 1 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
        </svg>
      );
    case "clock":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v5l3 2" />
        </svg>
      );
    case "card":
      return (
        <svg {...p}>
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="M3 10h18" />
        </svg>
      );
    case "bank":
      return (
        <svg {...p}>
          <path d="M3 10l9-6 9 6" />
          <path d="M5 10v8M9 10v8M15 10v8M19 10v8M4 18h16" />
        </svg>
      );
    case "file":
      return (
        <svg {...p}>
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z" />
          <path d="M14 3v5h5" />
        </svg>
      );
    case "alert":
      return (
        <svg {...p}>
          <path d="M12 9v4M12 17h.01" />
          <path d="M10.3 4.7L2.8 18a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.7a2 2 0 0 0-3.4 0z" />
        </svg>
      );
    case "sos":
      return (
        <svg {...p} fill="none">
          <path d="M12 6v4M12 14h.01" />
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
    case "send":
      return (
        <svg {...p} fill={color} stroke="none">
          <path d="M3 11.5l18-8-8 18-2.2-7.2L3 11.5z" />
        </svg>
      );
    case "emoji":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <path d="M9 10h.01M15 10h.01" />
        </svg>
      );
    case "attach":
      return (
        <svg {...p}>
          <path d="M12 5v14a4 4 0 0 0 8 0V9a6 6 0 0 0-12 0v9" />
        </svg>
      );
    case "more":
      return (
        <svg {...p} fill={color} stroke="none">
          <circle cx="12" cy="6" r="1.6" />
          <circle cx="12" cy="12" r="1.6" />
          <circle cx="12" cy="18" r="1.6" />
        </svg>
      );
    case "call":
      return (
        <svg {...p}>
          <path d="M22 16.9v2a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h2a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.5 2.1L7.1 9.4a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.8.3 1.6.5 2.5.6A2 2 0 0 1 22 16.9z" />
        </svg>
      );
    case "gavel":
      return (
        <svg {...p}>
          <path d="M14 7l3 3M8 13l3 3M4 20l7-7" />
          <path d="M12 5l7 7" />
        </svg>
      );
    case "pencil":
      return (
        <svg {...p}>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4 11.5-11.5z" />
        </svg>
      );
    case "sofa":
      return (
        <svg {...p}>
          <path d="M4 14V10a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v4" />
          <path d="M3 14h18v4H3z" />
        </svg>
      );
    case "bolt":
      return (
        <svg {...p} fill={color} stroke="none">
          <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
        </svg>
      );
    case "logout":
      return (
        <svg {...p}>
          <path d="M9 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3" />
          <path d="M16 17l5-5-5-5M21 12H9" />
        </svg>
      );
    case "chevron":
      return (
        <svg {...p}>
          <path d="M9 6l6 6-6 6" />
        </svg>
      );
    case "person":
      return (
        <svg {...p}>
          <circle cx="12" cy="8" r="3" />
          <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        </svg>
      );
    default:
      return null;
  }
}

export function LogoMark({ size = 44 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 14,
        background: "#FF8A00",
        display: "grid",
        placeItems: "center",
        boxShadow: "0 8px 18px rgba(255,138,0,.35)",
      }}
    >
      <Icon name="briefcase-clock" size={size * 0.78} />
    </div>
  );
}
