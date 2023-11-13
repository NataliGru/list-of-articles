import { Article } from '../types/article'

import '../styles/ArticleItem.scss'
import placeholderImage from '../img/news-placeholder.webp'
import { useAppDispatch } from '../app/hooks'
import { togglePinArticle, removeArticle } from '../features/userArticles'

import deleteIcon from '../img/icons8-delete-100.png'
import pinIcon from '../img/pin-icon.png'
import unPinIcon from '../img/unpin-icon.png'
import classNames from 'classnames'

export const ArticleItem = ({ item }: { item: Article }) => {
  const { author, title, description, urlToImage, url } = item

  const imageSource = urlToImage ? urlToImage : placeholderImage

  const dispatch = useAppDispatch()

  const isUserArticle = item.hasOwnProperty('isPinned')

  const handleTogglePinArticle = () => {
    dispatch(togglePinArticle(item.source.id))
  }

  const handleRemoveArticle = () => {
    dispatch(removeArticle(item.source.id))
  }

  return (
    <div
      className={classNames('article', {
        article_pinned: item.isPinned,
      })}
    >
      <a className="article_link" href={url} target="_blank">
        <img
          className="article_image"
          src={imageSource}
          alt={`${author} - ${title}`}
        />
        <div className="article_title">{title}</div>
      </a>
      <div className="article_author">{author}</div>
      <div className="article_description">{description}</div>

      {isUserArticle && (
        <>
          <button className="button delete" onClick={handleRemoveArticle}>
            <img src={deleteIcon} alt="delete" className="button-icon" />
          </button>
            <button className="article_buttons pin" onClick={handleTogglePinArticle}>
              {item.isPinned ? (
                <img src={unPinIcon} alt="unpin" className="button-icon" />
              ) : (
                <img src={pinIcon} alt="pin" className="button-icon" />
              )}
            </button>
        </>
      )}
    </div>
  )
}
