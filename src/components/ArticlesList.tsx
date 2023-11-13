import { Article } from '../types/article'
import { ArticleItem } from './ArticleItem'

import '../styles/ArticleList.scss'

export const ArticlesList = ({ articles }: { articles: Article[] }) => {
  return (
    <div className="article-list">
      {articles.map((article: Article) => (
        <ArticleItem item={article} key={article.url} />
      ))}
    </div>
  )
}
