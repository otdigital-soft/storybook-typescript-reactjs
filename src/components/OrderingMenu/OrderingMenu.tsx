import { Select } from 'pages/Launch/Launch.styled';
import { Ordering, OrderingLabel } from 'utils/ordering';
import { Flexbox } from 'components/Box';

interface OrderingMenuProps {
  value: Ordering;
  onChange: (value: Ordering) => void;
}

const OrderingMenu = ({ onChange, value }: OrderingMenuProps) => {
  return (
    <Flexbox gap="8px">
      <Select
        placeholder="Display"
        value={value}
        /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
        // @ts-ignore
        onSelect={(newValue: Ordering) => onChange(newValue)}
      >
        {Object.values(Ordering).map((key) => (
          <Select.Option value={key} key={key}>
            {OrderingLabel[key as Ordering]}
          </Select.Option>
        ))}
      </Select>
    </Flexbox>
  );
};

export default OrderingMenu;
