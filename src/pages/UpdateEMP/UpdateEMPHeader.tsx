import { Header } from 'components/Layout';
import PageHeader from 'components/PageHeader';
import { defaultBreadcrumbItemRender } from 'components/PageHeader/PageHeader';
import PageHeaderExtraActions from 'containers/PageHeaderExtraActions';
import { Button } from 'antd';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from 'routes';
import useBack from 'hooks/useBack';
import Modal from 'components/Modal';
import { CloseCircleOutlined } from '@ant-design/icons';
import useDeleteEMP from './useDeleteEMP';
import { useTheme } from 'styled-components';
import { EMP } from 'api/schema';
import { RigType } from 'routes';

interface UpdateEMPHeaderProps {
  rigName: string;
  projectId: number;
  rigType: RigType;
  rigId: number;
  emp: EMP;
  projectName: string;
  onClickDetails: () => void;
}

const UpdateEMPHeader = ({
  rigName,
  rigType,
  projectId,
  projectName,
  rigId,
  emp,
  onClickDetails,
}: UpdateEMPHeaderProps) => {
  const { colors } = useTheme();
  const { handleBack } = useBack(routes.launch);
  const navigate = useNavigate();
  const breadcrumbRoutes = [
    {
      path: routes.prepare,
      breadcrumbName: 'Prepare',
    },
    {
      path: generatePath(routes.project, {
        projectId: String(projectId),
      }),
      breadcrumbName: projectName,
    },
    {
      path: generatePath(routes.updateEMP, {
        projectId: String(projectId),
        rigType: String(rigType),
        rigId: String(rigId),
      }),
      breadcrumbName: 'Edit EMP',
    },
  ];
  const { mutate: deleteEMP } = useDeleteEMP({
    rigType,
    rigId,
    projectId,
    empName: emp.name,
  });
  const onDeleteEMP = () => {
    Modal.confirm({
      title: 'Delete EMP',
      content: (
        <>
          Are you sure you want to delete <strong>{emp.name}</strong> EMP?
        </>
      ),
      icon: <CloseCircleOutlined style={{ color: colors.red[6] }} />,
      okButtonProps: {
        danger: true,
      },
      okText: 'Delete',
      onOk: () => {
        deleteEMP();
      },
    });
  };

  return (
    <Header>
      <PageHeader
        title={`Edit EMP to ${rigName}`}
        onBack={handleBack}
        breadcrumb={{
          routes: breadcrumbRoutes,
          itemRender: defaultBreadcrumbItemRender,
        }}
        extra={
          <PageHeaderExtraActions>
            <>
              <Button onClick={onClickDetails}>Rig details</Button>
              <Button
                type="primary"
                onClick={() =>
                  navigate(
                    generatePath(routes.projectUpdateRig, {
                      rigId: String(rigId),
                      rigType,
                      projectId: String(projectId),
                    }),
                  )
                }
              >
                Edit rig
              </Button>
              <Button danger type="primary" onClick={onDeleteEMP}>
                Delete EMP
              </Button>
            </>
          </PageHeaderExtraActions>
        }
      />
    </Header>
  );
};

export default UpdateEMPHeader;
