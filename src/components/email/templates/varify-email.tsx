
type Props = {
  name: string
  email: string
  activeToken: string
}

const emailStyles = {
  fontFamily: 'Arial, sans-serif',
  padding: '20px',
  backgroundColor: '#f5f5f5',
};

const headerStyles = {
  backgroundColor: '#007bff',
  color: '#ffffff',
  padding: '10px',
};

const contentStyles = {
  padding: '20px',
};

const buttonStyles = {
  backgroundColor: '#007bff',
  color: '#ffffff',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  textDecoration: 'none',
  display: 'inline-block',
  margin: '10px',
};

export const VerifyEmailTemplate = ({ name, email, activeToken }: Props) => {
  return (
    <div style={emailStyles}>
      <div style={headerStyles}>
        <h1>¡Hola, {name}!</h1>
      </div>
      <div style={contentStyles}>
        <p>¡Gracias por registrarte en nuestro sitio! Para activar tu cuenta y verificar tu correo electrónico, por favor haz clic en el siguiente botón:</p>
        <a href={`http://localhost:3000/api/verify?token=${activeToken}`} style={buttonStyles}>Activa tu cuenta</a>
        <p>Si el botón no funciona, también puedes copiar y pegar el siguiente enlace en tu navegador:</p>
        <p>http://localhost:3000/api/verify?token=${activeToken}</p>
        <p>¡Esperamos verte pronto en nuestro sitio!</p>
      </div>
    </div>
  )
}
