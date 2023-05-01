import { Header } from 'components/Layout';
import PageHeader from 'components/PageHeader';
import { defaultBreadcrumbItemRender } from 'components/PageHeader/PageHeader';
import PageHeaderExtraActions from 'containers/PageHeaderExtraActions';
import { Button } from 'antd';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from 'routes';
import useBack from 'hooks/useBack';
import { RigType } from 'routes';

interface CreateEMPHeaderProps {
  rigName: string;
  projectId: number;
  rigType: RigType;
  rigId: number;
  projectName: string;
  onClickDetails: () => void;
}

const CreateEMPHeader = ({
  rigName,
  rigType,
  projectId,
  projectName,
  rigId,
  onClickDetails,
}: CreateEMPHeaderProps) => {
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
      path: generatePath(routes.createEMP, {
        projectId: String(projectId),
        rigType: String(rigType),
        rigId: String(rigId),
      }),
      breadcrumbName: 'Add EMP',
    },
  ];

  return (
    <Header>
      <PageHeader
        title={`Add EMP to ${rigName}`}
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
            </>
          </PageHeaderExtraActions>
        }
      />
    </Header>
  );
};

export default CreateEMPHeader;
