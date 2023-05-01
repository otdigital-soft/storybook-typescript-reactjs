import PageHeader from 'components/PageHeader';
import { generatePath, useParams } from 'react-router-dom';
import useMonitor from 'pages/Monitor/useMonitor';
import Center from 'components/Center';
import { Empty, Spin } from 'antd';
import { Content, Header } from 'components/Layout';
import { defaultBreadcrumbItemRender } from 'components/PageHeader/PageHeader';
import useBack from 'hooks/useBack';
import Box, { Flexbox } from 'components/Box';
import { useEffect, useState } from 'react';
import ElementChart from 'pages/Monitor/ElementChart';
import PageHeaderExtra from 'containers/PageHeaderExtra';
import Result from 'components/Result';
import routes from 'routes';
import Toggle from 'components/Toggle';

const Monitor = () => {
  const { monitorId } = useParams<{ monitorId: string }>();
  const [selectedElements, setSelectedElements] = useState<
    number[] | undefined
  >();
  const {
    data: monitorData,
    error: monitorError,
    isLoading: isLoadingMonitor,
  } = useMonitor(Number(monitorId));
  const visibleElements = monitorData?.elements?.filter((element) =>
    selectedElements?.includes(element.id),
  );
  const { handleBack } = useBack(routes.launch);
  useEffect(() => {
    if (selectedElements === undefined && monitorData) {
      // initially all elements are selected
      setSelectedElements(monitorData.elements.map((element) => element.id));
    }
  }, [monitorData, selectedElements]);

  const onSelectedElementChange = (elementId: number) => {
    setSelectedElements((prevElements) =>
      prevElements
        ? prevElements?.includes(elementId)
          ? prevElements?.filter((prevElement) => prevElement != elementId)
          : [...prevElements, elementId]
        : prevElements,
    );
  };

  if (isLoadingMonitor) {
    return (
      <Center flexGrow={1}>
        <Spin size="large" />
      </Center>
    );
  }
  if (monitorError) {
    return (
      <Center flexGrow={1}>
        <Result status="error" subTitle="Unable to load monitor right now." />
      </Center>
    );
  }

  const breadcrumbRoutes = [
    {
      path: routes.monitors,
      breadcrumbName: 'Monitor',
    },
    {
      path: generatePath(routes.monitor, {
        monitorId: String(monitorId),
      }),
      breadcrumbName: 'Monitor detail',
    },
  ];

  return (
    <>
      <Header>
        <PageHeader
          title={monitorData?.name}
          onBack={handleBack}
          breadcrumb={{
            routes: breadcrumbRoutes,
            itemRender: defaultBreadcrumbItemRender,
          }}
          extra={<PageHeaderExtra />}
        />
      </Header>
      <Content>
        <Flexbox marginY={20} marginX={24} flexDirection="column">
          <Flexbox marginBottom={30} flexWrap="wrap">
            {monitorData?.elements.map((element) => (
              <Box key={element.id} marginBottom={12}>
                <Toggle
                  onClick={() => onSelectedElementChange(element.id)}
                  selected={!!selectedElements?.includes(element.id)}
                >
                  <strong>{element.name}</strong>
                </Toggle>
              </Box>
            ))}
          </Flexbox>

          <Flexbox flexDirection="column" width="100%">
            {visibleElements?.length ? (
              <>
                {visibleElements.map((element, index) => (
                  <Box marginTop={index ? 70 : 0} key={element.id}>
                    <ElementChart
                      element={element}
                      monitorId={Number(monitorId)}
                    />
                  </Box>
                ))}
              </>
            ) : (
              <Box marginTop={40}>
                <Empty
                  description="Chart list is empty. Select chart to show."
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              </Box>
            )}
          </Flexbox>
        </Flexbox>
        <Box id="chart-export" visibility="hidden" />
      </Content>
    </>
  );
};

export default Monitor;
