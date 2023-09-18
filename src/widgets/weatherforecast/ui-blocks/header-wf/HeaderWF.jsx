import { ReactComponent as UmbrellaIcon } from '../assets/umbrella.svg'
import styles from './header-WF.module.scss'

export const HeaderWF = () => {

    return <div className={styles.header}>
        <div className={styles.logo}>
            <img src={require('../assets/logo_white_cropped.png')} alt="logo_white_cropped.png" />
        </div>
        <span>Погода в России</span>
        <UmbrellaIcon />
    </div>
}