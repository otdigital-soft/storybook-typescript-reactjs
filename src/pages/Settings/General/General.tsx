import { Button, Modal } from 'antd';
import PageHeader from 'components/PageHeader';
import { CloseCircleOutlined } from '@ant-design/icons';
import Box from 'components/Box';
import useMe from 'hooks/useMe';
import { useTheme } from 'styled-components';
import useDeleteAccount from './useDeleteAccount';
import UpdateProfile from './UpdateProfile';
import UpdateAvatar from './UpdateAvatar';

const General = () => {
  const { colors } = useTheme();
  const { mutate: onDeleteAccount } = useDeleteAccount();
  const { data: meData } = useMe();

  return (
    <>
      <PageHeader title="Profile" />
      <Box maxWidth={355}>
        <Box paddingX="24px" marginBottom="20px">
          <UpdateAvatar />
        </Box>
        <Box paddingX="24px">
          <UpdateProfile />
        </Box>
        <PageHeader title="Delete account" />
        <Box paddingY="20px" paddingX="24px">
          <Button
            onClick={() => {
              Modal.confirm({
                title: 'Delete account',
                content: (
                  <>
                    Are you sure you want to delete{' '}
                    <b>
                      {meData?.first_name} {meData?.last_name}
                    </b>{' '}
                    account?
                  </>
                ),

                icon: <CloseCircleOutlined style={{ color: colors.red[6] }} />,
                okButtonProps: {
                  danger: true,
                },
                okText: 'Delete',
                onOk: () => onDeleteAccount(),
              });
            }}
            type="primary"
            danger
            block
          >
            Delete account
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default General;
