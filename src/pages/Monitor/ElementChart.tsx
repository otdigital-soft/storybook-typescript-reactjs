import { AreaChartOutlined, BarChartOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Spin } from 'antd';
import { MonitorElementDetails } from 'api/schema';
import Box, { Flexbox } from 'components/Box';
import Center from 'components/Center';
import Result from 'components/Result';
import Tabs from 'components/Tabs';
import { Text, Title } from 'components/Typography';
import BarChart from 'pages/Monitor/BarChart';
import { DownloadIcon } from 'pages/Monitor/ElementChart.styled';
import useMonitorElements from 'pages/Monitor/useMonitorElements';
import { MutableRefObject, useRef, useState } from 'react';
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types';
import LineChart from './LineChart';
import useExportMonitorChart from './useExportMonitorChart';
import { MonitorElementType } from 'api/services/monitors';

interface ElementChartProps {
  element: MonitorElementDetails;
  monitorId: number;
}

enum ChartType {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  Line = 'line',
  Bar = 'bar',
}

const ElementChart = ({ element, monitorId }: ElementChartProps) => {
  const [elementType, setElementType] = useState(MonitorElementType.Cumulative);
  const {
    data: elementData,
    error: elementsError,
    isLoading: isLoadingElements,
  } = useMonitorElements({
    monitorId,
    elementId: element.id,
    type: elementType,
  });
  const [chartType, setChartType] = useState(ChartType.Line);
  const chartRef = useRef<
    ChartJSOrUndefined<'bar'> | ChartJSOrUndefined<'line'>
  >();

  const {
    exportMonitorChartPdf,
    exportMonitorChartCsv,
    isExportingMonitorChart,
  } = useExportMonitorChart({
    elementId: element.id,
    monitorId,
    fileName: element.name,
    type: elementType,
  });

  let content = null;
  if (isLoadingElements) {
    content = (
      <Center height="100%">
        <Spin />
      </Center>
    );
  } else if (elementsError) {
    content = (
      <Center height="100%">
        <Result status="error" subTitle="Chart cannot be loaded right now." />
      </Center>
    );
  } else if (elementData) {
    content = (
      <>
        {chartType === ChartType.Line ? (
          <LineChart
            ref={chartRef as MutableRefObject<ChartJSOrUndefined<'line'>>}
            data={elementData || []}
            valueTitle={element.value_title}
            valueUnit={element.value_unit}
            precision={2}
          />
        ) : null}
        {chartType === ChartType.Bar ? (
          <BarChart
            ref={chartRef as MutableRefObject<ChartJSOrUndefined<'bar'>>}
            data={elementData || []}
            valueTitle={element.value_title}
            valueUnit={element.value_unit}
            precision={2}
          />
        ) : null}
      </>
    );
  }

  return (
    <>
      <Flexbox marginBottom={23}>
        <Box flexGrow={1}>
          <Title level={5}>{element.name}</Title>
          <Box marginTop="1px">
            <Text small type="secondary">
              {element.description}
            </Text>
          </Box>
        </Box>
        <Box flexShrink={0}>
          <Flexbox flexDirection="row">
            <Tabs
              activeKey={elementType}
              onChange={(activeKey) =>
                setElementType(activeKey as MonitorElementType)
              }
            >
              <Tabs.TabPane
                tab={<span>Daily</span>}
                key={MonitorElementType.Daily}
              />
              <Tabs.TabPane
                tab={<span>Cumulative</span>}
                key={MonitorElementType.Cumulative}
              />
            </Tabs>

            <Box marginLeft={40}>
              <Tabs
                activeKey={chartType}
                onChange={(activeKey) => setChartType(activeKey as ChartType)}
              >
                <Tabs.TabPane
                  tab={
                    <span>
                      <AreaChartOutlined />
                      Lines
                    </span>
                  }
                  key={ChartType.Line}
                />
                <Tabs.TabPane
                  tab={
                    <span>
                      <BarChartOutlined />
                      Bars
                    </span>
                  }
                  key={ChartType.Bar}
                />
              </Tabs>
            </Box>
            <Box marginLeft={24}>
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item
                      key="pdf"
                      onClick={() =>
                        exportMonitorChartPdf([
                          { title: element.name, chartJS: chartRef.current },
                        ])
                      }
                    >
                      <Text fontSize={14} type="secondary">
                        Download as PDF
                      </Text>
                    </Menu.Item>
                    <Menu.Item
                      key="csv"
                      onClick={() => exportMonitorChartCsv()}
                    >
                      <Text fontSize={14} type="secondary">
                        Download as CSV
                      </Text>
                    </Menu.Item>
                  </Menu>
                }
                placement="bottomRight"
              >
                <Button
                  type="link"
                  disabled={isExportingMonitorChart}
                  icon={<DownloadIcon />}
                >
                  <Text small type="secondary">
                    Download
                  </Text>
                </Button>
              </Dropdown>
            </Box>
          </Flexbox>
        </Box>
      </Flexbox>
      <Box height={400} position="relative">
        {content}
      </Box>
    </>
  );
};

export default ElementChart;
