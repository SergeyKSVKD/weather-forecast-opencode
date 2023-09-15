import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    applicationParams: {
        sliderPosition: {
            start: 1,
            end: 8,
        },
        activeArrowButton: {
            left: false,
            right: true,
        }
    },
}

const applicationParamsSlice = createSlice({
    name: '@@app-params',
    initialState,
    reducers: {
        addSliderPosition: (state, action) => {
            let { start, end } = action.payload
            state.applicationParams.sliderPosition = {
                start,
                end,
            }
        },
        addActiveArrowButton: (state, action) => {
            let { left, right } = action.payload
            state.applicationParams.activeArrowButton = {
                left,
                right,
            }
        },
        removeParams: (state) => {
            state.applicationParams = initialState.applicationParams
        },
    }
})


export const { addActiveArrowButton, addSliderPosition, removeParams } = applicationParamsSlice.actions
export const applicationParamsReducer = applicationParamsSlice.reducer