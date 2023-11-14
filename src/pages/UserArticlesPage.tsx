import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { useAppDispatch, useAppSelector } from '../app/hooks'
import { ArticlesList } from '../components/ArticlesList'
import { loadUserArticles } from '../features/userArticles'
import AddingArticleForm from '../components/AddingArticleForm'

import '../styles/UserArticlesPage.scss'

export const UserArticlesPage = () => {
  const dispatch = useAppDispatch()

  const { userArticles } = useAppSelector((state) => state.userArticles)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    dispatch(loadUserArticles())
  }, [dispatch])

  return (
    <>
    <motion.button
    className='create-button'
    onClick={openModal}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        Create Article
      </motion.button>

      {isModalOpen && <AddingArticleForm onClose={closeModal} />}

      <ArticlesList articles={userArticles} />
    </>
  )
}
