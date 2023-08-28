
type Props = {
  name: string
  email: string
  activeToken: string
}

export const VerifyEmailTemplate = ({ name, email, activeToken }: Props) => {
  return (
    <div>
      <h1>Hola, {name}</h1>
      <p>Tu email es: {email}</p>
      <div>
        <a href={`http://localhost:3000/api/verify?token=${activeToken} `}>Verificar email</a>
      </div>
    </div>
  )
}
