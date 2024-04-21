import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isFavorites: false,
  toggleBtnAlignment:'left'
}

export const VisiblePageSlice = createSlice({
  name: 'visiblePage',
  initialState,
  reducers: {
    invert: (state) => {
      state.isFavorites=!state.isFavorites
    },
    changeAlignment: (state,action) => {
      if(action.payload==='left')
      state.toggleBtnAlignment='left'
    else
    state.toggleBtnAlignment='center'

    },
  },
})

// Action creators are generated for each case reducer function
export const { invert,changeAlignment } = VisiblePageSlice.actions
export default VisiblePageSlice.reducer