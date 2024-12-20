# Progetto Didattico API Meteo

Questo starter kit è stato creato con lo scopo di facilitare il setup del progetto per focalizzare l'attenzione sulle funzionalità richieste dall'esercizio.

### Icone Meteo

Per facilitare lo sviluppo, il progetto include già:

- Una collezione completa di icone meteo nella cartella `public/weather-icons/`
- Una funzione di utilità `getWeatherEmoji` nel file `src/lib/utils.js` che seleziona automaticamente l'icona appropriata in base al codice meteo fornito da Open-Meteo
- Supporto per visualizzazioni diurne e notturne delle condizioni meteorologiche

La funzione `getWeatherEmoji` accetta due parametri:

- `code`: il codice meteo fornito da Open-Meteo
- `isDay`: un booleano che indica se è giorno o notte (default: true)

## Struttura del Progetto

Il progetto è strutturato come segue:

```
├── src/
│ ├── App.jsx # Componente principale dell'applicazione
│ └── lib/ # Utility e funzioni di supporto
│   └── utils.js # Funzione per ottenere l'icona del meteo
└── public/ # File statici compreso le icone del meteo
  └── weather-icons/ # Icone meteo
```

## Come Iniziare

1. Clonare il repository
2. Navigare nella cartella `starter-kit`
3. Installare le dipendenze con `npm install`
4. Avviare l'applicazione in modalità sviluppo con `npm run dev`;

## Open-Meteo API

Per ottenere i dati meteo di una città, segui questi semplici passi:

1. **Trova le coordinate geografiche della città**
   Usa l'API di Geocoding:

   ```
   https://geocoding-api.open-meteo.com/v1/search?name=NOME_CITTÀ
   ```

   Esempio per Roma: `https://geocoding-api.open-meteo.com/v1/search?name=Roma`

2. **Ottieni il meteo usando le coordinate**
   Una volta ottenute le coordinate (esempio: Roma lat=41.89, lon=12.48), usa:
   ```
   https://api.open-meteo.com/v1/forecast?latitude=41.89&longitude=12.48&current=temperature_2m,wind_speed_10m
   ```

La risposta sarà in formato JSON:

```
{
  "current": {
    "temperature_2m": 25.4,
    "wind_speed_10m": 10.2
  }
}
```

**Vantaggi di Open-Meteo:**

- Gratuito per uso non commerciale
- Non richiede chiavi API
- Aggiornamenti orari
- Alta precisione (risoluzione 1km)
