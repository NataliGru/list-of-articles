import { useState, ChangeEvent, FormEvent } from 'react'
import { useDispatch } from 'react-redux'

import { motion } from 'framer-motion'

import { addArticle } from '../features/userArticles'
import { Article } from '../types/article'

import close from '../img/close-icon.png'

import '../styles/AddingArticleForm.scss'

const AddingArticleForm = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch()

  const currentTime = new Date().toISOString()
  const source = { id: currentTime, name: 'Natali' }

  const [articleData, setArticleData] = useState<Article>({
    source,
    author: '',
    title: '',
    description: '',
    url: '',
    urlToImage: '',
    publishedAt: currentTime,
    content: '',
    isPinned: false,
  })

  const [errors, setErrors] = useState<Partial<Record<keyof Article, string>>>(
    {},
  )

  const isValidURL = (url: string) => {
    const urlPattern = /^https?:\/\/\S+$/
    return urlPattern.test(url)
  }

  const validateField = (name: keyof Article) => {
    const newErrors = { ...errors }

    if (
      typeof articleData[name] === 'string' &&
      (articleData[name] as string).trim() === ''
    ) {
      newErrors[name] = `${
        name.charAt(0).toUpperCase() + name.slice(1)
      } is required`
    } else if (
      (name === 'url' || name === 'urlToImage') &&
      !isValidURL(articleData[name] as string)
    ) {
      newErrors[name] = 'Invalid URL format'
    }

    setErrors(newErrors)
  }

  const handleFocus = (name: keyof Article) => {
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }))
  }

  const handleBlur = (name: keyof Article) => {
    validateField(name)
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target

    setArticleData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    for (const error of Object.values(errors)) {
      if (error !== '') {
        return
      }
    }
    const newArticle: Article = {
      source: { ...articleData.source },
      author: articleData.author,
      title: articleData.title,
      description: articleData.description,
      url: articleData.url,
      urlToImage: articleData.urlToImage,
      publishedAt: articleData.publishedAt,
      content: articleData.content,
      isPinned: articleData.isPinned,
    }

    dispatch(addArticle(newArticle))
    onClose()

    setArticleData({
      source,
      author: '',
      title: '',
      description: '',
      url: '',
      urlToImage: '',
      publishedAt: '',
      content: '',
      isPinned: false,
    })
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <motion.button
          className="close"
          onClick={onClose}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <img className="close-icon" src={close} alt="close" />
        </motion.button>

        <form onSubmit={handleSubmit} className="form create-article">
          <h2 className="form__title">Create article</h2>
          <div className="form__div">
            <input
              className="form__input"
              type="text"
              name="author"
              value={articleData.author}
              onChange={handleChange}
              onFocus={() => handleFocus('author')}
              onBlur={() => handleBlur('author')}
              placeholder=" "
            />
            <label className="form__label">Author:</label>
            <div className="form__error">{errors.author}</div>
          </div>

          <div className="form__div">
            <input
              className="form__input"
              type="text"
              name="title"
              value={articleData.title}
              onChange={handleChange}
              onFocus={() => handleFocus('title')}
              onBlur={() => handleBlur('title')}
              placeholder=" "
            />
            <label className="form__label">Title:</label>
            <div className="form__error">{errors.title}</div>
          </div>

          <div className="form__div">
            <textarea
              className="form__input"
              name="description"
              value={articleData.description}
              onChange={handleChange}
              placeholder=" "
            />
            <label className="form__label">Description:</label>
          </div>

          <div className="form__div">
            <input
              className="form__input"
              type="text"
              name="url"
              value={articleData.url}
              onFocus={() => handleFocus('url')}
              onBlur={() => handleBlur('url')}
              onChange={handleChange}
              placeholder=" "
            />
            <label className="form__label">URL:</label>
            <div className="form__error">{errors.url}</div>
          </div>

          <div className="form__div">
            <input
              className="form__input"
              type="text"
              name="urlToImage"
              value={articleData.urlToImage}
              onFocus={() => handleFocus('urlToImage')}
              onBlur={() => handleBlur('urlToImage')}
              onChange={handleChange}
              placeholder=" "
            />
            <label className="form__label">URL To Image:</label>
            <div className="form__error">{errors.urlToImage}</div>
          </div>

          <div className="form__div">
            <textarea
              className="form__input"
              name="content"
              value={articleData.content}
              onChange={handleChange}
              placeholder=" "
            />
            <label className="form__label">Content:</label>
          </div>

          <motion.button
            className="form__button"
            type="submit"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            Add Article
          </motion.button>
        </form>
      </div>
    </div>
  )
}

export default AddingArticleForm
