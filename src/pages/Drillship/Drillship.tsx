import { useNavigate, useParams } from 'react-router-dom';
import useBack from 'hooks/useBack';
import useCustomDrillship from 'hooks/useCustomDrillship';
import { isNotFoundError } from 'utils/api';
import Center from 'components/Center';
import { Button, Result, Skeleton } from 'antd';
import routes, { RigType } from 'routes';
import { Content, Header } from 'components/Layout';
import PageHeader from 'components/PageHeader';
import Box from 'components/Box';
import ElementTag from 'components/ElementTag';
import { parseISO } from 'date-fns';
import { defaultBreadcrumbItemRender } from 'components/PageHeader/PageHeader';
import PageHeaderExtraActions from 'containers/PageHeaderExtraActions';
import { generateRigPath, generateUpdateRigPath } from 'routes/utils';
import DrillshipDetails from 'containers/DrillshipDetails';
import { RigTypeEnum } from 'api/schema';
import useDeleteRig from 'hooks/useDeleteRig';

const Drillship = () => {
  const { rigId } = useParams<{ rigId: string }>();
  const { handleBack } = useBack();
  const navigate = useNavigate();
  const {
    data: drillshipData,
    error: drillshipError,
    isLoading: isLoadingDrillship,
  } = useCustomDrillship(Number(rigId));
  const deleteRig = useDeleteRig();

  if (isNotFoundError(drillshipError)) {
    return (
      <Center flexGrow={1}>
        <Result status="404" subTitle="Rig not found" />
      </Center>
    );
  }

  if (drillshipError) {
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
      path: generateRigPath(Number(rigId), RigType.Drillship),
      breadcrumbName: drillshipData?.name || '',
    },
  ];

  return (
    <>
      <Header>
        <PageHeader
          title={
            isLoadingDrillship ? (
              <Box width={200}>
                <Skeleton title={true} paragraph={false} active />
              </Box>
            ) : (
              drillshipData?.name
            )
          }
          subTitle={
            drillshipData?.created_at ? (
              <ElementTag
                createdAt={parseISO(drillshipData.created_at)}
                draft={drillshipData.draft}
              />
            ) : null
          }
          onBack={handleBack}
          breadcrumb={
            drillshipData
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
                      generateUpdateRigPath(Number(rigId), RigType.Drillship),
                    )
                  }
                >
                  Edit rig
                </Button>
                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    deleteRig({
                      rigId: Number(rigId),
                      rigName: drillshipData?.name || '',
                      rigType: RigTypeEnum.DRILLSHIP,
                    });
                  }}
                >
                  Delete rig
                </Button>
              </>
            </PageHeaderExtraActions>
          }
        />
      </Header>
      <Content>
        <DrillshipDetails
          drillshipData={drillshipData}
          loading={isLoadingDrillship}
        />
      </Content>
    </>
  );
};

export default Drillship;
