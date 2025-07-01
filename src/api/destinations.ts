export interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  photographer: string;
  profileUrl: string;
}

const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';
const API_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY as string;

/**
 * Capitalizes the first letter of a string
 */
function capitalize(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Fetches photos for a given travel destination name
 * from the Unsplash API.
 */
async function fetchPhotoForDestination(query: string): Promise<Destination> {
  const params = new URLSearchParams({
    query,
    per_page: '1',
    orientation: 'landscape',
  });

  const response = await fetch(`${UNSPLASH_API_URL}?${params}`, {
    headers: {
      Authorization: `Client-ID ${API_KEY}`,
    },
  });

  if (response.status === 403) {
    console.error('Unsplash API rate limit reached!');
    throw new Error('API rate limit exceeded. Try again later.');
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error(
      'Unsplash API error:',
      response.status,
      errorData || response.statusText
    );
    throw new Error(`Failed to fetch image for ${query}`);
  }

  const data = await response.json();
  const photo = data.results[0];

  if (!photo) {
    throw new Error(`No photo found for query: ${query}`);
  }

  let descriptionText =
    photo.alt_description?.length > 51
      ? photo.alt_description.slice(0, 51) + '…'
      : photo.alt_description || `A beautiful photo from ${query}.`;

  // ✅ Capitalize first letter
  descriptionText = capitalize(descriptionText);

  return {
    id: photo.id,
    name: query,
    description: descriptionText,
    image: photo.urls.small,
    photographer: photo.user.name,
    profileUrl: photo.user.links.html,
  };
}

/**
 * Fetches a list of travel destinations, each with
 * a real Unsplash image.
 */
export const getDestinations = async (): Promise<Destination[]> => {
  const destinations = [
    'Annapurna Circuit',
    'Bali',
    'Caucasus',
    'Hoi An',
    'Innsbruck',
    'Kathmandu',
    'Kenya',
    'Lake District',
    'Kyoto',
    'Sarajevo',
    'Riga',
    'Vienna'
  ];

  const promises = destinations.map((name) =>
    fetchPhotoForDestination(name).catch((error) => {
      console.error(`Error fetching photo for ${name}:`, error);
      // Provide a fallback object
      return {
        id: `${name}-fallback`,
        name,
        description: `No image available for ${name}.`,
        image: 'https://placehold.co/600x400?text=No+Image',
        photographer: 'Unknown',
        profileUrl: '#',
      };
    })
  );

  const results = await Promise.all(promises);

  // ✅ sort alphabetically
  return results.sort((a, b) => a.name.localeCompare(b.name));
};