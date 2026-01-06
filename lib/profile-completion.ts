// Profile completion calculator

export interface ProfileData {
  fullName?: string | null;
  city?: string | null;
  country?: string | null;
  categories?: Array<{ code: string; name: string }> | null;
  attributes?: {
    heightCm?: number | null;
    weightKg?: number | null;
    danceStyles?: string[] | null;
    [key: string]: any;
  } | null;
  media?: Array<{ id: string }> | null;
  bio?: string | null;
}

export interface CompletionChecklist {
  basicInfo: boolean;
  categories: boolean;
  attributes: boolean;
  media: boolean;
  bio: boolean;
}

export function calculateProfileCompletion(profile: ProfileData | null | undefined): {
  percentage: number;
  checklist: CompletionChecklist;
} {
  if (!profile) {
    return {
      percentage: 0,
      checklist: {
        basicInfo: false,
        categories: false,
        attributes: false,
        media: false,
        bio: false,
      },
    };
  }

  // Basic Info (20%) - name, birthdate, nationality, city, country
  const basicInfoComplete = !!(
    profile.fullName &&
    (profile as any).birthdate &&
    (profile as any).nationality &&
    profile.city &&
    profile.country
  );

  // Categories (20%) - at least one category
  const categoriesComplete = !!(profile.categories && profile.categories.length > 0);

  // Attributes (20%) - at least one attribute block filled
  const attributesComplete = hasAnyAttributeBlock(profile.attributes);

  // Media (20%) - at least one media item
  const mediaComplete = !!(profile.media && profile.media.length > 0);

  // Bio (20%) - bio text written (at least 50 characters)
  const bioComplete = !!(profile.bio && profile.bio.trim().length > 50);

  const checklist: CompletionChecklist = {
    basicInfo: basicInfoComplete,
    categories: categoriesComplete,
    attributes: attributesComplete,
    media: mediaComplete,
    bio: bioComplete,
  };

  let percentage = 0;
  if (checklist.basicInfo) percentage += 20;
  if (checklist.categories) percentage += 20;
  if (checklist.attributes) percentage += 20;
  if (checklist.media) percentage += 20;
  if (checklist.bio) percentage += 20;

  return { percentage, checklist };
}

function hasAnyAttributeBlock(attributes: ProfileData['attributes']): boolean {
  if (!attributes) return false;

  // Physical Block
  const hasPhysical =
    attributes.heightCm != null ||
    attributes.weightKg != null ||
    (attributes as any).hairColor != null ||
    (attributes as any).eyeColor != null ||
    (attributes as any).skinTone != null;

  // Skills Block
  const hasSkills =
    (attributes.danceStyles != null && attributes.danceStyles.length > 0) ||
    ((attributes as any).martialArts != null && (attributes as any).martialArts.length > 0) ||
    ((attributes as any).accents != null && (attributes as any).accents.length > 0) ||
    ((attributes as any).licenses != null && (attributes as any).licenses.length > 0);

  // Technical Block
  const hasTechnical =
    ((attributes as any).equipmentList != null && (attributes as any).equipmentList.length > 0) ||
    ((attributes as any).softwareList != null && (attributes as any).softwareList.length > 0) ||
    (attributes as any).studioAvailable != null;

  // Performance Block
  const hasPerformance =
    (attributes as any).vocalRange != null ||
    ((attributes as any).actingMethods != null && (attributes as any).actingMethods.length > 0) ||
    (attributes as any).experienceLevel != null;

  return hasPhysical || hasSkills || hasTechnical || hasPerformance;
}

function hasAnyAttribute(attributes: ProfileData['attributes']): boolean {
  if (!attributes) return false;

  // Check if any attribute field has a value
  const hasHeight = attributes.heightCm != null && attributes.heightCm > 0;
  const hasWeight = attributes.weightKg != null && attributes.weightKg > 0;
  const hasDanceStyles =
    attributes.danceStyles != null && attributes.danceStyles.length > 0;

  // Check other common attribute fields
  const hasOtherAttributes = Object.keys(attributes).some((key) => {
    if (['heightCm', 'weightKg', 'danceStyles'].includes(key)) return false;
    const value = attributes[key];
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'string') return value.trim().length > 0;
    if (typeof value === 'number') return value > 0;
    return value != null;
  });

  return hasHeight || hasWeight || hasDanceStyles || hasOtherAttributes;
}

