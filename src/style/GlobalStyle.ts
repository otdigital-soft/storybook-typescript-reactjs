import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  .ant-notification-center {
    left: 50%;
    right: inherit !important;
    top: 10px !important;
    margin-right: 0;
    transform: translateX(-50%);
    bottom: auto !important;
  }
  
  .ant-notification-notice-success {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.green[13]};
    
    .ant-notification-notice-close,
    .ant-notification-notice-icon-success,
    .ant-notification-notice-message {
      color: inherit;
    }
  }
  
  .ant-modal-confirm-body .ant-modal-confirm-title {
    font-weight: 600;
  }
  
  .ant-select-item.ant-select-item-option-edit {
    padding-top: 5px;
    padding-bottom: 5px;
  }
`;

export default GlobalStyle;
