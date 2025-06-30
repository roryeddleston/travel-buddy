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

  return {
    id: photo.id,
    name: query,
    description: photo.alt_description || `A beautiful photo from ${query}.`,
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
  const destinations = ['Bali', 'Kyoto', 'Paris', 'Cape Town'];

  const promises = destinations.map((name) =>
    fetchPhotoForDestination(name)
      .catch((error) => {
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

  return Promise.all(promises);
};