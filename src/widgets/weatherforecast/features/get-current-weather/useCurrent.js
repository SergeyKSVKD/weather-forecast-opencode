import { useSelector, useDispatch } from 'react-redux'
import * as selectors from '../selectors'
import { addCurrent } from '../store-slice/weatherForecastSlice'
import { useEffect } from 'react'
import { format } from 'date-fns' 

export const useCurrent = () => {
    const dispatch = useDispatch()
    const weatherForecast = useSelector(selectors.weatherForecast)
    const current = useSelector(selectors.current)

    function currentWeatherForecasthandler() {
        format(new Date(), 'yyyy-MM-dd H:mm:ss') < weatherForecast.list[0].dt_txt ?
        dispatch(addCurrent(weatherForecast.list[0])) :
        dispatch(addCurrent(weatherForecast.list[1]))
    }

    useEffect(() => {
        currentWeatherForecasthandler()
    }, [weatherForecast])

    return current
}