/**
 * Spanish versions of the industry templates used by bilingual previews.
 * Look (palette, fonts, sections) comes from the English template; only the words change here.
 * Español latinoamericano neutral, de "usted" en las preguntas, sencillo y cálido.
 */
import type { Industry, IndustryKey } from "@/components/industry/types";
import { INDUSTRIES } from "./industries";

type Words = Omit<Industry, "key" | "label" | "font" | "upper" | "palette" | "hero" | "radius" | "sections"> & { label: string };

const ES: Partial<Record<IndustryKey, Words>> = {
  barber: {
    label: "Barbería",
    eyebrow: "Barbería", headline: "Cortes frescos. Líneas perfectas.", sub: "Fades, barba y cortes clásicos en {city}. Venga sin cita o llame antes.",
    cta: "Reserve su corte", cta2: "Ver servicios",
    trust: [{ icon: "scissors", text: "Fades y barba" }, { icon: "clock", text: "Sin cita" }],
    servicesKicker: "El menú", servicesTitle: "Cortes y servicios", servicesStyle: "list",
    services: [
      { name: "Corte", desc: "Cortes clásicos a su gusto." },
      { name: "Fade", desc: "Bajo, medio o alto, bien degradado." },
      { name: "Corte + Barba", desc: "Corte completo con barba y perfilado." },
      { name: "Barba y Perfilado", desc: "Líneas limpias entre cortes." },
      { name: "Corte de Niño", desc: "Barberos con paciencia para los pequeños." },
      { name: "Afeitado con Toalla Caliente", desc: "Un acabado clásico y suave." },
    ],
    galleryTitle: "Recién salidos de la silla", aboutTitle: "Más que un corte.", about: "{name} es una barbería de barrio en {city} — buenos cortes y buena conversación. {ratingLine}",
    faq: [
      { q: "¿Atienden sin cita?", a: "Sí, cuando hay una silla libre. Llame antes para no esperar." },
      { q: "¿Cortan a niños?", a: "Sí — traiga a los pequeños." },
      { q: "¿Cuánto dura un corte?", a: "La mayoría toma de 30 a 45 minutos. Corte y barba toma un poco más." },
    ],
    finalTitle: "Su silla lo espera.", finalSub: "Llame antes o venga sin cita — estamos en {city}.",
  },
  salon: {
    label: "Salón de Belleza",
    eyebrow: "Salón de Belleza", headline: "Un cabello que le encantará lucir.", sub: "Cortes, color y peinados en {city}. Haga su cita y salga sintiéndose usted.",
    cta: "Haga su cita", cta2: "Nuestros servicios",
    trust: [{ icon: "heart", text: "Color y peinados" }, { icon: "calendar", text: "Con cita" }],
    servicesKicker: "Servicios", servicesTitle: "Corte, color y cuidado", servicesStyle: "photoCards",
    services: [
      { name: "Corte y Peinado", desc: "Lavado, corte y un acabado hecho para usted." },
      { name: "Color", desc: "Tinte, mechas y retoques." },
      { name: "Balayage", desc: "Color suave y natural." },
      { name: "Blower / Secado", desc: "Liso, con volumen y listo para salir." },
      { name: "Tratamientos", desc: "Hidratación profunda para un cabello sano y brillante." },
      { name: "Eventos Especiales", desc: "Peinados para bodas, quinceañeras y días especiales." },
    ],
    galleryTitle: "Nuestro trabajo", aboutTitle: "Un salón que escucha.", about: "{name} es un salón en {city} donde cada cita empieza con una conversación. {ratingLine}",
    faq: [
      { q: "¿Cómo hago una cita?", a: "Llámenos y buscamos un horario que le funcione." },
      { q: "¿Corrigen color?", a: "Pregúntenos — lo revisamos y le damos un plan honesto." },
      { q: "¿Qué debo traer a mi cita?", a: "Traiga fotos de lo que le gusta. Lo hablamos antes de empezar." },
    ],
    finalTitle: "¿Lista para un cambio?", finalSub: "Haga su cita en {city} hoy.",
  },
  nails: {
    label: "Salón de Uñas",
    eyebrow: "Salón de Uñas", headline: "Uñas perfectas.", sub: "Manicure, pedicure, gel y acrílico en {city}. Venga sin cita o llame antes.",
    cta: "Haga su cita", cta2: "Ver servicios",
    trust: [{ icon: "spark", text: "Gel y diseños" }, { icon: "clock", text: "Sin cita" }],
    servicesKicker: "Servicios", servicesTitle: "Consiéntase", servicesStyle: "photoCards",
    services: [
      { name: "Manicure", desc: "Forma, cutícula y esmalte." },
      { name: "Pedicure", desc: "Remojo, exfoliación, masaje y esmalte." },
      { name: "Esmalte en Gel", desc: "Brillo que dura." },
      { name: "Acrílico Completo", desc: "Cualquier forma, cualquier largo." },
      { name: "Relleno", desc: "Mantenga sus uñas como nuevas." },
      { name: "Diseños", desc: "Arte en uñas que llama la atención." },
    ],
    galleryTitle: "Diseños recientes", aboutTitle: "Relájese. Nosotras nos encargamos.", about: "{name} es un salón de uñas en {city} para uñas bonitas y un momento para relajarse. {ratingLine}",
    faq: [
      { q: "¿Atienden sin cita?", a: "Sí, cuando hay una estación libre. Llame antes para apartar su lugar." },
      { q: "¿Cuánto dura el gel?", a: "Normalmente de dos a tres semanas con buen cuidado." },
      { q: "¿Puedo traer un diseño?", a: "¡Claro! Enséñenos la foto y lo hacemos." },
    ],
    finalTitle: "Es hora de uñas nuevas.", finalSub: "Visítenos en {city} o llame antes.",
  },
  lawn: {
    label: "Jardinería",
    eyebrow: "Jardinería y Paisajismo", headline: "Un jardín del que estará orgulloso.", sub: "Corte de grama, poda y jardinería en {city}. Llame para un presupuesto.",
    cta: "Pida su presupuesto", cta2: "Servicios",
    trust: [{ icon: "leaf", text: "Mantenimiento semanal" }, { icon: "home", text: "Casas y negocios" }],
    servicesKicker: "Servicios", servicesTitle: "Su jardín, bien cuidado", servicesStyle: "photoCards",
    services: [
      { name: "Corte de Grama", desc: "Cada semana o cada dos semanas." },
      { name: "Bordes y Recorte", desc: "Líneas limpias, jardín ordenado." },
      { name: "Setos y Arbustos", desc: "Bien formados y sanos." },
      { name: "Mulch y Canteros", desc: "Un acabado fresco y bonito." },
      { name: "Limpieza de Patio", desc: "Hojas, ramas y maleza." },
      { name: "Poda de Árboles", desc: "Árboles más sanos y seguros." },
    ],
    process: [
      { t: "Llámenos", d: "Cuéntenos de su jardín y lo que necesita." },
      { t: "Reciba su presupuesto", d: "Le damos un precio claro y un horario." },
      { t: "Disfrute su jardín", d: "Lo mantenemos bonito, visita tras visita." },
    ],
    beforeAfterTitle: "De descuidado a impecable",
    galleryTitle: "Nuestro trabajo", aboutTitle: "Equipo local, jardines bonitos.", about: "{name} mantiene grama y jardines impecables en {city}. {ratingLine}",
    faq: [
      { q: "¿Cada cuánto se debe cortar la grama?", a: "En temporada de lluvias en el sur de la Florida, lo mejor es cada semana. Cada dos semanas funciona en los meses frescos." },
      { q: "¿Hacen limpiezas de una sola vez?", a: "Sí — llámenos y cuéntenos del patio." },
      { q: "¿Trabajan con negocios?", a: "Pregúntenos y le decimos." },
    ],
    finalTitle: "Hagamos de su jardín el más bonito de la cuadra.", finalSub: "Jardinería en {city} y alrededores.",
  },
  botanica: {
    label: "Botánica",
    eyebrow: "Botánica", headline: "Velas, hierbas y bendiciones.", sub: "Velas, santos, hierbas, aceites y artículos religiosos en {city}. Visítenos o llame para preguntar.",
    cta: "Llame a la tienda", cta2: "Lo que tenemos",
    trust: [{ icon: "candle", text: "Velas y velones" }, { icon: "leaf", text: "Hierbas y aceites" }],
    servicesKicker: "En la tienda", servicesTitle: "Lo que tenemos", servicesStyle: "cards",
    services: [
      { name: "Velas y Velones", desc: "Velas de oración y devoción de todos los colores.", icon: "candle" },
      { name: "Santos e Imágenes", desc: "Santos, figuras y artículos para su altar.", icon: "heart" },
      { name: "Hierbas y Baños", desc: "Hierbas frescas y secas, baños y despojos.", icon: "leaf" },
      { name: "Aceites e Inciensos", desc: "Aceites, sprays, inciensos y resinas.", icon: "drop" },
      { name: "Cuarzos y Amuletos", desc: "Piedras, resguardos y protecciones.", icon: "gem" },
      { name: "Pregúntenos", desc: "¿No sabe qué necesita? Llame o venga y le ayudamos.", icon: "chat" },
    ],
    galleryTitle: "Dentro de la tienda", aboutTitle: "Su botánica de confianza.", about: "{name} es una botánica en {city} que atiende a la comunidad con velas, hierbas y artículos religiosos. {ratingLine}",
    faq: [
      { q: "¿Tienen una vela o un santo en particular?", a: "Llámenos y pregunte — revisamos lo que hay en la tienda." },
      { q: "¿Atienden en español?", a: "Sí. Le atendemos en español o en inglés." },
      { q: "¿Pueden pedir algo que no tengan?", a: "Pregúntenos y le decimos si lo podemos conseguir." },
    ],
    finalTitle: "Venga. Estamos para ayudarle.", finalSub: "Su botánica en {city}.",
  },
  market: {
    label: "Mercado Latino",
    eyebrow: "Mercado Latino", headline: "El sabor de casa, cerca de usted.", sub: "Productos latinos, frutas y verduras frescas y las marcas de siempre en {city}.",
    cta: "Llame a la tienda", cta2: "Lo que tenemos",
    trust: [{ icon: "basket", text: "Productos de su tierra" }, { icon: "leaf", text: "Frutas y verduras" }],
    servicesKicker: "En la tienda", servicesTitle: "Todo para su cocina", servicesStyle: "photoCards",
    services: [
      { name: "Frutas y Verduras", desc: "Plátanos, yuca, chiles, aguacates y más." },
      { name: "Marcas de su Tierra", desc: "Los productos de México, Centro y Sudamérica que usted conoce." },
      { name: "Tortillas y Pan", desc: "Tortillas frescas y pan para cada comida." },
      { name: "Especias y Chiles", desc: "Chiles secos, especias y condimentos." },
      { name: "Bebidas y Botanas", desc: "Refrescos, jugos, dulces y botanas." },
      { name: "Lo de Todos los Días", desc: "Despensa y artículos para el hogar." },
    ],
    galleryTitle: "En la tienda", aboutTitle: "Su tienda de barrio.", about: "{name} es un mercado latino en {city} — el lugar para encontrar los sabores de casa. {ratingLine}",
    faq: [
      { q: "¿Tienen un producto en particular?", a: "Llámenos y pregunte — se lo revisamos." },
      { q: "¿Atienden en español?", a: "Sí. Le atendemos en español o en inglés." },
      { q: "¿Me pueden pedir algo?", a: "Pregúntenos y le decimos si lo podemos traer." },
    ],
    finalTitle: "Venga por el sabor de casa.", finalSub: "Productos latinos en {city}.",
  },
  bakery: {
    label: "Panadería",
    eyebrow: "Panadería y Pastelería", headline: "Recién salido del horno.", sub: "Pan dulce, pastelitos y pasteles a su gusto en {city}. Visítenos o llame para encargar su pastel.",
    cta: "Encargue su pastel", cta2: "Nuestros productos",
    trust: [{ icon: "cake", text: "Pasteles a su gusto" }, { icon: "heart", text: "Horneado fresco" }],
    servicesKicker: "Nuestros productos", servicesTitle: "Dulce y fresco", servicesStyle: "photoCards",
    services: [
      { name: "Pasteles a su Gusto", desc: "Cumpleaños, quinceañeras, bodas y baby showers." },
      { name: "Pan Dulce", desc: "Conchas, cuernos y los favoritos de cada día." },
      { name: "Pastelitos", desc: "Hojaldrados, frescos y rellenos." },
      { name: "Tres Leches", desc: "Suave, dulce y el favorito de todos." },
      { name: "Bandejas para Fiestas", desc: "Postres y bocadillos para su evento." },
      { name: "Café y Más", desc: "Algo para acompañar su pan." },
    ],
    process: [
      { t: "Cuéntenos su idea", d: "Llame o venga con la fecha, el tamaño y el diseño que quiere." },
      { t: "Lo horneamos", d: "Hecho fresco para su celebración." },
      { t: "Pase a recogerlo", d: "Listo en su día — solo venga por él." },
    ],
    galleryTitle: "De nuestra vitrina", aboutTitle: "Horneado con cariño.", about: "{name} es una panadería en {city} que hace pan, pastelitos y pasteles frescos para cada celebración. {ratingLine}",
    faq: [
      { q: "¿Con cuánto tiempo debo encargar un pastel?", a: "Llámenos lo antes posible — le decimos qué se puede hacer para su fecha." },
      { q: "¿Pueden copiar un diseño de una foto?", a: "Tráiganos o mándenos la foto y lo conversamos." },
      { q: "¿Atienden en español?", a: "Sí. Le atendemos en español o en inglés." },
    ],
    finalTitle: "Hagamos su celebración más dulce.", finalSub: "Panadería fresca en {city}.",
  },
  latin: {
    label: "Restaurante Latino",
    eyebrow: "Cocina Latina", headline: "Comida casera, hecha al momento.", sub: "Comida tradicional latinoamericana en {city}. Coma aquí, para llevar o llame antes.",
    cta: "Llame y ordene", cta2: "Ver el menú",
    trust: [{ icon: "fork", text: "Para comer aquí o llevar" }, { icon: "heart", text: "Recetas de casa" }],
    servicesKicker: "Menú", servicesTitle: "Lo que hay hoy", servicesStyle: "cards",
    services: [],
    menu: [
      { section: "Favoritos", items: [
        { name: "Especialidades de la Casa", desc: "Platos tradicionales hechos como en casa." },
        { name: "Carnes a la Parrilla", desc: "Carne asada, pollo y más." },
        { name: "Sopas", desc: "Caseras, a fuego lento y reconfortantes." },
        { name: "Desayunos", desc: "Huevos, frijoles, plátanos y tortillas frescas." },
      ] },
      { section: "Acompañantes y Bebidas", items: [
        { name: "Arroz y Frijoles", desc: "El clásico." },
        { name: "Plátanos Fritos", desc: "Dulces y dorados." },
        { name: "Tortillas Frescas", desc: "Calientitas del comal." },
        { name: "Aguas Frescas", desc: "Horchata, tamarindo y más." },
      ] },
    ],
    galleryTitle: "De nuestra cocina", aboutTitle: "Comida que sabe a casa.", about: "{name} sirve comida tradicional latinoamericana en {city}. {ratingLine}",
    faq: [
      { q: "¿Tienen comida para llevar?", a: "Sí — llame antes y se la tenemos lista." },
      { q: "¿Hacen catering?", a: "Pregúntenos por bandejas para fiestas y eventos." },
      { q: "¿Atienden en español?", a: "¡Claro! Ordene en español o en inglés." },
    ],
    finalTitle: "¿Tiene hambre? Llame y ordene.", finalSub: "Comida latina en {city}.",
  },
  jewelry: {
    label: "Joyería",
    eyebrow: "Joyería", headline: "Oro que brilla para toda la vida.", sub: "Cadenas, anillos, aretes y regalos en {city}. Venga a ver la colección.",
    cta: "Llame a la tienda", cta2: "La colección",
    trust: [{ icon: "gem", text: "Oro y plata" }, { icon: "heart", text: "Regalos para cada ocasión" }],
    servicesKicker: "Colección", servicesTitle: "Encuentre la pieza perfecta", servicesStyle: "photoCards",
    services: [
      { name: "Cadenas y Collares", desc: "Oro y plata en todos los estilos y largos." },
      { name: "Anillos", desc: "De compromiso, de boda y para todos los días." },
      { name: "Aretes", desc: "Topitos, argollas y piezas que destacan." },
      { name: "Pulseras", desc: "Diseños clásicos y modernos." },
      { name: "Regalos", desc: "Quinceañeras, bautizos, graduaciones y más." },
      { name: "Pregunte por Reparaciones", desc: "Llame para saber qué le podemos arreglar." },
    ],
    galleryTitle: "De la vitrina", aboutTitle: "Joyas para los grandes momentos.", about: "{name} es una joyería en {city} con piezas para cada celebración. {ratingLine}",
    faq: [
      { q: "¿Hacen reparaciones o ajustes de talla?", a: "Llámenos y pregunte — le decimos qué podemos hacer." },
      { q: "¿Puedo ver una pieza antes de ir?", a: "Llame o escríbanos y le mandamos fotos." },
      { q: "¿Atienden en español?", a: "Sí. Le atendemos en español o en inglés." },
    ],
    finalTitle: "Encuentre algo que brille.", finalSub: "Visítenos en {city}.",
  },
  craft: {
    label: "Trabajos a la Medida",
    eyebrow: "Trabajos a la Medida", headline: "Hecho a mano. Hecho para durar.", sub: "Trabajos a la medida en {city}. Llame para hablar de su proyecto.",
    cta: "Pida su presupuesto", cta2: "Nuestro trabajo",
    trust: [{ icon: "wrench", text: "A la medida" }, { icon: "check", text: "Materiales de calidad" }],
    servicesKicker: "Lo que hacemos", servicesTitle: "Hecho para usted", servicesStyle: "photoCards",
    services: [
      { name: "Proyectos a la Medida", desc: "Hechos a sus medidas y a su estilo." },
      { name: "Reparación y Restauración", desc: "Le devolvemos la vida a piezas gastadas." },
      { name: "Materiales y Colores", desc: "Le ayudamos a escoger el acabado correcto." },
      { name: "Casas y Negocios", desc: "Trabajos residenciales y comerciales." },
    ],
    process: [
      { t: "Llámenos", d: "Cuéntenos del proyecto y mándenos unas fotos." },
      { t: "Reciba su presupuesto", d: "Medimos, planeamos y le damos un precio claro." },
      { t: "Lo construimos", d: "Hecho a mano y bien terminado." },
    ],
    galleryTitle: "Nuestro trabajo", aboutTitle: "Un trabajo que se nota.", about: "{name} hace trabajos a la medida en {city} — medidos, construidos y terminados a mano. {ratingLine}",
    faq: [
      { q: "¿Cómo pido un presupuesto?", a: "Llámenos con fotos y medidas y coordinamos una visita." },
      { q: "¿Cuánto tarda un proyecto?", a: "Depende del trabajo — le damos el tiempo con su presupuesto." },
      { q: "¿Atienden en español?", a: "Sí. Le atendemos en español o en inglés." },
    ],
    finalTitle: "¿Tiene un proyecto en mente?", finalSub: "Trabajos a la medida en {city} y alrededores.",
  },
  shipping: {
    label: "Envíos",
    eyebrow: "Envíos", headline: "Mande a casa con confianza.", sub: "Cajas y paquetes a Latinoamérica desde {city}. Llame para tarifas y horarios.",
    cta: "Llame por tarifas", cta2: "Cómo funciona",
    trust: [{ icon: "box", text: "Cajas y paquetes" }, { icon: "truck", text: "A Latinoamérica" }],
    servicesKicker: "Servicios", servicesTitle: "Lo que enviamos", servicesStyle: "cards",
    services: [
      { name: "Cajas", desc: "Mande una caja de lo que sea a su familia.", icon: "box" },
      { name: "Paquetes", desc: "Paquetes pequeños y grandes.", icon: "truck" },
      { name: "Venta de Cajas", desc: "Pregunte por cajas y material de empaque.", icon: "tag" },
      { name: "Tarifas por País", desc: "Llame para las tarifas a su país.", icon: "pin" },
    ],
    process: [
      { t: "Traiga su caja", d: "Déjela en nuestra oficina o pregunte por recogida." },
      { t: "La empacamos y enviamos", d: "La pesamos, la etiquetamos y sale en camino." },
      { t: "Llega a su destino", d: "Su familia la recibe en casa." },
    ],
    galleryTitle: "En nuestra oficina", aboutTitle: "Uniendo familias.", about: "{name} ayuda a las familias de {city} a mandar cajas y paquetes a Latinoamérica. {ratingLine}",
    faq: [
      { q: "¿A qué países envían?", a: "Llámenos y pregunte — le decimos los países y las tarifas." },
      { q: "¿Cuánto tarda en llegar?", a: "Depende del país. Pregúntenos cuando deje su caja." },
      { q: "¿Atienden en español?", a: "Sí. Le atendemos en español o en inglés." },
    ],
    finalTitle: "¿Listo para mandar una caja a casa?", finalSub: "Envíos desde {city}.",
  },
  cleaning: {
    label: "Limpieza",
    eyebrow: "Limpieza de Casas y Oficinas", headline: "Llegue a una casa limpia.", sub: "Limpieza de casas y oficinas en {city}. Llame para un presupuesto de su espacio.",
    cta: "Pida su presupuesto", cta2: "Servicios",
    trust: [{ icon: "spark", text: "Casas y oficinas" }, { icon: "calendar", text: "Semanal o una vez" }],
    servicesKicker: "Servicios", servicesTitle: "Impecable en cada visita", servicesStyle: "photoCards",
    services: [
      { name: "Limpieza Regular", desc: "Cada semana o cada dos semanas." },
      { name: "Limpieza Profunda", desc: "De arriba abajo, por dentro y por fuera." },
      { name: "Mudanzas", desc: "Lista para la próxima etapa." },
      { name: "Oficinas", desc: "Un espacio limpio para su equipo." },
      { name: "Después de Obra", desc: "Sin polvo ni escombros." },
      { name: "Airbnb", desc: "Lista para su próximo huésped." },
    ],
    process: [
      { t: "Llámenos", d: "Cuéntenos de su espacio y lo que necesita." },
      { t: "Reciba su presupuesto", d: "Un precio claro y un horario que le funcione." },
      { t: "Disfrute la limpieza", d: "Nosotros nos encargamos — usted recupera su tiempo." },
    ],
    galleryTitle: "Limpio y fresco", aboutTitle: "Una limpieza de confianza.", about: "{name} limpia casas y oficinas en {city} y alrededores. {ratingLine}",
    faq: [
      { q: "¿Tengo que estar en casa?", a: "No — muchos clientes nos dan acceso. Lo coordinamos como usted se sienta cómodo." },
      { q: "¿Traen los productos?", a: "Pregúntenos — le decimos qué traemos y qué usamos." },
      { q: "¿Cómo sé el precio?", a: "Llámenos con el tamaño de su espacio y cada cuánto quiere la limpieza." },
    ],
    finalTitle: "Recupere su tiempo.", finalSub: "Limpieza de casas y oficinas en {city}.",
  },
};

/** The industry template in the requested language (falls back to English). */
export function industryFor(key: IndustryKey, lang: "en" | "es"): Industry {
  const base = INDUSTRIES[key];
  const w = lang === "es" ? ES[key] : undefined;
  return w ? { ...base, ...w } : base;
}

export const hasSpanish = (key: IndustryKey) => Boolean(ES[key]);
