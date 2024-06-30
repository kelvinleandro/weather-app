interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  localtime: string;
}

interface Condition {
  text: string;
  icon: string;
  code: number;
}

interface Current {
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  feelslike_c: number;
  feelslike_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
}

interface Day {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  avghumidity: number;
  condition: Condition;
}

interface Astro {
  sunrise: string;
  sunset: string;
}

interface HourlyForecast {
  time: string;
  temp_c: number;
  temp_f: number;
  condition: Condition;
  humidity: number;
  feelslike_c: number;
  feelslike_f: number;
}

interface ForecastDay {
  date: string;
  day: Day;
  astro: Astro;
  hour: HourlyForecast[];
}

interface Forecast {
  forecastday: ForecastDay[];
}

interface ForecastResponse {
  location: Location;
  current: Current;
  forecast: Forecast;
}

interface LocationData extends Omit<Location, "localtime"> {
  id: number;
}

type AutoCompleteResponse = LocationData[];

export { ForecastResponse, AutoCompleteResponse, HourlyForecast };
