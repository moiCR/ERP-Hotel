import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});export const transport = nodemailer.createTransport({
    host: "gmail",
    auth: {
        user: "admin@hotel.com",
        pass: "admin123"
    }
})


export const sendActivationEmail = async (email: string, token: string, name: string) => {
  const activationLink = `${process.env.NEXT_PUBLIC_APP_URL}/activate?token=${token}`;

  try {
    await transporter.sendMail({
      from: `"Hotel ERP Admin" <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: 'Bienvenido al equipo - Activa tu cuenta',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Hola, ${name} 👋</h2>
          <p>Te han creado una cuenta en el sistema ERP del Hotel.</p>
          <p>Para empezar, necesitas configurar tu contraseña haciendo clic en el siguiente botón:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${activationLink}" style="background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Activar mi Cuenta
            </a>
          </div>

          <p style="font-size: 12px; color: #666;">Si el botón no funciona, copia y pega este enlace: ${activationLink}</p>
          <p style="font-size: 12px; color: #999;">Este enlace expira en 24 horas.</p>
        </div>
      `,
    });
    console.log(`Correo enviado a ${email}`);
    return true;
  } catch (error) {
    console.error('Error enviando correo:', error);
    return false;
  }
};
