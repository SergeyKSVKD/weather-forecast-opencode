import styles from './overlay-WF.module.scss'
import { useInputControl, initialInputState } from '../../features/input-control/useInputControl'
import { useSelector } from 'react-redux'
import * as selectors from '../../features/selectors'

interface OverlayI {
    children: React.ReactNode,
}

export const OverlayWF = ({ children }: OverlayI) => {
    const [_, changeActiveSelect] = useInputControl()
    const activeSelect = useSelector(selectors.activeSelect)

    return <div className={styles.background}
        onClick={() => {
            if (activeSelect.city || activeSelect.region) {
                changeActiveSelect(initialInputState)
            }
        }}
    >
        {children}
    </div>
}