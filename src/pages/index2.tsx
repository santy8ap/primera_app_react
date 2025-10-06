import { useRouter } from 'next/router';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { UserCred } from './types';
import { UserService } from './services/UserService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function IndexPage() {
  const router = useRouter();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [output, setOutput] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || !pass) {
      toast.error('Debe ingresar Usuario y contraseña');
      return;
    }

    try {
      const users = await UserService.list();
      const userFound = users.find((it) => it.name === user);

      if (!userFound || userFound.pass !== pass) {
        toast.error('Usuario o contraseña incorrectas');
        return;
      }

      toast.success('Inicio de sesión correcto');
      await router.push('/dashboard/dashboard');
    } catch (err) {
      console.error('Error al autenticar:', err);
      toast.error('No se pudo autenticar, revise la API');
    }
  };

  const handleChangeUser = (e: ChangeEvent<HTMLInputElement>) => setUser(e.target.value);
  const handleChangePass = (e: ChangeEvent<HTMLInputElement>) => setPass(e.target.value);

  async function fetchUsers() {
    try {
      const users = await UserService.list();
      setOutput(JSON.stringify(users, null, 2));
      toast.success('Usuarios obtenidos correctamente');
    } catch (err) {
      console.error(err);
      setOutput(String(err));
      toast.error('Error al obtener usuarios');
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cyan-200 px-4">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Soy la página Index</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm mt-8 space-y-6 bg-neutral-50 p-6 rounded-xl shadow"
      >
        <div className="flex flex-col space-y-2">
          <label className="text-zinc-950 font-medium">Usuario</label>
          <input
            type="text"
            onChange={handleChangeUser}
            value={user}
            className="px-4 py-2 border text-zinc-950 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-zinc-950 font-medium">Contraseña</label>
          <input
            type="password"
            onChange={handleChangePass}
            value={pass}
            className="px-4 py-2 border text-zinc-950 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 transition"
        >
          Ingresar
        </button>
      </form>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => void router.push('/dashboard/dashboard')}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Ir al Dashboard
        </button>

        <button onClick={fetchUsers} className="px-4 py-2 bg-gray-600 text-white rounded">
          Obtener users (API)
        </button>
      </div>

     

      {/* Contenedor de Toastify */}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}
