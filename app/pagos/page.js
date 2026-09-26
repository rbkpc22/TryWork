"use client";

import Link from "next/link";
import { RequireAuth, Screen, TopBar } from "@/components/UI";
import { useApp } from "@/context/AppContext";

export default function PagosListPage() {
  return (
    <RequireAuth>
      <PagosInner />
    </RequireAuth>
  );
}

function PagosInner() {
  const { payments } = useApp();
  return (
    <Screen nav className="bg-[#f7f8fa]">
      <TopBar title="Pagos" />
      <div className="px-5 pb-8">
        {payments.map((p) => (
          <Link
            key={p.id}
            href={`/pagos/${p.id}`}
            className="mb-3 flex items-center justify-between rounded-[24px] bg-white p-4 shadow-soft"
          >
            <div>
              <p className="font-bold">{p.title}</p>
              <p className="text-[12px] text-zinc-400">{p.date}</p>
            </div>
            <p className="font-extrabold">${p.amount.toFixed(2)} MXN</p>
          </Link>
        ))}
      </div>
    </Screen>
  );
}
