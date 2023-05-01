import { Button } from 'antd';
import { PublicResult } from 'containers/Public/Public.styled';
import useTenant from 'hooks/useTenant';
import { useNavigate } from 'react-router-dom';
import useInvitationAccept from './useInvitationAccept';

interface AcceptProps {
  token: string;
}

const Accept = ({ token }: AcceptProps) => {
  const { data: tenantData } = useTenant();
  const navigate = useNavigate();
  const {
    mutateAsync: onInvitationAccept,
    isSuccess: isSuccessInvitationAccept,
    isError: isErrorInvitationAccept,
    isLoading: isLoadingInvitationAccept,
  } = useInvitationAccept();

  if (isSuccessInvitationAccept) {
    return (
      <PublicResult
        title="Invitation Accepted"
        subTitle="You can now log into your account."
        status="success"
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
  }

  if (isErrorInvitationAccept) {
    return (
      <PublicResult
        title="Invitation can not be verified."
        status="error"
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
  }

  return (
    <PublicResult
      title={`You have been invited to ${tenantData?.name}`}
      subTitle="Accept invitation if you want to join."
      extra={
        <>
          <Button
            type="primary"
            disabled={isLoadingInvitationAccept}
            onClick={() => onInvitationAccept({ token })}
          >
            Accept Invitation
          </Button>
        </>
      }
    />
  );
};

export default Accept;
