import styles from './card-view.module.scss'
import * as selectors from '../selectors'
import { Preloader } from '../../../../components/preloader/Preloader'
import { Card } from '../../ui-blocks/card-wf/Card'
import { useSelector } from 'react-redux'

export const CardView = () => {
    const weatherForecast = useSelector(selectors.weatherForecast)
    const error = useSelector(selectors.error)
    const loading = useSelector(selectors.loading)
    const city = useSelector(selectors.city)
    const query = {
        'lat': city['Широта'],
        'lon': city['Долгота'],
    }
    const population = city['Население']
    const cityTitle = city['Город']

    return <>
        {weatherForecast.length !== 0 && city && !error ?
            <Card props={{ query, cityTitle, population }} />
            : null}
        {error ? <div className={styles.error__container}>{error}</div> : null}
        {loading === 'loading' ? <Preloader /> : null}
    </>
}