import { useState, useEffect } from "react";
import Formulario from "../Formulario/Formulario.jsx";

const Calendario = () => {
  const [dias, setDias] = useState([]);
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null); // Guarda el turno elegido

  useEffect(() => {
    const hoy = new Date();
    const indexDia = hoy.getDay();
    const lunes = new Date(hoy);
    const diasArray = [];
    const turnos = ["10:00", "11:00", "12:00", "13:00"];

    if (indexDia === 0) {
      lunes.setDate(hoy.getDate() + 1);
    } else if (indexDia > 1) {
      lunes.setDate(hoy.getDate() - (indexDia - 1));
    }

    for (let i = 0; i < 6; i++) {
      const dia = new Date(lunes);
      dia.setDate(lunes.getDate() + i);
      diasArray.push({
        diaNombre: dia.toLocaleDateString("es-AR", { weekday: "long" }),
        fecha: dia.toLocaleDateString("es-AR", { day: "2-digit", month: "long" }),
        fechaISO: dia.toISOString().split("T")[0],
        horarios: turnos,
      });
    }

    setDias(diasArray);
  }, []);

  const seleccionarTurno = (fechaISO, fecha, hora) => {
    setTurnoSeleccionado({ fechaISO, fecha, hora });
  };

  const cancelarFormulario = () => {
    setTurnoSeleccionado(null);
  };

  return (
    <div>
      <h2>Reservá tu turno</h2>
      {dias.map((dia, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <strong>
            {dia.diaNombre.charAt(0).toUpperCase() + dia.diaNombre.slice(1)} _ {dia.fecha}
          </strong>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "10px" }}>
            {dia.horarios.map((hora) => (
              <button
                key={hora}
                onClick={() => seleccionarTurno(dia.fechaISO, dia.fecha, hora)}
              >
                {hora}
              </button>
            ))}
          </div>
        </div>
      ))}

      {turnoSeleccionado && (
        <Formulario
          turno={turnoSeleccionado}
          onCancelar={cancelarFormulario}
        />
      )}
    </div>
  );
};

export default Calendario;
