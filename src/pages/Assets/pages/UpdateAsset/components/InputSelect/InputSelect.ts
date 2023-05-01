import AddEditSelect from 'components/AddEditSelect';
import styled from 'styled-components';

const InputSelect = styled(AddEditSelect)`
  &&& .ant-select-selector {
    height: 37px;

    &::after {
      line-height: 37px;
    }

    > .ant-select-selection-item {
      line-height: 35px;
    }

    .ant-select-selection-search input {
      height: 35px;
    }

    .ant-select-selection-placeholder {
      line-height: 35px;
    }
  }
`;

export default InputSelect;
