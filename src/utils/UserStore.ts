import type { UserCred } from '../pages/types';

class UserStore {
  private items: UserCred[] = [];

  constructor(initial: UserCred[] = []) {
    this.items = [...initial];
    console.log('[UserStore] init items:', this.items.length);
  }

  list(): UserCred[] {
    console.log('[GET] /users - list - count', this.items.length);
    return this.items.map(u => ({ ...u }));
  }

  findByName(name: string): UserCred | null {
    if (!name) return null;
    const key = name.trim();
    console.log(`[findByName] "${key}"`);
    const found = this.items.find(u => u.name === key);
    return found ? { ...found } : null;
  }

  create(user: UserCred): UserCred | null {
    if (!user || !user.name) return null;
    const key = user.name.trim();
    if (this.items.some(u => u.name === key)) {
      console.log('[create] duplicate', key);
      return null;
    }
    const toStore = { ...user, name: key };
    this.items.push(toStore);
    console.log('[create] added', key, 'count', this.items.length);
    return { ...toStore };
  }

  update(name: string, patch: Partial<UserCred>): UserCred | null {
    if (!name) return null;
    const key = name.trim();
    console.log('[update] target', key, 'patch', patch);
    const idx = this.items.findIndex(u => u.name === key);
    if (idx === -1) return null;
    this.items[idx] = { ...this.items[idx], ...patch };
    console.log('[update] updated', key);
    return { ...this.items[idx] };
  }

  remove(name: string): boolean {
    try {
      if (!name) return false;
      const key = name.trim();
      console.log('[remove] target', key);
      const idx = this.items.findIndex(u => u.name === key);
      if (idx === -1) {
        console.log('[remove] not found', key);
        return false;
      }
      this.items.splice(idx, 1);
      console.log('[remove] removed', key, 'remaining', this.items.length);
      return true;
    } catch (err) {
      console.error('[remove] error', err);
      return false;
    }
  }
}

export const userStore = new UserStore([
  { name: 'admin', pass: '1234' },
  { name: 'santy', pass: '1234' },
]);

export default UserStore;
