import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface ICarousel {
    sliderPosition: {
        count: number,
        slideTo: number,
        start: number,
        end: number,
    },
    activeArrowButton: {
        left: boolean,
        right: boolean,
    }
}

export interface IInputControl {
    activeSelect: {
        region: boolean,
        city: boolean,
    }
}

export interface IAppParams extends ICarousel, IInputControl {}

const applicationParams: IAppParams = {
    sliderPosition: {
        count: 0,
        slideTo: 0,
        start: 1,
        end: 8,
    },
    activeArrowButton: {
        left: false,
        right: true,
    },
    activeSelect: {
        region: false,
        city: false,
    }
} 

const initialState = {
    applicationParams,
}

const applicationParamsSlice = createSlice({
    name: '@@app-params',
    initialState,
    reducers: {
        addSliderPosition: (state, action: PayloadAction<IAppParams['sliderPosition']>) => {
            let { start, end, count, slideTo } = action.payload
            state.applicationParams.sliderPosition = {
                count,
                slideTo,
                start,
                end,
            }
        },
        addActiveArrowButton: (state, action: PayloadAction<IAppParams['activeArrowButton']>) => {
            let { left, right } = action.payload
            state.applicationParams.activeArrowButton = {
                left,
                right,
            }
        },
        addActiveSelect: (state, action: PayloadAction<IInputControl['activeSelect']>) => {
            let { city, region } = action.payload
            state.applicationParams.activeSelect = {
                city,
                region,
            }
        },
        removeParams: (state) => {
            state.applicationParams = initialState.applicationParams
        },
    }
})


export const { addActiveArrowButton, addSliderPosition, removeParams, addActiveSelect } = applicationParamsSlice.actions
export const applicationParamsReducer = applicationParamsSlice.reducer