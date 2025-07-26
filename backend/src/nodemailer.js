import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
console.log('Usuario del correo:', process.env.EMAIL_USER);
console.log('Contraseña del correo:', process.env.EMAIL_PASS ? '✓' : 'X');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,   
    pass: process.env.EMAIL_PASS    
  }
});

export const enviarCorreo = async ({ nombre, telefono, fecha, hora }) => {
  const mensaje = `
    Nuevo turno reservado:

    - Nombre: ${nombre}
    - Teléfono: ${telefono}
    - Fecha: ${fecha}
    - Hora: ${hora}
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,         
    to: process.env.EMAIL_DESTINO,        
    subject: 'Nuevo turno reservado',
    text: mensaje
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado:', info.response);
  } catch (error) {
    console.error('Error al enviar correo:', error);
  }
};
