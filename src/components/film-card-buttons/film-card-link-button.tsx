import React, {memo, PropsWithChildren, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';

interface FilmCardLinkButtonProps {
  icon?: React.JSX.Element;
  toLink: string;
  classNames?: string;
  title: string;
}

interface FilmCardButtonProps {
  icon?: React.JSX.Element;
  onClick: () => void;
  classNames?: string;
  title: string;
}

function FilmCardButtonComponent({children, onClick, icon, title, classNames}: PropsWithChildren<FilmCardButtonProps>) {
  return (
    <button className={`btn ${classNames ?? ''} film-card__button`} type="button" onClick={onClick}>
      {icon}
      <span>{title}</span>
      {children}
    </button>
  );
}

function FilmCardLinkButtonComponent(props: PropsWithChildren<FilmCardLinkButtonProps>) {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(props.toLink);
  }, [navigate]);

  return (
    <FilmCardButtonComponent {...props} onClick={handleClick} />
  );
}

export const FilmCardLinkButton = memo(FilmCardLinkButtonComponent);
export const FilmCardButton = memo(FilmCardButtonComponent);
