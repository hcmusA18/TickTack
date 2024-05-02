import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type SearchState = {
  previousSearch: string[]
  neverMeet: string[]
  searchQuery: string
}

const SearchSlice = createSlice({
  name: 'search',
  initialState: {
    previousSearch: [],
    neverMeet: [],
    searchQuery: ''
  } as SearchState,
  reducers: {
    setPreviousSearch(state, action: PayloadAction<string[]>) {
      state.previousSearch = action.payload
    },
    setNeverMeet(state, action: PayloadAction<string[]>) {
      state.neverMeet = action.payload
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload
    },
    clearSearchQuery(state) {
      state.searchQuery = ''
    },
    clearNeverMeet(state) {
      state.neverMeet = []
    },
    clearPreviousSearch(state) {
      state.previousSearch = []
    },
    addPreviousSearch(state, action: PayloadAction<string>) {
      state.previousSearch = [action.payload, ...state.previousSearch]
    },
    addNeverMeet(state, action: PayloadAction<string>) {
      state.neverMeet = [action.payload, ...state.neverMeet]
    },
    clearSearch(state) {
      state.previousSearch = []
      state.neverMeet = []
      state.searchQuery = ''
    }
  }
})

export const {
  setPreviousSearch,
  setNeverMeet,
  setSearchQuery,
  clearSearchQuery,
  clearNeverMeet,
  clearPreviousSearch,
  clearSearch
} = SearchSlice.actions
export const SearchReducer = SearchSlice.reducer
