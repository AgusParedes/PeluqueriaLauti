import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generarSemanas } from '../../helpers/turnos.js';
import DiaConTurnosAdmin from '../DiasConTurnosAdmin/DiasConTurnosAdmin.jsx';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [dias, setDias] = useState([]);
  const [turnosReservados, setTurnosReservados] = useState([]);

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (!admin) {
      navigate("/Login");
      return;
    }
    const { dias: semanaActual, diasSemanaSiguiente } = generarSemanas();
    setDias([...semanaActual, ...diasSemanaSiguiente]);
    obtenerTurnos();
  }, []);

  const obtenerTurnos = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/AdminPanel/turnos`);
      const data = await res.json();
      setTurnosReservados(data);
    } catch (error) {
      console.error('Error al obtener turnos:', error);
    }
  };

  const borrarTurno = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este turno?")) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/AdminPanel/turnos/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok) {
        alert("Turno eliminado con éxito");
        obtenerTurnos();
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("Error al borrar turno");
    }
  };

  const bloquearTurno = async (fecha, hora) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/AdminPanel/bloquear`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: "Bloqueado",
          telefono: "0000000000",
          fecha,
          hora,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        alert("Turno bloqueado");
        obtenerTurnos();
      } else {
        alert(data.error);
      }
    } catch {
      alert("Error al bloquear turno");
    }
  };

  return (
    <div className="calendario">
      <h2 style={{color:'white'}}>Turnos</h2>
      <div className="AdminPanelContainer">
        {dias.map((dia) => (
          <DiaConTurnosAdmin
            key={dia.fechaISO}
            dia={dia}
            turnosReservados={turnosReservados}
            onBorrarTurno={borrarTurno}
            onBloquearTurno={bloquearTurno}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
