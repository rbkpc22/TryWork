"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Screen, TopBar } from "@/components/UI";
import { useApp } from "@/context/AppContext";

function MapInner() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from") || "";
  const { showToast } = useApp();
  const [using, setUsing] = useState(false);

  return (
    <Screen>
      <TopBar title="Mapa" />
      <div className="px-4 pb-8">
        <div className="overflow-hidden rounded-[24px] shadow-card" style={{ height: 420 }}>
          <iframe
            title="Mapa"
            className="map-frame"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-99.20%2C19.38%2C-99.08%2C19.48&layer=mapnik&marker=19.4326%2C-99.1332"
          />
        </div>
        <button
          className="btn-primary mt-5"
          onClick={() => {
            setUsing(true);
            showToast("Ubicación seleccionada: Ciudad de México, MX");
            setTimeout(() => router.back(), 400);
          }}
        >
          {using ? "Usando ubicación actual…" : "Usar ubicación actual"}
        </button>
        {from ? (
          <p className="mt-3 text-center text-[12px] text-zinc-400">
            Volverás a {from === "registro" ? "Registro" : "Publicar"}
          </p>
        ) : null}
      </div>
    </Screen>
  );
}

export default function MapaPage() {
  return (
    <Suspense>
      <MapInner />
    </Suspense>
  );
}
