export function generarSemanas() {
  const hoy = new Date();
  const indexDia = hoy.getDay();
  const lunes = new Date(hoy);
  const dias = [];
  const diasSemanaSiguiente = [];

  const horarios = [
    '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '13:30', '14:00',
    '14:30', '15:00', '15:30', '16:00',
    '16:30', '17:00', '17:30', '18:00',
    '18:30', '19:00', '19:30', '20:00',
    '20:30'
  ];

  if (indexDia === 0) {
    lunes.setDate(hoy.getDate() + 1);
  } else {
    lunes.setDate(hoy.getDate() - (indexDia - 1));
  }

  const lunesSiguiente = new Date(lunes);
  lunesSiguiente.setDate(lunes.getDate() + 7);

  for (let i = 0; i < 6; i++) {
    const dia = new Date(lunes);
    dia.setDate(lunes.getDate() + i);
    dias.push({
      diaNombre: dia.toLocaleDateString("es-AR", { weekday: "long" }),
      fecha: dia.toLocaleDateString("es-AR", { day: "2-digit", month: "long" }),
      fechaISO: dia.toISOString().split("T")[0],
      horarios: horarios,
    });

    const diaSemanaSiguiente = new Date(lunesSiguiente);
    diaSemanaSiguiente.setDate(lunesSiguiente.getDate() + i);
    diasSemanaSiguiente.push({
      diaNombre: diaSemanaSiguiente.toLocaleDateString("es-AR", { weekday: "long" }),
      fecha: diaSemanaSiguiente.toLocaleDateString("es-AR", { day: "2-digit", month: "long" }),
      fechaISO: diaSemanaSiguiente.toISOString().split("T")[0],
      horarios: horarios,
    });
  }

  return { dias, diasSemanaSiguiente };
}
