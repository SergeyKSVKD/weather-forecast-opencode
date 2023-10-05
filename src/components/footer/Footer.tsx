import styles from './Footer.module.scss'
import { format } from 'date-fns'
import { useResize } from 'shared/helpers/'

export const Footer: React.FC = () => {

    return <>
        <div className={styles.footer__wrapper}>
            <span className={styles.copyright}>
                {useResize().isScreenSm ? "© Все права защищены." : null} 2023 - {format(new Date(), 'dd.MM.yyyy')}г.
            </span>
        </div>
    </>
}