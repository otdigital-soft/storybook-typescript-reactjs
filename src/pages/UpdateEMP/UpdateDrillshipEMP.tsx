import useBack from 'hooks/useBack';
import routes from 'routes';
import { RigType } from 'routes';
import { useParams } from 'react-router-dom';
import useUpdateEMP from 'pages/UpdateEMP/useUpdateEMP';
import Center from 'components/Center';
import { Spin } from 'antd';
import { isNotFoundError } from 'utils/api';
import Result from 'components/Result';
import UpdateEMPHeader from 'pages/UpdateEMP/UpdateEMPHeader';
import { Content } from 'components/Layout';
import Box from 'components/Box';
import Divider from 'components/Divider';
import EMPForm from 'containers/EMPForm';
import { EMPDrillshipDetails } from 'containers/EMPRigDetails';
import useUpdateEMPData from 'pages/UpdateEMP/useUpdateEMPData';
import { useState } from 'react';
import DrillshipDetailsModal from 'containers/DrillshipDetailsModal';
import useCustomDrillship from 'hooks/useCustomDrillship';

const UpdateDrillshipEMP = () => {
  const { handleBack } = useBack(routes.launch);
  const { rigId, projectId } =
    useParams<{ rigId: string; projectId: string }>();
  const {
    empData,
    projectData,
    empConceptElementsData,
    dataNotFoundError,
    isLoadingData,
    dataError,
  } = useUpdateEMPData(Number(projectId), Number(rigId), RigType.Drillship);
  const {
    data: rigData,
    isLoading: isLoadingRig,
    error: rigError,
  } = useCustomDrillship(Number(rigId));
  const {
    initialValues,
    schema,
    mutation: { mutateAsync: onUpdateEMP },
    onClear: onClearEMP,
  } = useUpdateEMP({
    projectId: Number(projectId),
    rigId: Number(rigId),
    rigType: RigType.Drillship,
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
        rigType={RigType.Drillship}
        rigName={rigData.name || ''}
        emp={empData}
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
              onUpdateEMP({ values, formikHelpers })
            }
            onClear={onClearEMP}
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

export default UpdateDrillshipEMP;
