import styles from './carousel.module.scss'
import cn from 'classnames'
import { ReactComponent as ArrowIcon } from 'widgets/weatherforecast/ui-blocks/assets/arrow.svg'
import { useAppDispatch } from 'store/redux-hooks'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { useCarouselControl } from './useCarouselControl'
import { addSelected } from 'widgets/weatherforecast/features/store-slice/weatherForecastSlice'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { IAppParams } from '../store-slice/applicationParamsSlice'
import { WeatherForecast } from 'widgets/weatherforecast/types'

export interface CarouselProp {
    theme: 'large' | 'small',
    data: WeatherForecast[],
    action: {
        addSliderPosition: ActionCreatorWithPayload<IAppParams['sliderPosition']>,
        addActiveSelect: ActionCreatorWithPayload<IAppParams['activeSelect']>,
        addActiveArrowButton: ActionCreatorWithPayload<IAppParams['activeArrowButton']>
    },
}


export const Carousel = ({ theme, data, action }: CarouselProp) => {

    const dispatch = useAppDispatch()
    let { slideTo, leftArrow, rightArrow, slideToLeft, slideToRight } = useCarouselControl(theme, action)

    function dateFormat(date: string) {
        return format(new Date(date), 'dd MMMM', {
            locale: ru
        })
    }

    return <div className={styles.weatherForecastCardBriefContainer}>
        <ArrowIcon className={cn(styles.arrow, styles.rotate, {
            [styles.unactive]: leftArrow === false
        })}
            onClick={() => {
                if (leftArrow) {
                    dispatch(action.addSliderPosition(slideToLeft))
                }
            }}
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
            onClick={() => {
                if (rightArrow) {
                    dispatch(action.addSliderPosition(slideToRight))
                }
            }}
        />
    </div>
}