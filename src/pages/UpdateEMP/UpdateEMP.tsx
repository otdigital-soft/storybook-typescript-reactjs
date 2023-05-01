import Center from 'components/Center';
import { Result } from 'antd';
import { useParams } from 'react-router-dom';
import { RigType } from 'routes';
import Logger from 'utils/logger';
import UpdateSemiEMP from 'pages/UpdateEMP/UpdateSemiEMP';
import UpdateJackupEMP from 'pages/UpdateEMP/UpdateJackupEMP';
import UpdateDrillshipEMP from 'pages/UpdateEMP/UpdateDrillshipEMP';

const UpdateEMP = () => {
  const { rigType } = useParams<{ rigType: RigType }>();
  if (rigType === RigType.Semi) {
    return <UpdateSemiEMP />;
  } else if (rigType === RigType.Jackup) {
    return <UpdateJackupEMP />;
  } else if (rigType === RigType.Drillship) {
    return <UpdateDrillshipEMP />;
  }

  Logger.error(`Unable to update EMP. Unknown rig type: ${rigType}`);
  return (
    <Center flexGrow={1}>
      <Result
        status="error"
        subTitle="Something went wrong. Please try later."
      />
    </Center>
  );
};

export default UpdateEMP;
