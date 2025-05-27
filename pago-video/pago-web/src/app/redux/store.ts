import { configureStore } from '@reduxjs/toolkit'
import { calculatorReducer } from './slices/articles.slice'
import { authReducer } from './slices/auth.slice'
import { generalReducer } from './slices/general.slice'
import { userReducer } from './slices/user.slice'
import { videosApi } from '../services/videos.service'

export const store = configureStore({
  reducer: {
    authReducer,
    userReducer,
    articlesReducer: calculatorReducer,
    generalReducer,


    [videosApi.reducerPath]: videosApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()

    .concat([videosApi.middleware])
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
