import styles from './carousel.module.scss'
import cn from 'classnames'
import { ReactComponent as ArrowIcon } from '../../ui-blocks/assets/arrow.svg'
import { useDispatch } from 'react-redux'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { useCarouselControl } from './useCarouselControl'
import { addSelected } from '../store-slice/weatherForecastSlice'

export const Carousel = ({ theme, data, action }) => {
    const dispatch = useDispatch()
    let { slideTo, leftArrow, rightArrow, slideToLeft, slideToRight } = useCarouselControl(theme, action)

    function dateFormat(date) {
        return format(new Date(date), 'dd MMMM', {
            locale: ru
        })
    }

    return <div className={styles.weatherForecastCardBriefContainer}>
        <ArrowIcon className={cn(styles.arrow, styles.rotate, {
            [styles.unactive]: leftArrow === false
        })}
            onClick={leftArrow ? () => {
                dispatch(action.addSliderPosition(slideToLeft))
            }
                : null
            }
        />
        <div className={styles.fixedLeftPanel}></div>
        <div className={styles.weatherForecastCardBriefVisible}>
            <div className={styles.weatherForecastCardBrief} style={{ transform: `translateX(${slideTo}px)` }}>
                {data.map((timeSlice, index) => {
                    return <div key={index} className={styles.brief}
                        onClick={() => {
                            dispatch(addSelected(timeSlice))
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
                dispatch(action.addSliderPosition(slideToRight))
            }
                : null
            }
        />
    </div>
}