import { Skeleton } from 'antd';
import Box, { Flexbox } from 'components/Box';
import {
  Card,
  CardHeaderArrowRight,
} from 'components/ElementCard/ElementCard.styled';
import { DraftTypeCardHeader } from './SelectDraftTypeCard.styled';
import { Title } from 'components/Typography';

interface SelectDraftTypeCardProps {
  title: string;
  active?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

const SelectDraftTypeCard = ({
  title,
  active,
  loading,
  disabled,
  onClick,
}: SelectDraftTypeCardProps) => (
  <Card active={active}>
    <DraftTypeCardHeader
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
    >
      {loading ? (
        <Skeleton title={true} active paragraph={false} />
      ) : (
        <>
          <Box marginRight={8} flexGrow={1} width="100%" overflow="hidden">
            <Title level={5} ellipsis>
              {title}
            </Title>
          </Box>
          <Flexbox alignItems="center" gap="8px">
            {disabled ? null : <CardHeaderArrowRight />}
          </Flexbox>
        </>
      )}
    </DraftTypeCardHeader>
  </Card>
);

export default SelectDraftTypeCard;
