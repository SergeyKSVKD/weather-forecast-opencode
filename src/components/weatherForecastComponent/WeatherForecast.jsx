import citiesList from './cities.json'
import styles from './WeatherForecast.module.scss'
import cn from 'classnames'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addRegions, loadWeatherForecast, removeWeatherForecast } from './weatherForecastSlice'
import { ReactComponent as UmbrellaIcon } from './assets/umbrella.svg'

export const WeatherForecast = () => {
    const dispatch = useDispatch()
    const WeatherForecast = useSelector(state => state.weatherForecastState.weatherForecast)
    const [regionsMap, setRegionsMap] = useState(null)
    const [regions, setRegions] = useState([])
    const [region, setRegion] = useState('')
    const [cities, setCities] = useState([])
    const [city, setCity] = useState('')
    const [population, setPopulation] = useState(0)
    const filteredSlice = useSelector(state => state.regionsState.regions)
    const [activeCitySelector, changeActiveCitySelector] = useState(false)


    const initialInputState = {
        region: false,
        city: false,
    }
    const [inputState, changeInputState] = useState(initialInputState)
    const [query, setQuery] = useState({
        'lat': 0,
        'lon': 0,
    })

    useEffect(() => {
        let regionsMap = new Map()
        let regions = []
        citiesList.map(city => regions.push(`${city['Регион']} ${city['Тип региона']}.`))
        regions = Array.from(new Set(regions))
        regions.map(region => {
            regionsMap.set(region, [])
        })
        for (const [key, ,] of regionsMap) {
            const citiesOfRegion = citiesList.filter(city => city['Регион'].includes(key.split(' ')[0]))
            regionsMap.set(key, citiesOfRegion)
        }
        const serializable = Object.fromEntries(regionsMap)
        dispatch(addRegions(regions))
        setRegions(regions)
        setRegionsMap(regionsMap)
    }, [])

    useEffect(() => {
        if (activeCitySelector && region.length >= 4) {
            const cities = regionsMap.get(region)
            setCities(cities);
        }
    }, [region, city])

    useEffect(() => {
        if (query.lat != 0 && query.lon != 0) {
            dispatch(loadWeatherForecast(query))
        }
    }, [city])

    function removeAllActivity() {
        if (WeatherForecast.length != 0) {
            dispatch(removeWeatherForecast())
        }
        changeActiveCitySelector(false)
        setRegions(filteredSlice)
        setRegion('')
        setCity('')
        setCities([])
        setQuery({
            'lat': 0,
            'lon': 0,
        })
    }

    function removeAllCityActivity() {
        if (WeatherForecast.length != 0) {
            dispatch(removeWeatherForecast())
        }
        setCity('')
        setCities([])
        setQuery({
            'lat': 0,
            'lon': 0,
        })
    }

    function stopEventBubbling(e) {
        e.stopPropagation()
    }

    return <>
        <div className={styles.background}
            onClick={() => changeInputState(initialInputState)}
        >
            <div className={styles.header}>
                <div className={styles.logo}>
                    <img src={require('./assets/logo_white_cropped.png')} alt="logo_white_cropped.png" />
                </div>
                <span>Погода в России</span>
                <UmbrellaIcon />
            </div>
            <div className={styles.search__container}>
                <div>
                    <div className={styles.input__container}>
                        <input className={styles.select}
                            type='text' placeholder='Введите регион РФ'
                            value={region} name='region' autoComplete="off"
                            onFocus={() => changeInputState({
                                ...inputState,
                                region: true,
                            })}
                            onChange={(e) => {
                                setRegion(e.target.value)
                                setRegions(() => filteredSlice.filter(item => item.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())))
                            }}
                            onClick={e => stopEventBubbling(e)}
                        />
                        <span className={styles.close__button}
                            onClick={removeAllActivity}
                        >&#10006;</span>
                    </div>
                    <div className={cn(styles.select__container, {
                        [styles.active]: inputState.region
                    })}
                        onClick={e => stopEventBubbling(e)}
                    >
                        {regions.map((region, index) => {
                            return <p key={index + 1}
                                onClick={() => {
                                    setRegion(region)
                                    changeActiveCitySelector(true)
                                    setCity('')
                                    setRegions(() => filteredSlice.filter(item => item.toLocaleLowerCase().includes(region.toLocaleLowerCase())))
                                    changeInputState({
                                        ...inputState,
                                        region: false,
                                    })
                                }}
                            >{region}</p>
                        })}
                    </div>
                </div>
                <div>
                    <div className={styles.input__container}>
                        <input className={cn(styles.select, {
                            [styles.disabled]: !activeCitySelector
                        })}
                            type='text' placeholder='Выберите город'
                            value={city} name='city' autoComplete="off"
                            onFocus={() => changeInputState({
                                ...inputState,
                                city: true,
                            })}
                            disabled={activeCitySelector ? '' : 'disabled'}
                            // onChange={(e) => {
                            //     setCity(e.target.value)
                            // }}
                            onClick={e => stopEventBubbling(e)}
                        />
                        <span className={styles.close__button}
                            onClick={removeAllCityActivity}
                        >&#10006;</span>
                    </div>
                    <div className={cn(styles.select__container, {
                        [styles.active]: inputState.city
                    })}
                        onClick={e => stopEventBubbling(e)}
                    >
                        {cities ? cities.map((city, index) => {
                            return <p key={index + 1}
                                onClick={() => {
                                    setCity(city['Город'])
                                    setPopulation(city['Население'])
                                    changeInputState({
                                        ...inputState,
                                        city: false,
                                    })
                                    setQuery({
                                        'lat': city['Широта'],
                                        'lon': city['Долгота'],
                                    })
                                }}
                            >{city['Город']}</p>
                        }) : null
                        }
                    </div>
                </div>
            </div>
            {WeatherForecast.list ?
                <div className={styles.weatherForecastCard}>
                    {query.lon != 0 && query.lat != 0 ?
                        <div>
                            <p>{city}</p>
                            <br />
                            <p>{population > WeatherForecast.city.population ? population : WeatherForecast.city.population}</p>
                            <br />
                            <p>Широта: {query.lat}</p>
                            <p>Долгота: {query.lon}</p>
                        </div>
                        : null
                    }
                    <div>
                        {WeatherForecast.list ?
                            <>
                                <p>{WeatherForecast.list[0].dt_txt}</p>
                                <p>{WeatherForecast.list[0].weather[0].description}</p>
                                <img src={`https://openweathermap.org/img/wn/` + WeatherForecast.list[0].weather[0].icon + `@2x.png`} alt="" />
                                <p>Температура:  +{' '}{WeatherForecast.list[0].main.temp}&deg;C</p>
                                <p>Ощущается как: +{' '}{WeatherForecast.list[0].main.feels_like}&deg;C</p>
                                <p>Давление: {Math.ceil(WeatherForecast.list[0].main.grnd_level * 0.750064)} мм рт. ст.</p>
                                <p>Влажность: {WeatherForecast.list[0].main.humidity}%</p>
                                <p>Ветер: {WeatherForecast.list[0].wind.speed} м/с</p>
                            </>
                            : null}
                    </div>
                </div>
                : null}
        </div>
    </>
}