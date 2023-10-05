import { useSelector } from 'react-redux'
import { useAppDispatch } from 'store/redux-hooks'
import * as selectors from 'widgets/weatherforecast/features/selectors'
import { addCurrent } from 'widgets/weatherforecast/features/store-slice/weatherForecastSlice'
import { useEffect } from 'react'
import { format } from 'date-fns'

export const useCurrent = () => {
    const dispatch = useAppDispatch()
    const weatherForecast = useSelector(selectors.weatherForecast)
    const current = useSelector(selectors.current)

    function currentWeatherForecasthandler() {
        if (weatherForecast.list[0].dt_txt) {
            format(new Date(), 'yyyy-MM-dd H:mm:ss') < weatherForecast.list[0].dt_txt ?
                dispatch(addCurrent(weatherForecast.list[0])) :
                dispatch(addCurrent(weatherForecast.list[1]))
        }
    }

    useEffect(() => {
        currentWeatherForecasthandler()
    }, [weatherForecast])

    return current
}