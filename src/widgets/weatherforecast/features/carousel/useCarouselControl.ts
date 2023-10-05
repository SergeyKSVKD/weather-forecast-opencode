import { useSelector } from 'react-redux'
import { useAppDispatch } from 'store/redux-hooks'
import * as selectors from '../selectors'
import { useEffect, useState } from 'react'
import { CarouselProp } from './Carousel'

export const useCarouselControl = (theme?: CarouselProp['theme'], action?: CarouselProp['action']) => {

    const [slide, setSlide] = useState(0)
    useEffect(() => {
        if (action) {
            dispatch(action.addSliderPosition(initial))
            switch (theme) {
                case 'large': {
                    setSlide(-360)
                }
                    break
                case 'small': {
                    setSlide(-120)
                }
                    break
                default: {
                    setSlide(-360)
                }
            }
        }
    }, [theme])

    const dispatch = useAppDispatch()
    const userParams = useSelector(selectors.userParams)
    let { start, end, count, slideTo } = userParams.sliderPosition
    let { left: leftArrow, right: rightArrow } = userParams.activeArrowButton
    const slideToRight = {
        count: count + 1,
        slideTo: (count + 1) * (slide),
        start: start + 3,
        end: end + 3,
    }
    const slideToLeft = {
        count: count - 1,
        slideTo: (count - 1) * (slide),
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
        if (action) {
            if (start <= 1) {
                dispatch(action.addActiveArrowButton({
                    left: false,
                    right: true,
                }))
            }
            if (start >= 34) {
                dispatch(action.addActiveArrowButton({
                    left: true,
                    right: false,
                }))
            }
            else if (2 < start && start < 34 && start !== 1) {
                dispatch(action.addActiveArrowButton({
                    left: true,
                    right: true,
                }))
            }
        }
    }, [start])

    return {
        slideTo, leftArrow, rightArrow, slideToLeft, slideToRight, initial
    }
}