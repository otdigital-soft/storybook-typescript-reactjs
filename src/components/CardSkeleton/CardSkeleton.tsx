import { Col, Row } from 'antd';
import ElementCard from 'components/ElementCard';
import { Gutter } from 'antd/lib/grid/row';

interface CardSkeletonProps {
  gutter?: Gutter | [Gutter, Gutter];
  span?: number | string;
  numElements: number;
}

const CardSkeleton = ({ gutter, span, numElements }: CardSkeletonProps) => {
  return (
    <Row gutter={gutter}>
      {new Array(numElements).fill(null).map((_, index) => (
        <Col span={span} key={index}>
          <ElementCard loading={true} />
        </Col>
      ))}
    </Row>
  );
};

export default CardSkeleton;
