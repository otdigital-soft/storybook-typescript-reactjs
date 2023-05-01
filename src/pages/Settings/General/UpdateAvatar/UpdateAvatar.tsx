import { Avatar } from 'antd';
import useMe from 'hooks/useMe';
import { ChangeEvent, useRef, useState } from 'react';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import Box, { Flexbox } from 'components/Box';
import { UploadAvatarButton, UploadAvatarDivider } from './UpdateAvatar.styled';
import useUpdateAvatar from './useUpdateAvatar';
import useDeleteAvatar from './useDeleteAvatar';
import { useTheme } from 'styled-components';
import { getInitials } from 'utils/format';

const UpdateAvatar = () => {
  const { colors } = useTheme();
  const { mutate: onUpdateAvatar } = useUpdateAvatar();
  const { mutate: onDeleteAvatar } = useDeleteAvatar();
  const { data: meData } = useMe();
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const name = `${meData?.first_name} ${meData?.last_name}`;

  const onFileChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;

    if (target.files) {
      const file = target.files[0];
      onUpdateAvatar(file);
    }

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <>
      <Box
        width={64}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <input
          style={{ display: 'none' }}
          type="file"
          ref={inputRef}
          accept="image/*"
          onChange={onFileChange}
        />
        {isHovered ? (
          <Flexbox
            borderRadius={'50%'}
            height={64}
            width={64}
            justifyContent="center"
            alignItems="center"
            bg={colors.gray[9]}
          >
            <Flexbox flexDirection="column">
              <UploadAvatarButton
                title="Update avatar"
                onClick={() => inputRef.current?.click()}
              >
                <UploadOutlined />
              </UploadAvatarButton>
              {meData?.profile_image ? (
                <>
                  <UploadAvatarDivider />
                  <UploadAvatarButton
                    title="Delete avatar"
                    onClick={() => onDeleteAvatar()}
                  >
                    <DeleteOutlined />
                  </UploadAvatarButton>
                </>
              ) : null}
            </Flexbox>
          </Flexbox>
        ) : (
          <Avatar src={meData?.profile_image || undefined} size={64}>
            {getInitials(name)}
          </Avatar>
        )}
      </Box>
    </>
  );
};

export default UpdateAvatar;
