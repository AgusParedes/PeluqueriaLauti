import { useState } from "react";
import ModalMensaje from '../ModalMensaje/ModalMensaje.jsx'
import './Formulario.scss'


const Formulario = ({ turno, onCancelar, onReservarExitoso }) => {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [modalInfo, setModalInfo] = useState(null);
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/turnos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre,
        fecha: turno.fecha, 
        hora: turno.hora,
        telefono
      })
    });

    console.log("Respuesta fetch:", response);

    const data = await response.json();
    console.log("Data recibida:", data);

    if (response.status === 200) {
        console.log("Reserva exitosa, seteando modalInfo");
        setModalInfo({ tipo: "exito", mensaje: "¡Turno reservado con éxito!" });
      } else if (response.status === 409) {
        console.log("Conflicto de reserva, seteando modalInfo error");
        setModalInfo({
          tipo: "error",
          mensaje:
            "Lo sentimos, ese turno fue reservado mientras llenabas el formulario. Volvé a intentarlo.",
        });
      } else {
        console.log("Otro error, seteando modalInfo error");
        setModalInfo({ tipo: "error", mensaje: "Error al reservar turno: " + data.error });
      }
    } catch (error) {
      console.error("Error al enviar turno:", error);
      setModalInfo({ tipo: "error", mensaje: "Ocurrió un error al reservar el turno." });
    }
  };


console.log("modalInfo:", modalInfo);
  return (
  <>
    {modalInfo ? (
      <ModalMensaje
        tipo={modalInfo.tipo}
        mensaje={modalInfo.mensaje}
        onAceptar={() => {
          setModalInfo(null);
          if (modalInfo.tipo === "exito") {
            onCancelar();  
            onReservarExitoso(); 
          } else {
            window.location.reload();
          }
        }}
      />
    ) : (
      <div className="modal_backdrop">
        <div className="modal_container">

          <form onSubmit={handleSubmit}>
            <h3>
              Reservar turno para {turno.hora} del {turno.diaNombre} {turno.fecha}
            </h3>
            <div>
              <label>Nombre y apellido:</label>
              <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+"
                title="Solo letras y espacios"
              />
            </div>
            <div>
              <label>Teléfono:</label>
              <input
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
                pattern="[0-9]+"
                title="Solo números"
                maxLength={15}
                minLength={10}
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
    )}
  </>
);
};

export default Formulario;
