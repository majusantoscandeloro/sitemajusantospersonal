import {
  WELLNESS_MAX_PEOPLE,
  WELLNESS_MAX_SLOTS,
} from '@/data/wellnessExperience';
import { MP_BACKEND_URL } from '@/services/checkout';

export interface WellnessCapacity {
  max: number;
  maxPeople?: number;
  approvedSeats: number;
  heldSeats: number;
  used: number;
  remaining: number;
  isFull: boolean;
  canBook?: boolean;
  canBookIndividual?: boolean;
  canBookDupla?: boolean;
}

const CAPACITY_TIMEOUT_MS = 20_000;

function defaultCapacity(): WellnessCapacity {
  return {
    max: WELLNESS_MAX_SLOTS,
    maxPeople: WELLNESS_MAX_PEOPLE,
    approvedSeats: 0,
    heldSeats: 0,
    used: 0,
    remaining: WELLNESS_MAX_SLOTS,
    isFull: false,
    canBook: true,
  };
}

export function getDefaultWellnessCapacity(): WellnessCapacity {
  return defaultCapacity();
}

function isWellnessCapacity(value: unknown): value is WellnessCapacity {
  if (!value || typeof value !== 'object') return false;
  const v = value as WellnessCapacity;
  return typeof v.remaining === 'number' && typeof v.max === 'number';
}

async function fetchJson(url: string): Promise<unknown> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), CAPACITY_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
  } finally {
    window.clearTimeout(timeoutId);
  }
}

async function fetchCapacityOnce(): Promise<WellnessCapacity> {
  try {
    const data = await fetchJson(`${MP_BACKEND_URL}/wellness-experience/capacity`);
    if (isWellnessCapacity(data)) return data;
  } catch {
    // tenta /health
  }

  const health = (await fetchJson(`${MP_BACKEND_URL}/health`)) as {
    wellness?: WellnessCapacity;
  };

  if (isWellnessCapacity(health.wellness)) {
    return health.wellness;
  }

  throw new Error('Resposta do servidor sem dados de vagas.');
}

export async function fetchWellnessCapacity(): Promise<WellnessCapacity> {
  try {
    return await fetchCapacityOnce();
  } catch (error) {
    const lastError =
      error instanceof Error ? error : new Error('Não foi possível carregar as vagas do evento.');
    console.warn('[wellnessCapacity] API indisponível, exibindo limite padrão:', lastError.message);
    return defaultCapacity();
  }
}
