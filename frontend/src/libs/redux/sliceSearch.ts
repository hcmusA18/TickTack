import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'

type SearchState = {
  previousSearch: string[]
  neverMeet: string[]
  searchQuery: string
}

const initialState: SearchState = {
  previousSearch: [],
  neverMeet: [],
  searchQuery: ''
}

AsyncStorage.getItem('previousSearch')
  .then((data) => {
    if (data) {
      initialState.previousSearch = JSON.parse(data)
    }
  })
  .catch((error) => {
    console.error('Error fetching previous search data:', error)
  })

const SearchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setPreviousSearch(state, action: PayloadAction<string[]>) {
      state.previousSearch = action.payload
      AsyncStorage.setItem('previousSearch', JSON.stringify(action.payload))
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
      AsyncStorage.setItem('previousSearch', JSON.stringify(state.previousSearch))
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
  addPreviousSearch,
  addNeverMeet,
  clearSearchQuery,
  clearNeverMeet,
  clearPreviousSearch,
  clearSearch
} = SearchSlice.actions
export const SearchReducer = SearchSlice.reducer
