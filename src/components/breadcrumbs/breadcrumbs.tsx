import {Link} from 'react-router-dom';
import {ROUTES_LINKS} from '../../routes/consts.ts';

type BreadcrumbsProps = {
  id: string;
  title: string;
}

export function Breadcrumbs({id, title} : BreadcrumbsProps) {
  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to={ROUTES_LINKS.FILM.replace(':id', id)} className="breadcrumbs__link">
            {title}
          </Link>
        </li>
        <li className="breadcrumbs__item">
          <Link to={ROUTES_LINKS.ADD_REVIEW.replace(':id', id)} className="breadcrumbs__link">Add review</Link>
        </li>
      </ul>
    </nav>
  );
};
