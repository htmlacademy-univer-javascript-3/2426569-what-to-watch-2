import {FC, memo, useCallback} from 'react';
import {Link} from 'react-router-dom';
import {TabType, TabTypes} from '../../../types/tab-types';

interface TabsProps {
  active: TabType;
  onClick?: (tab: TabType) => void;
}

interface TabHeaderComponentProps {
  tabTitle: TabType;
  isActive: boolean;
  onClick: () => void;
}

function TabHeaderComponent({isActive, onClick, tabTitle}: TabHeaderComponentProps) {
  return (
    <li className={`film-nav__item ${isActive ? 'film-nav__item--active' : ''}`} onClick={onClick}>
      <Link to="" className="film-nav__link">
        {tabTitle}
      </Link>
    </li>
  );
}

const TabHeader = memo(TabHeaderComponent);

const TabsComponent: FC<TabsProps> = ({active, onClick}) => {
  const handleTabClick = useCallback(
    (tab: TabType) => {
      if (onClick) {
        onClick(tab);
      }
    },
    [onClick]
  );

  const tabs: TabType[] = Object.values(TabTypes);

  return (
    <nav className="film-nav film-card__nav">
      <ul className="film-nav__list">
        {tabs.map((tab) => (
          <TabHeader key={tab} tabTitle={tab} isActive={tab === active} onClick={() => handleTabClick(tab)}/>
        ))}
      </ul>
    </nav>
  );
};

export const Tabs = memo(TabsComponent);
