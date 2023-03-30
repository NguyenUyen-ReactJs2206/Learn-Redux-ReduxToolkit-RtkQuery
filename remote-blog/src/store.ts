import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import blogReducer from './pages/blog/blog.reducer'

export const store = configureStore({
  reducer: { blog: blogReducer }
})

//Lấy RootState và AppDispatch từ store của chúng ta
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
//khi dispatch 1 Asyncthunk
export const useAppDispatch = () => useDispatch<AppDispatch>()
