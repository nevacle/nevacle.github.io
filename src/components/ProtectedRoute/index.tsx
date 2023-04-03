import { Navigate } from 'react-router-dom';

import routes from '../../constants/routes';
import { useAuth } from '../../contexts/AuthContext';
import LibraryLoader from '../LibraryLoader';

type Props = {
  children: JSX.Element,
};

export default function ProtectedRoute(props: Props) {
  const { children } = props;
  const {
    firebaseUserDetails,
    loadingFirebaseUserDetails,
    loadingUserDetails,
  } = useAuth();

  if (loadingFirebaseUserDetails) {
    return <LibraryLoader />;
  }

  if (!firebaseUserDetails) {
    return <Navigate to={routes.HOME} />;
  }

  if (loadingUserDetails) {
    return <LibraryLoader />;
  }

  return children;
}
