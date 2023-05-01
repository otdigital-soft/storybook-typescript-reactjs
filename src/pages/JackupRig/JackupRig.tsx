import { Button, Result, Skeleton } from 'antd';
import Center from 'components/Center';
import ElementTag from 'components/ElementTag';
import { Content, Header } from 'components/Layout';
import PageHeader from 'components/PageHeader';
import { defaultBreadcrumbItemRender } from 'components/PageHeader/PageHeader';
import JackupRigDetails from 'containers/JackupRigDetails';
import PageHeaderExtraActions from 'containers/PageHeaderExtraActions';
import { parseISO } from 'date-fns';
import useBack from 'hooks/useBack';
import useCustomJackupRig from 'hooks/useCustomJackupRig';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import routes, { RigType } from 'routes';
import { isNotFoundError } from 'utils/api';
import useDeleteRig from 'hooks/useDeleteRig';
import Box from 'components/Box';
import { RigTypeEnum } from 'api/schema';

const JackupRig = () => {
  const { handleBack } = useBack();
  const navigate = useNavigate();
  const { rigId } = useParams<{ rigId: string }>();
  const {
    data: jackupRigData,
    error: jackupRigError,
    isLoading: isJackupRigDataLoading,
  } = useCustomJackupRig(Number(rigId));
  const deleteRig = useDeleteRig();

  if (isNotFoundError(jackupRigError)) {
    return (
      <Center flexGrow={1}>
        <Result status="404" subTitle="Rig not found" />
      </Center>
    );
  }

  if (jackupRigError) {
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
        rigType: RigType.Jackup,
        rigId,
      }),
      breadcrumbName: jackupRigData?.name || '',
    },
  ];
  return (
    <>
      <Header>
        <PageHeader
          title={
            isJackupRigDataLoading ? (
              <Box width={200}>
                <Skeleton title={true} paragraph={false} active />
              </Box>
            ) : (
              jackupRigData?.name
            )
          }
          subTitle={
            jackupRigData?.created_at ? (
              <ElementTag
                createdAt={parseISO(jackupRigData.created_at)}
                draft={jackupRigData.draft}
              />
            ) : null
          }
          onBack={handleBack}
          breadcrumb={
            jackupRigData
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
                        rigType: RigType.Jackup,
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
                      rigName: jackupRigData?.name || '',
                      rigType: RigTypeEnum.JACKUP,
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
        <JackupRigDetails
          jackupRigData={jackupRigData}
          loading={isJackupRigDataLoading}
        />
      </Content>
    </>
  );
};

export default JackupRig;
