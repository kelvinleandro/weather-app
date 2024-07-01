import axios from "axios";
import { AutoCompleteResponse, ForecastResponse } from "@/types/weatherApi";

const weatherApi = axios.create({
  baseURL: "https://api.weatherapi.com/v1",
  params: {
    key: process.env.EXPO_PUBLIC_WEATHER_API_KEY,
  },
});

async function fetchAutocomplete(query: string): Promise<AutoCompleteResponse> {
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

async function fetchForecast(lat: number, lon: number): Promise<ForecastResponse> {
  try {
    const response = await weatherApi.get("/forecast.json", {
      params: {
        q: `${lat},${lon}`,
        days: 5,
        aqi: "no",
        alerts: "no",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    throw error;
  }
}

export { fetchAutocomplete, fetchForecast };
