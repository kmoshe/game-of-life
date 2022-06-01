import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../../app/store';
import { Generation } from '../models/generation';
import { GetFirstGenerationRequest } from '../models/getFirstGenerationRequest';
import { GetNextGenerationRequest } from '../models/getNextGenerationRequest';
import { GetNextGenerationResponse } from '../models/getNextGenerationResponse';

interface GameOfLifeState {
    generation: Generation;
    loading: boolean;
    error: any;
}

const initialState: GameOfLifeState= {
    generation: [], 
    loading: false, 
    error: null,
}

export const getFirstGeneration = createAsyncThunk(
    'gameOfLife/firstGeneration',
    async (firstGenerationRequest: GetFirstGenerationRequest) => {
        const { rows, columns } = firstGenerationRequest;
        const response = await axios.get<GetNextGenerationResponse>(`http://localhost:4000/cells?rows=${rows}&columns=${columns}`);
        if (response.status === 200) {
            return response.data;
        }
    }
);

export const computeNextGeneration = createAsyncThunk(
    'gameOfLife/nextGeneration',
    async (nextGenerationRequest: GetNextGenerationRequest) => {
        try {
            const response = await axios.post<GetNextGenerationRequest, GetNextGenerationResponse>('');
        } catch {

        }
    }
);

export const gameOfLifeSlice = createSlice({
    name: 'gameOfLife',
    initialState,
    reducers: {
        
    }, 
    extraReducers: {
        [getFirstGeneration.pending]: (state, action) => {},
        [getFirstGeneration.fulfilled]: (state, action) => {}, 
        [getFirstGeneration.rejected]: (state, action) => {
            state.loading = false; 
            state.error = action.payload;
        },
        [computeNextGeneration.pending]: (state, action) => {},
        [computeNextGeneration.fulfilled]: (state, action) => {},
        [computeNextGeneration.rejected]: (state, action) => {
            state.loading = false; 
            state.error = action.payload;
        }
    }
});

export default gameOfLifeSlice.reducer;