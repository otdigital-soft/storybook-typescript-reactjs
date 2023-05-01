import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Empty, Result, Spin } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import { CustomRigList } from 'api/schema';
import { ReactComponent as RigOutlined } from 'assets/icons/RigOutlined.svg';
import Box, { Flexbox } from 'components/Box';
import Center from 'components/Center';
import ElementTag from 'components/ElementTag';
import OrderingMenu from 'components/OrderingMenu';
import PageHeader from 'components/PageHeader';
import Table from 'components/Table';
import Tag from 'components/Tag';
import { Text } from 'components/Typography';
import { DATE_FORMAT_LONG } from 'consts';
import parseISO from 'date-fns/parseISO';
import useDeleteProjectRig from 'hooks/useDeleteProjectRig';
import useProjectRigs from 'pages/Project/useProjectRigs';
import { useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from 'routes';
import { useTheme } from 'styled-components';
import { formatDateString } from 'utils/date';
import { Ordering, OrderingLabel } from 'utils/ordering';
import { RIG_TYPE_LABEL } from 'utils/rigs';

interface ProjectRigsProps {
  projectId: number;
}

const ProjectRigs = ({ projectId }: ProjectRigsProps) => {
  const [ordering, setOrdering] = useState(Ordering.RecentlyAdded);
  const navigate = useNavigate();
  const { colors } = useTheme();
  const deleteProjectRig = useDeleteProjectRig();
  const columns: ColumnsType<CustomRigList> = [
    {
      title: 'Rig name',
      key: 'name',
      render: (data: CustomRigList) => (
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
      title: 'Type',
      key: 'type',
      width: '20%',
      render: (data: CustomRigList) => RIG_TYPE_LABEL[data.type],
    },
    {
      title: 'EMP',
      key: 'emp',
      width: '20%',
      render: (data: CustomRigList) => (
        <>
          {data.emp?.id ? (
            <Flexbox alignItems="center">
              <Tag color="geekblue">EMP Elements added</Tag>

              <Text
                fontSize={24}
                cursor="pointer"
                title="Edit EMP"
                lineHeight={1}
                onClick={() =>
                  navigate(
                    generatePath(routes.updateEMP, {
                      projectId: String(projectId),
                      rigType: data.type.toLowerCase(),
                      rigId: String(data.id),
                    }),
                  )
                }
              >
                <EditOutlined />
              </Text>
            </Flexbox>
          ) : (
            <Button
              type="primary"
              size="small"
              onClick={() =>
                navigate(
                  generatePath(routes.createEMP, {
                    projectId: String(projectId),
                    rigType: data.type.toLowerCase(),
                    rigId: String(data.id),
                  }),
                )
              }
            >
              Add EMP
            </Button>
          )}
        </>
      ),
    },
    {
      title: 'Create date',
      key: 'createDate',
      width: '15%',
      render: (data: CustomRigList) =>
        formatDateString(data.created_at, DATE_FORMAT_LONG),
    },
    {
      title: 'Other',
      key: 'other',
      width: '15%',
      render: (data: CustomRigList) => (
        <Flexbox gap={16}>
          <Text
            fontSize={24}
            cursor="pointer"
            title="Edit rig"
            lineHeight={1}
            onClick={() => {
              navigate(
                generatePath(routes.projectUpdateRig, {
                  rigId: String(data.id),
                  rigType: data.type.toLowerCase(),
                  projectId: String(projectId),
                }),
              );
            }}
          >
            <EditOutlined />
          </Text>
          <Text
            fontSize={24}
            lineHeight={1}
            color={colors.red['5']}
            cursor="pointer"
            title="Delete rig"
            onClick={() => {
              deleteProjectRig({
                projectId,
                rigId: data.id,
                rigName: data.name,
                rigType: data.type,
              });
            }}
          >
            <DeleteOutlined />
          </Text>
        </Flexbox>
      ),
    },
  ];
  const {
    data: projectRigsData,
    error: projectRigsError,
    isLoading: isLoadingProjectRigs,
  } = useProjectRigs({ projectId, ordering });
  let content;
  if (projectRigsError) {
    content = <Result status="error" subTitle="Unable to load rigs" />;
  } else if (isLoadingProjectRigs) {
    content = (
      <Center marginY={32}>
        <Spin />
      </Center>
    );
  } else if (projectRigsData?.length === 0) {
    content = (
      <Empty
        description="Rig list is empty. Add your first rig."
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    );
  } else {
    content = (
      <Box marginTop={12}>
        <Table
          columns={columns}
          dataSource={projectRigsData || []}
          pagination={false}
          bordered
          rowKey={(row) => `${row.type}-${row.id}`}
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
              <RigOutlined title="Rigs" />
            </Text>
            {projectRigsData ? `Rigs (${projectRigsData.length})` : 'Rigs'}
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
                  generatePath(routes.projectCreateRig, {
                    projectId: projectId.toString(),
                  }),
                )
              }
            >
              Add rig
            </Button>
          </Flexbox>
        }
      />
      {content}
    </>
  );
};

export default ProjectRigs;
