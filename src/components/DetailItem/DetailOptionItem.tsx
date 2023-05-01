import { BlankEnum } from 'api/schema';
import DetailItem, { DetailItemProps } from './DetailItem';

const DetailOptionItem = <T extends string>({
  display,
  value,
  ...props
}: DetailItemProps<T | BlankEnum> & {
  display: Record<T, string>;
}) => {
  return (
    <DetailItem value={value ? display[value as T] : undefined} {...props} />
  );
};

export default DetailOptionItem;
