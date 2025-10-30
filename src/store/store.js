import { configureStore } from '@reduxjs/toolkit'
import  themeReducer from './features/theme/themeSlice'
import datasetReducer from './features/data/dataSlice'


export const store = configureStore({
  reducer: {
    theme: themeReducer,
    dataset: datasetReducer
  },
})