import { Spin, Typography } from 'antd';
import Box, { Flexbox } from 'components/Box';
import Center from 'components/Center';
import useConsentLatest from './useConsentLatest';

import { formatDateString } from 'utils/date';
import { DATE_TIME_FORMAT_LONG } from 'consts';
import PageHeader from 'components/PageHeader';

const { Text } = Typography;

const Consents = () => {
  const { data: consentLatestData } = useConsentLatest();

  if (!consentLatestData) {
    return (
      <Center>
        <Spin />
      </Center>
    );
  }

  return (
    <>
      <Flexbox alignItems="baseline">
        <PageHeader title={consentLatestData.title} />
        <Box ml="18px">
          <Text type="secondary">
            Accepted on{' '}
            {formatDateString(
              consentLatestData.created_at,
              DATE_TIME_FORMAT_LONG,
            )}
          </Text>
        </Box>
      </Flexbox>
      <Box mt={9} paddingY="16px" paddingX="27px">
        <div
          dangerouslySetInnerHTML={{
            __html: consentLatestData.text,
          }}
        />
      </Box>
    </>
  );
};

export default Consents;
