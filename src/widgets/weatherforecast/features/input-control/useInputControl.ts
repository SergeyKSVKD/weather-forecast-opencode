import { useSelector } from "react-redux"
import { useAppDispatch } from "store/redux-hooks"
import { addActiveSelect, IInputControl } from 'widgets/weatherforecast/features/store-slice/applicationParamsSlice'
import * as selectors from 'widgets/weatherforecast/features/selectors'

export const initialInputState = {
    region: false,
    city: false,
}

export const useInputControl = (): [{ region: boolean; city: boolean; }, (props: { region: boolean; city: boolean }) => void] => {
    const dispatch = useAppDispatch()
    const activeSelect = useSelector(selectors.activeSelect)

    const changeActiveSelect = (props: IInputControl["activeSelect"]) => {
        dispatch(addActiveSelect(props))
    }

    return [activeSelect, changeActiveSelect]
}