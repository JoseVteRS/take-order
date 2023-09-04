const IndexPage = async () => {

  return (
    <>
      <div className="bg-gray-100 min-h-screen p-4">
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-4 text-center text-blue-700">
            ¡Bienvenido a la Revolución de las Cartas de Restaurante!
          </h1>

          <p className="text-lg mb-4 text-center text-gray-600">
            Desbloquea el poder de la digitalización y crea cartas de restaurante modernas con códigos QR en minutos.
          </p>

          <div className="bg-blue-100 rounded p-4 mb-6 text-center">
            <h2 className="text-2xl font-semibold mb-2">¿Por qué elegirnos?</h2>
            <ul className="list-disc pl-4">
              <li className="mb-2">Diseña cartas de aspecto profesional.</li>
              <li className="mb-2">Añade, edita y organiza platos fácilmente.</li>
              <li className="mb-2">Genera códigos QR para acceso sin contacto.</li>
              <li className="mb-2">¡Impulsa tu restaurante hacia el futuro!</li>
            </ul>
          </div>

          <h2 className="text-2xl font-semibold mb-4 text-center text-blue-700">
            ¿Listo para empezar?
          </h2>

          <div className="text-center">
            <button className="bg-blue-500 text-white rounded px-6 py-3 hover:bg-blue-600">
              ¡Comienza Ahora!
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default IndexPage

