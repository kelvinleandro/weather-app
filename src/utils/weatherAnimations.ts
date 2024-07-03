// Importing the Lottie JSON files
const animations = {
  day: {
    sunny: require("@/assets/day_sunny.json"),
    partlyCloudy: require("@/assets/day_partly_cloudy.json"),
    rain: require("@/assets/day_rain.json"),
    snow: require("@/assets/day_snow.json"),
    storm: require("@/assets/day_storm.json"),
  },
  night: {
    clear: require("@/assets/night_clear.json"),
    partlyCloudy: require("@/assets/night_partly_cloudy.json"),
    rain: require("@/assets/night_rain.json"),
    snow: require("@/assets/night_snow.json"),
  },
  common: {
    cloudy: require("@/assets/cloudy.json"),
    lightRain: require("@/assets/light_rain.json"),
    mist: require("@/assets/mist.json"),
    sleet: require("@/assets/sleet.json"),
    snow: require("@/assets/snow.json"),
    thunderRain: require("@/assets/storm_thunder_rain.json"),
    thundery: require("@/assets/thundery.json"),
  },
};

type DayAnimations = keyof typeof animations.day;
type NightAnimations = keyof typeof animations.night;
type CommonAnimations = keyof typeof animations.common;
type WeatherConditionMap = {
  [key: number]: {
    day?: DayAnimations;
    night?: NightAnimations;
    common?: CommonAnimations;
  };
};

// Define weather condition codes mapping
const weatherConditionMap: WeatherConditionMap = {
  1000: { day: "sunny", night: "clear" }, // Sunny/Clear
  1003: { day: "partlyCloudy", night: "partlyCloudy" }, // Partly cloudy
  1006: { common: "cloudy" }, // Cloudy
  1009: { common: "cloudy" }, // Overcast
  1030: { common: "mist" }, // Mist
  1063: { common: "lightRain" }, // Patchy rain possible
  1066: { day: "snow", night: "snow" }, // Patchy snow possible
  1069: { day: "snow", night: "snow" }, // Patchy sleet possible
  1072: { day: "snow", night: "snow" }, // Patchy freezing drizzle possible
  1087: { common: "thundery" }, // Thundery outbreaks possible
  1114: { day: "snow", night: "snow" }, // Blowing snow
  1117: { day: "snow", night: "snow" }, // Blizzard
  1135: { common: "mist" }, // Fog
  1147: { common: "mist" }, // Freezing fog
  1150: { common: "lightRain" }, // Patchy light drizzle
  1153: { common: "lightRain" }, // Light drizzle
  1168: { common: "lightRain" }, // Freezing drizzle
  1171: { common: "lightRain" }, // Heavy freezing drizzle
  1180: { common: "lightRain" }, // Patchy light rain
  1183: { day: "rain", night: "rain" }, // Light rain
  1186: { day: "rain", night: "rain" }, // Moderate rain at times
  1189: { day: "rain", night: "rain" }, // Moderate rain
  1192: { day: "rain", night: "rain" }, // Heavy rain at times
  1195: { day: "rain", night: "rain" }, // Heavy rain
  1198: { common: "lightRain" }, // Light freezing rain
  1201: { day: "rain", night: "rain" }, // Moderate or heavy freezing rain
  1204: { day: "snow", night: "snow" }, // Light sleet
  1207: { day: "snow", night: "snow" }, // Moderate or heavy sleet
  1210: { day: "snow", night: "snow" }, // Patchy light snow
  1213: { day: "snow", night: "snow" }, // Light snow
  1216: { day: "snow", night: "snow" }, // Patchy moderate snow
  1219: { day: "snow", night: "snow" }, // Moderate snow
  1222: { day: "snow", night: "snow" }, // Patchy heavy snow
  1225: { day: "snow", night: "snow" }, // Heavy snow
  1237: { day: "snow", night: "snow" }, // Ice pellets
  1240: { common: "lightRain" }, // Light rain shower
  1243: { day: "rain", night: "rain" }, // Moderate or heavy rain shower
  1246: { day: "rain", night: "rain" }, // Torrential rain shower
  1249: { day: "snow", night: "snow" }, // Light sleet showers
  1252: { day: "snow", night: "snow" }, // Moderate or heavy sleet showers
  1255: { day: "snow", night: "snow" }, // Light snow showers
  1258: { day: "snow", night: "snow" }, // Moderate or heavy snow showers
  1261: { day: "snow", night: "snow" }, // Light showers of ice pellets
  1264: { day: "snow", night: "snow" }, // Moderate or heavy showers of ice pellets
  1273: { common: "thunderRain" }, // Patchy light rain with thunder
  1276: { common: "thunderRain" }, // Moderate or heavy rain with thunder
  1279: { common: "thunderRain" }, // Patchy light snow with thunder
  1282: { common: "thunderRain" }, // Moderate or heavy snow with thunder
};

type TimeOfDay = "day" | "night";

export function getWeatherAnimation(conditionCode: number, isDay: number) {
  const timeOfDay: TimeOfDay = isDay === 1 ? "day" : "night";
  const mappedCondition = weatherConditionMap[conditionCode];
  let animation;

  if (mappedCondition) {
    if (mappedCondition.common) {
      animation = animations.common[mappedCondition.common];
    } else if (timeOfDay === "day" && mappedCondition.day) {
      animation = animations.day[mappedCondition.day];
    } else if (timeOfDay === "night" && mappedCondition.night) {
      animation = animations.night[mappedCondition.night];
    }
  }

  // Default to a placeholder animation if condition not found
  if (!animation) {
    animation =
      timeOfDay === "day" ? animations.day.sunny : animations.night.clear;
  }

  return animation;
}
