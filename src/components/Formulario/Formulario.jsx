import { useState } from "react";
import "./Formulario.scss"; // Importás el SCSS

const Formulario = ({ turno, onCancelar }) => {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reserva:", { nombre, telefono, ...turno });
    alert("¡Turno reservado!");
    onCancelar(); // Cierra el modal
  };

  return (
    <div className="modal_backdrop">
      <div className="modal_container">
        <form onSubmit={handleSubmit}>
          <h3>
            Reservar turno para {turno.hora} - {turno.fecha}
          </h3>
          <div>
            <label>Nombre:</label>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Teléfono:</label>
            <input
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
          </div>
          <div className="modal_botones">
            <button type="submit">Reservar</button>
            <button type="button" onClick={onCancelar}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Formulario;
