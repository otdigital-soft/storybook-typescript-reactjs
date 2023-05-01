import Modal from 'components/Modal';
import { useTheme } from 'styled-components';
import { CloseCircleOutlined } from '@ant-design/icons';

const useConfirmDeleteRig = () => {
  const { colors } = useTheme();
  return {
    confirmDeleteRig: (rigName: string, onOk: () => void) =>
      Modal.confirm({
        title: 'Delete rig',
        content: (
          <>
            Are you sure you want to delete <strong>{rigName}</strong> rig?
          </>
        ),
        icon: <CloseCircleOutlined style={{ color: colors.red[6] }} />,
        okButtonProps: {
          danger: true,
        },
        okText: 'Delete',
        onOk,
      }),
  };
};

export default useConfirmDeleteRig;
