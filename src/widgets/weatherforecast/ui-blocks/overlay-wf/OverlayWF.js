import styles from './overlay-WF.module.scss'
import { useInputControl, initialInputState } from '../../features/input-control/useInputControl'

export const OverlayWF = ({ children }) => {
    const [_, changeActiveSelect] = useInputControl()

    return (
        <div className={styles.background}
            onClick={() => {
                changeActiveSelect(initialInputState)}}
        >
            {children}
        </div>
    )
}