import PageHeader from 'components/PageHeader';
import Box from 'components/Box';
import ChangePassword from './ChangePassword';

const Security = () => {
  return (
    <>
      <PageHeader title="Change Password" />
      <Box paddingX="24px">
        <ChangePassword />
      </Box>
    </>
  );
};

export default Security;
