export default function NotFoundPage() {
  return (
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">La ruta solicitada no existe</p>
        <a 
          href="/" 
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Volver al Inicio
        </a>
      </div>
  );
}