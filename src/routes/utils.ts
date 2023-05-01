import { generatePath } from 'react-router-dom';
import routes from 'routes';
import { RigType } from 'routes';

export const generateWellPath = (wellId: number, projectId?: number) => {
  if (projectId) {
    return generatePath(routes.projectWell, {
      wellId: String(wellId),
      projectId: String(projectId),
    });
  }
  return generatePath(routes.well, {
    wellId: String(wellId),
  });
};

export const generateRigPath = (
  rigId: number,
  rigType: RigType,
  projectId?: number,
) => {
  if (projectId) {
    return generatePath(routes.projectRig, {
      rigId: String(rigId),
      rigType: String(rigType),
      projectId: String(projectId),
    });
  }
  return generatePath(routes.rig, {
    rigId: String(rigId),
    rigType: String(rigType),
  });
};

export const generateUpdateWellPath = (wellId: number, projectId?: number) => {
  if (projectId) {
    return generatePath(routes.updateProjectWell, {
      wellId: String(wellId),
      projectId: String(projectId),
    });
  }
  return generatePath(routes.updateWell, {
    wellId: String(wellId),
  });
};

export const generateCreateWellPath = (projectId?: number) => {
  if (projectId) {
    return generatePath(routes.createProjectWell, {
      projectId: String(projectId),
    });
  }
  return routes.createWell;
};

export const generateUpdateRigPath = (
  rigId: number,
  rigType: RigType,
  projectId?: number,
) => {
  if (projectId) {
    return generatePath(routes.projectUpdateRig, {
      projectId: String(projectId),
      rigId: String(rigId),
      rigType,
    });
  }

  return generatePath(routes.updateRig, { rigId: String(rigId), rigType });
};
