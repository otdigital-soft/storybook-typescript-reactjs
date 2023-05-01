import { Navigate } from 'react-router-dom';
import useMe from 'hooks/useMe';

interface AuthenticatedProps {
  children: JSX.Element;
}

const Authenticated = ({ children }: AuthenticatedProps) => {
  const { data: meData } = useMe();

  if (!meData) {
    return <Navigate to="/signin/" replace={true} />;
  }

  return children;
};

export default Authenticated;
