import React, {memo, PropsWithChildren, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';

interface FilmCardButtonProps {
  icon?: React.JSX.Element;
  toLink: string;
  classNames?: string;
  title: string;
}

function FilmCardLinkButtonComponent({children, toLink, icon, title, classNames}: PropsWithChildren<FilmCardButtonProps>) {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(toLink);
  }, [navigate]);

  return (
    <button className={`btn ${classNames ?? ''} film-card__button`} type="button" onClick={handleClick}>
      {icon}
      <span>{title}</span>
      {children}
    </button>
  );
}

export const FilmCardLinkButton = memo(FilmCardLinkButtonComponent);
