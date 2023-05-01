import useBack from 'hooks/useBack';
import routes, { RigType } from 'routes';
import { generatePath, useParams } from 'react-router-dom';
import useCustomDrillship from 'hooks/useCustomDrillship';
import Center from 'components/Center';
import { Spin } from 'antd';
import { isNotFoundError } from 'utils/api';
import Result from 'components/Result';
import { Content, Header } from 'components/Layout';
import PageHeader from 'components/PageHeader';
import { defaultBreadcrumbItemRender } from 'components/PageHeader/PageHeader';
import PageHeaderExtra from 'containers/PageHeaderExtra';
import Box from 'components/Box';
import UpdateDrillshipForm from 'containers/UpdateDrillshipForm';
import UpdateDrillshipDraftForm from 'containers/UpdateDrillshipDraftForm';

const UpdateDrillship = () => {
  const { handleBack } = useBack(routes.prepare);
  const { rigId } = useParams<{ rigId: string }>();
  const {
    data: drillshipData,
    isLoading: isLoadingDrillship,
    error: drillshipError,
  } = useCustomDrillship(Number(rigId));

  if (isLoadingDrillship) {
    return (
      <Center flexGrow={1}>
        <Spin />
      </Center>
    );
  }

  if (isNotFoundError(drillshipError)) {
    return (
      <Center flexGrow={1}>
        <Result status="404" subTitle="Rig not found" />
      </Center>
    );
  }

  if (drillshipError || !drillshipData) {
    return (
      <Center flexGrow={1}>
        <Result status="error" subTitle="Unable to load rig" />
      </Center>
    );
  }

  const breadcrumbRoutes = [
    {
      path: routes.prepare,
      breadcrumbName: 'Prepare',
    },
    {
      path: routes.rigs,
      breadcrumbName: 'Rigs',
    },
    {
      path: generatePath(routes.updateRig, {
        rigType: RigType.Drillship,
        rigId,
      }),
      breadcrumbName: drillshipData.name || '',
    },
  ];

  return (
    <>
      <Header>
        <PageHeader
          onBack={handleBack}
          title="Edit rig"
          breadcrumb={{
            routes: breadcrumbRoutes,
            itemRender: defaultBreadcrumbItemRender,
          }}
          extra={<PageHeaderExtra />}
        />
      </Header>
      <Content>
        <Box paddingTop={20}>
          {drillshipData.draft ? (
            <UpdateDrillshipDraftForm drillshipData={drillshipData} />
          ) : (
            <UpdateDrillshipForm drillshipData={drillshipData} />
          )}
        </Box>
      </Content>
    </>
  );
};

export default UpdateDrillship;
