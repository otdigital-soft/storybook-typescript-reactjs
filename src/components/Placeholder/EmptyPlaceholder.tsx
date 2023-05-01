import { BoxProps } from 'components/Box/Box';
import { Container } from './Placeholder.styled';
import { Title } from 'components/Typography';

interface EmptyPlaceholderProps extends BoxProps {
  title: string;
}

const EmptyPlaceholder = ({ title, ...boxProps }: EmptyPlaceholderProps) => {
  return (
    <Container {...boxProps}>
      <Title level={5}>{title}</Title>
    </Container>
  );
};

export default EmptyPlaceholder;
