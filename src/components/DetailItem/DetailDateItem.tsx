import { DATE_FORMAT_LONG } from 'consts';
import { formatDateString } from 'utils/date';
import DetailItem, { DetailItemProps } from './DetailItem';

const DetailDateItem = (props: DetailItemProps<string>) => {
  return (
    <DetailItem
      formatter={(value) => formatDateString(value, DATE_FORMAT_LONG)}
      {...props}
    />
  );
};

export default DetailDateItem;
