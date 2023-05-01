import { RigType } from 'routes';
import { useParams } from 'react-router-dom';
import CreateSemiEMP from 'pages/CreateEMP/CreateSemiEMP';
import CreateJackupEMP from 'pages/CreateEMP/CreateJackupEMP';
import Center from 'components/Center';
import { Result } from 'antd';
import Logger from 'utils/logger';
import CreateDrillshipEMP from './CreateDrillshipEMP';

const CreateEMP = () => {
  const { rigType } = useParams<{ rigType: RigType }>();
  if (rigType === RigType.Semi) {
    return <CreateSemiEMP />;
  } else if (rigType === RigType.Jackup) {
    return <CreateJackupEMP />;
  } else if (rigType === RigType.Drillship) {
    return <CreateDrillshipEMP />;
  }

  Logger.error(`Unable to create EMP. Unknown rig type: ${rigType}`);

  return (
    <Center flexGrow={1}>
      <Result
        status="error"
        subTitle="Something went wrong. Please try later."
      />
    </Center>
  );
};

export default CreateEMP;
