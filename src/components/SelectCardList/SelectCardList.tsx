import { Button, Col, Pagination, Row } from 'antd';
import { Flexbox } from 'components/Box';
import CardSkeleton from 'components/CardSkeleton';
import ElementCard from 'components/ElementCard';
import Result from 'components/Result';
import { parseISO } from 'date-fns';

interface SelectCardListProps<T> {
  data: T[];
  page: number;
  pageSize: number;
  loading: boolean;
  error: boolean;
  onPageChange: (page: number) => void;
  onClickDetails: (item: T) => void;
  onSelect: (item: T) => void;
  count: number;
}

const SelectCardList = <
  T extends { id: number; name: string; updated_at: string },
>({
  data,
  page,
  loading,
  error,
  pageSize,
  onClickDetails,
  onPageChange,
  count,
  onSelect,
}: SelectCardListProps<T>) => {
  if (loading) {
    return <CardSkeleton gutter={[24, 18]} span={24} numElements={3} />;
  }

  if (error) {
    return <Result status="error" subTitle="Unable to load data" />;
  }

  return (
    <>
      <Row gutter={[24, 18]}>
        <>
          {data.map((item) => (
            <Col span={24} key={item.id}>
              <ElementCard
                title={item.name}
                updatedAt={parseISO(item.updated_at)}
                onClick={() => onSelect(item)}
                extraActions={
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClickDetails(item);
                    }}
                  >
                    Details
                  </Button>
                }
              />
            </Col>
          ))}
        </>
      </Row>
      <Flexbox marginTop={18} justifyContent="flex-end">
        <Pagination
          current={page}
          pageSize={pageSize}
          total={count}
          onChange={onPageChange}
          hideOnSinglePage
          showSizeChanger={false}
        />
      </Flexbox>
    </>
  );
};

export default SelectCardList;
