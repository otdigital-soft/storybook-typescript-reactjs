import { Spin } from 'antd';
import AcceptPrivacyPolicy from 'components/AcceptPrivacyPolicy';
import Center from 'components/Center';
import Public from 'containers/Public';
import useMe from 'hooks/useMe';
import usePrivacyPolicyAccept from './usePrivacyPolicyAccept';

interface PrivacyPolicyAcceptedProps {
  children: JSX.Element;
}

const PrivacyPolicyAccepted = ({ children }: PrivacyPolicyAcceptedProps) => {
  const { data: meData, isLoading: isMeDataLoading } = useMe();
  const { mutate: onPrivacyPolicyAccept } = usePrivacyPolicyAccept();

  if (isMeDataLoading) {
    return (
      <Center flexGrow={1}>
        <Spin size="large" />
      </Center>
    );
  }

  if (!meData?.privacy_policy_consent_valid) {
    return (
      <Public>
        <AcceptPrivacyPolicy
          title="Privacy policy has changed"
          onAccept={onPrivacyPolicyAccept}
        />
      </Public>
    );
  }

  return <>{children}</>;
};

export default PrivacyPolicyAccepted;
