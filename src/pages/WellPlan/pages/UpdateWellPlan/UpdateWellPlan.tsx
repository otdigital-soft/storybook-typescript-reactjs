import { Spin } from 'antd';
import Center from 'components/Center';
import { Content, Header } from 'components/Layout';
import PageHeader from 'components/PageHeader';
import { defaultBreadcrumbItemRender } from 'components/PageHeader/PageHeader';
import Result from 'components/Result';
import PageHeaderExtra from 'containers/PageHeaderExtra';
import useBack from 'hooks/useBack';
import {
  CurrentStepToWellPlanStepMap,
  WellPlanStep,
} from 'pages/WellPlan/consts';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import UpdateWellCompletePlan from 'pages/WellPlan/pages/UpdateWellCompletePlan';
import useAllowedSteps from 'pages/WellPlan/pages/UpdateWellPlan/useAllowedSteps';
import WellDetails from 'pages/Wells/pages/WellDetails';
import UpdateWellPlanPlanning from 'pages/WellPlan/pages/UpdateWellPlanPlanning';
import WellPlanReporting from 'pages/WellPlan/pages/WellPlanReporting';
import { generatePath, Navigate } from 'react-router-dom';
import routes from 'routes';

const UpdateWellPlan = () => {
  const {
    wellPlanId,
    stepId,
    isLoading: isLoadingWellPlan,
    error: wellPlanError,
    data: wellPlanData,
  } = useCurrentWellPlan();
  const allowedSteps = useAllowedSteps();
  const { handleBack } = useBack();
  const breadcrumbRoutes = [
    {
      path: routes.dashboard,
      breadcrumbName: 'Dashboard',
    },
    {
      path: routes.wells,
      breadcrumbName: 'Wells',
    },
    {
      path: '',
      breadcrumbName: wellPlanData?.name.name || '',
    },
  ];

  if (isLoadingWellPlan) {
    return (
      <Center flexGrow={1}>
        <Spin size="large" />
      </Center>
    );
  }

  if (wellPlanError) {
    return (
      <Center flexGrow={1}>
        <Result status="error" subTitle="Unable to load well plan right now" />
      </Center>
    );
  }

  if (wellPlanData && (!stepId || (stepId && !allowedSteps.includes(stepId)))) {
    return (
      <Navigate
        to={generatePath(routes.updateWellPlanStep, {
          wellPlanId: String(wellPlanId),
          stepId: CurrentStepToWellPlanStepMap[wellPlanData.current_step],
        })}
        replace={true}
      />
    );
  }

  let children;
  switch (stepId) {
    case WellPlanStep.Details:
      children = <WellDetails />;
      break;
    case WellPlanStep.Planning:
      children = <UpdateWellPlanPlanning />;
      break;
    case WellPlanStep.Complete:
      children = <UpdateWellCompletePlan />;
      break;
    case WellPlanStep.Analysis:
      children = <WellPlanReporting />;
      break;
    default:
      children = (
        <Center flexGrow={1}>
          <Result
            status="error"
            subTitle="Unable to load well plan right now"
          />
        </Center>
      );
      break;
  }

  return (
    <>
      <Header>
        <PageHeader
          title="Wells"
          onBack={handleBack}
          breadcrumb={{
            routes: breadcrumbRoutes,
            itemRender: defaultBreadcrumbItemRender,
          }}
          extra={<PageHeaderExtra />}
        />
      </Header>
      <Content>{children}</Content>
    </>
  );
};

export default UpdateWellPlan;
