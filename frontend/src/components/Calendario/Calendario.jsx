import './Calendario.scss';
import React, { useState, useEffect } from 'react';
import { generarSemanas } from '../../helpers/turnos.js';
import DiaConTurnos from '../DiasConTurnos/DiasConTurnos.jsx';
import Formulario from '../Formulario/Formulario.jsx';

function Calendario() {
  const [dias, setDias] = useState([]);
  const [turnosReservados, setTurnosReservados] = useState([]);
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);

  useEffect(() => {
    const { dias: semanaActual, diasSemanaSiguiente } = generarSemanas();
    setDias([...semanaActual, ...diasSemanaSiguiente]);
  }, []);

    const obtenerTurnos = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/turnos');
        const data = await res.json();
        setTurnosReservados(data);
      } catch (error) {
        console.error('Error al obtener turnos:', error);
      }
    };

  useEffect(() => {
    obtenerTurnos();
  }, []);

  const seleccionarTurno = (turno) => {
    setTurnoSeleccionado(turno);
  };

  const cancelarFormulario = () => {
    setTurnoSeleccionado(null);
  };


  return (
    <div className="calendario">
      <h2>Peluqueria de Lautaro Paredes</h2>
      <h3>Reserva aca tu turno completado con tu datos, si el boton esta bloqueado es porque ya fue reservado. Por cualquier duda o consulta hace:</h3>
      <a
        href="https://wa.me/5493404408785"
        target="_blank"
        rel="noopener noreferrer"
      >
        CLICK AQUI
      </a>

      <div className="dias-grid">
        {dias.map((dia) => (
          <DiaConTurnos
            key={dia.fechaISO}
            dia={dia}
            turnosReservados={turnosReservados}
            onSeleccionarTurno={seleccionarTurno} 
          />
        ))}
      </div>
      {turnoSeleccionado && (
        <Formulario
          turno={turnoSeleccionado}
          onCancelar={cancelarFormulario}
          onReservarExitoso={() => {
            cancelarFormulario();
            obtenerTurnos();
          }}
        />
      )}
    </div>
  );
}

export default Calendario;
