import { FC, memo, useCallback } from 'react';
import { Link } from 'react-router-dom';

const TABS = [
  { label: 'Overview'},
  { label: 'Details'},
  { label: 'Reviews'},
];

interface TabsProps {
  active: string;
  onClick?: (tab: string) => void;
}

const TabsComponent: FC<TabsProps> = ({ active, onClick}) => {
  const handleTabClick = useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      const { innerText } = event.currentTarget;
      if (onClick) {
        onClick(innerText);
      }
    },
    [onClick]
  );

  return (
    <nav className="film-nav film-card__nav">
      <ul className="film-nav__list">
        {TABS.map((tab) => (
          <li
            key={tab.label}
            className={`film-nav__item ${
              tab.label === active ? 'film-nav__item--active' : ''
            }`}
            onClick={handleTabClick}
          >
            <Link to="" className="film-nav__link">
              {tab.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export const Tabs = memo(TabsComponent);
