import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Article } from '../types/article'

interface UserState {
  userArticles: Article[],
  pinnedArticleId: string | null,
  loading: boolean,
}

const userSlice = createSlice({
  name: 'userArticles',
  initialState: {
    userArticles: [] as Article[],
    pinnedArticleId: null,
    loading: false,
  } as UserState,
  reducers: {
    addArticle: (state, action: PayloadAction<Article>) => {
      state.userArticles.push(action.payload)

      localStorage.setItem('userArticles', JSON.stringify(state.userArticles))
    },
    togglePinArticle: (state, action: PayloadAction<string>) => {
      const articleToPin = state.userArticles.find(
        (article) => article.source.id === action.payload,
      )

      if (articleToPin) {
        const isAlreadyPinned = state.pinnedArticleId === action.payload

        if (isAlreadyPinned) {
          articleToPin.isPinned = false
          state.pinnedArticleId = null
          localStorage.setItem('pinnedArticleId ', '')
        } else {
          const prevPinnedArticle = state.userArticles.find(
            (article) => article.source.id === state.pinnedArticleId,
          )

          if (prevPinnedArticle) {
            prevPinnedArticle.isPinned = false
          }

          articleToPin.isPinned = true
          state.pinnedArticleId = action.payload
          state.userArticles = [
            articleToPin,
            ...state.userArticles.filter(
              (art) => art.source.id !== state.pinnedArticleId,
            ),
          ]
        }

        localStorage.setItem('userArticles', JSON.stringify(state.userArticles))
        localStorage.setItem('pinnedArticleId', state.pinnedArticleId || '')
      }
    },
    loadUserArticles: (state) => {
      state.loading = true;
      const storedUserArticles = localStorage.getItem('userArticles')

      if (storedUserArticles) {
        state.userArticles = JSON.parse(storedUserArticles)
      state.loading = false;
      }

      const storedPinnedArticleId = localStorage.getItem('pinnedArticleId')
      if (storedPinnedArticleId) {
        state.pinnedArticleId = storedPinnedArticleId
      }
    },
    removeArticle: (state, action: PayloadAction<string>) => {
      state.userArticles = state.userArticles.filter(
        (art) => art.source.id !== action.payload,
      )

      if (state.pinnedArticleId === action.payload) {
        state.pinnedArticleId = null
        localStorage.setItem('pinnedArticleId ', state.pinnedArticleId || '')
      }

      localStorage.setItem('userArticles', JSON.stringify(state.userArticles))
    },
  },
})

export const { 
  addArticle, 
  loadUserArticles, 
  togglePinArticle, 
  removeArticle, 
} = userSlice.actions

export default userSlice.reducer
