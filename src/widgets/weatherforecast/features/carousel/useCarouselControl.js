import { useSelector, useDispatch } from 'react-redux'
import * as selectors from '../selectors'
import { useEffect } from 'react'
import { addActiveArrowButton } from '../store-slice/applicationParamsSlice'

export const useCarouselControl = () => {
    const dispatch = useDispatch()
    const userParams = useSelector(selectors.userParams)
    let { start, end, count, slideTo } = userParams.sliderPosition
    let { left: leftArrow, right: rightArrow } = userParams.activeArrowButton
    const slideToRight = {
        count: count + 1,
        slideTo: (count + 1) * (-360),
        start: start + 3,
        end: end + 3,
    }
    const slideToLeft = {
        count: count - 1,
        slideTo: (count - 1) * (-360),
        start: start - 3,
        end: end - 3,
    }
    const initial = {
        count: 0,
        slideTo: 0,
        start: 1,
        end: 8,
    }

    useEffect(() => {
        if (start <= 1) {
            dispatch(addActiveArrowButton({
                left: false,
                right: true,
            }))
        }
        if (start >= 34) {
            dispatch(addActiveArrowButton({
                left: true,
                right: false,
            }))
        }
        else if (2 < start < 34 && start != 1) {
            dispatch(addActiveArrowButton({
                left: true,
                right: true,
            }))
        }
    }, [start])

    return {
       slideTo, leftArrow, rightArrow, slideToLeft, slideToRight, initial
    }
}