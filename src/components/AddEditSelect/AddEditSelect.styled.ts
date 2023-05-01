import Button from 'components/Button';
import { Divider as AntdDivider, Select as AntdSelect } from 'antd';
import styled from 'styled-components';

export const Select = styled(AntdSelect)`
  width: 100%;

  .ant-select-selection-item {
    .ant-select-item-edit {
      display: none;
    }
  }
` as typeof AntdSelect;

export const StyledButton = styled(Button)`
  && {
    width: 32px;
    height: 32px;
  }

  .anticon {
    font-size: 16px;
  }
`;

export const EditButton = styled(StyledButton)`
  background-color: ${({ theme }) => theme.colors.gray['3']};

  .anticon {
    color: ${({ theme }) => theme.colors.gray['9']};
  }

  :hover {
    background-color: ${({ theme }) => theme.colors.blue['6']};

    .anticon {
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;

export const Divider = styled(AntdDivider)`
  margin: 0;
  color: ${({ theme }) => theme.colors.gray['4']};
`;

export const AddNewContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  padding: 5px 14px;
  cursor: pointer;

  :hover {
    background-color: ${({ theme }) => theme.colors.gray['12']};
  }
`;
