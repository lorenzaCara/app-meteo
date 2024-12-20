import { Moon, Wind, Droplets, Sun } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { getWeatherEmoji } from '@/lib/utils';

export default function WeatherDisplay({ data }) {
    // Funzione per determinare l'icona in base alla condizione meteo
    const getWeatherIcon = (condition, isDay) => {
        const iconUrl = getWeatherEmoji(condition, isDay);
        if (!iconUrl) return null;

        return (
            <img
                src={iconUrl}
                alt={`Icona meteo: ${condition}`}
                className="h-16 w-16 mx-auto"
            />
        );
    };

    return (
        <div className="w-full max-w-3xl space-y-6">
            <div>
                <h1 className="text-4xl font-bold mb-2 text-white">{data.city}</h1>
                <p className="text-muted-foreground">
                    Probabilità di pioggia: {data.rainProbability}%
                </p>
                <div className="flex items-center gap-4 mt-4 text-white">
                    <span className="text-7xl font-bold">{data.currentTemp}°</span>
                    {data.conditions.weather && 
                        getWeatherIcon(data.conditions.weather, true)} {/* Condizione meteo */}
                </div>
            </div>

            {/* Previsioni orarie */}
            {data.hourlyForecast && (
                <Card className="p-4">
                    <h2 className="font-semibold mb-4">PREVISIONI DI OGGI</h2>
                    <div className="grid grid-cols-6 gap-4">
                        {data.hourlyForecast.map((forecast, index) => (
                            <div key={index} className="text-center">
                                <p className="text-sm mb-2">
                                    {new Date(forecast.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                                {getWeatherIcon(forecast.weather, true)} {/* Icona meteo per previsione */}
                                <p className="text-sm">{forecast.temp}°</p>
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {/* Condizioni dell'aria */}
            {data.conditions && (
                <Card className="p-4">
                    <h2 className="font-semibold mb-4">CONDIZIONI DELL&apos;ARIA</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-muted rounded-md">
                                <Moon className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Temperatura percepita</p>
                                <p className="text-xl">{data.conditions.feelsLike || 'N/D'}°</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-muted rounded-md">
                                <Wind className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Vento</p>
                                <p className="text-xl">{data.conditions.windSpeed || 'N/D'} km/h</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-muted rounded-md">
                                <Droplets className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Umidità</p>
                                <p className="text-xl">{data.conditions.humidity || 'N/D'}%</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-muted rounded-md">
                                <Sun className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">UV index</p>
                                <p className="text-xl">{data.conditions.uvIndex || 'N/D'}</p>
                            </div>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
}
