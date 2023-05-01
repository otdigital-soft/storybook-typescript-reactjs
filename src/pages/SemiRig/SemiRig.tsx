import { Button, Result, Skeleton } from 'antd';
import Center from 'components/Center';
import ElementTag from 'components/ElementTag';
import { Content, Header } from 'components/Layout';
import PageHeader from 'components/PageHeader';
import { defaultBreadcrumbItemRender } from 'components/PageHeader/PageHeader';
import SemiRigDetails from 'containers/SemiRigDetails';
import { parseISO } from 'date-fns';
import useBack from 'hooks/useBack';
import useCustomSemiRig from 'hooks/useCustomSemiRig';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import routes from 'routes';
import { isNotFoundError } from 'utils/api';
import PageHeaderExtraActions from 'containers/PageHeaderExtraActions';
import Box from 'components/Box';
import { RigType } from 'routes';
import { RigTypeEnum } from 'api/schema';
import useDeleteRig from 'hooks/useDeleteRig';

const SemiRig = () => {
  const { rigId } = useParams<{ rigId: string }>();
  const { handleBack } = useBack();
  const navigate = useNavigate();
  const {
    data: semiRigData,
    error: semiRigError,
    isLoading: isSemiRigDataLoading,
  } = useCustomSemiRig(Number(rigId));
  const deleteRig = useDeleteRig();

  if (isNotFoundError(semiRigError)) {
    return (
      <Center flexGrow={1}>
        <Result status="404" subTitle="Rig not found" />
      </Center>
    );
  }

  if (semiRigError) {
    return (
      <Center flexGrow={1}>
        <Result status="error" subTitle="Unable to load rig data" />
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
      path: generatePath(routes.rig, {
        rigType: RigType.Semi,
        rigId,
      }),
      breadcrumbName: semiRigData?.name || '',
    },
  ];
  return (
    <>
      <Header>
        <PageHeader
          title={
            isSemiRigDataLoading ? (
              <Box width={200}>
                <Skeleton title={true} paragraph={false} active />
              </Box>
            ) : (
              semiRigData?.name
            )
          }
          subTitle={
            semiRigData?.created_at ? (
              <ElementTag
                createdAt={parseISO(semiRigData.created_at)}
                draft={semiRigData.draft}
              />
            ) : null
          }
          onBack={handleBack}
          breadcrumb={
            semiRigData
              ? {
                  routes: breadcrumbRoutes,
                  itemRender: defaultBreadcrumbItemRender,
                }
              : undefined
          }
          extra={
            <PageHeaderExtraActions>
              <>
                <Button
                  type="primary"
                  onClick={() =>
                    navigate(
                      generatePath(routes.updateRig, {
                        rigId: String(rigId),
                        rigType: RigType.Semi,
                      }),
                    )
                  }
                >
                  Edit rig
                </Button>
                <Button
                  type="primary"
                  onClick={() =>
                    deleteRig({
                      rigId: Number(rigId),
                      rigName: semiRigData?.name || '',
                      rigType: RigTypeEnum.SEMI,
                    })
                  }
                  danger
                >
                  Delete rig
                </Button>
              </>
            </PageHeaderExtraActions>
          }
        />
      </Header>
      <Content>
        <SemiRigDetails
          semiRigData={semiRigData}
          loading={isSemiRigDataLoading}
        />
      </Content>
    </>
  );
};

export default SemiRig;
