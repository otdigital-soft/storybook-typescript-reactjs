import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import routes from 'routes';

export const useBack = (
  defaultPath = routes.index,
): {
  hasBack: boolean;
  handleBack: () => void;
} => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasBack = location.key !== 'default';

  const handleBack = useCallback(() => {
    if (hasBack) {
      navigate(-1);
    } else {
      navigate(defaultPath);
    }
  }, [defaultPath, hasBack, navigate]);

  return { hasBack, handleBack };
};

export default useBack;
