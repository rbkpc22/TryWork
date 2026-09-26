export const DEMO_WORKERS = [
  {
    userId: "worker-carlos",
    name: "Carlos Rodríguez",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    rating: 4.8,
    profession: "Carpintero & Electricista",
    reviewsList: [
      {
        id: "rv-c1",
        author: "Ana García",
        job: "Reparación de Muebles",
        rating: 5,
        comment: "Excelente trabajo, muy rápido y dejó todo limpio.",
        date: "12 sep 2026",
      },
      {
        id: "rv-c2",
        author: "Oficina Central",
        job: "Instalación Eléctrica",
        rating: 4.5,
        comment: "Llegó puntual y dejó los contactos funcionando.",
        date: "2 sep 2026",
      },
      {
        id: "rv-c3",
        author: "Sofía Ruiz",
        job: "Pintura de recámara",
        rating: 4.8,
        comment: "Muy cuidadoso con los muebles. Lo recomiendo.",
        date: "20 ago 2026",
      },
    ],
  },
  {
    userId: "worker-maria",
    name: "María López",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    rating: 4.9,
    profession: "Cuidado de mascotas",
    reviewsList: [
      {
        id: "rv-m1",
        author: "Juan Pérez",
        job: "Paseo de mascotas",
        rating: 5,
        comment: "Trató muy bien a los perros y mandó fotos del paseo.",
        date: "8 sep 2026",
      },
      {
        id: "rv-m2",
        author: "Luis Hernández",
        job: "Cuidado de gato",
        rating: 4.7,
        comment: "Responsable y puntual. El gato quedó tranquilo.",
        date: "28 ago 2026",
      },
    ],
  },
  {
    userId: "worker-luis",
    name: "Luis Hernández",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    rating: 4.6,
    profession: "Logística",
    reviewsList: [
      {
        id: "rv-l1",
        author: "Bodegas del Norte",
        job: "Organizar bodega",
        rating: 4.6,
        comment: "Acomodó el inventario con orden y sin romper cajas.",
        date: "15 sep 2026",
      },
    ],
  },
];

export const CATEGORIES = [
  { id: "todo", label: "Todo", icon: "grid" },
  { id: "mascotas", label: "Mascotas", icon: "paw" },
  { id: "ventas", label: "Ventas", icon: "bag" },
  { id: "logistica", label: "Logística", icon: "box" },
  { id: "limpieza", label: "Limpieza", icon: "spark" },
  { id: "reparaciones", label: "Reparaciones", icon: "wrench" },
  { id: "otros", label: "Otros", icon: "dots" },
];

export const INITIAL_JOBS = [
  {
    id: "job-1",
    title: "Paseador de perros",
    category: "mascotas",
    categoryLabel: "Mascotas",
    pay: 280,
    payLabel: "$280 MXN/hr",
    duration: "2 horas",
    location: "Parque Central, Zona 10",
    image:
      "https://images.unsplash.com/photo-1444212477490-ca407925329e?auto=format&fit=crop&w=1200&q=80",
    client: {
      name: "María López",
      rating: 4.9,
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    },
    interested: 1,
    description:
      "Necesito a alguien responsable para pasear a dos perros medianos en Parque Central. Deben llevar agua y seguir la ruta habitual del parque.",
    requirements: ["Experiencia con mascotas", "Puntualidad", "Identificación oficial"],
    datetime: "Hoy, 16:00",
    publishedBy: "demo-client",
  },
  {
    id: "job-2",
    title: "Ayuda en Mercado",
    category: "ventas",
    categoryLabel: "Ventas",
    pay: 220,
    payLabel: "$220 MXN/hr",
    duration: "4 horas",
    location: "Mercado San José, Puesto 45",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
    client: {
      name: "Ana García",
      rating: 4.7,
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    },
    interested: 0,
    description:
      "Apoyo para acomodar verduras, atender clientes y mantener el puesto limpio durante la jornada de la tarde.",
    requirements: ["Disponibilidad inmediata", "Actitud de servicio"],
    datetime: "Hoy, 13:00",
    publishedBy: "demo-client",
  },
  {
    id: "job-3",
    title: "Organizar Bodega",
    category: "logistica",
    categoryLabel: "Logística",
    pay: 330,
    payLabel: "$330 MXN/hr",
    duration: "5 horas",
    location: "Bodegas del Norte, Nave 3",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    client: {
      name: "Luis Hernández",
      rating: 4.8,
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    },
    interested: 2,
    description:
      "Clasificar cajas, etiquetar inventario y reorganizar pasillos de la nave 3. Se proporciona equipo de seguridad.",
    requirements: ["Fuerza física moderada", "Disponibilidad de 5 horas"],
    datetime: "Mañana, 09:00",
    publishedBy: "demo-client",
  },
  {
    id: "job-4",
    title: "Limpieza de departamento",
    category: "limpieza",
    categoryLabel: "Limpieza",
    pay: 250,
    payLabel: "$250 MXN/hr",
    duration: "3 horas",
    location: "Roma Norte, CDMX",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
    client: {
      name: "Sofía Ruiz",
      rating: 5.0,
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    },
    interested: 3,
    description:
      "Limpieza profunda de un departamento de 2 recámaras: cocina, baños y pisos.",
    requirements: ["Productos incluidos", "Experiencia en limpieza residencial"],
    datetime: "Sábado, 10:00",
    publishedBy: "demo-client",
  },
  {
    id: "job-5",
    title: "Reparación de Silla",
    category: "reparaciones",
    categoryLabel: "Reparaciones",
    pay: 850,
    payLabel: "$850 MXN",
    duration: "1.5 horas",
    location: "Condesa, CDMX",
    image:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80",
    client: {
      name: "Juan Pérez",
      rating: 4.6,
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    },
    interested: 1,
    description:
      "Reparar una silla de madera con pata suelta y lijar el asiento. Materiales básicos incluidos.",
    requirements: ["Herramientas propias", "Experiencia en carpintería"],
    datetime: "Hoy, 14:30",
    publishedBy: "demo-client",
  },
  {
    id: "job-6",
    title: "Ayudante de Mudanza",
    category: "logistica",
    categoryLabel: "Logística",
    pay: 450,
    payLabel: "$450.00 MXN",
    duration: "3 horas",
    location: "Tlaltelolco, CDMX",
    image:
      "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&w=1200&q=80",
    client: {
      name: "Juan Pérez",
      rating: 4.6,
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    },
    interested: 2,
    description:
      "Mudanza pequeña de departamento. Cargar cajas y muebles ligeros hacia el camión.",
    requirements: ["Puntualidad", "Disponibilidad para cargar"],
    datetime: "Hoy, 14:00",
    publishedBy: "demo-client",
  },
];

export const DEMO_USER = {
  id: "user-demo",
  name: "Alex Morgan",
  profession: "Carpintero & Electricista",
  age: "28",
  phone: "5512345678",
  email: "alex@trywork.com",
  password: "123456",
  location: "Ciudad de México, MX",
  avatar:
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
  rating: 4.8,
  reviews: 124,
  completedPct: 98,
  rate: 650,
  verified: true,
  specialties: ["Carpintería", "Electricidad", "Reparaciones", "Pintura"],
  paymentMethods: [
    { id: "pm-1", type: "card", label: "Visa •••• 4242", subtitle: "Predeterminado" },
    { id: "pm-2", type: "bank", label: "CLABE •••• 9821", subtitle: "BBVA México" },
  ],
  reviewsList: [
    {
      id: "rv-a1",
      author: "Ana García",
      job: "Reparación de Muebles",
      rating: 5,
      comment: "Excelente trabajo, muy rápido.",
      date: "12 sep 2026",
    },
    {
      id: "rv-a2",
      author: "Oficina Central",
      job: "Instalación Eléctrica",
      rating: 4.5,
      comment: "Dejó la instalación lista el mismo día.",
      date: "2 sep 2026",
    },
  ],
};

export function money(amount) {
  const n = Number(amount) || 0;
  return `$${n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`;
}

export const BOOST_MS = 24 * 60 * 60 * 1000;

export function boostActive(job, now = Date.now()) {
  return Boolean(job?.boostedUntil && job.boostedUntil > now);
}

export function formatBoostLeft(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

export const INITIAL_HISTORY = [
  {
    id: "hist-1",
    title: "Reparación de Muebles",
    client: "Ana García",
    duration: "4 horas",
    status: "Completado",
    rating: 5.0,
    comment: "Excelente trabajo, muy rápido.",
    icon: "sofa",
  },
  {
    id: "hist-2",
    title: "Instalación Eléctrica",
    client: "Oficina Central",
    duration: "2 días",
    status: "Completado",
    rating: 4.5,
    comment: "",
    icon: "bolt",
  },
];

export const INITIAL_CONVERSATIONS = [];

export const INITIAL_PAYMENTS = [
  {
    id: "pay-1",
    jobId: "job-5",
    title: "Reparación de Silla",
    date: "Hoy, 14:30 PM",
    amount: 850,
    method: "Tarjeta Digital •••• 4242",
    transactionId: "#TR9928310X",
    status: "Completado",
    image:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=200&q=80",
    rated: false,
  },
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "n1",
    title: "Nuevo trabajo cerca",
    body: "Hay un trabajo de logística a 1.2 km.",
    time: "Hace 4 min",
    read: false,
    href: "/explorar",
  },
];
