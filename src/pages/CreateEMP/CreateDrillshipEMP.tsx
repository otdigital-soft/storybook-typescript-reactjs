import { useParams } from 'react-router-dom';
import routes from 'routes';
import useBack from 'hooks/useBack';
import Center from 'components/Center';
import { Spin } from 'antd';
import { isNotFoundError } from 'utils/api';
import Result from 'components/Result';
import Box from 'components/Box';
import { Content } from 'components/Layout';
import Divider from 'components/Divider';
import useCreateEMP from 'pages/CreateEMP/useCreateEMP';
import CreateEMPHeader from 'pages/CreateEMP/CreateEMPHeader';
import EMPForm from 'containers/EMPForm';
import useCreateEMPData from 'pages/CreateEMP/useCreateEMPData';
import useCustomDrillship from 'hooks/useCustomDrillship';
import DrillshipDetailsModal from 'containers/DrillshipDetailsModal';
import { EMPDrillshipDetails } from 'containers/EMPRigDetails';
import { useState } from 'react';
import { RigType } from 'routes';

const CreateDrillshipEMP = () => {
  const { handleBack } = useBack(routes.launch);
  const { rigId, projectId } =
    useParams<{ rigId: string; projectId: string }>();
  const {
    dataNotFoundError,
    projectData,
    empConceptElementsData,
    isLoadingData,
    dataError,
  } = useCreateEMPData(Number(projectId));
  const {
    data: rigData,
    isLoading: isLoadingRig,
    error: rigError,
  } = useCustomDrillship(Number(rigId));
  const {
    initialValues,
    schema,
    mutation: { mutateAsync: onCreateEMP },
  } = useCreateEMP({
    projectId: Number(projectId),
    rigId: Number(rigId),
    rigType: RigType.Drillship,
    conceptEMPElements: empConceptElementsData,
  });
  const [isRigDetailsModalVisible, setIsRigDetailsModalVisible] =
    useState(false);

  if (isLoadingData || isLoadingRig) {
    return (
      <Center flexGrow={1}>
        <Spin size="large" />
      </Center>
    );
  }

  if (dataError || rigError || !rigData || !projectData) {
    return (
      <Center flexGrow={1}>
        {dataNotFoundError || isNotFoundError(rigError) ? (
          <Result status="404" subTitle="Rig doesn't exist." />
        ) : (
          <Result
            status="error"
            subTitle="Unable to add EMP right now. Please try later."
          />
        )}
      </Center>
    );
  }

  return (
    <>
      <CreateEMPHeader
        projectId={Number(projectId)}
        rigId={Number(rigId)}
        rigType={RigType.Drillship}
        projectName={projectData.name}
        rigName={rigData.name || ''}
        onClickDetails={() => setIsRigDetailsModalVisible(true)}
      />
      <Content>
        <Box marginTop={20} marginBottom={106} marginX={24}>
          <EMPDrillshipDetails rigData={rigData} />

          <Box marginY={30}>
            <Divider />
          </Box>

          <EMPForm
            handleBack={handleBack}
            initialValues={initialValues}
            schema={schema}
            onSubmit={(values, formikHelpers) =>
              onCreateEMP({ values, formikHelpers })
            }
          />
        </Box>
      </Content>
      <DrillshipDetailsModal
        rig={rigData}
        onClose={() => setIsRigDetailsModalVisible(false)}
        title="Rig details"
        visible={isRigDetailsModalVisible}
      />
    </>
  );
};

export default CreateDrillshipEMP;
