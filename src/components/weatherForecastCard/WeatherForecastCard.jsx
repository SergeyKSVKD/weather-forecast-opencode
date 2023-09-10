import styles from './WeatherForecastCard.module.scss'
import cn from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
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

    return <motion.div className={styles.weatherForecastCardContainer}
        variants={variants} initial={'hidden'} animate={'show'}>
        <div className={styles.weatherForecastCardAdvancedContainer}>
            {lon !== 0 && lat !== 0 ?
                <div>
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
                    <p className={styles.subTitle}>{WeatherForecast.list[0].weather[0].description.slice(0, 1).toUpperCase() + WeatherForecast.list[0].weather[0].description.slice(1, WeatherForecast.list[0].weather[0].description.length)}</p>
                    <img src={`https://openweathermap.org/img/wn/` + WeatherForecast.list[0].weather[0].icon + `@2x.png`} alt={WeatherForecast.list[0].dt_txt} />
                    <p className={styles.subTitle}><span>+{' '}{WeatherForecast.list[0].main.temp.toFixed(1)}&deg;C</span></p>
                </div>
                : null}
            {WeatherForecast.list ?
                <div className={styles.weatherForecastCardAdvanced}>
                    {WeatherForecast.list.slice(0, 1).map((timeSlice) => {
                        return <div key={'advanced'}>
                            <p>Ощущается как: <span>+{' '}{timeSlice.main.feels_like.toFixed(1)}&deg;C</span></p>
                            <p>Давление: <span>{Math.ceil(timeSlice.main.grnd_level * 0.750064)} мм рт. ст.</span></p>
                            <p>Влажность: <span>{timeSlice.main.humidity}%</span></p>
                            <p>Ветер: <span>{timeSlice.wind.speed} м/с</span></p>
                        </div>
                    })}
                </div>
                : null}
        </div>

        {WeatherForecast.list && userParams ?
            <div className={styles.weatherForecastCardBriefContainer}>
                <ArrowIcon className={cn(styles.arrow, styles.rotate, {
                    [styles.unactive]: leftArrow === false
                })}
                    onClick={leftArrow ? () => {
                        dispatch(addSliderPosition({
                            start: start - 3,
                            end: end - 3,
                        }))
                    }
                        : null
                    }
                />
                <div className={styles.weatherForecastCardBrief}>
                    {WeatherForecast.list.slice(start, end).map((timeSlice, index) => {
                        return <div key={index} className={styles.brief}
                        >
                            <p>{dateFormat(timeSlice.dt_txt)}</p>
                            <p>{timeSlice.dt_txt.slice(10, 16)}</p>
                            <p>{timeSlice.weather[0].description}</p>
                            <img src={`https://openweathermap.org/img/wn/` + timeSlice.weather[0].icon + `.png`} alt={timeSlice.dt_txt} />
                            <p>+{' '}{timeSlice.main.temp.toFixed(1)}&deg;C</p>
                        </div>
                    })}
                </div>
                <ArrowIcon className={cn(styles.arrow, {
                    [styles.unactive]: rightArrow === false
                })}
                    onClick={rightArrow ? () => {
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