"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icons";
import { Avatar, RequireAuth, Screen } from "@/components/UI";
import { useApp } from "@/context/AppContext";

const QUICK = [
  { icon: true, text: "Solicitar ubicación" },
  { icon: false, text: "Sí, por favor" },
  { icon: false, text: "Ya tengo la ubicación" },
];

export default function ChatPage() {
  return (
    <RequireAuth>
      <ChatInner />
    </RequireAuth>
  );
}

function ChatInner() {
  const { id } = useParams();
  const router = useRouter();
  const { user, jobs, conversations, sendMessage, agreeSchedule, showToast } = useApp();
  const chat = conversations.find((c) => c.id === id);
  const job = jobs.find((j) => j.id === chat?.jobId);
  const [text, setText] = useState("");
  const [menu, setMenu] = useState(false);
  const [when, setWhen] = useState("");
  const [place, setPlace] = useState(job?.assignment?.exactLocation || "");
  const scroller = useRef(null);

  useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight;
  }, [chat?.messages.length]);

  if (!chat) {
    return (
      <Screen>
        <p className="p-6 text-sm text-zinc-400">Conversación no encontrada.</p>
      </Screen>
    );
  }

  const peer =
    chat.posterId && user.id === chat.posterId
      ? { name: chat.workerName, avatar: chat.workerAvatar, role: "Trabajador" }
      : chat.workerId && user.id === chat.workerId
        ? { name: chat.posterName, avatar: chat.posterAvatar, role: "Cliente" }
        : { name: chat.name, avatar: chat.avatar, role: chat.role };
  const canAgree =
    job?.assignment &&
    (job.publishedBy === user.id || job.assignment.workerId === user.id);

  function send(value) {
    const msg = (value ?? text).trim();
    if (!msg) return;
    sendMessage(chat.id, msg);
    setText("");
  }

  function confirmAgreement(e) {
    e.preventDefault();
    agreeSchedule(job.id, { when, location: place });
  }

  return (
    <Screen scroll={false} className="bg-white">
      <header className="flex items-center gap-2 border-b border-zinc-100 px-3 py-3">
        <button type="button" onClick={() => router.push("/mensajes")} className="p-1" aria-label="Regresar">
          <Icon name="back" size={22} />
        </button>
        <div className="relative">
          <Avatar src={peer.avatar} size={42} alt={peer.name} />
          {chat.online ? (
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-extrabold">{peer.name}</p>
          <p className="text-[11px] text-[#2f80ed]">
            {peer.role} • Trabajo #{chat.jobNumber}
          </p>
        </div>
        <button
          className="grid h-10 w-10 place-items-center rounded-full"
          style={{ background: "#E8F3FF" }}
          onClick={() => showToast("Llamando a " + chat.name + "…")}
          aria-label="Llamar"
        >
          <Icon name="phone" size={18} color="#2f80ed" />
        </button>
        <button className="grid h-10 w-10 place-items-center" onClick={() => setMenu((v) => !v)} aria-label="Más opciones">
          <Icon name="more" size={18} />
        </button>
      </header>

      {menu ? (
        <div className="absolute right-4 top-16 z-40 w-44 rounded-2xl bg-white p-2 shadow-card">
          <button className="w-full rounded-xl px-3 py-2 text-left text-sm" onClick={() => showToast("Conversación silenciada")}>
            Silenciar
          </button>
          <button className="w-full rounded-xl px-3 py-2 text-left text-sm" onClick={() => router.push(`/trabajos/${chat.jobId}`)}>
            Ver trabajo
          </button>
        </div>
      ) : null}

      <div ref={scroller} className="page-scroll min-h-0 flex-1 px-4 pt-3">
        {chat.messages.length === 0 ? (
          <p className="py-10 text-center text-[13px] leading-5 text-zinc-400">
            Escribe lo que quieras. {peer.name.split(" ")[0]} te contesta.
          </p>
        ) : (
          <p className="mb-4 text-center text-[11px] text-zinc-400">Hoy</p>
        )}
        <div className="space-y-4 pb-3">
          {chat.messages.map((m) => {
            if (m.from === "system") {
              return (
                <p key={m.id} className="px-2 text-center text-[12px] leading-5 text-zinc-400">
                  {m.text}
                </p>
              );
            }
            const mine = m.fromUserId ? m.fromUserId === user.id : m.from === "me";
            return (
            <div key={m.id} className={`flex ${mine ? "justify-end" : "items-end gap-2"}`}>
              {!mine ? <Avatar src={peer.avatar} size={28} alt="" /> : null}
              <div className="max-w-[78%]">
                <div className={`px-4 py-3 text-[14px] leading-5 ${mine ? "bubble-out" : "bubble-in"}`}>
                  {m.text}
                </div>
                <p className={`mt-1 text-[10px] text-zinc-400 ${mine ? "text-right" : ""}`}>
                  {m.time}
                  {mine ? " ✓" : ""}
                </p>
              </div>
            </div>
            );
          })}
        </div>
        {canAgree ? (
          <form onSubmit={confirmAgreement} className="mb-3 rounded-[22px] bg-[#f7f8fa] p-3">
            <p className="text-[13px] font-extrabold">Acordar hora y ubicación</p>
            <p className="mt-1 text-[11px] leading-4 text-zinc-400">
              El tiempo de la tarea empieza a esta hora, no al elegir al aplicante.
            </p>
            {job.assignment.agreedAt ? (
              <p className="mt-2 text-[12px] font-semibold text-emerald-600">
                Acordada:{" "}
                {new Date(job.assignment.agreedAt).toLocaleString("es-MX", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
                {job.assignment.exactLocation ? ` · ${job.assignment.exactLocation}` : ""}
              </p>
            ) : null}
            <label className="label mt-3">Fecha y hora</label>
            <div className="field h-11">
              <Icon name="clock" size={16} color="#C0C6D0" />
              <input type="datetime-local" value={when} onChange={(e) => setWhen(e.target.value)} />
            </div>
            <label className="label mt-3">Ubicación exacta</label>
            <div className="field h-11">
              <Icon name="pin" size={16} color="#C0C6D0" />
              <input
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                placeholder="Calle, número, referencias"
              />
            </div>
            <button type="submit" className="btn-primary mt-3 h-11 text-[14px]">
              Confirmar acuerdo
            </button>
          </form>
        ) : null}
      </div>

      <div className="shrink-0 px-4 pb-4">
        <div className="h-scroll no-scrollbar flex gap-2 pb-2">
          {QUICK.map((q) => (
            <button
              key={q.text}
              onClick={() => send(q.text)}
              className="flex shrink-0 items-center gap-1 rounded-full border border-zinc-200 bg-white px-3 py-2 text-[12px] font-semibold text-zinc-600"
            >
              {q.icon ? <Icon name="pin" size={12} color="#2f80ed" /> : null}
              {q.text}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 pt-2">
          <button
            className="grid h-11 w-11 place-items-center rounded-full bg-[#f4f6f8]"
            onClick={() => showToast("Adjuntar archivo (demo)")}
            aria-label="Adjuntar"
          >
            <Icon name="plus" size={18} color="#9aa3b2" />
          </button>
          <div className="field flex-1 h-12">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Escribe un mensaje..."
              onKeyDown={(e) => {
                if (e.key === "Enter") send();
              }}
            />
            <button type="button" onClick={() => setText((t) => t + " 🙂")} aria-label="Emoji">
              <Icon name="emoji" size={18} color="#9aa3b2" />
            </button>
          </div>
          <button
            className="grid h-11 w-11 place-items-center rounded-full"
            style={{ background: "#2f80ed" }}
            onClick={() => send()}
            aria-label="Enviar"
          >
            <Icon name="send" size={16} color="#fff" />
          </button>
        </div>
      </div>
    </Screen>
  );
}
