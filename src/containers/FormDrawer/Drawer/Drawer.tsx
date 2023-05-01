import { DrawerProps } from 'antd/lib/drawer';
import Button from 'components/Button';
import { StyledDrawer } from './Drawer.styled';
import { CloseOutlined } from '@ant-design/icons';

const Drawer = (
  props: Omit<DrawerProps, 'onClose'> & {
    children?: JSX.Element;
    onClose?: () => void;
  },
) => {
  return (
    <StyledDrawer
      {...props}
      closable={false}
      placement="right"
      extra={
        <Button
          size="small"
          type="text"
          onClick={props.onClose}
          icon={<CloseOutlined />}
        />
      }
    />
  );
};

export default Drawer;
