import { prettyNumber } from 'utils/format';
import DetailItem, { DetailItemProps } from './DetailItem';

const DetailNumberItem = (props: DetailItemProps<number>) => {
  return <DetailItem formatter={prettyNumber} {...props} />;
};

export default DetailNumberItem;
