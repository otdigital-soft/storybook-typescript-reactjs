import { useParams } from 'react-router-dom';
import useBack from 'hooks/useBack';
import routes from 'routes';
import useCreateEMP from 'pages/CreateEMP/useCreateEMP';
import Center from 'components/Center';
import { Spin } from 'antd';
import { isNotFoundError } from 'utils/api';
import Result from 'components/Result';
import { Content } from 'components/Layout';
import Box from 'components/Box';
import Divider from 'components/Divider';
import useCustomJackupRig from 'hooks/useCustomJackupRig';
import CreateEMPHeader from 'pages/CreateEMP/CreateEMPHeader';
import EMPForm from 'containers/EMPForm';
import useCreateEMPData from 'pages/CreateEMP/useCreateEMPData';
import { useState } from 'react';
import { EMPJackupRigDetails } from 'containers/EMPRigDetails';
import JackupRigDetailsModal from 'containers/JackupRigDetailsModal';
import { RigType } from 'routes';

const CreateJackupEMP = () => {
  const { handleBack } = useBack(routes.launch);
  const { rigId, projectId } =
    useParams<{ rigId: string; projectId: string }>();
  const rigType = RigType.Jackup;
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
  } = useCustomJackupRig(Number(rigId));
  const {
    initialValues,
    schema,
    mutation: { mutateAsync: onCreateEMP },
  } = useCreateEMP({
    projectId: Number(projectId),
    rigId: Number(rigId),
    rigType,
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
  if (dataError || rigError) {
    return (
      <Center flexGrow={1}>
        {isNotFoundError(rigError) || dataNotFoundError ? (
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
        projectName={projectData?.name || ''}
        rigId={Number(rigId)}
        rigType={rigType}
        rigName={rigData?.name || ''}
        onClickDetails={() => setIsRigDetailsModalVisible(true)}
      />
      <Content>
        <Box marginTop={20} marginBottom={106} marginX={24}>
          {rigData ? <EMPJackupRigDetails rigData={rigData} /> : null}

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
      <JackupRigDetailsModal
        rig={rigData}
        onClose={() => setIsRigDetailsModalVisible(false)}
        title="Rig details"
        visible={isRigDetailsModalVisible}
      />
    </>
  );
};

export default CreateJackupEMP;
