import { generatePath, useParams } from 'react-router-dom';
import useCustomWell from 'hooks/useCustomWell';
import useBack from 'hooks/useBack';
import routes from 'routes';
import { generateUpdateWellPath } from 'routes/utils';
import { isNotFoundError } from 'utils/api';
import Center from 'components/Center';
import Result from 'components/Result';
import { PrepareTab } from 'pages/Prepare/Prepare';
import { Content, Header } from 'components/Layout';
import PageHeader from 'components/PageHeader';
import Box from 'components/Box';
import { Spin } from 'antd';
import { defaultBreadcrumbItemRender } from 'components/PageHeader/PageHeader';
import PageHeaderExtra from 'containers/PageHeaderExtra';
import UpdateWellForm from 'containers/UpdateWellForm';
import useOnSuccessWellUpdate from 'pages/UpdateWell/useOnSuccessWellUpdate';
import UpdateDraftWellForm from 'containers/UpdateDraftWellForm';

const UpdateWell = () => {
  const { wellId } = useParams<{ wellId: string }>();
  const {
    data: wellData,
    error: wellError,
    isLoading: isLoadingWell,
  } = useCustomWell(Number(wellId));
  const { handleBack } = useBack(routes.launch);
  const { onUpdate: onSuccessUpdate, onSave: onSuccessSave } =
    useOnSuccessWellUpdate(Number(wellId));

  if (isLoadingWell) {
    return (
      <Center flexGrow={1}>
        <Spin size="large" />
      </Center>
    );
  }

  if (isNotFoundError(wellError)) {
    return (
      <Center flexGrow={1}>
        <Result status="404" subTitle="Well not found" />
      </Center>
    );
  }

  if (wellError || !wellData) {
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
      path: generateUpdateWellPath(Number(wellId)),
      breadcrumbName: 'Edit well',
    },
  ];

  return (
    <>
      <Header>
        <PageHeader
          title="Edit well"
          onBack={handleBack}
          breadcrumb={{
            routes: breadcrumbRoutes,
            itemRender: defaultBreadcrumbItemRender,
          }}
          extra={<PageHeaderExtra />}
        />
      </Header>
      <Content>
        <Box marginTop={20} marginBottom={106} marginX={24}>
          {wellData.draft ? (
            <UpdateDraftWellForm
              wellData={wellData}
              onSuccessAdd={onSuccessUpdate}
              onSuccessSave={onSuccessSave}
            />
          ) : (
            <UpdateWellForm wellData={wellData} onSuccess={onSuccessUpdate} />
          )}
        </Box>
      </Content>
    </>
  );
};

export default UpdateWell;
