import { ChangeEvent, useEffect, useState } from 'react'

import { motion } from 'framer-motion'

import '../styles/NewsArticlePage.scss'

import close from '../img/close-icon.png'
import add from '../img/add-icon.png'
import back from '../img/back-icon.png'


import { useAppDispatch, useAppSelector } from '../app/hooks'
import * as newsActions from '../features/newsArticles'
import { RequestParameters } from '../types/requestParameters'
import { ArticlesList } from '../components/ArticlesList'

import { Loader } from '../components/Loader'
import { ErrorComponent } from '../components/Error'

export const NewsArticlesPage = () => {
  const [searchParams, setSearchParams] = useState<RequestParameters>({
    query: '',
    page: 1,
    pageSize: 10,
  });

  const dispatch = useAppDispatch();
  const { news, loading, error } = useAppSelector((state) => state.newsArticles);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    setSearchParams((prevSearchParams) => ({
      ...prevSearchParams,
      query: value,
    }))
  };

  const handleClearSearch = () => {
    setSearchParams((prevSearchParams) => ({
      ...prevSearchParams,
      query: '',
    }))
  };

  const handleAdd = () => {
    const newPage = searchParams.page + 1

    setSearchParams((prevSearchParams) => ({
      ...prevSearchParams,
      page: newPage,
    }))
  };

  const handleBackToTheTop = () => {
    setSearchParams((prevSearchParams) => ({
      ...prevSearchParams,
      page: 1,
    }))
  }

  const endOfNews = news.length === 0

  useEffect(() => {
    dispatch(newsActions.init(searchParams));
  }, [searchParams, dispatch])

  return (
    <div>
      <div className="search__div">
        <input
          className="search__input"
          type="text"
          value={searchParams.query}
          onChange={(e) => handleChange(e)}
          placeholder=" "
        />
        <label className="search__label">Search:</label>
        {searchParams.query !== '' && (
          <button className="search__clear" onClick={handleClearSearch}>
            <img className="search__clear-icon" src={close} alt="" />
          </button>
        )}
      </div>

      {loading && <Loader />}
      {error && <ErrorComponent error={error} />}
      {endOfNews && searchParams.page !== 1 && !loading && (
        <h1>You have already checked all the latest news</h1>
      )}
      {endOfNews && searchParams.page === 1 && !loading && searchParams.query !== '' && (
        <h1>No news with current query</h1>
      )}

      <ArticlesList articles={news} />

      {(endOfNews && searchParams.page !== 1 && !loading) ? (
        <motion.button
        onClick={handleBackToTheTop}
        className="back button"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        <img className="back-icon" src={back} alt="back" />
      </motion.button>
      ) : (
      <motion.button
        onClick={handleAdd}
        className="add button"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        <img className="add-icon" src={add} alt="add10" />
      </motion.button>

      )}
    </div>
  )
}
