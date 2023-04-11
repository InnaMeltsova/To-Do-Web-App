import { createAsyncThunk } from '@reduxjs/toolkit'

const baseUrl = 'http://localhost:5000';

export const getLists = createAsyncThunk(
    'lists/getLists',
    async (_, { getState }) => {
        console.log(123);
        const { auth } = getState();
        const accessToken = auth.accessToken;
        const res = await fetch(`${baseUrl}/lists`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
        });
        const data = await res.json();
        // console.log('data', data);
        return data.lists;
    }
)

export const createList = createAsyncThunk(
    'lists/createList',
    async (listData, { getState }) => {
        const { auth } = getState();
        const accessToken = auth.accessToken;
        const res = await fetch(`${baseUrl}/lists/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify(listData)
        });
        const data = await res.json();
        return data;
    }
)