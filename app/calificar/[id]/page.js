"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/Icons";
import { RequireAuth, Screen, TopBar } from "@/components/UI";
import { useApp } from "@/context/AppContext";

export default function CalificarPage() {
  return (
    <RequireAuth>
      <CalificarInner />
    </RequireAuth>
  );
}

function CalificarInner() {
  const { id } = useParams();
  const router = useRouter();
  const { payments, ratePayment, showToast } = useApp();
  const pay = payments.find((p) => p.id === id) || payments[0];
  const [stars, setStars] = useState(5);
  const [comment, setComment] = useState("");

  return (
    <Screen nav>
      <TopBar title="Calificar Trabajador" />
      <form
        className="px-6 pb-8 text-center"
        onSubmit={(e) => {
          e.preventDefault();
          if (!pay) return;
          if (pay.rated) {
            showToast("Este trabajo ya fue calificado");
            return;
          }
          ratePayment(pay.id, stars, comment);
          router.push(`/pagos/${pay.id}`);
        }}
      >
        <img src={pay?.image} alt="" className="mx-auto h-16 w-16 rounded-full object-cover" />
        <h2 className="mt-3 text-[20px] font-extrabold">{pay?.title}</h2>
        <p className="text-[13px] text-zinc-400">¿Cómo fue el trabajo?</p>
        <div className="mt-4 flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button type="button" key={n} onClick={() => setStars(n)} aria-label={`${n} estrellas`}>
              <Icon name="star" size={28} color={n <= stars ? "#FF8A00" : "#e5e7eb"} />
            </button>
          ))}
        </div>
        <div className="field textarea mt-6 text-left">
          <textarea
            placeholder="Escribe un comentario (opcional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button className="btn-primary mt-6" type="submit">
          Enviar calificación
        </button>
      </form>
    </Screen>
  );
}
