import Modal from 'components/Modal';
import { CloseCircleOutlined } from '@ant-design/icons';
import useTenant from 'hooks/useTenant';
import { useMutation } from 'react-query';
import wellServices from 'api/services/wells';
import { notification } from 'antd';
import Logger from 'utils/logger';
import { useTheme } from 'styled-components';
import { useCallback } from 'react';

const useDeleteCustomWell = ({
  wellName,
  wellId,
  onSuccess,
}: {
  wellId?: number;
  wellName?: string;
  onSuccess?: () => void;
}) => {
  const { tenantId } = useTenant();
  const { colors } = useTheme();

  const { mutate: deleteWell } = useMutation(
    () => {
      if (!tenantId) {
        throw new Error('Missing tenant id');
      }
      if (!wellId) {
        throw new Error('Missing well id');
      }
      return wellServices.deleteCustomWell(tenantId, wellId);
    },
    {
      onSuccess: async () => {
        if (!tenantId) {
          throw new Error('Missing tenant id');
        }
        notification.success({
          message: 'Deleted well',
          description: (
            <>
              Well "<strong>{wellName}</strong>" has been deleted.
            </>
          ),
        });
        if (onSuccess) {
          onSuccess();
        }
      },
      onError: (e) => {
        notification.error({
          message: 'Unable to delete well. Please try later.',
        });
        Logger.error(`Unable to delete CustomWell(id=${wellId})`, e);
      },
    },
  );

  return useCallback(() => {
    Modal.confirm({
      title: 'Delete well',
      content: (
        <>
          Are you sure you want to delete <strong>{wellName}</strong> well?
        </>
      ),
      icon: <CloseCircleOutlined style={{ color: colors.red[6] }} />,
      okButtonProps: {
        danger: true,
      },
      okText: 'Delete',
      onOk: () => {
        deleteWell();
      },
    });
  }, [colors.red, deleteWell, wellName]);
};

export default useDeleteCustomWell;
