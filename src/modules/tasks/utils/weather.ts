import axios from 'axios';
import { BadRequestError } from '@aptana/multichannel-common';
import moment from 'moment-timezone';

export async function fetchWeather(city?: string): Promise<any> {
  if (!city) {
    return null;
  }

  try {
    const { data: geoData } = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`, { timeout: 5000 });
    const location = geoData.results?.[0];

    if (!location) {
      throw new BadRequestError('City not found');
    }

    const { data: weatherData } = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`, { timeout: 5000 });
    const currentWeather = weatherData.current_weather;

    if (!currentWeather) {
      throw new BadRequestError('Weather information not available');
    }

    return {
      city: location.name,
      temperatureCelsius: currentWeather.temperature,
      windSpeedKmh: currentWeather.windspeed,
      fetchedAt: moment.utc(currentWeather.time).toISOString()
    };
  } catch (error) {
    if (error instanceof BadRequestError) {
      throw error;
    }

    return null;
  }
}
