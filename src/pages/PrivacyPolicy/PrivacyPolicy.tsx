import { Spin } from 'antd';
import Box from 'components/Box';
import Center from 'components/Center';
import { Title } from 'components/Typography';
import usePrivacyPolicyLatest from 'hooks/usePrivacyPolicyLatest';

const PrivacyPolicy = () => {
  const {
    data: privacyPolicyLatestData,
    isLoading: isPrivacyPolicyAcceptLoading,
  } = usePrivacyPolicyLatest();

  if (isPrivacyPolicyAcceptLoading) {
    return (
      <Center mt="248px">
        <Spin size="large" />
      </Center>
    );
  }
  return (
    <Box mt={64}>
      <Title level={3} textAlign="center">
        {privacyPolicyLatestData?.title}
      </Title>
      <Box mt={32} maxWidth={781}>
        <div
          dangerouslySetInnerHTML={{
            __html: privacyPolicyLatestData?.text || '',
          }}
        />
      </Box>
    </Box>
  );
};

export default PrivacyPolicy;
