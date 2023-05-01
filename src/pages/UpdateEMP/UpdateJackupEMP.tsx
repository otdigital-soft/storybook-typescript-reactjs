import useBack from 'hooks/useBack';
import routes from 'routes';
import { RigType } from 'routes';
import { useParams } from 'react-router-dom';
import useCustomJackupRig from 'hooks/useCustomJackupRig';
import Center from 'components/Center';
import { Spin } from 'antd';
import { isNotFoundError } from 'utils/api';
import Result from 'components/Result';
import { Content } from 'components/Layout';
import Box from 'components/Box';
import Divider from 'components/Divider';
import useUpdateEMP from 'pages/UpdateEMP/useUpdateEMP';
import UpdateEMPHeader from 'pages/UpdateEMP/UpdateEMPHeader';
import { EMPJackupRigDetails } from 'containers/EMPRigDetails';
import EMPForm from 'containers/EMPForm';
import useUpdateEMPData from 'pages/UpdateEMP/useUpdateEMPData';
import { useState } from 'react';
import JackupRigDetailsModal from 'containers/JackupRigDetailsModal';

const UpdateJackupEMP = () => {
  const { handleBack } = useBack(routes.launch);
  const { rigId, projectId } =
    useParams<{ rigId: string; projectId: string }>();
  const rigType = RigType.Jackup;
  const {
    empData,
    projectData,
    empConceptElementsData,
    dataNotFoundError,
    isLoadingData,
    dataError,
  } = useUpdateEMPData(Number(projectId), Number(rigId), rigType);
  const {
    data: rigData,
    isLoading: isLoadingRig,
    error: rigError,
  } = useCustomJackupRig(Number(rigId));
  const {
    initialValues,
    schema,
    mutation: { mutateAsync: onUpdateEMP },
    onClear: onClearEMP,
  } = useUpdateEMP({
    projectId: Number(projectId),
    rigId: Number(rigId),
    rigType,
    empData,
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

  if (dataNotFoundError || isNotFoundError(rigError)) {
    return (
      <Center flexGrow={1}>
        <Result status="404" subTitle="EMP doesn't exist." />
      </Center>
    );
  }

  if (dataError || rigError || !projectData || !rigData || !empData) {
    return (
      <Center flexGrow={1}>
        <Result
          status="error"
          subTitle="Unable to edit EMP right now. Please try later."
        />
      </Center>
    );
  }

  return (
    <>
      <UpdateEMPHeader
        projectId={Number(projectId)}
        projectName={projectData.name}
        rigId={Number(rigId)}
        rigType={rigType}
        rigName={rigData.name || ''}
        emp={empData}
        onClickDetails={() => setIsRigDetailsModalVisible(true)}
      />
      <Content>
        <Box marginTop={20} marginBottom={106} marginX={24}>
          <EMPJackupRigDetails rigData={rigData} />

          <Box marginY={30}>
            <Divider />
          </Box>

          <EMPForm
            handleBack={handleBack}
            initialValues={initialValues}
            schema={schema}
            onSubmit={(values, formikHelpers) =>
              onUpdateEMP({ values, formikHelpers })
            }
            onClear={onClearEMP}
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

export default UpdateJackupEMP;
