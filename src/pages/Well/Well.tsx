import { Button, Skeleton } from 'antd';
import Result from 'components/Result';
import Box from 'components/Box';
import Center from 'components/Center';
import ElementTag from 'components/ElementTag';
import { Content, Header } from 'components/Layout';
import PageHeader from 'components/PageHeader';
import { defaultBreadcrumbItemRender } from 'components/PageHeader/PageHeader';
import { parseISO } from 'date-fns';
import useBack from 'hooks/useBack';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import routes from 'routes';
import { generateUpdateWellPath, generateWellPath } from 'routes/utils';
import { isNotFoundError } from 'utils/api';
import useCustomWell from 'hooks/useCustomWell';
import { PrepareTab } from 'pages/Prepare/Prepare';
import PageHeaderExtraActions from 'containers/PageHeaderExtraActions';
import WellDetails from 'containers/WellDetails';
import useDeleteWell from 'pages/Well/useDeleteWell';

const Well = () => {
  const { wellId } = useParams<{ wellId: string }>();
  const {
    data: wellData,
    error: wellError,
    isLoading: isLoadingWell,
  } = useCustomWell(Number(wellId));
  const { handleBack } = useBack(routes.launch);
  const navigate = useNavigate();
  const onDeleteWell = useDeleteWell(wellData);

  if (isNotFoundError(wellError)) {
    return (
      <Center flexGrow={1}>
        <Result status="404" subTitle="Well not found" />
      </Center>
    );
  }

  if (wellError) {
    return (
      <Center flexGrow={1}>
        <Result status="error" subTitle="Unable to load well data" />
      </Center>
    );
  }

  const breadcrumbRoutes = [
    {
      path: routes.prepare,
      breadcrumbName: 'Prepare',
    },
    {
      path: generatePath(routes.prepareTab, {
        tabId: PrepareTab.Wells,
      }),
      breadcrumbName: 'Wells',
    },
    {
      path: generateWellPath(Number(wellId)),
      breadcrumbName: wellData?.name || '',
    },
  ];

  return (
    <>
      <Header>
        <PageHeader
          title={
            isLoadingWell ? (
              <Box width={200}>
                <Skeleton title={true} paragraph={false} active />
              </Box>
            ) : (
              wellData?.name
            )
          }
          subTitle={
            wellData ? (
              <ElementTag
                createdAt={parseISO(wellData.created_at)}
                draft={wellData.draft}
              />
            ) : null
          }
          onBack={handleBack}
          breadcrumb={
            wellData
              ? {
                  routes: breadcrumbRoutes,
                  itemRender: defaultBreadcrumbItemRender,
                }
              : undefined
          }
          extra={
            wellData ? (
              <PageHeaderExtraActions>
                <>
                  <Button
                    type="primary"
                    onClick={() =>
                      navigate(generateUpdateWellPath(Number(wellId)))
                    }
                  >
                    Edit well
                  </Button>
                  <Button type="primary" danger onClick={onDeleteWell}>
                    Delete well
                  </Button>
                </>
              </PageHeaderExtraActions>
            ) : undefined
          }
        />
      </Header>
      <Content>
        <Box marginY={20} marginX={24}>
          <WellDetails data={wellData} loading={isLoadingWell} />
        </Box>
      </Content>
    </>
  );
};

export default Well;
