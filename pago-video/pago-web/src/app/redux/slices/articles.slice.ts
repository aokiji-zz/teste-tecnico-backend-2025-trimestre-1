import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CalculatorState {
  email: string
  name: string
}

const initialState: CalculatorState = {
  email: '',
  name: '',
}

export const calculatorSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setArticles(state: CalculatorState, { payload }: PayloadAction<CalculatorState>) {
      state.email = payload.email
      state.name = payload.name
    },
  },
})

export const { setArticles } = calculatorSlice.actions
export const calculatorReducer = calculatorSlice.reducer
