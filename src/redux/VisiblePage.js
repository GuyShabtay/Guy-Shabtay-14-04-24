import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isFavorites: false,
}

export const VisiblePageSlice = createSlice({
  name: 'visiblePage',
  initialState,
  reducers: {
    invert: (state) => {
      state.isFavorites=!state.isFavorites
    },
  },
})

// Action creators are generated for each case reducer function
export const { invert } = VisiblePageSlice.actions
export default VisiblePageSlice.reducer