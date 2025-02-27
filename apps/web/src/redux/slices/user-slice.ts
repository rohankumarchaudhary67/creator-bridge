import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { redirect } from 'next/navigation';

interface DataState {
    data: {
        name: string;
        email: string;
        role: string;
        image: string;
    } | null;
    loading: boolean;
    error: string | null;
}

const initialState: DataState = {
    data: null,
    loading: false,
    error: null,
};

export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async (accessToken: string) => {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/fetch`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (response.status !== 200) {
            throw new Error('Failed to fetch user data');
        }

        return response.data.data;
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.data = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserData.fulfilled, (state, action) => {
            state.data = action.payload;
        });
        builder.addCase(fetchUserData.rejected, (state, action) => {
            state.data = null;
        });
    },
});

export default userSlice.reducer;
