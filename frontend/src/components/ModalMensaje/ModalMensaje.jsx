import React from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import "./ModalMensaje.scss";

const ModalMensaje = ({ tipo, mensaje, onAceptar }) => {
  return (
    <div className="modal-mensaje-backdrop">
      <div className={`modal-mensaje-container ${tipo}`}>
        <div className="icono">
          {tipo === "exito" ? (
            <AiOutlineCheckCircle color="#2e7d32" size={60} />
          ) : (
            <AiOutlineCloseCircle color="#c62828" size={60} />
          )}
        </div>
        <div className="mensaje">{mensaje}</div>
        <button onClick={onAceptar}>Aceptar</button>
      </div>
    </div>
  );
};

export default ModalMensaje;
