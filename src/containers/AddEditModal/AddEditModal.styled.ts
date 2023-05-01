import { Modal as AntdModal } from 'antd';
import styled from 'styled-components';

export const Modal = styled(AntdModal).attrs({
  focusTriggerAfterClose: false,
})`
  .ant-modal-close-x {
    line-height: 76px;
    width: 88px;
    height: 76px;
  }

  .ant-modal-header {
    border-bottom: 0 none;
    padding: 32px 47px 0 47px;

    .ant-modal-title {
      font-weight: 600;
      line-height: 24px;
    }
  }

  .ant-modal-body {
    padding: 0 47px;
  }

  .ant-modal-footer {
    border-top: 0 none;
    padding: 14px 53px 41px;

    .ant-btn.ant-btn-primary {
      margin-left: 15px;
    }
  }
` as typeof AntdModal;
