import { Spin } from 'antd';
import Box from 'components/Box';
import Center from 'components/Center';
import { Content, Header } from 'components/Layout';
import PageHeader from 'components/PageHeader';
import { defaultBreadcrumbItemRender } from 'components/PageHeader/PageHeader';
import Result from 'components/Result';
import PageHeaderExtra from 'containers/PageHeaderExtra';
import useBack from 'hooks/useBack';
import useCustomJackupRig from 'hooks/useCustomJackupRig/useCustomJackupRig';
import routes from 'routes';
import { RigType } from 'routes';
import UpdateJackupDraftForm from '../../containers/UpdateJackupDraftForm';
import { isNotFoundError } from 'utils/api';
import UpdateJackupForm from 'containers/UpdateJackupForm';
import { generatePath, useParams } from 'react-router-dom';

const UpdateJackupRig = () => {
  const { handleBack } = useBack(routes.prepare);
  const { rigId } = useParams<{ rigId: string }>();
  const {
    data: jackupRigData,
    isLoading: isJackupRigDataLoading,
    error: jackupRigError,
  } = useCustomJackupRig(Number(rigId));

  if (isJackupRigDataLoading) {
    return (
      <Center flexGrow={1}>
        <Spin />
      </Center>
    );
  }

  if (isNotFoundError(jackupRigError)) {
    return (
      <Center flexGrow={1}>
        <Result status="404" subTitle="Rig not found" />
      </Center>
    );
  }

  if (jackupRigError || !jackupRigData) {
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
        rigType: RigType.Jackup,
        rigId: String(jackupRigData?.id),
      }),
      breadcrumbName: 'Edit rig',
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
          {jackupRigData.draft ? (
            <UpdateJackupDraftForm jackupRigData={jackupRigData} />
          ) : (
            <UpdateJackupForm jackupRigData={jackupRigData} />
          )}
        </Box>
      </Content>
    </>
  );
};

export default UpdateJackupRig;
