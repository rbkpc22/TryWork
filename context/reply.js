export function casualReply(text, { name, jobTitle, location, payLabel }) {
  const t = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const first = (name || "").split(" ")[0] || "oye";

  if (/hora|horario|a las|\d\s*(am|pm|hrs|horas)|manana|tarde|noche|quedamos/.test(t)) {
    return `Va, esa hora me funciona. Nada más pásame la ubicación exacta y ahí estoy.`;
  }
  if (/ubic|direc|donde|mapa|calle|colonia|numero|referencia|roma|condesa/.test(t)) {
    return `Sale, nos vemos en ${location}. Si se complica llegar, me escribes y te marco.`;
  }
  if (/pago|precio|cuanto|cobr|lana|feria/.test(t)) {
    return `A mí me tocan ${payLabel}, ¿no? Con eso estoy, sin rollo.`;
  }
  if (/^(hola|hey|que onda|que tal|buenas|buenos|buen dia)/.test(t.trim())) {
    return `Qué onda, soy ${first}. Lo de “${jobTitle}” sí me late, ¿a qué hora te queda bien?`;
  }
  if (/gracias|sale|va\b|ok|perfecto|listo|dale|jalo/.test(t)) {
    return `Sale, ahí nos vemos. Cualquier cosa me escribes por aquí.`;
  }
  if (t.includes("?")) {
    return `Sí, sin problema. En “${jobTitle}” dime cómo lo quieres y lo armamos.`;
  }
  return `Va, te leí. Lo de “${jobTitle}” lo dejamos así; si falta la hora o el punto exacto, me dices.`;
}
