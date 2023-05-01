import Box, { BoxProps, Flexbox } from 'components/Box/Box';
import { AddContainer, AddIcon, TitleContainer } from './AddPlaceholder.styled';
import { Title } from 'components/Typography';

interface AddPlaceholderProps extends BoxProps {
  title: string;
  onClick: () => void;
  maxWidth?: number;
}

const AddPlaceholder = ({
  title,
  onClick,
  maxWidth,
  ...boxProps
}: AddPlaceholderProps) => {
  return (
    <AddContainer onClick={onClick} maxWidth={maxWidth} {...boxProps}>
      <Flexbox
        alignItems="center"
        flexGrow={1}
        padding={24}
        position="relative"
      >
        <Box paddingRight={16}>
          <AddIcon />
        </Box>
        <TitleContainer>
          <Title level={5} textAlign="center">
            {title}
          </Title>
        </TitleContainer>
      </Flexbox>
    </AddContainer>
  );
};

export default AddPlaceholder;
