import {Link} from 'react-router-dom';
import {RoutesLinks} from '../../routes/route-links';

type BreadcrumbsProps = {
  id: string;
  title: string;
}

export function Breadcrumbs({id, title} : BreadcrumbsProps) {
  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to={RoutesLinks.Film.replace(':id', id)} className="breadcrumbs__link">
            {title}
          </Link>
        </li>
        <li className="breadcrumbs__item">
          <Link to={RoutesLinks.AddReview.replace(':id', id)} className="breadcrumbs__link">Add review</Link>
        </li>
      </ul>
    </nav>
  );
}
