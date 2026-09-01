const diccionario = {
  es: {
    app: { title: 'Sistema Horarios' },
    employees: 'Empleados',
    shifts: 'Turnos',
    availability: 'Disponibilidad',
    skills: 'Habilidades',
    schedule: 'Horario',
  },
  en: {
    app: { title: 'Scheduling System' },
    employees: 'Employees',
    shifts: 'Shifts',
    availability: 'Availability',
    skills: 'Skills',
    schedule: 'Schedule',
  },
};

let idiomaActual = 'es';

export function setLang(lang) {
  idiomaActual = lang;
  localStorage.setItem('locale', lang);
}

export function useLang() {
  const stored = localStorage.getItem('locale');
  if (stored) idiomaActual = stored;
  return { lang: idiomaActual, setLang };
}

export function t(key) {
  const traducciones = diccionario.es;
  const partes = key.split('.');
  let val = traducciones;
  for (const p of partes) {
    if (val[p] === undefined) return key;
    val = val[p];
  }
  return val;
}

export function locale() {
  return new Intl.DateTimeFormat('es-CL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}