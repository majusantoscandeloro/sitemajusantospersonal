import { MP_BACKEND_URL } from '@/services/checkout';

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

export async function fetchWellnessCapacity(): Promise<WellnessCapacity> {
  const response = await fetch(`${MP_BACKEND_URL}/wellness-experience/capacity`, {
    method: 'GET',
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Não foi possível carregar as vagas do evento.');
  }

  return response.json() as Promise<WellnessCapacity>;
}
