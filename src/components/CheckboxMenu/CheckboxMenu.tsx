import { Checkbox } from 'antd';
import { StyledMenu } from './CheckboxMenu.styled';

export interface CheckboxMenuItemProps<T> {
  title: string;
  checked: boolean;
  key: T;
}

export interface CheckboxMenuProps<T> {
  items: CheckboxMenuItemProps<T>[];
  onSelectAllChange: (checked: boolean) => void;
  onItemChange: (key: T, checked: boolean) => void;
}

const CheckboxMenu = <T extends string>({
  items,
  onSelectAllChange,
  onItemChange,
}: CheckboxMenuProps<T>) => {
  const allChecked = items.every((item) => item.checked);
  const numChecked = items.filter((item) => item.checked).length;

  return (
    <StyledMenu width={192}>
      <StyledMenu.Item key="selectAll">
        <Checkbox
          checked={allChecked}
          disabled={allChecked}
          onChange={(e) => onSelectAllChange(e.target.checked)}
        >
          Select all
        </Checkbox>
      </StyledMenu.Item>
      {items.map((item) => (
        <StyledMenu.Item key={item.key}>
          <Checkbox
            checked={item.checked}
            disabled={item.checked && numChecked === 1}
            onChange={(e) => onItemChange(item.key, e.target.checked)}
          >
            {item.title}
          </Checkbox>
        </StyledMenu.Item>
      ))}
    </StyledMenu>
  );
};

export default CheckboxMenu;
