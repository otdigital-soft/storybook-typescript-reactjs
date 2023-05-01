export enum RigType {
  Semi = 'semi',
  Jackup = 'jackup',
  Drillship = 'drillship',
}

const routes = {
  index: '/',
  dashboard: '/dashboard/',
  prepare: '/dashboard/prepare/',
  prepareTab: '/dashboard/prepare/:tabId/',
  project: '/dashboard/prepare/projects/:projectId/',
  projectRig: '/dashboard/prepare/projects/:projectId/rigs/:rigType/:rigId/',
  projectUpdateRig:
    '/dashboard/prepare/projects/:projectId/rigs/:rigType/:rigId/update/',
  projectCreateRig: '/dashboard/prepare/projects/:projectId/rigs/create/',
  createProject: '/dashboard/prepare/projects/create/',
  updateProject: '/dashboard/prepare/projects/:projectId/update/',
  well: '/dashboard/prepare/wells/:wellId/',
  projectWell: '/dashboard/prepare/projects/:projectId/wells/:wellId/',
  createWell: '/dashboard/prepare/wells/create/',
  createProjectWell: '/dashboard/prepare/projects/:projectId/wells/create/',
  updateWell: '/dashboard/prepare/wells/:wellId/update/',
  updateProjectWell:
    '/dashboard/prepare/projects/:projectId/wells/:wellId/update/',
  studies: '/dashboard/benchmarks/',
  study: '/dashboard/benchmarks/:projectId/',
  monitors: '/dashboard/monitors/',
  monitor: '/dashboard/monitors/:monitorId/',
  support: '/dashboard/support/',
  settings: '/dashboard/settings/',
  launch: '/dashboard/',
  rigs: '/dashboard/prepare/rigs/',
  rig: '/dashboard/prepare/rigs/:rigType/:rigId/',
  createRig: '/dashboard/prepare/rigs/create/',
  updateRig: '/dashboard/prepare/rigs/:rigType/:rigId/update/',
  notifications: '/dashboard/notifications/',
  createPlan: '/dashboard/prepare/projects/:projectId/plans/create/',
  updatePlan: '/dashboard/prepare/projects/:projectId/plans/:planId/update/',
  createEMP:
    '/dashboard/prepare/projects/:projectId/rigs/:rigType/:rigId/emp/create/',
  updateEMP:
    '/dashboard/prepare/projects/:projectId/rigs/:rigType/:rigId/emp/update/',
  signin: '/signin/',
  search: '/dashboard/search/:query/',
  changeForgottenPassword: '/forgot-password/:uid/:token/',
  invitation: '/invitation/:token/',
  createWellPlan: '/dashboard/emissions/well-construction/wells/create/',
  updateWellPlanStep:
    '/dashboard/emissions/well-construction/wells/:wellPlanId/:stepId/',
  updateWellPlan: '/dashboard/emissions/well-construction/wells/:wellPlanId/',
  wellPlaneReport: '/reports/well-plans/:wellPlanId/',
  assets: '/dashboard/emissions/well-construction/assets/',
  createAsset: '/dashboard/emissions/well-construction/assets/create/',
  updateAsset: '/dashboard/emissions/well-construction/assets/:assetId/update/',
  wells: '/dashboard/emissions/well-construction/wells/',
};

export default routes;
