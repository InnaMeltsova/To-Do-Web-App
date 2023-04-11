import { createSlice } from '@reduxjs/toolkit';
import { getLists, createList } from '../../api';

// console.log('getLists', getLists);

export const listSlice = createSlice({
    name: 'lists',
    initialState: {
        listsArr: [],
        loading: false
    },
    reducers: {
        addListItem(state, action) {
            state.listsArr = [...state.listsArr, action]
        },
        updateListItem(state, action) {
            state.listsArr = state.listsArr.map(i => {
                if(i.payload.id === action.payload.id) return action;
                return i;
            })
        },
        deleteListItem(state, action) {
            state.listsArr = state.listsArr.filter(i => i.payload.id !== action.payload.payload.id)
        }
    },
    extraReducers: {
        [getLists.pending]: (state) => {
            state.loading = true
        },
        [getLists.fulfilled]: (state, action) => {
            state.listsArr = action.payload;
            state.loading = false
        },
        [getLists.rejected]: (state) => {
            state.loading = false
        },
        [createList.fulfilled]: (state, action) => {
            state.listsArr = [...state.listsArr, action.payload];
        }
    }
})

export const { addListItem, updateListItem, deleteListItem } = listSlice.actions;

export default listSlice.reducer;