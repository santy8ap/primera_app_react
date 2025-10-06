import type { UserCred, ApiError } from '../types';

interface ApiResult<T> {
  status: number;
  body?: T | ApiError | null;
}

export class UserService {
  private static baseUrl = '/api/users';

  // GET /api/users
  static async list(): Promise<UserCred[]> {
    const res = await fetch(this.baseUrl);
    if (!res.ok) {
      throw new Error(`Error ${res.status}: no se pudo listar usuarios`);
    }
    return res.json();
  }

  // POST /api/users
  static async create(user: UserCred): Promise<ApiResult<UserCred>> {
    const res = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    const body = await res.json().catch(() => null);
    return { status: res.status, body };
  }

  // GET /api/users/:name
  static async get(name: string): Promise<ApiResult<UserCred>> {
    const res = await fetch(`${this.baseUrl}/${encodeURIComponent(name)}`);
    const body = await res.json().catch(() => null);
    return { status: res.status, body };
  }

  // PATCH /api/users/:name
  static async patch(name: string, patch: Partial<UserCred>): Promise<ApiResult<UserCred>> {
    const res = await fetch(`${this.baseUrl}/${encodeURIComponent(name)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    });
    const body = await res.json().catch(() => null);
    return { status: res.status, body };
  }

  // DELETE /api/users/:name
  static async delete(name: string): Promise<ApiResult<{ success: boolean }>> {
    const res = await fetch(`${this.baseUrl}/${encodeURIComponent(name)}`, {
      method: 'DELETE',
    });
    const body = await res.json().catch(() => null);
    return { status: res.status, body };
  }
}
