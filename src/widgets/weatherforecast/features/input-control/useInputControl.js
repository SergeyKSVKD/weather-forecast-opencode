import { useDispatch, useSelector } from "react-redux"
import { addActiveSelect } from '../store-slice/applicationParamsSlice'
import * as selectors from '../selectors'

export const initialInputState = {
    region: false,
    city: false,
}

export const useInputControl = () => {
    const dispatch = useDispatch()
    const activeSelect = useSelector(selectors.activeSelect)

    const changeActiveSelect = (props) => {
        dispatch(addActiveSelect(props))
    }

    return [activeSelect, changeActiveSelect]
}