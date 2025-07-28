import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,   
    pass: process.env.EMAIL_PASS    
  }
});

function capitalizar(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatearDia(fechaISO) {
  const dia = new Date(fechaISO);
  return {
    diaNombre: capitalizar(dia.toLocaleDateString("es-AR", { weekday: "long" })),
    fecha: dia.toLocaleDateString("es-AR", { day: "2-digit", month: "long" }),
  };
}

export const enviarCorreo = async ({ nombre, telefono, fecha, hora }) => {
  const telefonoCliente = telefono.replace(/\D/g, '');

  const { diaNombre, fecha: fechaLegible } = formatearDia(fecha);

  const mensajeWhatsApp = `Hola, te confirmo la reserva del turno del dia ${diaNombre} ${fechaLegible} a las ${hora}. Gracias!`;
  const mensajeUrl = encodeURIComponent(mensajeWhatsApp);
  const linkWhatsapp = `https://wa.me/${telefonoCliente}?text=${mensajeUrl}`;

  const mensajeTexto = `
Nuevo turno reservado:

- Nombre: ${nombre}
- Teléfono: ${telefono}
- Día: ${diaNombre}
- Fecha: ${fechaLegible}
- Hora: ${hora}

Para contactar por WhatsApp, hacé clic en este enlace: ${linkWhatsapp}
`;

  const mensajeHTML = `
    <h2>Nuevo turno reservado</h2>
    <p><strong>Nombre:</strong> ${nombre}</p>
    <p><strong>Teléfono:</strong> ${telefono}</p>
    <p><strong>Día:</strong> ${diaNombre}</p>
    <p><strong>Fecha:</strong> ${fechaLegible}</p>
    <p><strong>Hora:</strong> ${hora}</p>
    <p>Para contactar por WhatsApp, hacé clic en el siguiente enlace:</p>
    <a href="${linkWhatsapp}" target="_blank" style="color: blue; text-decoration: underline;">
      Contactar por WhatsApp
    </a>
  `;

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_DESTINO,
      subject: 'Nuevo turno reservado',
      text: mensajeTexto,
      html: mensajeHTML,
    });
    console.log('Correo enviado:', info.response);
  } catch (error) {
    console.error('Error al enviar correo:', error);
  }
};
