"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Icon } from "@/components/Icons";
import { RequireAuth, Screen, TopBar } from "@/components/UI";
import { useApp } from "@/context/AppContext";

export default function PagoConfirmadoPage() {
  return (
    <RequireAuth>
      <PagoInner />
    </RequireAuth>
  );
}

function PagoInner() {
  const { id } = useParams();
  const { payments, reportPayment, showToast } = useApp();
  const pay = payments.find((p) => p.id === id) || payments[0];

  if (!pay) {
    return (
      <Screen nav>
        <TopBar title="Confirmación" />
        <p className="px-6 text-sm text-zinc-400">No hay pagos aún.</p>
      </Screen>
    );
  }

  return (
    <Screen nav>
      <TopBar title="Confirmación" />
      <div className="px-5 pb-8 text-center">
        <div className="mx-auto mt-4 grid h-[88px] w-[88px] place-items-center rounded-full bg-emerald-50">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-emerald-500 text-white shadow-[0_10px_24px_rgba(34,197,94,.35)]">
            <Icon name="check" size={34} color="#fff" stroke={2.6} />
          </div>
        </div>
        <h2 className="mt-4 text-[26px] font-extrabold">Pago Confirmado</h2>
        <p className="mx-auto mt-2 max-w-[280px] text-[14px] leading-5 text-zinc-400">
          La transacción se completó con éxito. El trabajador ha recibido la
          notificación.
        </p>

        <div className="mt-6 rounded-[28px] bg-[#f7f8fa] p-4 text-left">
          <div className="flex items-center gap-3">
            <img src={pay.image} alt="" className="h-12 w-12 rounded-full object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-extrabold">{pay.title}</p>
              <p className="text-[12px] text-zinc-400">{pay.date}</p>
            </div>
            <p className="font-extrabold text-[#2f80ed]">${pay.amount.toFixed(2)}</p>
          </div>
          <div className="mt-4 space-y-2 text-[13px]">
            <Row label="Método de Pago" value={pay.method} icon />
            <Row label="ID Transacción" value={pay.transactionId} />
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Estado</span>
              <span className="rounded-full bg-emerald-50 px-2 py-1 text-[12px] font-bold text-emerald-600">
                {pay.status}
              </span>
            </div>
          </div>
        </div>

        <button
          className="mt-4 flex w-full items-center justify-between rounded-[24px] bg-white px-4 py-4 shadow-soft"
          onClick={() => showToast("Recibo PDF (128 kb) descargado")}
        >
          <span className="flex items-center gap-3 text-left">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#eef4ff]">
              <Icon name="file" size={18} color="#2f80ed" />
            </span>
            <span>
              <span className="block font-bold">Descargar Recibo</span>
              <span className="text-[12px] text-zinc-400">PDF, 128kb</span>
            </span>
          </span>
          <Icon name="chevron" size={18} color="#c0c6d0" />
        </button>

        <button
          className="mt-4 flex w-full items-center justify-center gap-2 text-[13px] text-zinc-400"
          onClick={() => reportPayment(pay.id)}
        >
          <Icon name="alert" size={14} color="#f59e0b" />
          Reportar un problema con este pago
        </button>

        <Link href={`/calificar/${pay.id}`} className="btn-blue mt-8">
          Calificar Trabajador
        </Link>
      </div>
    </Screen>
  );
}

function Row({ label, value, icon }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-zinc-400">{label}</span>
      <span className="flex items-center gap-1 font-semibold">
        {icon ? <Icon name="card" size={14} /> : null}
        {value}
      </span>
    </div>
  );
}
