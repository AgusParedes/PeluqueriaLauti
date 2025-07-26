
import './DiasConTurnos.scss';

const DiaConTurnos = ({ dia, turnosReservados, onSeleccionarTurno }) => {
  const estaReservado = (fechaISO, hora) => {
    return turnosReservados.some(
      (turno) => turno.fecha === fechaISO && turno.hora === hora
    );
  };

  const esPasado = (fechaISO, hora) => {
    const ahora = new Date();
    const fechaHora = new Date(`${fechaISO}T${hora}:00`);
    return fechaHora < ahora;
  };

  return (
    <div className="dia">
      <h4>{dia.diaNombre} {dia.fecha}</h4>
      <div className="horarios">
        {dia.horarios.map((hora) => {
          const deshabilitado = estaReservado(dia.fechaISO, hora) || esPasado(dia.fechaISO, hora);

          return (
            <button className={estaReservado(dia.fechaISO, hora) || esPasado(dia.fechaISO, hora)? "boton-reservado": "boton-disponible"}
                key={hora}
                disabled={deshabilitado}
                onClick={() =>
                onSeleccionarTurno({
                  diaNombre: dia.diaNombre,
                  fecha: dia.fechaISO,
                  hora,
                })
              }
            >
              {hora}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DiaConTurnos;
