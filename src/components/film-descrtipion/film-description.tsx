import {FC, memo, useCallback, useEffect, useMemo, useState} from 'react';
import {Tabs} from './tabs';
import {Overview} from './tab-panels/overview';
import {Details} from './tab-panels/details';
import {Reviews} from './tab-panels/reviews';
import {FilmDetailsInfo} from '../../types/filmDetailsInfo.ts';
import {Review} from '../../types/review.ts';

export const TabTypes = ['Overview', 'Details', 'Reviews'] as const;

interface FilmDescriptionProps {
  film: FilmDetailsInfo;
  reviews: Review[];
}

const FilmDescriptionComponent: FC<FilmDescriptionProps> = ({film, reviews}) => {
  const [activeTab, setActiveTab] = useState<string>(TabTypes[0]);

  const handleTabClick = useCallback((tab: string) => {
    const foundTab = TabTypes.find((currentTab) => tab === currentTab);
    if (foundTab) {
      setActiveTab(tab);
    }
  }, []);

  const panel = useMemo(() => {
    switch (activeTab) {
      case TabTypes[0]:
        return <Overview film={film}/>;
      case TabTypes[1]:
        return <Details film={film}/>;
      case TabTypes[2]:
        return <Reviews reviews={reviews}/>;
      default:
        return null;
    }
  }, [activeTab, film]);

  useEffect(() => {
    setActiveTab(TabTypes[0]);
  }, [film.id]);

  return (
    <div className="film-card__desc">
      <Tabs onClick={handleTabClick} active={activeTab}/>
      {panel}
    </div>
  );
};

export const FilmDescription = memo(FilmDescriptionComponent);
