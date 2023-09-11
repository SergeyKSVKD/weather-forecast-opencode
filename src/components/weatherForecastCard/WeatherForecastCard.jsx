import styles from './WeatherForecastCard.module.scss'
import cn from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { ReactComponent as ArrowIcon } from './assets/arrow.svg'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { addActiveArrowButton, addSliderPosition } from '../applicationParamsSlice'
import { motion } from 'framer-motion'

export const WeatherForecastCard = ({ props: {
    query: { lat, lon },
    city,
    population, }
}) => {
    const dispatch = useDispatch()
    const userParams = useSelector(state => state.userParams.applicationParams)
    let start = userParams.sliderPosition.start
    let end = userParams.sliderPosition.end
    let leftArrow = userParams.activeArrowButton.left
    let rightArrow = userParams.activeArrowButton.right
    const WeatherForecast = useSelector(state => state.weatherForecastState.weatherForecast)
    const [weatherForecastSlice, setWeatherForecastSlice] = useState([])
    const [count, setCount] = useState(1)
    const [slide, setSlide] = useState(0)
    const [currentWeatherForecast, setCurrentWeatherForecast] = useState(WeatherForecast.list ? WeatherForecast.list[0] : [])

    const variants = {
        hidden: { opacity: 0, scale: 0.7 },
        show: {
            opacity: 1,
            scale: 1,
            transition: {
                delay: 0.2,
                duration: 0.5
            }
        }
    }

    function dateFormat(date) {
        return format(new Date(date), 'dd MMMM', {
            locale: ru
        })
    }

    useEffect(() => {
        if (start <= 1) {
            dispatch(addActiveArrowButton({
                left: false,
                right: true,
            }))
        }
        if (start >= 34) {
            dispatch(addActiveArrowButton({
                left: true,
                right: false,
            }))
        }
        else if (2 < start < 34 && start != 1) {
            dispatch(addActiveArrowButton({
                left: true,
                right: true,
            }))
        }
    }, [start])

    useEffect(() => {
        setWeatherForecastSlice(WeatherForecast.list.slice(1, 40))
    }, [])

    return <motion.div className={styles.weatherForecastCardContainer}
        variants={variants} initial={'hidden'} animate={'show'}>
        <div className={styles.weatherForecastCardAdvancedContainer}>
            {lon !== 0 && lat !== 0 ?
                <div className={styles.weatherForecastCardAdvanced}>
                    <p className={styles.mainTitle}>{city}</p>
                    <br />
                    <p className={styles.subTitle}>Население: <span>{population > WeatherForecast.city.population ? population : WeatherForecast.city.population}</span></p>
                    <br />
                    <p className={styles.subTitle}>Широта: <span>{lat}</span></p>
                    <p className={styles.subTitle}>Долгота: <span>{lon}</span></p>
                </div>
                : null
            }
            {WeatherForecast.list ?
                <div>
                    {format(new Date(), 'yyyy-MM-dd H:mm:ss') < currentWeatherForecast.dt_txt ?
                        <>
                            <p className={styles.subTitle}>{currentWeatherForecast.weather[0].description.slice(0, 1).toUpperCase() + currentWeatherForecast.weather[0].description.slice(1, currentWeatherForecast.weather[0].description.length)}</p>
                            <img src={`https://openweathermap.org/img/wn/` + currentWeatherForecast.weather[0].icon + `@2x.png`} alt={currentWeatherForecast.dt_txt} />
                            <p className={styles.subTitle}><span>+{' '}{currentWeatherForecast.main.temp.toFixed(1)}&deg;C</span></p>
                        </> : <>
                            <p className={styles.subTitle}>{WeatherForecast.list[1].weather[0].description.slice(0, 1).toUpperCase() + WeatherForecast.list[1].weather[0].description.slice(1, WeatherForecast.list[1].weather[0].description.length)}</p>
                            <img src={`https://openweathermap.org/img/wn/` + WeatherForecast.list[1].weather[0].icon + `@2x.png`} alt={WeatherForecast.list[1].dt_txt} />
                            <p className={styles.subTitle}><span>+{' '}{WeatherForecast.list[1].main.temp.toFixed(1)}&deg;C</span></p>
                        </>}
                </div>
                : null}
            {WeatherForecast.list ?
                <div className={styles.weatherForecastCardAdvanced}>
                    {<div key={'advanced'}>
                        <p>Ощущается как: <span>+{' '}{currentWeatherForecast.main.feels_like.toFixed(1)}&deg;C</span></p>
                        <p>Давление: <span>{Math.ceil(currentWeatherForecast.main.grnd_level * 0.750064)} мм рт. ст.</span></p>
                        <p>Влажность: <span>{currentWeatherForecast.main.humidity}%</span></p>
                        <p>Ветер: <span>{currentWeatherForecast.wind.speed} м/с</span></p>
                    </div>
                    }
                </div>
                : null}
        </div>

        {WeatherForecast.list && userParams ?
            <div className={styles.weatherForecastCardBriefContainer}>
                <ArrowIcon className={cn(styles.arrow, styles.rotate, {
                    [styles.unactive]: leftArrow === false
                })}
                    onClick={leftArrow ? () => {
                        if (start > 1) {
                            setCount(count - 1)
                            setSlide((count - 2) * (-360))
                        }
                        dispatch(addSliderPosition({
                            start: start - 3,
                            end: end - 3,
                        }))
                    }
                        : null
                    }
                />
                <div className={styles.fixedLeftPanel}></div>
                <div className={styles.weatherForecastCardBriefVisible}>
                    <div className={styles.weatherForecastCardBrief} style={{ transform: `translateX(${slide}px)` }}>
                        {weatherForecastSlice.map((timeSlice, index) => {
                            return <div key={index} className={styles.brief}
                                onClick={() => {
                                    setCurrentWeatherForecast(timeSlice)
                                }}
                            >
                                <p>{dateFormat(timeSlice.dt_txt)}</p>
                                <p>{timeSlice.dt_txt.slice(10, 16)}</p>
                                <p>{timeSlice.weather[0].description}</p>
                                <img src={`https://openweathermap.org/img/wn/` + timeSlice.weather[0].icon + `.png`} alt={timeSlice.dt_txt} />
                                <p>+{' '}{timeSlice.main.temp.toFixed(1)}&deg;C</p>
                            </div>
                        })}
                    </div>
                </div>
                <div className={styles.fixedRightPanel}></div>
                <ArrowIcon className={cn(styles.arrow, {
                    [styles.unactive]: rightArrow === false
                })}
                    onClick={rightArrow ? () => {
                        if (start <= 1) {
                            setCount(count + 1)
                            setSlide(count * (-360))
                        }
                        if (start > 1) {
                            setCount(count + 1)
                            setSlide(count * (-360))
                        }
                        dispatch(addSliderPosition({
                            start: start + 3,
                            end: end + 3,
                        }))
                    }
                        : null
                    }
                />
            </div>
            : null}
    </motion.div>
}