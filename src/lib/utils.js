import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getWeatherEmoji = (code, isDay = true) => {
  const weatherCodes = {
    0: {
      day: "/weather-icons/sunny.png",
      night: "/weather-icons/moon-stars.png",
    },
    1: {
      day: "/weather-icons/partly-cloudy.png",
      night: "/weather-icons/partly-cloudy-night.png",
    },
    2: {
      day: "/weather-icons/sun-cloudy.png",
      night: "/weather-icons/moon-cloudy.png",
    },
    3: {
      day: "/weather-icons/cloudy.png",
      night: "/weather-icons/cloudy.png",
    },
    45: {
      day: "/weather-icons/fog.png",
      night: "/weather-icons/fog.png",
    },
    48: {
      day: "/weather-icons/fog.png",
      night: "/weather-icons/fog.png",
    },
    51: {
      day: "/weather-icons/light-rain.png",
      night: "/weather-icons/light-rain.png",
    },
    53: {
      day: "/weather-icons/moderate-rain.png",
      night: "/weather-icons/moderate-rain.png",
    },
    55: {
      day: "/weather-icons/heavy-rain.png",
      night: "/weather-icons/heavy-rain.png",
    },
    56: {
      day: "/weather-icons/hail.png",
      night: "/weather-icons/hail.png",
    },
    57: {
      day: "/weather-icons/hail.png",
      night: "/weather-icons/hail.png",
    },
    61: {
      day: "/weather-icons/light-rain.png",
      night: "/weather-icons/light-rain.png",
    },
    63: {
      day: "/weather-icons/moderate-rain.png",
      night: "/weather-icons/moderate-rain.png",
    },
    65: {
      day: "/weather-icons/heavy-rain.png",
      night: "/weather-icons/heavy-rain.png",
    },
    66: {
      day: "/weather-icons/hail.png",
      night: "/weather-icons/hail.png",
    },
    67: {
      day: "/weather-icons/hail.png",
      night: "/weather-icons/hail.png",
    },
    71: {
      day: "/weather-icons/light-snow.png",
      night: "/weather-icons/light-snow.png",
    },
    73: {
      day: "/weather-icons/moderate-snow.png",
      night: "/weather-icons/moderate-snow.png",
    },
    75: {
      day: "/weather-icons/heavy-snow.png",
      night: "/weather-icons/heavy-snow.png",
    },
    77: {
      day: "/weather-icons/light-snow.png",
      night: "/weather-icons/light-snow.png",
    },
    80: {
      day: "/weather-icons/light-rain.png",
      night: "/weather-icons/light-rain.png",
    },
    81: {
      day: "/weather-icons/moderate-rain.png",
      night: "/weather-icons/moderate-rain.png",
    },
    82: {
      day: "/weather-icons/heavy-rain.png",
      night: "/weather-icons/heavy-rain.png",
    },
    85: {
      day: "/weather-icons/light-snow.png",
      night: "/weather-icons/light-snow.png",
    },
    86: {
      day: "/weather-icons/heavy-snow.png",
      night: "/weather-icons/heavy-snow.png",
    },
    95: {
      day: "/weather-icons/lightning.png",
      night: "/weather-icons/lightning.png",
    },
    96: {
      day: "/weather-icons/thunderstorm.png",
      night: "/weather-icons/thunderstorm.png",
    },
    99: {
      day: "/weather-icons/thunderstorm.png",
      night: "/weather-icons/thunderstorm.png",
    },
    default: {
      day: "/weather-icons/N-A.png",
      night: "/weather-icons/N-A.png",
    },
  };
  return (
    weatherCodes[code]?.[isDay ? "day" : "night"] ||
    weatherCodes.default[isDay ? "day" : "night"]
  );
};


