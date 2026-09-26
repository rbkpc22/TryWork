"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { casualReply } from "@/context/reply";
import {
  BOOST_MS,
  DEMO_USER,
  DEMO_WORKERS,
  money,
  INITIAL_CONVERSATIONS,
  INITIAL_HISTORY,
  INITIAL_JOBS,
  INITIAL_NOTIFICATIONS,
  INITIAL_PAYMENTS,
} from "@/data/seed";

const KEY = "trywork-state-v3";
const AppContext = createContext(null);

const initialState = {
  users: [DEMO_USER],
  session: null,
  jobs: INITIAL_JOBS,
  accepted: [],
  conversations: INITIAL_CONVERSATIONS,
  notifications: INITIAL_NOTIFICATIONS,
  payments: INITIAL_PAYMENTS,
  history: INITIAL_HISTORY,
  termsAccepted: false,
};

function nowTime() {
  return new Date().toLocaleTimeString("es-MX", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function AppProvider({ children }) {
  const [state, setState] = useState(initialState);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setState({ ...initialState, ...parsed });
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(KEY, JSON.stringify(state));
  }, [state, hydrated]);

  useEffect(() => {
    if (!hydrated || !state.session) return;
    const timer = setInterval(() => {
      let arrived = null;
      setState((current) => {
        if (!current.session) return current;
        const now = Date.now();
        const notes = [];
        let changed = false;
        const jobs = current.jobs.map((job) => {
          if (job.publishedBy !== current.session || job.assignment) return job;
          if (!job.nextApplicantAt || now < job.nextApplicantAt) return job;
          const taken = new Set((job.applicants || []).map((a) => a.userId));
          const next = DEMO_WORKERS.find((w) => !taken.has(w.userId));
          if (!next) {
            if (!job.nextApplicantAt) return job;
            changed = true;
            return { ...job, nextApplicantAt: null };
          }
          changed = true;
          const applicant = {
            userId: next.userId,
            name: next.name,
            avatar: next.avatar,
            rating: next.rating,
            profession: next.profession,
            status: "pendiente",
            appliedAt: now,
          };
          notes.push({
            id: `n-${now}-${next.userId}`,
            title: "Nueva postulación",
            body: `${next.name} se postuló a tu trabajo “${job.title}”.`,
            time: "Ahora",
            read: false,
            href: `/trabajos/${job.id}`,
            forUser: current.session,
          });
          arrived = `${next.name} se postuló a “${job.title}”`;
          const more = DEMO_WORKERS.some(
            (w) => w.userId !== next.userId && !taken.has(w.userId)
          );
          return {
            ...job,
            applicants: [...(job.applicants || []), applicant],
            interested: (job.applicants || []).length + 1,
            nextApplicantAt: more ? now + 18000 : null,
          };
        });
        if (!changed) return current;
        return {
          ...current,
          jobs,
          notifications: [...notes, ...current.notifications],
        };
      });
      if (arrived) showToast(arrived);
    }, 2000);
    return () => clearInterval(timer);
  }, [hydrated, state.session]);

  function showToast(message) {
    setToast(message);
    setTimeout(() => setToast(null), 2600);
  }

  const user = useMemo(() => {
    if (!state.session) return null;
    return state.users.find((u) => u.id === state.session) || null;
  }, [state.session, state.users]);

  const notifications = useMemo(
    () =>
      state.notifications.filter(
        (n) => !n.forUser || n.forUser === state.session
      ),
    [state.notifications, state.session]
  );

  const api = {
    hydrated,
    user,
    jobs: state.jobs,
    accepted: state.accepted,
    conversations: state.conversations,
    notifications,
    payments: state.payments,
    history: state.history,
    termsAccepted: state.termsAccepted,
    toast,
    showToast,
    setTermsAccepted(value) {
      setState((s) => ({ ...s, termsAccepted: value }));
    },
    register(data) {
      const exists = state.users.some(
        (u) => u.email.toLowerCase() === data.email.toLowerCase()
      );
      if (exists) {
        showToast("Ese correo ya está registrado");
        return false;
      }
      const id = `user-${Date.now()}`;
      const newUser = {
        ...DEMO_USER,
        ...data,
        id,
        reviews: 0,
        reviewsList: [],
        rating: 5,
        completedPct: 100,
        verified: false,
        history: [],
      };
      setState((s) => ({
        ...s,
        users: [...s.users, newUser],
        session: id,
      }));
      showToast("Cuenta creada correctamente");
      return true;
    },
    login(identifier, password) {
      const found = state.users.find(
        (u) =>
          (u.email.toLowerCase() === identifier.toLowerCase() ||
            u.phone === identifier) &&
          u.password === password
      );
      if (!found) {
        showToast("Correo, teléfono o contraseña incorrectos");
        return false;
      }
      setState((s) => ({ ...s, session: found.id }));
      return true;
    },
    logout() {
      setState((s) => ({ ...s, session: null }));
    },
    updateProfile(patch) {
      if (!state.session) return;
      setState((s) => ({
        ...s,
        users: s.users.map((u) =>
          u.id === s.session ? { ...u, ...patch } : u
        ),
      }));
      showToast("Perfil actualizado");
    },
    publishJob(job) {
      const id = `job-${Date.now()}`;
      const pay = Number(job.pay) || 0;
      const fee = Math.round(pay * 0.1 * 100) / 100;
      const total = Math.round((pay + fee) * 100) / 100;
      const newJob = {
        ...job,
        id,
        pay,
        fee,
        total,
        payLabel: job.payLabel || money(pay),
        boosted: false,
        boostedAt: null,
        boostedUntil: null,
        interested: 0,
        publishedBy: state.session,
        applicants: [],
        assignment: null,
        nextApplicantAt: Date.now() + 10000,
        client: {
          name: user?.name || "Tú",
          rating: user?.rating || 5,
          avatar: user?.avatar,
        },
      };
      setState((s) => ({
        ...s,
        jobs: [newJob, ...s.jobs],
        notifications: [
          {
            id: `n-${Date.now()}-pub`,
            title: "Oferta publicada",
            body: `${job.title} ya es visible. Tú pagas ${money(total)} (incluye comisión del 10%).`,
            time: "Ahora",
            read: false,
            href: `/trabajos/${id}`,
            forUser: state.session,
          },
          ...s.notifications,
        ],
      }));
      showToast("¡Oferta publicada correctamente!");
      return id;
    },
    applyToJob(jobId) {
      const job = state.jobs.find((j) => j.id === jobId);
      if (!job || !user) return false;
      if (job.publishedBy === state.session) {
        showToast("No puedes aplicar a tu propia oferta");
        return false;
      }
      if (job.assignment) {
        showToast("Esta oferta ya tiene a alguien elegido");
        return false;
      }
      if ((job.applicants || []).some((a) => a.userId === state.session)) {
        showToast("Ya enviaste tu solicitud");
        return false;
      }
      const applicant = {
        userId: user.id,
        name: user.name,
        avatar: user.avatar,
        rating: user.rating,
        profession: user.profession,
        status: "pendiente",
        appliedAt: Date.now(),
      };
      setState((s) => ({
        ...s,
        jobs: s.jobs.map((j) =>
          j.id === jobId
            ? {
                ...j,
                applicants: [...(j.applicants || []), applicant],
                interested: (j.applicants || []).length + 1,
              }
            : j
        ),
        notifications: [
          {
            id: `n-${Date.now()}`,
            title: "Nueva postulación",
            body: `${user.name} se postuló a tu trabajo “${job.title}”.`,
            time: "Ahora",
            read: false,
            href: `/trabajos/${jobId}`,
            forUser: job.publishedBy,
          },
          {
            id: `n-${Date.now()}-me`,
            title: "Solicitud enviada",
            body: `Tu solicitud para “${job.title}” está en revisión.`,
            time: "Ahora",
            read: false,
            href: `/trabajos/${jobId}`,
            forUser: state.session,
          },
          ...s.notifications,
        ],
      }));
      showToast("Solicitud enviada. El empleador decidirá.");
      return true;
    },
    boostJob(jobId) {
      const job = state.jobs.find((j) => j.id === jobId);
      if (!job || job.publishedBy !== state.session) {
        showToast("Solo puedes destacar tus propias ofertas");
        return false;
      }
      if (job.boostedUntil && job.boostedUntil > Date.now()) {
        showToast("Esta oferta ya tiene la membresía");
        return false;
      }
      const boostPrice = Math.round((Number(job.pay) || 0) * 0.2 * 100) / 100;
      const until = Date.now() + BOOST_MS;
      setState((s) => ({
        ...s,
        jobs: s.jobs.map((j) =>
          j.id === jobId
            ? { ...j, boosted: true, boostedAt: Date.now(), boostedUntil: until, boostPrice }
            : j
        ),
        notifications: [
          {
            id: `n-${Date.now()}`,
            title: "Membresía activa",
            body: `“${job.title}” quedó hasta arriba por 24 horas. Pagaste ${money(boostPrice)} (20%).`,
            time: "Ahora",
            read: false,
            href: "/explorar",
            forUser: state.session,
          },
          ...s.notifications,
        ],
      }));
      showToast("Membresía activa. Tu oferta quedó hasta arriba.");
      return true;
    },
    profileOf(userId) {
      const found = state.users.find((u) => u.id === userId);
      if (found) {
        return {
          id: found.id,
          name: found.name,
          avatar: found.avatar,
          profession: found.profession,
          location: found.location,
          rating: found.rating,
          reviews: found.reviewsList?.length || found.reviews || 0,
          specialties: found.specialties || [],
          reviewsList: found.reviewsList || [],
        };
      }
      const demo = DEMO_WORKERS.find((w) => w.userId === userId);
      if (!demo) return null;
      return {
        id: demo.userId,
        name: demo.name,
        avatar: demo.avatar,
        profession: demo.profession,
        location: "Ciudad de México, MX",
        rating: demo.rating,
        reviews: demo.reviewsList?.length || 0,
        specialties: demo.profession ? [demo.profession] : [],
        reviewsList: demo.reviewsList || [],
      };
    },
    hireApplicant(jobId, workerUserId) {
      const job = state.jobs.find((j) => j.id === jobId);
      if (!job || job.publishedBy !== state.session) {
        showToast("Solo quien publicó la oferta puede elegir");
        return null;
      }
      const applicant = (job.applicants || []).find((a) => a.userId === workerUserId);
      if (!applicant) return null;
      if (job.assignment) {
        showToast("Ya elegiste a alguien para esta oferta");
        return job.assignment.chatId;
      }
      const chatId = `chat-${jobId}-${workerUserId}`;
      const conv = {
        id: chatId,
        jobId,
        jobNumber: String(800 + state.conversations.length),
        posterId: state.session,
        workerId: applicant.userId,
        posterName: user?.name || "Empleador",
        posterAvatar: user?.avatar,
        workerName: applicant.name,
        workerAvatar: applicant.avatar,
        name: applicant.name,
        role: "Trabajador",
        online: true,
        avatar: applicant.avatar,
        lastMessage: "",
        time: "",
        unread: 0,
        messages: [],
      };
      setState((s) => ({
        ...s,
        conversations: [conv, ...s.conversations],
        jobs: s.jobs.map((j) =>
          j.id === jobId
            ? {
                ...j,
                applicants: (j.applicants || []).map((a) => ({
                  ...a,
                  status: a.userId === workerUserId ? "elegido" : "descartado",
                })),
                assignment: {
                  workerId: applicant.userId,
                  workerName: applicant.name,
                  workerAvatar: applicant.avatar,
                  chatId,
                  agreedAt: null,
                  exactLocation: "",
                },
              }
            : j
        ),
        notifications: [
          {
            id: `n-${Date.now()}`,
            title: "Te eligieron",
            body: `${user?.name || "El empleador"} te eligió para “${job.title}”. Acuerden la hora en el chat.`,
            time: "Ahora",
            read: false,
            href: `/mensajes/${chatId}`,
            forUser: applicant.userId,
          },
          {
            id: `n-${Date.now()}-ok`,
            title: "Aplicante elegido",
            body: `Elegiste a ${applicant.name} para “${job.title}”.`,
            time: "Ahora",
            read: false,
            href: `/mensajes/${chatId}`,
            forUser: state.session,
          },
          ...s.notifications,
        ],
      }));
      showToast(`Elegiste a ${applicant.name}. Ya pueden acordar la hora.`);
      return chatId;
    },
    agreeSchedule(jobId, { when, location }) {
      const job = state.jobs.find((j) => j.id === jobId);
      if (!job?.assignment) {
        showToast("Primero hay que elegir a un aplicante");
        return false;
      }
      const involved =
        job.publishedBy === state.session || job.assignment.workerId === state.session;
      if (!involved) {
        showToast("Solo quienes participan pueden acordar la hora");
        return false;
      }
      const at = new Date(when).getTime();
      if (!when || Number.isNaN(at)) {
        showToast("Elige una fecha y hora");
        return false;
      }
      const place = String(location || "").trim();
      if (!place) {
        showToast("Escribe la ubicación exacta");
        return false;
      }
      const label = new Date(at).toLocaleString("es-MX", {
        dateStyle: "medium",
        timeStyle: "short",
      });
      const text = `Quedamos el ${label}. Ubicación exacta: ${place}. El tiempo de la tarea empezará a esa hora.`;
      const otherId =
        state.session === job.publishedBy ? job.assignment.workerId : job.publishedBy;
      const time = nowTime();
      setState((s) => ({
        ...s,
        jobs: s.jobs.map((j) =>
          j.id === jobId
            ? {
                ...j,
                assignment: {
                  ...j.assignment,
                  agreedAt: at,
                  exactLocation: place,
                },
              }
            : j
        ),
        conversations: s.conversations.map((c) =>
          c.id === job.assignment.chatId
            ? {
                ...c,
                lastMessage: text,
                time,
                messages: [
                  ...c.messages,
                  {
                    id: `m-${Date.now()}`,
                    fromUserId: state.session,
                    from: "me",
                    text,
                    time,
                  },
                ],
              }
            : c
        ),
        notifications: [
          {
            id: `n-${Date.now()}`,
            title: "Hora acordada",
            body: `${job.title}: ${label}. ${place}`,
            time: "Ahora",
            read: false,
            href: `/seguimiento/${jobId}`,
            forUser: otherId,
          },
          ...s.notifications,
        ],
      }));
      showToast("Hora y ubicación confirmadas");
      return true;
    },
    sendMessage(chatId, text) {
      const time = nowTime();
      const userMsgId = `m-${Date.now()}`;
      const chat = state.conversations.find((c) => c.id === chatId);
      const job = state.jobs.find((j) => j.id === chat?.jobId);
      const mineIsPoster = chat && state.session === chat.posterId;
      const otherId = mineIsPoster ? chat.workerId : chat?.posterId;
      const otherName = mineIsPoster ? chat.workerName : chat?.posterName || chat?.name;
      const reply = otherName
        ? casualReply(text, {
            name: otherName,
            jobTitle: job?.title || "el trabajo",
            location: job?.assignment?.exactLocation || job?.location || "el punto que marques",
            payLabel: job?.payLabel || "lo acordado",
          })
        : null;
      setState((s) => ({
        ...s,
        conversations: s.conversations.map((c) =>
          c.id === chatId
            ? {
                ...c,
                lastMessage: text,
                time,
                unread: 0,
                messages: [
                  ...c.messages,
                  {
                    id: userMsgId,
                    from: "me",
                    fromUserId: s.session,
                    text,
                    time,
                  },
                ],
              }
            : c
        ),
      }));
      if (!reply) return;
      window.setTimeout(() => {
        const replyTime = nowTime();
        setState((s) => ({
          ...s,
          conversations: s.conversations.map((c) => {
            if (c.id !== chatId) return c;
            const idx = c.messages.findIndex((m) => m.id === userMsgId);
            if (idx < 0) return c;
            const newer = c.messages
              .slice(idx + 1)
              .some((m) => m.fromUserId === s.session);
            if (newer) return c;
            return {
              ...c,
              lastMessage: reply,
              time: replyTime,
              messages: [
                ...c.messages,
                {
                  id: `${userMsgId}-r`,
                  from: "them",
                  fromUserId: otherId || "ai",
                  text: reply,
                  time: replyTime,
                },
              ],
            };
          }),
        }));
      }, 900 + Math.floor(Math.random() * 700));
    },
    ensureChatForJob(job) {
      if (job.assignment?.chatId) return job.assignment.chatId;
      const existing = state.conversations.find((c) => c.jobId === job.id);
      if (existing) return existing.id;
      return null;
    },
    markNotificationsRead() {
      setState((s) => ({
        ...s,
        notifications: s.notifications.map((n) =>
          !n.forUser || n.forUser === s.session ? { ...n, read: true } : n
        ),
      }));
    },
    addPaymentMethod(method) {
      setState((s) => ({
        ...s,
        users: s.users.map((u) =>
          u.id === s.session
            ? { ...u, paymentMethods: [...(u.paymentMethods || []), method] }
            : u
        ),
      }));
      showToast("Método de cobro agregado");
    },
    ratePayment(paymentId, rating, comment) {
      setState((s) => ({
        ...s,
        payments: s.payments.map((p) =>
          p.id === paymentId ? { ...p, rated: true, rating, comment } : p
        ),
        notifications: [
          {
            id: `n-${Date.now()}`,
            title: "Calificación enviada",
            body: `Gracias por calificar con ${rating} estrellas.`,
            time: "Ahora",
            read: false,
            href: "/pagos",
          },
          ...s.notifications,
        ],
      }));
      showToast("Calificación enviada");
    },
    reportPayment(paymentId) {
      setState((s) => ({
        ...s,
        notifications: [
          {
            id: `n-${Date.now()}`,
            title: "Reporte de pago",
            body: `Recibimos tu reporte del pago ${paymentId}.`,
            time: "Ahora",
            read: false,
            href: "/pagos",
          },
          ...s.notifications,
        ],
      }));
      showToast("Reporte enviado. Te contactaremos pronto.");
    },
    triggerSos() {
      setState((s) => ({
        ...s,
        notifications: [
          {
            id: `n-${Date.now()}`,
            title: "Alerta SOS enviada",
            body: "Se notificó a contactos de emergencia y a TRYWORK.",
            time: "Ahora",
            read: false,
            href: "/notificaciones",
          },
          ...s.notifications,
        ],
      }));
      showToast("Alerta SOS enviada");
    },
  };

  return <AppContext.Provider value={api}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
