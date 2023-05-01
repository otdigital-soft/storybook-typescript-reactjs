import differenceInDays from 'date-fns/differenceInDays';
import Tag from 'components/Tag';

interface ElementTagProps {
  createdAt?: Date;
  draft?: boolean;
}

const ElementTag = ({ createdAt, draft }: ElementTagProps) => {
  if (draft) {
    return <Tag color="geekblue">In progress</Tag>;
  }
  if (createdAt && differenceInDays(new Date(), createdAt) === 0) {
    return <Tag color="success">Latest</Tag>;
  }
  return null;
};

export default ElementTag;
