import { Navigate } from 'react-router-dom';
import useMe from 'hooks/useMe';

const Home = () => {
  const { data: meData } = useMe();

  if (!meData) {
    return <Navigate to="/signin/" replace={true} />;
  }
  return <Navigate to="/dashboard/" replace={true} />;
};

export default Home;
