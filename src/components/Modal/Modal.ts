import { Modal as AntdModal } from 'antd';
import styled from 'styled-components';

const Modal = styled(AntdModal).attrs({
  focusTriggerAfterClose: false,
})`
  .ant-modal-body {
    max-height: calc(100vh - 200px);
    overflow-y: auto;
  }
  .ant-modal-content {
    padding: 24px;
    border-radius: 12px;
  }
  .ant-modal-header {
    padding: 16px 24px;
  }
  .ant-modal-footer {
    padding: 10px 16px;
  }
  .ant-modal-title {
    font-weight: 600;
  }
  .ant-modal-close-x {
    width: inherit;
    height: inherit;
    line-height: inherit;
  }
  .ant-modal-close {
    top: 43px;
    right: 48px;
  }
`;

export default Modal;
