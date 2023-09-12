import citiesList from './cities.json'
import styles from './WeatherForecast.module.scss'
import cn from 'classnames'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addRegions, loadWeatherForecast, removeWeatherForecast } from './weatherForecastSlice'
import { ReactComponent as UmbrellaIcon } from './assets/umbrella.svg'
import { WeatherForecastCard } from '../index'
import { removeParams } from '../applicationParamsSlice'
import { useDebounce } from '../../helpers/index'

export const WeatherForecast = () => {
    const dispatch = useDispatch()
    const WeatherForecast = useSelector(state => state.weatherForecastState.weatherForecast)
    const userParams = useSelector(state => state.userParams.applicationParams)
    const [regionsMap, setRegionsMap] = useState(null)
    const [regions, setRegions] = useState([])
    const [region, setRegion] = useState('')
    const inputRef = useRef()
    const debounceRegion = useDebounce(region, 500)
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

    useEffect(() => {
        if (inputRef.current.value !== '') {
            setRegions(() => filteredSlice.filter(item => item.toLocaleLowerCase().includes(inputRef.current.value.toLocaleLowerCase())))
        }
        else {
            setRegions(filteredSlice)
        }
    }, [debounceRegion, filteredSlice])

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
        if (Object.entries(userParams).length !== 0) {
            dispatch(removeParams())
        }
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
        if (Object.entries(userParams).length !== 0) {
            dispatch(removeParams())
        }
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
                            ref={inputRef}
                            type='text' placeholder='Введите регион РФ'
                            value={region} name='region' autoComplete="off"
                            onFocus={() => changeInputState({
                                ...inputState,
                                region: true,
                            })}
                            onChange={(e) => {
                                setRegion(e.target.value)
                                // setRegions(() => filteredSlice.filter(item => item.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())))
                            }}
                            onPaste={(e) => {
                                e.preventDefault()
                                setRegion(e.clipboardData.getData('Text'))
                                if (e.clipboardData.getData('Text').length >= 4) {
                                    changeActiveCitySelector(true)
                                }
                                setRegions(() => filteredSlice.filter(item => item.toLocaleLowerCase().includes(e.clipboardData.getData('Text').toLocaleLowerCase())))
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
                                    setCity('')
                                    setTimeout(() => {
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
                                    }, [0])
                                }}
                            >{city['Город']}</p>
                        }) : null
                        }
                    </div>
                </div>
            </div>
            {WeatherForecast.list && city ?
                <WeatherForecastCard props={{ query, city, population }} />
                : null}
        </div>
    </>
}