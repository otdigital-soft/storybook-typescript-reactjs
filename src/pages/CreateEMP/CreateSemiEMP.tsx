import { useParams } from 'react-router-dom';
import routes from 'routes';
import useBack from 'hooks/useBack';
import useCustomSemiRig from 'hooks/useCustomSemiRig';
import Center from 'components/Center';
import { Spin } from 'antd';
import { isNotFoundError } from 'utils/api';
import Result from 'components/Result';
import Box from 'components/Box';
import { Content } from 'components/Layout';
import Divider from 'components/Divider';
import useCreateEMP from 'pages/CreateEMP/useCreateEMP';
import CreateEMPHeader from 'pages/CreateEMP/CreateEMPHeader';
import { EMPSemiRigDetails } from 'containers/EMPRigDetails';
import EMPForm from 'containers/EMPForm';
import useCreateEMPData from 'pages/CreateEMP/useCreateEMPData';
import { useState } from 'react';
import SemiRigDetailsModal from 'containers/SemiRigDetailsModal';
import { RigType } from 'routes';

const CreateSemiEMP = () => {
  const { handleBack } = useBack(routes.launch);
  const { rigId, projectId } =
    useParams<{ rigId: string; projectId: string }>();
  const rigType = RigType.Semi;
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
  } = useCustomSemiRig(Number(rigId));
  const {
    initialValues,
    schema,
    mutation: { mutateAsync: onCreateSemiEmp },
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
        rigType={rigType}
        projectName={projectData?.name || ''}
        rigName={rigData?.name || ''}
        onClickDetails={() => setIsRigDetailsModalVisible(true)}
      />
      <Content>
        <Box marginTop={20} marginBottom={106} marginX={24}>
          {rigData ? <EMPSemiRigDetails rigData={rigData} /> : null}

          <Box marginY={30}>
            <Divider />
          </Box>

          <EMPForm
            handleBack={handleBack}
            initialValues={initialValues}
            schema={schema}
            onSubmit={(values, formikHelpers) =>
              onCreateSemiEmp({ values, formikHelpers })
            }
          />
        </Box>
      </Content>
      <SemiRigDetailsModal
        rig={rigData}
        onClose={() => setIsRigDetailsModalVisible(false)}
        title="Rig details"
        visible={isRigDetailsModalVisible}
      />
    </>
  );
};

export default CreateSemiEMP;
