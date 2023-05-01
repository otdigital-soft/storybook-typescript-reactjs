import { DefaultOptionType, SelectProps } from 'antd/lib/select';
import OptionContainer from './OptionContainer';
import { PlusOutlined } from '@ant-design/icons';
import {
  StyledButton,
  Divider,
  Select,
  AddNewContainer,
} from './AddEditSelect.styled';
import { useState } from 'react';

export type AddEditSelectOptionType = DefaultOptionType & {
  editable?: boolean;
};

export type AddEditSelectProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ValueType = any,
  OptionType extends AddEditSelectOptionType = AddEditSelectOptionType,
> = SelectProps<ValueType, OptionType> & {
  onEdit?: (value: string | number | null | undefined) => void;
  onAdd?: () => void;
  addNewLabel?: string;
};

function AddEditSelect({
  options,
  onAdd,
  onEdit,
  addNewLabel,
  open,
  ...props
}: AddEditSelectProps) {
  const [isOpen, setIsOpen] = useState(open);
  return (
    <Select
      {...props}
      open={isOpen}
      onDropdownVisibleChange={setIsOpen}
      dropdownRender={
        onAdd
          ? (menu) => (
              <>
                {menu}
                <>
                  <Divider />
                  <AddNewContainer
                    onClick={() => {
                      setIsOpen(false);
                      onAdd();
                    }}
                  >
                    {addNewLabel || 'Add new'}
                    <StyledButton
                      size="small"
                      type="text"
                      icon={<PlusOutlined />}
                    />
                  </AddNewContainer>
                </>
              </>
            )
          : undefined
      }
    >
      {options?.map((option) => (
        <Select.Option
          disabled={option.disabled}
          value={option.value}
          key={option.value}
          className={
            option.editable ? 'ant-select-item-option-edit' : undefined
          }
        >
          <OptionContainer
            editable={!!option.editable}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
              if (onEdit) {
                onEdit(option.value);
              }
            }}
          >
            {option.label}
          </OptionContainer>
        </Select.Option>
      ))}
    </Select>
  );
}

export default AddEditSelect;
