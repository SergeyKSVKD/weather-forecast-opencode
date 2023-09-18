import citiesList from '../../../../shared/cities.json'
import styles from './search-control-view.module.scss'
import cn from 'classnames'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeParams } from '../../features/store-slice/applicationParamsSlice'
import { loadWeatherForecast, removeWeatherForecast } from '../../features/store-slice/weatherForecastSlice'
import { addRegions } from '../../features/store-slice/regionsSlice'
import { addCities, addCity } from '../../features/store-slice/citiesSlice'
import * as selectors from '../../features/selectors'
import { useDebounce } from '../../../../shared/helpers/index'
import { useInputControl } from '../../features/input-control/useInputControl'

export const SearchControlView = () => {
    const dispatch = useDispatch()
    const weatherForecast = useSelector(selectors.weatherForecast)
    const userParams = useSelector(selectors.userParams)
    const filteredSlice = useSelector(selectors.regions)
    const [regionsMap, setRegionsMap] = useState(null)
    const [regions, setRegions] = useState([])
    const [region, setRegion] = useState('')
    const inputRegionRef = useRef()
    const inputCityRef = useRef()
    const [cities, setCities] = useState([])
    const [city, setCity] = useState('')
    const debounceRegion = useDebounce(region, 500)
    const [activeCitySelector, changeActiveCitySelector] = useState(false)
    
    
    const scrollRef = useRef()

    function scrollToId(itemId) {
        const map = getMap()
        const node = map.get(itemId)
        node.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
    }

    function getMap() {
        if (!scrollRef.current) {
            scrollRef.current = new Map();
        }
        return scrollRef.current;
    }
    const [activeSelect, changeActiveSelect] = useInputControl()
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
            dispatch(addCities(cities))
            setCities(cities)
        }
    }, [region, city])

    useEffect(() => {
        if (query.lat != 0 && query.lon != 0) {
            dispatch(loadWeatherForecast(query))
        }
    }, [city])

    useEffect(() => {
        if (inputRegionRef.current.value !== '') {
            setRegions(() => filteredSlice.filter(item => item.toLocaleLowerCase().includes(inputRegionRef.current.value.toLocaleLowerCase())))
        }
        else {
            setRegions(filteredSlice)
        }
    }, [debounceRegion, filteredSlice])

    function removeAllActivity() {
        if (weatherForecast.length !== 0) {
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
        dispatch(removeWeatherForecast())
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

    useEffect(() => {
        document.querySelectorAll('[data-city]').forEach(item => {
            if (item.innerHTML.toLocaleLowerCase() === city.toLocaleLowerCase()) {
                item.classList.add(`${styles.activeElement}`)
            }
            else { item.classList.remove(`${styles.activeElement}`) }
        })
    }, [cities, city])

    useEffect(() => {
        document.querySelectorAll('[data-region]').forEach(item => {
            if (item.innerHTML.toLocaleLowerCase() === region.toLocaleLowerCase()) {
                item.classList.add(`${styles.activeElement}`)
            }
            else { item.classList.remove(`${styles.activeElement}`) }
        })
    }, [regions, region])

    return <div className={styles.search__container}>
        <div>
            <div className={styles.input__container}>
                <input className={styles.select}
                    ref={inputRegionRef}
                    type='text' placeholder='Введите регион РФ'
                    value={region} name='region' autoComplete="off"
                    onFocus={() => changeActiveSelect({
                        ...activeSelect,
                        region: true,
                    })}
                    onChange={(e) => {
                        setRegion(e.target.value)
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
                [styles.active]: activeSelect.region
            })}
                onClick={e => stopEventBubbling(e)}
            >
                {regions.map((region, index) => {
                    return <p key={index + 1}
                        data-region={region}
                        onClick={() => {
                            setRegion(region)
                            changeActiveCitySelector(true)
                            setCity('')
                            setRegions(() => filteredSlice.filter(item => item.toLocaleLowerCase().includes(region.toLocaleLowerCase())))
                            changeActiveSelect({
                                ...activeSelect,
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
                    ref={inputCityRef}
                    type='text' placeholder='Выберите город'
                    value={city} name='city' autoComplete="off"
                    readOnly="readonly"
                    onChange={(e) => {
                        setCity(e.target.value)
                    }}
                    onFocus={() => changeActiveSelect({
                        ...activeSelect,
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
                [styles.active]: activeSelect.city
            })}
                onClick={e => stopEventBubbling(e)}
            >
                {cities ? cities.map((city, index) => {
                    return <p key={index + 1}
                        ref={(node) => {
                            const map = getMap();
                            if (node) {
                                map.set(city['Город'], node);
                            } else {
                                map.delete(city['Город']);
                            }
                        }}
                        data-city={city['Город']}
                        onClick={() => {
                            dispatch(addCity(city))
                            setTimeout(() => {
                                setCity(city['Город'])
                                setQuery({
                                    'lat': city['Широта'],
                                    'lon': city['Долгота'],
                                })
                                scrollToId(city['Город'])
                                dispatch(removeParams())
                            }, [0])
                            setTimeout(() => {
                                changeActiveSelect({
                                    region: false,
                                    city: false,
                                })
                            }, [200])
                        }}
                    >{city['Город']}</p>
                }) : null
                }
            </div>
        </div>
    </div>
}