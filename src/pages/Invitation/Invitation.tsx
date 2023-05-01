import { Button, Spin } from 'antd';
import { StatusEnum } from 'api/schema';
import Center from 'components/Center';
import { PublicResult } from 'containers/Public/Public.styled';
import { useNavigate } from 'react-router-dom';
import { isNotFoundError } from 'utils/api';
import SignUp from './SignUp';
import Accept from './Accept';
import useInvitation from './useInvitation';

const Invitation = () => {
  const {
    token,
    data: invitationData,
    error: invitationError,
    isLoading: isInvitationLoading,
  } = useInvitation();
  const navigate = useNavigate();

  if (isInvitationLoading) {
    return (
      <Center mt="248px">
        <Spin size="large" />
      </Center>
    );
  }

  if (!token || isNotFoundError(invitationError)) {
    return <PublicResult status="error" title="Invitation not found." />;
  }

  switch (invitationData?.status) {
    case StatusEnum.EXPIRED:
      return (
        <PublicResult
          status="error"
          title="Invitation Expired."
          subTitle="Ask administrator for a new invitation."
          extra={
            <Button
              onClick={() => navigate('/signin/', { replace: true })}
              type="primary"
            >
              Back to login
            </Button>
          }
        />
      );
    case StatusEnum.NEW_USER:
      return <SignUp token={token} />;
    case StatusEnum.EXISTING_USER:
      return <Accept token={token} />;
    default:
      return (
        <PublicResult status="error" title="Invitation can not be verified" />
      );
  }
};

export default Invitation;
