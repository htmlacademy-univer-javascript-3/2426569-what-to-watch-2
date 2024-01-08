import {FC, memo, useCallback, useEffect, useMemo, useState} from 'react';
import {Tabs} from './tabs';
import {Overview} from './tab-panels/overview';
import {Details} from './tab-panels/details';
import {Reviews} from './tab-panels/reviews';
import {FilmDetailsInfo} from '../../types/film-details-info';
import {Review} from '../../types/review';
import {TabType, TabTypes} from '../../types/tab-types';

interface FilmDescriptionProps {
  film: FilmDetailsInfo;
  reviews: Review[];
}

const FilmDescriptionComponent: FC<FilmDescriptionProps> = ({film, reviews}) => {
  const [activeTab, setActiveTab] = useState<TabType>(TabTypes.Overview);

  const handleTabClick = useCallback((tab: TabType) => {
    setActiveTab(tab);
  }, []);

  const panel = useMemo(() => {
    switch (activeTab) {
      case TabTypes.Overview:
        return <Overview film={film}/>;
      case TabTypes.Details:
        return <Details film={film}/>;
      case TabTypes.Reviews:
        return <Reviews reviews={reviews}/>;
      default:
        return null;
    }
  }, [activeTab, film, reviews]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setActiveTab(TabTypes.Overview);
    }

    return () => {
      isMounted = false;
    };
  }, [film.id]);

  return (
    <div className="film-card__desc">
      <Tabs onClick={handleTabClick} active={activeTab}/>
      {panel}
    </div>
  );
};

export const FilmDescription = memo(FilmDescriptionComponent);
