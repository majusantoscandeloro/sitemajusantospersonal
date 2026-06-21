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

const CAPACITY_TIMEOUT_MS = 20_000;
const FIRST_LOAD_ATTEMPTS = 2;
const POLL_ATTEMPTS = 1;

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

export interface FetchWellnessCapacityOptions {
  /** Primeira carga da página: acorda o backend e tenta mais vezes. */
  wakeBackend?: boolean;
}

export async function fetchWellnessCapacity(
  options: FetchWellnessCapacityOptions = {},
): Promise<WellnessCapacity> {
  const wakeBackend = options.wakeBackend ?? false;
  const maxAttempts = wakeBackend ? FIRST_LOAD_ATTEMPTS : POLL_ATTEMPTS;

  if (wakeBackend) {
    await wakeUpBackend();
  }

  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    if (attempt > 0) {
      await new Promise((resolve) => window.setTimeout(resolve, 800));
      if (wakeBackend) await wakeUpBackend();
    }

    try {
      return await fetchCapacityOnce();
    } catch (error) {
      lastError =
        error instanceof Error ? error : new Error('Não foi possível carregar as vagas do evento.');
    }
  }

  console.warn('[wellnessCapacity] API indisponível, exibindo limite padrão:', lastError?.message);
  return defaultCapacity();
}
