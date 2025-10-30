import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // Convert string "true"/"false" to boolean properly
  value: JSON.parse(localStorage.getItem('theme')) || false,
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.value = !state.value
      // Save to localStorage whenever theme changes
      localStorage.setItem('theme', JSON.stringify(state.value))
    },
  },
})

export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer
