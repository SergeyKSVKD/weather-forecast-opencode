import styles from './card-view.module.scss'
import * as selectors from 'widgets/weatherforecast/features/selectors'
import { Preloader } from 'components/preloader/Preloader'
import { Card } from 'widgets/weatherforecast/ui-blocks/card-wf/Card'
import { useSelector } from 'react-redux'
import { QueryProp } from 'widgets/weatherforecast/types'

export const CardView = () => {
    const weatherForecast = useSelector(selectors.weatherForecast)
    const error = useSelector(selectors.error)
    const loading = useSelector(selectors.loading)
    const city = useSelector(selectors.city)

    const query: QueryProp = {
        'lat': city['Широта'],
        'lon': city['Долгота'],
    }
    const population = city['Население']
    const cityTitle = city['Город']


    return <>
        {Object.hasOwn(city, 'Регион') || weatherForecast.city.name !== "" && !error ?
            <Card props={{ query, cityTitle, population }} />
            : null}
        {error ? <div className={styles.error__container}>{error}</div> : null}
        {loading === 'loading' ? <Preloader /> : null}
    </>
}