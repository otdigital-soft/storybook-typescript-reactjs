import { Spin } from 'antd';
import Box from 'components/Box';
import Center from 'components/Center';
import { Title } from 'components/Typography';
import usePrivacyPolicyLatest from 'hooks/usePrivacyPolicyLatest';
import { AcceptPrivacyPolicyButton } from './AcceptPrivacyPolicy.styled';

interface AcceptPrivacyPolicyProps {
  title: string;
  onAccept: () => void;
  onCancel?: () => void;
}

const AcceptPrivacyPolicy = ({
  title,
  onAccept,
  onCancel,
}: AcceptPrivacyPolicyProps) => {
  const { data: policyLatestData, isLoading: isPolicyLatestLoading } =
    usePrivacyPolicyLatest();

  if (isPolicyLatestLoading) {
    return (
      <Center mt="248px">
        <Spin size="large" />
      </Center>
    );
  }

  return (
    <Box mt={64} mb={240}>
      <Title level={3} textAlign="center">
        {title}
      </Title>
      <Box mt={82} mb={82} maxWidth={781}>
        <div
          dangerouslySetInnerHTML={{
            __html: policyLatestData?.text || '',
          }}
        />
      </Box>
      <Box
        position="fixed"
        display="flex"
        flexDirection="column"
        right={0}
        left={0}
        bottom={0}
        paddingTop={24}
        backgroundColor="#fff"
        width="100%"
      >
        <AcceptPrivacyPolicyButton
          type="primary"
          block
          onClick={() => onAccept()}
        >
          Accept
        </AcceptPrivacyPolicyButton>
        {onCancel && (
          <AcceptPrivacyPolicyButton onClick={() => onCancel()} block>
            Back
          </AcceptPrivacyPolicyButton>
        )}
      </Box>
    </Box>
  );
};

export default AcceptPrivacyPolicy;
