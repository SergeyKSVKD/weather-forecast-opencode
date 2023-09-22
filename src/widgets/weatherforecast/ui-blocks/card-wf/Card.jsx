import styles from './card.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import * as selectors from '../../features/selectors'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { addSliderPosition, addActiveArrowButton } from '../../features/store-slice/applicationParamsSlice'
import { motion } from 'framer-motion'
import * as cardAnimation from '../../features/animations/weatherForecastCardAnimation'

import { useState, useEffect } from 'react'
import { Carousel } from '../../features/carousel/Carousel'
import { useCarouselControl } from '../../features/carousel/useCarouselControl'
import { useCurrent } from '../../features/get-current-weather/useCurrent'
import { addCurrent } from '../../features/store-slice/weatherForecastSlice'
import { useResize } from '../../../../shared/helpers/useResize'

export const Card = ({ props: {
    query: { lat, lon },
    cityTitle: city,
    population, }
}) => {
    const dispatch = useDispatch()
    const { initial } = useCarouselControl()
    const current = useCurrent()
    const weatherForecast = useSelector(selectors.weatherForecast)
    const selected = useSelector(selectors.selected)
    const [currentWeather, setcurrentWeather] = useState({})
    const [weatherForecastSlice, setWeatherForecastSlice] = useState([])

    useEffect(() => {
        setWeatherForecastSlice(weatherForecast.list.slice(1, 40))
    }, [weatherForecast])

    function dateFormat(date) {
        return format(new Date(date), 'dd MMMM', {
            locale: ru
        })
    }

    useEffect(() => {
        setcurrentWeather(current)
        if (Object.keys(selected).length !== 0) {
            setcurrentWeather(selected)
        }
    }, [current, selected])

    return <motion.div className={styles.weatherForecastCardContainer}
        variants={cardAnimation.variants} initial={cardAnimation.initial} animate={cardAnimation.animate}>
        <div className={styles.weatherForecastCardAdvancedContainer}>
            {lon !== 0 && lat !== 0 ?
                <div className={styles.weatherForecastCardAdvanced}>
                    <p className={styles.mainTitle}>{city}</p>
                    <br />
                    <p className={styles.subTitle}>Население: <span>{population > weatherForecast.city.population ? population : weatherForecast.city.population}</span></p>
                    <br />
                    <p className={styles.subTitle}>Широта: <span>{lat}</span></p>
                    <p className={styles.subTitle}>Долгота: <span>{lon}</span></p>
                </div>
                : null
            }
            {Object.keys(currentWeather).length !== 0 ?
                <>
                    <div className={styles.subTitle}>
                        <p
                            className={styles.nowButton}
                            onClick={() => {
                                dispatch(addCurrent(current))
                                dispatch(addSliderPosition(initial))
                            }}>Сейчас {format(new Date(), 'H:mm')}</p>
                        <p >{currentWeather.weather[0].description.slice(0, 1).toUpperCase() + currentWeather.weather[0].description.slice(1, currentWeather.weather[0].description.length)}</p>
                        <img src={`https://openweathermap.org/img/wn/` + currentWeather.weather[0].icon + `@2x.png`} alt={currentWeather.dt_txt} />
                        <p ><span>+{' '}{currentWeather.main.temp.toFixed(1)}&deg;C</span></p>
                    </div>
                    <div className={styles.weatherForecastCardAdvanced}>
                        {<div key={'advanced'}>
                            <p>{dateFormat(currentWeather.dt_txt)}</p>
                            <p>Ощущается как: <span>+{' '}{currentWeather.main.feels_like.toFixed(1)}&deg;C</span></p>
                            <p>Давление: <span>{Math.ceil(currentWeather.main.grnd_level * 0.750064)} мм рт. ст.</span></p>
                            <p>Влажность: <span>{currentWeather.main.humidity}%</span></p>
                            <p>Ветер: <span>{currentWeather.wind.speed} м/с</span></p>
                        </div>
                        }
                    </div>
                </>
                : null}
        </div>

        {useResize().width <= 700 ?
            <Carousel theme="small" data={weatherForecastSlice} action={{addSliderPosition, addActiveArrowButton}}/> :
            <Carousel theme="large" data={weatherForecastSlice} action={{addSliderPosition, addActiveArrowButton}}/>
        }
    </motion.div>
}