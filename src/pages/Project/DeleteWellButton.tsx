import { DeleteOutlined } from '@ant-design/icons';
import { Text } from 'components/Typography';
import { useTheme } from 'styled-components';
import useDeleteWell from 'pages/Project/useDeleteWell';
import { CustomWellList } from 'api/schema';

interface DeleteWellButtonProps {
  well: CustomWellList;
  projectId: number;
}

const DeleteWellButton = ({ well, projectId }: DeleteWellButtonProps) => {
  const { colors } = useTheme();
  const onDeleteWell = useDeleteWell(well, projectId);
  return (
    <Text
      fontSize={24}
      color={colors.red['5']}
      cursor="pointer"
      title="Delete well"
      lineHeight={1}
      onClick={onDeleteWell}
    >
      <DeleteOutlined />
    </Text>
  );
};

export default DeleteWellButton;
