import App from 'containers/App';
import Authenticated from 'containers/Authenticated';
import Dashboard from 'containers/Dashboard';
import PrivacyPolicyAccepted from 'containers/PrivacyPolicyAccepted';
import Public from 'containers/Public';
import Tenant from 'containers/Tenant';
import User from 'containers/User';
import AddProjectRig from 'pages/AddProjectRig';
import AddRig from 'pages/AddRig/AddRig';
import { AssetList, CreateAsset, UpdateAsset } from 'pages/Assets';
import ChangeForgottenPassword from 'pages/ChangeForgottenPassword';
import CreateEMP from 'pages/CreateEMP';
import CreatePlan from 'pages/CreatePlan';
import CreateProject from 'pages/CreateProject';
import CreateProjectWell from 'pages/CreateProjectWell';
import CreateWell from 'pages/CreateWell';
import Drillship from 'pages/Drillship';
import ForgotPassword from 'pages/ForgotPassword';
import Home from 'pages/Home';
import Invitation from 'pages/Invitation';
import JackupRig from 'pages/JackupRig';
import Launch from 'pages/Launch';
import Monitor from 'pages/Monitor';
import Monitors from 'pages/Monitors';
import NoMatch from 'pages/NoMatch';
import Notifications from 'pages/Notifications';
import Prepare from 'pages/Prepare';
import PrivacyPolicy from 'pages/PrivacyPolicy';
import Project from 'pages/Project';
import ProjectDrillship from 'pages/ProjectDrillship';
import ProjectJackupRig from 'pages/ProjectJackupRig';
import ProjectSemiRig from 'pages/ProjectSemiRig';
import ProjectWell from 'pages/ProjectWell';
import SearchResults from 'pages/SearchResults';
import SemiRig from 'pages/SemiRig';
import Settings from 'pages/Settings';
import SignIn from 'pages/SignIn';
import Studies from 'pages/Studies';
import Study from 'pages/Study';
import Support from 'pages/Support';
import UpdateDrillship from 'pages/UpdateDrillship';
import UpdateEMP from 'pages/UpdateEMP';
import UpdateJackupRig from 'pages/UpdateJackupRig';
import UpdatePlan from 'pages/UpdatePlan';
import UpdateProject from 'pages/UpdateProject';
import UpdateProjectDrillship from 'pages/UpdateProjectDrillship';
import UpdateProjectJackupRig from 'pages/UpdateProjectJackupRig';
import UpdateProjectSemiRig from 'pages/UpdateProjectSemiRig';
import UpdateProjectWell from 'pages/UpdateProjectWell';
import UpdateSemiRig from 'pages/UpdateSemiRig';
import UpdateWell from 'pages/UpdateWell';
import Well from 'pages/Well';
import CreateWellPlan from 'pages/Wells/pages/CreateWell';
import UpdateWellPlan from 'pages/WellPlan/pages/UpdateWellPlan';
import WellPlanReport from 'pages/WellPlan/pages/WellPlanReport';
import WellList from 'pages/Wells/pages/WellList/WellList';
import { Outlet, Route, Routes } from 'react-router-dom';

const Routing = () => {
  return (
    <App>
      <Tenant>
        <User>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route
                path="privacy-policy"
                element={
                  <Public>
                    <PrivacyPolicy />
                  </Public>
                }
              />
              <Route
                path="signin"
                element={
                  <Public>
                    <SignIn />
                  </Public>
                }
              />
              <Route path="forgot-password">
                <Route
                  index
                  element={
                    <Public>
                      <ForgotPassword />
                    </Public>
                  }
                />
                <Route
                  path=":uid/:token"
                  element={
                    <Public>
                      <ChangeForgottenPassword />
                    </Public>
                  }
                />
              </Route>
              <Route
                path="invitation/:token"
                element={
                  <Public>
                    <Invitation />
                  </Public>
                }
              />
              <Route
                path="reports"
                element={
                  <Authenticated>
                    <PrivacyPolicyAccepted>
                      <Outlet />
                    </PrivacyPolicyAccepted>
                  </Authenticated>
                }
              >
                <Route
                  path="well-plans/:wellPlanId"
                  element={<WellPlanReport />}
                />
              </Route>
              <Route
                path="dashboard"
                element={
                  <Authenticated>
                    <PrivacyPolicyAccepted>
                      <Dashboard />
                    </PrivacyPolicyAccepted>
                  </Authenticated>
                }
              >
                <Route index element={<Launch />} />
                <Route path="prepare">
                  <Route index element={<Prepare />} />
                  <Route path=":tabId" element={<Prepare />} />
                  <Route path="projects/:projectId" element={<Project />} />
                  <Route path="projects/create" element={<CreateProject />} />
                  <Route
                    path="projects/:projectId/rigs/create"
                    element={<AddProjectRig />}
                  />
                  <Route path="rigs/create" element={<AddRig />} />
                  <Route path="rigs/jackup/:rigId" element={<JackupRig />} />
                  <Route
                    path="rigs/jackup/:rigId/update"
                    element={<UpdateJackupRig />}
                  />
                  <Route
                    path="projects/:projectId/rigs/jackup/:rigId/"
                    element={<ProjectJackupRig />}
                  />
                  <Route
                    path="rigs/semi/:rigId/update"
                    element={<UpdateSemiRig />}
                  />
                  <Route
                    path="projects/:projectId/rigs/jackup/:rigId/update"
                    element={<UpdateProjectJackupRig />}
                  />
                  <Route
                    path="projects/:projectId/rigs/semi/:rigId/update"
                    element={<UpdateProjectSemiRig />}
                  />
                  <Route
                    path="projects/:projectId/rigs/semi/:rigId/"
                    element={<ProjectSemiRig />}
                  />
                  <Route
                    path="rigs/drillship/:rigId/update"
                    element={<UpdateDrillship />}
                  />
                  <Route
                    path="projects/:projectId/rigs/drillship/:rigId/update"
                    element={<UpdateProjectDrillship />}
                  />
                  <Route path="rigs/semi/:rigId" element={<SemiRig />} />
                  <Route
                    path="projects/:projectId/rigs/drillship/:rigId/"
                    element={<ProjectDrillship />}
                  />
                  <Route path="rigs/drillship/:rigId" element={<Drillship />} />
                  <Route
                    path="projects/:projectId/update"
                    element={<UpdateProject />}
                  />
                  <Route
                    path="projects/:projectId/plans/create"
                    element={<CreatePlan />}
                  />
                  <Route
                    path="projects/:projectId/plans/:planId/update"
                    element={<UpdatePlan />}
                  />
                  <Route
                    path="projects/:projectId/rigs/:rigType/:rigId/emp/create"
                    element={<CreateEMP />}
                  />
                  <Route
                    path="projects/:projectId/rigs/:rigType/:rigId/emp/update"
                    element={<UpdateEMP />}
                  />
                  <Route
                    path="projects/:projectId/wells/:wellId"
                    element={<ProjectWell />}
                  />
                  <Route path="wells/:wellId" element={<Well />} />
                  <Route path="wells/:wellId/update" element={<UpdateWell />} />
                  <Route
                    path="projects/:projectId/wells/:wellId/update"
                    element={<UpdateProjectWell />}
                  />
                  <Route
                    path="projects/:projectId/wells/create"
                    element={<CreateProjectWell />}
                  />
                  <Route path="wells/create" element={<CreateWell />} />
                </Route>
                <Route path="benchmarks">
                  <Route index element={<Studies />} />
                  <Route path=":projectId" element={<Study />} />
                </Route>
                <Route path="monitors">
                  <Route index element={<Monitors />} />
                  <Route path=":monitorId" element={<Monitor />} />
                </Route>
                <Route path="emissions/well-construction/assets">
                  <Route index element={<AssetList />} />
                  <Route path="create" element={<CreateAsset />} />
                  <Route path=":assetId/update" element={<UpdateAsset />} />
                </Route>
                <Route path="emissions/well-construction/wells">
                  <Route index element={<WellList />} />
                  <Route path="create" element={<CreateWellPlan />} />
                  <Route path=":wellPlanId" element={<UpdateWellPlan />} />
                  <Route
                    path=":wellPlanId/:stepId"
                    element={<UpdateWellPlan />}
                  />
                </Route>
                <Route path="support" element={<Support />} />
                <Route path="settings" element={<Settings />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="search/:query" element={<SearchResults />} />
              </Route>
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
        </User>
      </Tenant>
    </App>
  );
};

export default Routing;
