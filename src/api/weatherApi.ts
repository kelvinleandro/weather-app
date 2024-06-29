import axios from "axios";

const weatherApi = axios.create({
  baseURL: "http://api.weatherapi.com/v1",
  params: {
    key: process.env.WEATHER_API_KEY,
  },
});

async function fetchAutocomplete(query: string) {
  try {
    const response = await weatherApi.get("/search.json", {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching autocomplete data:", error);
    throw error;
  }
}

async function fetchForecast(lat: number, lon: number) {
  try {
    const response = await weatherApi.get("/forecast.json", {
      params: {
        q: `${lat},${lon}`,
        days: 5,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    throw error;
  }
}

export { fetchAutocomplete, fetchForecast };
