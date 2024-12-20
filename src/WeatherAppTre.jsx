import { useState } from 'react';
import { getWeatherEmoji } from './lib/utils';
import { Droplets, Moon, Sun, Wind } from 'lucide-react';

function WeatherAppTre() {
    const [searchQuery, setSearchQuery] = useState('');
    const [geoData, setGeoData] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = () => {
        setGeoData(null);
        setWeatherData(null);
        setError(null);
        setLoading(true);

        // Fetch per il geocoding
        fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchQuery)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Errore nella richiesta geocoding: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                setGeoData(data);
                if (data.results && data.results.length > 0) {
                    const { latitude, longitude } = data.results[0];
                    return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,relative_humidity_2m,wind_speed_10m,uv_index&hourly=temperature_2m,is_day,weathercode&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`);
                } else {
                    throw new Error('Città non trovata');
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Errore nella richiesta meteo: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                setWeatherData(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    };

    const getTimeAndDayStatus = (index, timezone) => {
        const localTime = new Date().toLocaleString('en-US', { timeZone: timezone });
        const localHour = new Date(localTime).getHours();
        const forecastHour = (localHour + index) % 24;
        const formattedTime = new Intl.NumberFormat('en-US', { minimumIntegerDigits: 2 }).format(forecastHour) + ':00';

        const dayStatus = forecastHour >= 6 && forecastHour <= 18 ? 'Giorno' : 'Notte';
        return { time: formattedTime, dayStatus };
    };

    const daysOfWeek = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Il meteo della tua città</h1>
            <div className="flex justify-center mb-6 flex-col sm:flex-row">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Inserisci la città"
                    className="p-3 rounded-l-md text-gray-800 focus:outline-none w-full sm:w-auto"
                />
                <button onClick={handleSearch} className="p-3 bg-blue-500 rounded-r-md hover:bg-blue-600 mt-3 sm:mt-0 sm:ml-2 w-full sm:w-auto">
                    Cerca
                </button>
            </div>

            {error && <p className="text-red-500 text-center mb-6">{error}</p>}

            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full border-t-4 border-blue-500 w-12 h-12"></div>
                    <p className="ml-4">Caricamento in corso...</p>
                </div>
            ) : (
                weatherData && (
                    <div className="space-y-6">

                        {/* Info correnti */}
                        <div className="p-6 bg-gray-800 rounded-lg shadow-md">
                            <div className='flex flex-col sm:flex-row justify-between items-center'>
                                <div>
                                    <p className='font-bold text-3xl text-center md:text-left lg:text-left'> {geoData.results[0].name}</p>
                                    <p className='italic text-muted-foreground text-center md:text-left lg:text-left'>Probabilità di pioggia: {weatherData.daily.precipitation_probability_max[0]}%</p>
                                    <p className='text-6xl font-bold'> {weatherData.current.temperature_2m}°C</p>
                                </div>
                                <img
                                    src={getWeatherEmoji(weatherData.hourly.weathercode[0], getTimeAndDayStatus(0, weatherData.timezone).dayStatus === 'Giorno')}
                                    alt="Weather Icon"
                                    className="w-16 h-16 mt-2"
                                />
                            </div>
                        </div>

                        {/* Condizioni Dettagliate */}
                        <div className="p-6 bg-gray-800 rounded-lg shadow-md">
                            <p className='font-bold text-2xl mb-4'>Condizioni Aria</p>
                            <div className="grid lg:grid-cols-2 grid-cols-2 gap-4">
                                <div>
                                    <div className='flex items-center gap-3'>
                                        <div className="p-2 rounded-md border lg:mb-2 mb-0">
                                            <Moon className="h-5 w-5" />
                                        </div>
                                        <p className='text-muted-foreground'>Temperatura percepita: <span className='text-xl'>{weatherData.current.temperature_2m}°C</span></p>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <div className="p-2 rounded-md border">
                                            <Droplets className="h-5 w-5" />
                                        </div>
                                        <p className='text-muted-foreground'>Umidità: <span className='text-xl'>{weatherData.current.relative_humidity_2m}%</span></p>
                                    </div>
                                </div>
                                <div>
                                    <div className='flex items-center gap-3'>
                                        <div className="p-2 rounded-md border lg:mb-2 mb-0">
                                            <Wind className="h-5 w-5" />
                                        </div>
                                        <p className='text-muted-foreground'>Velocità del vento: <span className='text-xl'>{weatherData.current.wind_speed_10m} km/h</span></p>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <div className="p-2 rounded-md border">
                                            <Sun className="h-5 w-5" />
                                        </div>
                                        <p className='text-muted-foreground'>Indice UV: <span className='text-xl'>{weatherData.current.uv_index}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Previsioni per le prossime 6 ore */}
                        <div className="p-6 bg-gray-800 rounded-lg shadow-md">
                            <p className='font-bold text-2xl mb-4'>Previsioni per le prossime 6 ore</p>
                            <ul className="grid grid-cols-2 sm:grid-cols-6 gap-4">
                                {weatherData.hourly.temperature_2m.slice(0, 6).map((temp, index) => {
                                    const { time, dayStatus } = getTimeAndDayStatus(index, weatherData.timezone);

                                    return (
                                        <div key={index} className="text-center">
                                            <p className="text-sm mb-2">
                                                {time}
                                            </p>
                                            <div className="flex justify-center mb-2">
                                                <img
                                                    src={getWeatherEmoji(weatherData.hourly.weathercode[index], dayStatus === 'Giorno')}
                                                    alt={`Weather Icon Hour ${index + 1}`}
                                                    className="w-16 h-16"
                                                />
                                            </div>
                                            <p className="text-sm">
                                                {temp}°C
                                            </p>
                                        </div>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* Previsioni a 7 giorni */}
                        <div className="p-6 bg-gray-800 rounded-lg shadow-md">
                            <p className='font-bold text-2xl mb-4'>Previsioni a 7 giorni</p>
                            <ul className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
                                {weatherData.daily.temperature_2m_max.map((temp, index) => {
                                    const dayName = daysOfWeek[(new Date().getDay() + index) % 7];
                                    const minTemp = weatherData.daily.temperature_2m_min[index];

                                    return (
                                        <div key={index} className="text-center">
                                            <p className="text-sm mb-2">{dayName}</p>
                                            <div className="flex justify-center mb-2">
                                                <img
                                                    src={getWeatherEmoji(weatherData.hourly.weathercode[index])}
                                                    alt={`Weather Icon Day ${index + 1}`}
                                                    className="w-16 h-16"
                                                />
                                            </div>
                                            <p className="text-sm">{temp}°C | {minTemp}°C</p>
                                        </div>
                                    );
                                })}
                            </ul>
                        </div>

                    </div>
                )
            )}
        </div>
    );
}

export default WeatherAppTre;
