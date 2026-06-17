import { WELLNESS_MAX_CAPACITY } from '@/data/wellnessExperience';
import { MP_BACKEND_URL, wakeUpBackend } from '@/services/checkout';

export interface WellnessCapacity {
  max: number;
  approvedSeats: number;
  heldSeats: number;
  used: number;
  remaining: number;
  isFull: boolean;
  canBookIndividual: boolean;
  canBookDupla: boolean;
}

const CAPACITY_TIMEOUT_MS = 45_000;
const MAX_ATTEMPTS = 3;

function defaultCapacity(): WellnessCapacity {
  return {
    max: WELLNESS_MAX_CAPACITY,
    approvedSeats: 0,
    heldSeats: 0,
    used: 0,
    remaining: WELLNESS_MAX_CAPACITY,
    isFull: false,
    canBookIndividual: true,
    canBookDupla: true,
  };
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
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('[wellnessCapacity] rota dedicada indisponível, tentando /health', error);
    }
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
  await wakeUpBackend();

  let lastError: Error | null = null;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    if (attempt > 0) {
      await new Promise((resolve) => window.setTimeout(resolve, 2000 * attempt));
      await wakeUpBackend();
    }

    try {
      return await fetchCapacityOnce();
    } catch (error) {
      lastError =
        error instanceof Error ? error : new Error('Não foi possível carregar as vagas do evento.');
    }
  }

  if (import.meta.env.DEV) {
    console.warn('[wellnessCapacity] API indisponível, usando fallback local:', lastError);
    return defaultCapacity();
  }

  throw lastError ?? new Error('Não foi possível carregar as vagas do evento.');
}
