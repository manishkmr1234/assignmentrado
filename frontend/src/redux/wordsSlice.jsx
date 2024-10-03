import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  words: [],
  loading: false,
  error: null,
};

//adding word form backend
export const addWord = createAsyncThunk(
  "words/addWord",
  async (word, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/words/add", {
        word,
      });
      return response.data;
    } catch (error) {
      
      return rejectWithValue(error.response.data);
    }
  }
);

//fetching words from the backend
export const fetchWords = createAsyncThunk(
  "words/fetchWords",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/words");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const wordsSlice = createSlice({
  name: "words",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addWord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addWord.fulfilled, (state, action) => {
        state.loading = false;
        state.words.push(action.payload);
      })
      .addCase(addWord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchWords.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWords.fulfilled, (state, action) => {
        state.loading = false;
        state.words = action.payload;
      })
      .addCase(fetchWords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default wordsSlice.reducer;
