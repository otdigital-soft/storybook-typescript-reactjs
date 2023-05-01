import { Skeleton } from 'antd';
import { BoxProps, Flexbox } from 'components/Box';
import { useDetailItems } from 'components/DetailItem';

export interface DetailItemProps<T> {
  label?: string;
  value?: T | null;
  layout?: 'horizontal' | 'vertical';
}

const DetailItem = <T extends string | number | null | undefined>({
  label,
  value,
  formatter,
  layout: propsLayout,
  ...props
}: DetailItemProps<T> & {
  formatter?: (value: NonNullable<T>) => string;
} & BoxProps) => {
  const { loading, layout: contextLayout } = useDetailItems();
  const layout = propsLayout || contextLayout;

  return (
    <Flexbox
      flexDirection={layout === 'vertical' ? 'column' : 'row'}
      gap={layout === 'vertical' ? 0 : 8}
      {...props}
    >
      <strong>
        {label}
        {layout === 'vertical' ? null : ':'}
      </strong>

      {loading ? (
        <Skeleton paragraph={false} />
      ) : (
        <>
          {value === undefined || value === null || value === ''
            ? '-'
            : formatter
            ? formatter(value as NonNullable<T>)
            : value}
        </>
      )}
    </Flexbox>
  );
};

export default DetailItem;
