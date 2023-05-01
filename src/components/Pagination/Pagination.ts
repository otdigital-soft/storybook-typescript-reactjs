import { Pagination as AntdPagination } from 'antd';
import styled from 'styled-components';

const Pagination = styled(AntdPagination)`
  .ant-pagination-next .ant-pagination-item-link {
    color: ${({ theme }) => theme.colors.gray[11]};
  }

  .ant-pagination-disabled .ant-pagination-item-link {
    background-color: ${({ theme }) => theme.colors.gray[12]};
    color: ${({ theme }) => theme.colors.gray[13]};
  }

  .ant-pagination-item {
    font-weight: 600;
    border-color: ${({ theme }) => theme.colors.gray[14]};
    a {
      color: ${({ theme }) => theme.colors.blue[5]};
    }

    &.ant-pagination-item-active {
      border-color: ${({ theme }) => theme.colors.blue[6]};
      a {
        color: ${({ theme }) => theme.colors.blue[6]};
      }
    }
  }
`;

export default Pagination;
