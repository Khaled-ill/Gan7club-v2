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

  const checklist: CompletionChecklist = {
    basicInfo: !!(profile.fullName && profile.city && profile.country),
    categories: !!(profile.categories && profile.categories.length > 0),
    attributes: hasAnyAttribute(profile.attributes),
    media: !!(profile.media && profile.media.length > 0),
    bio: !!(profile.bio && profile.bio.trim().length > 0),
  };

  let percentage = 0;
  if (checklist.basicInfo) percentage += 20;
  if (checklist.categories) percentage += 20;
  if (checklist.attributes) percentage += 20;
  if (checklist.media) percentage += 20;
  if (checklist.bio) percentage += 20;

  return { percentage, checklist };
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

