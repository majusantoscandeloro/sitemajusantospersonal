import {
  catalogCategoryDefs,
  getCatalogItemById,
  type ProgramLevel,
} from '@/data/catalog';

export interface Program {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  level: ProgramLevel;
  duration: string;
  category?: string;
}

function toProgramCard(id: string): Program {
  const item = getCatalogItemById(id);
  if (!item) {
    throw new Error(`Catalog item not found for program card id="${id}"`);
  }
  return {
    id: item.id,
    title: item.title,
    subtitle: item.subtitle,
    image: item.image,
    level: item.level,
    duration: item.duration,
    category: item.category,
  };
}

function buildCategory<T extends { title: string; ids: readonly string[]; description?: string }>(
  def: T,
) {
  return {
    title: def.title,
    ...(def.description ? { description: def.description } : {}),
    programs: def.ids.map(toProgramCard),
  };
}

/** Carrosséis da home — derivados de `src/data/catalog.ts`. */
export const programCategories = {
  popular: buildCategory(catalogCategoryDefs.popular),
  challenges: buildCategory(catalogCategoryDefs.challenges),
  beginner: buildCategory(catalogCategoryDefs.beginner),
  weightLoss: buildCategory(catalogCategoryDefs.weightLoss),
  hypertrophy: buildCategory(catalogCategoryDefs.hypertrophy),
  homeWorkout: buildCategory(catalogCategoryDefs.homeWorkout),
  consulting: buildCategory(catalogCategoryDefs.consulting),
};
