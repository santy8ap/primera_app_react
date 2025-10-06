// src/pages/dashboard/dashboard.tsx
import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import type { UserCred } from '../types/index';
import { UserService } from '../services/UserService';



export default function Dashboard() {
  const router = useRouter();

  const [name, setName] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const clearOutput = useCallback(() => setOutput(null), []);

  async function listUsers() {
    setLoading(true);
    clearOutput();
    try {
      const users = await UserService.list();
      setOutput(JSON.stringify(users, null, 2));
      console.log('LIST response', users);
    } catch (err) {
      console.error(err);
      setOutput(String(err));
    } finally {
      setLoading(false);
    }
  }

  async function createUser() {
    if (!name || !pass) {
      setOutput('name and pass required to create user');
      return;
    }
    setLoading(true);
    clearOutput();
    try {
      const { status, body } = await UserService.create({ name, pass } as UserCred);
      if (status === 201) {
        setOutput(`Creado: ${JSON.stringify(body)}`);
      } else if (status === 409) {
        setOutput('User already exists');
      } else {
        setOutput(`Error ${status}: ${JSON.stringify(body)}`);
      }
      console.log('CREATE response', status, body);
    } catch (err) {
      console.error(err);
      setOutput(String(err));
    } finally {
      setLoading(false);
    }
  }

  async function getUser() {
    if (!name) {
      setOutput('name required to get user');
      return;
    }
    setLoading(true);
    clearOutput();
    try {
      const { status, body } = await UserService.get(name);
      if (status === 200) {
        setOutput(JSON.stringify(body, null, 2));
      } else if (status === 404) {
        setOutput('User not found');
      } else {
        setOutput(`Error ${status}: ${JSON.stringify(body)}`);
      }
      console.log('GET response', status, body);
    } catch (err) {
      console.error(err);
      setOutput(String(err));
    } finally {
      setLoading(false);
    }
  }

  async function patchUser() {
    if (!name || !pass) {
      setOutput('name and new pass required to patch user');
      return;
    }
    setLoading(true);
    clearOutput();
    try {
      const { status, body } = await UserService.patch(name, { pass });
      if (status === 200) {
        setOutput(`Actualizado: ${JSON.stringify(body)}`);
      } else if (status === 404) {
        setOutput('User not found');
      } else {
        setOutput(`Error ${status}: ${JSON.stringify(body)}`);
      }
      console.log('PATCH response', status, body);
    } catch (err) {
      console.error(err);
      setOutput(String(err));
    } finally {
      setLoading(false);
    }
  }

  async function deleteUser() {
    if (!name) {
      setOutput('name required to delete user');
      return;
    }
    setLoading(true);
    clearOutput();
    try {
      const { status } = await UserService.delete(name);
      if (status === 204) {
        setOutput(`Eliminado: ${name}`);
      } else if (status === 404) {
        setOutput('User not found');
      } else {
        setOutput(`Error ${status}`);
      }
      console.log('DELETE response', status);
    } catch (err) {
      console.error(err);
      setOutput(String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-zinc-950">
      <h1 className="text-3xl font-bold mb-6 text-amber-50">Dashboard</h1>
      <p className="mb-4 text-amber-50">Ruta actual: {router.pathname}</p>

      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow space-y-4">
        <div className="flex gap-2">
          <input
            placeholder="nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 px-3 py-2 border rounded"
            disabled={loading}
          />
          <input
            placeholder="contraseña"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="w-40 px-3 py-2 border rounded"
            disabled={loading}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button onClick={listUsers} className="px-4 py-2 bg-blue-600 text-zinc-950 rounded" disabled={loading}>
            {loading ? 'Loading...' : 'List'}
          </button>

          <button onClick={createUser} className="px-4 py-2 bg-green-600 text-zinc-950 rounded" disabled={loading}>
            Create
          </button>

          <button onClick={getUser} className="px-4 py-2 bg-gray-600 text-zinc-950 rounded" disabled={loading}>
            Get
          </button>

          <button onClick={patchUser} className="px-4 py-2 bg-amber-600 text-zinc-950 rounded" disabled={loading}>
            Patch
          </button>

          <button onClick={deleteUser} className="px-4 py-2 bg-red-600 text-zinc-950 rounded" disabled={loading}>
            Delete
          </button>

          <button onClick={() => router.push('/')} className="px-4 py-2 text-zinc-950 text-black rounded" disabled={loading}>
            Volver al Home
          </button>
        </div>

        <pre className="bg-black text-white p-3 rounded max-h-48 overflow-auto text-sm">
          {output ?? 'Resultados aquí'}
        </pre>
      </div>
    </div>
  );
}
