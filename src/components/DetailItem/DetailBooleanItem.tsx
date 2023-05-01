import { yesNoFormatter } from 'utils/format';
import DetailItem from './DetailItem';

interface DetailBooleanItemProps {
  label: string;
  value: boolean | null | undefined;
}

const DetailBooleanItem = ({ label, value }: DetailBooleanItemProps) => {
  return <DetailItem label={label} value={yesNoFormatter(value)} />;
};

export default DetailBooleanItem;
