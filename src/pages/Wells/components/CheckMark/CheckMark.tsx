import { CheckCircleOutlined } from '@ant-design/icons';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useTheme } from 'styled-components';
import { Text } from 'components/Typography';
interface CheckMarkProps {
  checked: boolean;
}

const CheckMark = ({ checked }: CheckMarkProps) => {
  const { colors } = useTheme();
  return (
    <Text fontSize={16}>
      {checked ? (
        <CheckCircleOutlined style={{ color: colors.turquoise[1] }} />
      ) : (
        <CloseCircleOutlined style={{ color: colors.salomn[1] }} />
      )}
    </Text>
  );
};

export default CheckMark;
