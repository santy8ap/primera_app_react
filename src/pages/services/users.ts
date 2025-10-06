// src/services/UserService.ts
import type { UserCred } from '../types/index';

export class UserService {
  static async list(): Promise<UserCred[]> {
    const res = await fetch('/api/users');
    if (!res.ok) throw new Error(`List failed ${res.status}`);
    return res.json();
  }

  static async create(payload: UserCred) {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return { status: res.status, body: await res.json().catch(() => null) };
  }

  static async get(name: string) {
    const res = await fetch(`/api/users/${encodeURIComponent(name)}`);
    return { status: res.status, body: await res.json().catch(() => null) };
  }

  static async patch(name: string, patch: Partial<UserCred>) {
    const res = await fetch(`/api/users/${encodeURIComponent(name)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    });
    return { status: res.status, body: await res.json().catch(() => null) };
  }

  static async delete(name: string) {
    const res = await fetch(`/api/users/${encodeURIComponent(name)}`, {
      method: 'DELETE',
    });
    return { status: res.status };
  }
}
