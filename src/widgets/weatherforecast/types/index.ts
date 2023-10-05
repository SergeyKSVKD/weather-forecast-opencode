export type City = {
    "Индекс"?: number,
    "Тип региона"?: string,
    "Регион"?: string,
    "Тип района"?: string,
    "Район"?: string,
    "Тип города"?: string,
    "Город": string,
    "Тип н / п"?: string,
    "Н / п"?: string,
    "Код КЛАДР"?: string,
    "Код ФИАС"?: string,
    "Уровень по ФИАС"?: string,
    "Признак центра района или региона"?: number,
    "Код ОКАТО"?: number,
    "Код ОКТМО"?: number,
    "Код ИФНС"?: string,
    "Часовой пояс"?: string,
    "Широта": number,
    "Долгота": number,
    "Федеральный округ"?: string,
    "Население": number,
}

export type Region = string

type MainWFProp = {
    "temp": number,
    "feels_like": number,
    "temp_min": number,
    "temp_max": number,
    "pressure": number,
    "sea_level": number,
    "grnd_level": number,
    "humidity": number,
    "temp_kf": number
}

type WeatherProp = {
    "id": number,
    "main": string,
    "description": string,
    "icon": string
}

type WindProp = {
    "speed": number,
    "deg": number,
    "gust": number
}


export type QueryProp = {
    'lat': number
    'lon': number
}

export type WeatherForecast = {
    "dt": number, 
    "main": MainWFProp,
    "weather": [WeatherProp],
    "clouds": {"all": number},
    "wind": WindProp,
    "visibility": number,
    "pop": number,
    "sys": {"pod": string},
    "dt_txt": string
}

export type InfoProp = {
          cod: string,
          message: number,
          cnt: number,
          list: WeatherForecast[],
          city: {
            id: number,
            name: string,
            coord: QueryProp,
            country: string,
            population: number,
            timezone: number,
            sunrise: number,
            sunset: number
          }
}

export interface CardProp {
    "props": {
        query: QueryProp
        cityTitle: string
        population: number
    }
} 