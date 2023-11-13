import { NavLink } from 'react-router-dom';
import '../styles/Header.scss';
import classNames from 'classnames';

const getLinkClass = ({ isActive }: { isActive: boolean }) => classNames('nav', { 'nav_is-active' : isActive });

export const Header = () => {
    return (
        <div className="header-navigation">
            <NavLink to="/" className={getLinkClass}>
                Your Article
            </NavLink>

                <div className="title">
                    <div className="title_content">
                        <h1 >
                            Articles
                        </h1>
                        <h1 >
                            Articles
                        </h1>
                    </div>
                </div>

            <NavLink to="/news" className={getLinkClass}>
                News Article
            </NavLink>
        </div>
    );
}