import {apiGetTyped} from './apiClient';
import type {Libro} from '../types';

// Cache simple en memoria para evitar múltiples peticiones del mismo recurso
const libroCache = new Map<string, Libro>();
let listaCache: { data: Libro[]; timestamp: number } | null = null;
const LISTA_TTL_MS = 60_000; // 1 minuto

export async function getLibros(force = false): Promise<Libro[]> {
  const now = Date.now();
  if (!force && listaCache && now - listaCache.timestamp < LISTA_TTL_MS) {
    return listaCache.data;
  }
  const data = await apiGetTyped('/books');
  listaCache = { data, timestamp: now };
  // Precargar en cache individual
  data.forEach(l => libroCache.set(l.id, l));
  return data;
}

export async function getLibroById(id: string, force = false): Promise<Libro> {
  if (!force && libroCache.has(id)) {
    return libroCache.get(id)!;
  }
  const data = await apiGetTyped(`/books/${id}`);
  libroCache.set(id, data);
  return data;
}

export function clearLibrosCache() {
  libroCache.clear();
  listaCache = null;
}
