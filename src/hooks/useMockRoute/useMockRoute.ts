import { useContext, useEffect } from 'react';
import { UNSAFE_RouteContext } from 'react-router-dom';
import { RouteMatch } from 'react-router';

const useMockRoute = (match: RouteMatch) => {
  const routeContext = useContext(UNSAFE_RouteContext);
  useEffect(() => {
    // todo: we should use MemoryRouter instead
    routeContext.matches = [match];
  }, [match, routeContext]);
};

export default useMockRoute;
