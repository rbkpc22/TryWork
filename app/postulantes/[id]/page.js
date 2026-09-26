"use client";

import { useParams } from "next/navigation";
import { Icon } from "@/components/Icons";
import { Avatar, RequireAuth, Screen, TopBar } from "@/components/UI";
import { useApp } from "@/context/AppContext";

export default function PostulantePage() {
  return (
    <RequireAuth>
      <PostulanteInner />
    </RequireAuth>
  );
}

function PostulanteInner() {
  const { id } = useParams();
  const { profileOf } = useApp();
  const person = profileOf(id);

  if (!person) {
    return (
      <Screen nav>
        <TopBar title="Perfil" />
        <p className="px-6 text-sm text-zinc-400">No encontramos este perfil.</p>
      </Screen>
    );
  }

  const reviews = person.reviewsList || [];

  return (
    <Screen nav className="bg-[#f7f8fa]">
      <TopBar title="Perfil del postulante" />
      <div className="px-5 pb-8">
        <div className="flex flex-col items-center pt-2 text-center">
          <Avatar src={person.avatar} size={108} alt={person.name} />
          <h2 className="mt-3 text-[22px] font-extrabold">{person.name}</h2>
          <p className="text-[13px] text-zinc-400">{person.profession}</p>
          {person.location ? (
            <p className="mt-1 flex items-center gap-1 text-[12px] text-zinc-400">
              <Icon name="pin" size={12} color="#c0c6d0" /> {person.location}
            </p>
          ) : null}
        </div>

        <div className="mt-5 rounded-[22px] bg-white py-4 text-center shadow-soft">
          <p className="flex items-center justify-center gap-1 text-[22px] font-extrabold">
            <Icon name="star" size={16} color="#FF8A00" />
            {Number(person.rating || 0).toFixed(1)}
          </p>
          <p className="text-[12px] text-zinc-400">{reviews.length} reseñas</p>
        </div>

        <section className="mt-6">
          <h3 className="mb-3 font-extrabold">Reseñas</h3>
          {reviews.length === 0 ? (
            <p className="rounded-[24px] bg-white p-4 text-[14px] text-zinc-400 shadow-soft">
              Aún no tiene reseñas.
            </p>
          ) : (
            <div className="space-y-3">
              {reviews.map((review) => (
                <article key={review.id} className="rounded-[24px] bg-white p-4 shadow-soft">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold">{review.job}</p>
                      <p className="text-[12px] text-zinc-400">De {review.author}</p>
                    </div>
                    <span className="text-[11px] text-zinc-400">{review.date}</span>
                  </div>
                  <p className="mt-2 flex items-center gap-1 text-[13px]">
                    <Icon name="star" size={13} color="#FF8A00" />
                    {Number(review.rating).toFixed(1)}
                    <span className="text-zinc-500">“{review.comment}”</span>
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </Screen>
  );
}
