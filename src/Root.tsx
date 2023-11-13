import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { UserArticlesPage } from './pages/UserArticlesPage';
import { NewsArticlesPage } from './pages/NewsArticlesPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const Root = () => (
  <Router>
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<App />}>
        <Route index element={<UserArticlesPage />} />
        <Route path='news' element={<NewsArticlesPage />} />
        <Route path='*' element={<NotFoundPage />} />
        </Route>

      </Routes>
    </Provider>
  </Router>
);
