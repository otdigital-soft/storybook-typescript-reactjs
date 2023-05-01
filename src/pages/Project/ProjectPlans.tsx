import { Ordering, OrderingLabel } from 'utils/ordering';
import Box, { Flexbox } from 'components/Box';
import OrderingMenu from 'components/OrderingMenu';
import { Button, Empty, Result, Spin } from 'antd';
import PageHeader from 'components/PageHeader';
import { useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from 'routes';
import { Text } from 'components/Typography';
import { useTheme } from 'styled-components';
import { ColumnsType } from 'antd/lib/table/interface';
import Tag from 'components/Tag';
import { formatDateString } from 'utils/date';
import { DATE_FORMAT_LONG } from 'consts';
import {
  EditOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import Table from 'components/Table';
import Center from 'components/Center';
import useProjectPlans from 'pages/Project/useProjectPlans';
import useDeletePlan from 'pages/Project/useDeletePlan';
import Modal from 'components/Modal';
import { PlanList } from 'api/schema';
import { ReactComponent as PlanOutlined } from 'assets/icons/PlanOutlined.svg';

interface ProjectPlansProps {
  projectId: number;
}

const ProjectPlans = ({ projectId }: ProjectPlansProps) => {
  const [ordering, setOrdering] = useState(Ordering.RecentlyAdded);
  const navigate = useNavigate();
  const { colors } = useTheme();
  const { mutate: deletePlan } = useDeletePlan(projectId);
  const onDeletePlan = (plan: PlanList) => {
    Modal.confirm({
      title: 'Delete plan',
      content: (
        <>
          Are you sure you want to delete <strong>{plan.name}</strong> plan?
        </>
      ),
      icon: <CloseCircleOutlined style={{ color: colors.red[6] }} />,
      okButtonProps: {
        danger: true,
      },
      okText: 'Delete',
      onOk: () => {
        deletePlan(plan);
      },
    });
  };
  const columns: ColumnsType<PlanList> = [
    {
      title: 'Plan name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      key: 'description',
      dataIndex: 'description',
      width: '20%',
    },
    {
      title: 'Included wells',
      key: 'wells',
      width: '20%',
      render: (data: PlanList) => (
        <Flexbox gap={8} flexWrap="wrap">
          {data.wells.map((well) => (
            <Tag key={well.id}>{well.name}</Tag>
          ))}
        </Flexbox>
      ),
    },
    {
      title: 'Create date',
      key: 'createDate',
      width: '15%',
      render: (data: PlanList) =>
        formatDateString(data.created_at, DATE_FORMAT_LONG),
    },
    {
      title: 'Other',
      key: 'other',
      width: '15%',
      render: (data: PlanList) => (
        <Flexbox gap={16}>
          <Text
            fontSize={24}
            cursor="pointer"
            title="Edit plan"
            lineHeight={1}
            onClick={() =>
              navigate(
                generatePath(routes.updatePlan, {
                  projectId: String(projectId),
                  planId: String(data.id),
                }),
              )
            }
          >
            <EditOutlined />
          </Text>
          <Text
            fontSize={24}
            color={colors.red['5']}
            cursor="pointer"
            title="Delete plan"
            lineHeight={1}
            onClick={() => onDeletePlan(data)}
          >
            <DeleteOutlined />
          </Text>
        </Flexbox>
      ),
    },
  ];
  const {
    data: projectPlansData,
    error: projectPlansError,
    isLoading: isLoadingProjectPlans,
  } = useProjectPlans({ projectId, ordering });
  let content;
  if (projectPlansError) {
    content = <Result status="error" subTitle="Unable to load plans" />;
  } else if (isLoadingProjectPlans) {
    content = (
      <Center marginY={32}>
        <Spin />
      </Center>
    );
  } else if (projectPlansData?.length === 0) {
    content = (
      <Empty
        description="Plan list is empty. Create your first plan."
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    );
  } else {
    content = (
      <Box marginTop={12}>
        <Table
          columns={columns}
          dataSource={projectPlansData || []}
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
            <Text fontSize={34} lineHeight={0} color={colors.red[6]}>
              <PlanOutlined title="Plans" />
            </Text>
            {projectPlansData ? `Plans (${projectPlansData.length})` : 'Plans'}
          </Flexbox>
        }
        subTitle={OrderingLabel[ordering]}
        extra={
          <Flexbox gap="8px">
            <OrderingMenu value={ordering} onChange={setOrdering} />
            <Button
              type="primary"
              onClick={() =>
                navigate(
                  generatePath(routes.createPlan, {
                    projectId: String(projectId),
                  }),
                )
              }
            >
              Create plan
            </Button>
          </Flexbox>
        }
      />
      {content}
    </>
  );
};

export default ProjectPlans;
