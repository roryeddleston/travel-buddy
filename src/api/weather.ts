const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY as string;

export interface WeatherData {
  temperature: number;
  description: string;
  iconUrl: string;
}

export async function fetchWeather(city: string): Promise<WeatherData> {
  const url = `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok || data.cod !== 200) {
    throw new Error(data.message || 'Failed to fetch weather');
  }

  return {
    temperature: data.main?.temp ?? 0,
    description: data.weather?.[0]?.description ?? 'Unavailable',
    iconUrl: data.weather?.[0]?.icon
      ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      : '',
  };
}