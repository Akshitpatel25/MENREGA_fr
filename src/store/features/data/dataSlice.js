import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: JSON.parse(localStorage.getItem('dataset')) || [],
    finYear: JSON.parse(localStorage.getItem('finYear')) || '2024-2025',
    state: JSON.parse(localStorage.getItem('state')) || '',
    district: JSON.parse(localStorage.getItem('district')) || '',
    allDistrict: JSON.parse(localStorage.getItem('allDistrict')) || [],
    month: JSON.parse(localStorage.getItem('month')) || 'Jan',
    isLoading: JSON.parse(localStorage.getItem('isLoading')) || false
};

export const dataSlice = createSlice({
    name: 'dataset',
    initialState: initialState,
    reducers: {
        setDataSet: (state, action) => {
            state.value = action.payload;
            localStorage.setItem('dataset', JSON.stringify(state.value))
        },
        setFinYear: (state, action) => {
            state.finYear = action.payload;
            localStorage.setItem('finYear', JSON.stringify(state.finYear))
        },
        setMonth: (state, action) => {
            state.month = action.payload;
            localStorage.setItem('month', JSON.stringify(state.month))
        },
        setState: (state, action) => {
            state.state = action.payload;
            localStorage.setItem('state', JSON.stringify(state.state))
        },
        setDistrict: (state, action) => {
            state.district = action.payload;
            localStorage.setItem('district', JSON.stringify(state.district))
        },
        setAllDistrict: (state, action) => {
            state.allDistrict = action.payload;
            localStorage.setItem('allDistrict', JSON.stringify(state.allDistrict))
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
            localStorage.setItem('isLoading', JSON.stringify(state.isLoading))
        },
        
    }
})

export const { setDataSet, setFinYear, setMonth, setState, setDistrict, setAllDistrict,setIsLoading } = dataSlice.actions
export default dataSlice.reducer

