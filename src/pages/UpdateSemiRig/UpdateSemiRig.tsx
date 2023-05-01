import { Spin } from 'antd';
import Box from 'components/Box';
import Center from 'components/Center';
import { Content, Header } from 'components/Layout';
import PageHeader from 'components/PageHeader';
import { defaultBreadcrumbItemRender } from 'components/PageHeader/PageHeader';
import Result from 'components/Result';
import PageHeaderExtra from 'containers/PageHeaderExtra';
import UpdateSemiDraftForm from 'containers/UpdateSemiDraftForm';
import UpdateSemiForm from 'containers/UpdateSemiForm';
import useBack from 'hooks/useBack';
import useCustomSemiRig from 'hooks/useCustomSemiRig';
import { generatePath, useParams } from 'react-router-dom';
import routes from 'routes';
import { RigType } from 'routes';
import { isNotFoundError } from 'utils/api';

const UpdateSemiRig = () => {
  const { handleBack } = useBack(routes.prepare);
  const { rigId } = useParams<{ rigId: string }>();
  const {
    data: semiRigData,
    isLoading: isSemiRigDataLoading,
    error: semiRigError,
  } = useCustomSemiRig(Number(rigId));

  if (isSemiRigDataLoading) {
    return (
      <Center flexGrow={1}>
        <Spin />
      </Center>
    );
  }

  if (isNotFoundError(semiRigError)) {
    return (
      <Center flexGrow={1}>
        <Result status="404" subTitle="Rig not found" />
      </Center>
    );
  }

  if (semiRigError || !semiRigData) {
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
      path: generatePath(routes.updateRig, { rigType: RigType.Semi, rigId }),
      breadcrumbName: semiRigData.name || '',
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
          {semiRigData.draft ? (
            <UpdateSemiDraftForm semiRigData={semiRigData} />
          ) : (
            <UpdateSemiForm semiRigData={semiRigData} />
          )}
        </Box>
      </Content>
    </>
  );
};

export default UpdateSemiRig;
