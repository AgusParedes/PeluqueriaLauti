import './DiasConTurnosAdmin.scss';

const DiaConTurnosAdmin = ({ dia, turnosReservados, onBorrarTurno, onBloquearTurno }) => {
  const turnoOcupado = (fechaISO, hora) => {
    return turnosReservados.find(
      (turno) => turno.fecha === fechaISO && turno.hora === hora
    );
  };

  const esPasado = (fechaISO, hora) => {
  const ahora = new Date();
  const fechaHora = new Date(`${fechaISO}T${hora}:00`);
  return fechaHora < ahora;
};

 {dia.horarios.map((hora) => {
  const turno = turnoOcupado(dia.fechaISO, hora);

  if (esPasado(dia.fechaISO, hora)) {
    return (
      <div key={hora} className="horario-con-boton">
        <div className="hora-texto">{hora}</div>
        <div className="hora-pasada">Ya pasó</div>
      </div>
    );
  }

  return (
    <div key={hora} className="horario-con-boton">
      <div className="hora-texto">{hora}</div>
      {turno ? (
        <>
          <button
            className="boton-borrar"
            onClick={() => onBorrarTurno(turno.id)}
            title="Borrar turno"
          >
            Eliminar
          </button>

          {turno.nombre !== "Bloqueado" && (
            <div className="info-turno">
              <p>Nombre: {turno.nombre_cliente}</p>
              <p>Telefono: {turno.telefono}</p>
            </div>
          )}
        </>
      ) : (
        <div className="div_botonAdmin">
          <button
            className="boton-bloquear"
            onClick={() => onBloquearTurno(dia.fechaISO, hora)}
            title="Bloquear este turno"
          >
            Bloquear
          </button>
        </div>
      )}
    </div>
  );
})}}

export default DiaConTurnosAdmin;
