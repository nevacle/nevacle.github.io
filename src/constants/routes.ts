const HOME = '/';
const BOOKS = '/books';
const FORBIDDEN_PAGE = '/error';
const REQUESTS = '/requests';
const ROLES = '/roles';

export const NAMED_ROUTES = [
  { name: 'Home', path: HOME },
  { name: 'Books', path: BOOKS },
  { name: 'Requests', path: REQUESTS },
  { name: 'Roles', path: ROLES },
  { name: 'Error', path: FORBIDDEN_PAGE },
];

export default {
  BOOKS,
  FORBIDDEN_PAGE,
  HOME,
  REQUESTS,
  ROLES,
};
