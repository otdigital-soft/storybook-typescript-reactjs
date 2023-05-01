import { generatePath } from 'react-router-dom';
import routes from 'routes';

export const generateRigDetailsRoute = (
  rigId: string,
  rigType: string,
  projectId?: string,
) => {
  if (projectId) {
    return generatePath(routes.projectRig, { rigId, rigType, projectId });
  }

  return generatePath(routes.rig, { rigId, rigType });
};
