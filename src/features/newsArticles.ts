import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchNewsData } from '../api/articles';
import { RequestParameters } from '../types/requestParameters';
import { Article, NewsResponse } from '../types/article';

const newsSlice = createSlice({
  name: 'newsArticles',
  initialState: {
    news: [] as Article[],
    loading: false,
    error: '',
  },
  reducers: {
    setNews: (state, action) => {
      state.news = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(init.pending, (state) => {
        state.loading = true;
        })
      .addCase(init.fulfilled, (state, action) => {
        state.news = action.payload.articles;
        state.loading = false;
      })
      .addCase(init.rejected, (state, action) => {
        state.error = 'Something went wrong';
        state.loading = false;
      });
  },
});

export const { setNews } = newsSlice.actions;

export default newsSlice.reducer;

export const init = createAsyncThunk<NewsResponse, RequestParameters>('news/fetch', async (params) => {
  return fetchNewsData(params);
});