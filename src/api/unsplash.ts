export interface UnsplashPhoto {
  id: string;
  url: string;
  photographer: string;
  profileUrl: string;
}

const API_URL = 'https://api.unsplash.com/search/photos';
const API_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY as string;

export async function fetchPhotos(query: string, perPage = 12): Promise<UnsplashPhoto[]> {
  const params = new URLSearchParams({
    query,
    per_page: perPage.toString(),
  });

  const response = await fetch(`${API_URL}?${params}`, {
    headers: {
      Authorization: `Client-ID ${API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Unsplash photos');
  }

  const data = await response.json();

  return data.results.map((photo: any) => ({
    id: photo.id,
    url: photo.urls.small,
    photographer: photo.user.name,
    profileUrl: photo.user.links.html,
  }));
}