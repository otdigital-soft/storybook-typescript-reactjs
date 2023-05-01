import { useState } from 'react';
import { Ordering, OrderingLabel } from 'utils/ordering';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { ColumnsType } from 'antd/lib/table/interface';
import { Button, Empty, Result, Spin } from 'antd';
import { generateCreateWellPath, generateUpdateWellPath } from 'routes/utils';
import { formatDateString } from 'utils/date';
import { DATE_FORMAT_LONG } from 'consts';
import Box, { Flexbox } from 'components/Box';
import { Text } from 'components/Typography';
import { EditOutlined } from '@ant-design/icons';
import Center from 'components/Center';
import Table from 'components/Table/Table';
import PageHeader from 'components/PageHeader';
import { ReactComponent as WellOutlined } from 'assets/icons/WellOutlined.svg';
import OrderingMenu from 'components/OrderingMenu';
import useProjectWells from 'hooks/useProjectWells/useProjectWells';
import { CustomWellList } from 'api/schema';
import ElementTag from 'components/ElementTag';
import parseISO from 'date-fns/parseISO';
import DeleteWellButton from './DeleteWellButton';

interface ProjectWellsProps {
  projectId: number;
}

const ProjectWells = ({ projectId }: ProjectWellsProps) => {
  const [ordering, setOrdering] = useState(Ordering.RecentlyAdded);
  const navigate = useNavigate();
  const { colors } = useTheme();
  const columns: ColumnsType<CustomWellList> = [
    {
      title: 'Well name',
      key: 'name',
      render: (data: CustomWellList) => (
        <Flexbox gap={8}>
          {data.name}
          <ElementTag
            draft={data.draft}
            createdAt={parseISO(data.created_at)}
          />
        </Flexbox>
      ),
    },
    {
      title: 'Create date',
      key: 'createDate',
      width: '15%',
      render: (data: CustomWellList) =>
        formatDateString(data.created_at, DATE_FORMAT_LONG),
    },
    {
      title: 'Other',
      key: 'other',
      width: '15%',
      render: (data: CustomWellList) => (
        <Flexbox gap={16}>
          <Text
            fontSize={24}
            cursor="pointer"
            title="Edit well"
            lineHeight={1}
            onClick={() =>
              navigate(
                generateUpdateWellPath(Number(data.id), Number(projectId)),
              )
            }
          >
            <EditOutlined />
          </Text>
          <DeleteWellButton well={data} projectId={projectId} />
        </Flexbox>
      ),
    },
  ];
  const {
    data: projectWellsData,
    error: projectWellsError,
    isLoading: isLoadingProjectWells,
  } = useProjectWells(projectId, { ordering });
  let content;
  if (projectWellsError) {
    content = <Result status="error" subTitle="Unable to load wells" />;
  } else if (isLoadingProjectWells) {
    content = (
      <Center marginY={32}>
        <Spin />
      </Center>
    );
  } else if (projectWellsData?.length === 0) {
    content = (
      <Empty
        description="Well list is empty. Add your first well."
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    );
  } else {
    content = (
      <Box marginTop={12}>
        <Table
          columns={columns}
          dataSource={projectWellsData || []}
          pagination={false}
          bordered
          rowKey={(row) => row.id}
        />
      </Box>
    );
  }
  return (
    <>
      <PageHeader
        pX={0}
        title={
          <Flexbox alignItems="center" gap={12}>
            <Text fontSize={34} color={colors.red[6]} lineHeight={0}>
              <WellOutlined title="Wells" />
            </Text>
            {projectWellsData ? `Wells (${projectWellsData.length})` : 'Wells'}
          </Flexbox>
        }
        subTitle={OrderingLabel[ordering]}
        extra={
          <Flexbox gap="8px">
            <OrderingMenu value={ordering} onChange={setOrdering} />
            <Button
              type="primary"
              onClick={() => navigate(generateCreateWellPath(projectId))}
            >
              Add well
            </Button>
          </Flexbox>
        }
      />
      {content}
    </>
  );
};

export default ProjectWells;
