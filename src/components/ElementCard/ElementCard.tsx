import Box, { Flexbox, BoxProps } from 'components/Box/Box';
import { Paragraph, Text, Title } from 'components/Typography';
import {
  Card,
  CardBody,
  CardFooter,
  CardFooterUpdatedAtIcon,
  CardHeader,
  CardHeaderArrowRight,
  CardHeaderIcon,
  CardHeaderColor,
  TagContainer,
} from './ElementCard.styled';
import format from 'date-fns/format';
import { Skeleton } from 'antd';
import { EllipsisConfig } from 'antd/lib/typography/Base';
import { ReactElement } from 'react';
import { DATE_FORMAT_SHORT } from 'consts';

export interface ElementCardProps extends BoxProps {
  title?: string;
  description?: string;
  icon?: JSX.Element;
  onClick?: () => void;
  updatedAt?: Date;
  loading?: boolean;
  cardColor?: string;
  ellipsis?: EllipsisConfig;
  tag?: JSX.Element;
  active?: boolean;
  extraActions?: ReactElement;
}

const ElementCard = ({
  title,
  icon,
  onClick,
  updatedAt,
  description,
  loading,
  cardColor,
  ellipsis,
  tag,
  active,
  extraActions,
  ...boxProps
}: ElementCardProps) => {
  return (
    <Card {...boxProps} active={active}>
      {tag ? <TagContainer>{tag}</TagContainer> : null}
      <CardHeader onClick={onClick}>
        {loading ? (
          <Skeleton title={true} active paragraph={false} />
        ) : (
          <>
            {cardColor ? <CardHeaderColor color={cardColor} /> : null}
            {icon ? <CardHeaderIcon>{icon}</CardHeaderIcon> : null}
            <Box
              marginLeft={icon ? 8 : 0}
              marginRight={onClick ? 8 : 0}
              flexGrow={1}
              width="100%"
              overflow="hidden"
            >
              <Title level={5} ellipsis>
                {title}
              </Title>
            </Box>
            <Flexbox alignItems="center" gap="8px">
              {extraActions}
              {onClick ? <CardHeaderArrowRight color={cardColor} /> : null}
            </Flexbox>
          </>
        )}
      </CardHeader>
      {description || loading ? (
        <CardBody>
          {loading ? (
            <Skeleton
              active
              paragraph={{ rows: ellipsis?.rows || 1 }}
              title={false}
            />
          ) : (
            <Paragraph ellipsis={ellipsis} margin={0}>
              {description}
            </Paragraph>
          )}
        </CardBody>
      ) : null}
      {updatedAt || loading ? (
        <CardFooter>
          {loading ? (
            <Skeleton title={{ width: 100 }} active paragraph={false} />
          ) : (
            <>
              <CardFooterUpdatedAtIcon title="Last update at" />
              <Box marginLeft="8px" flexGrow={1} width="100%">
                <Text title="Last update at">
                  {updatedAt ? format(updatedAt, DATE_FORMAT_SHORT) : undefined}
                </Text>
              </Box>
            </>
          )}
        </CardFooter>
      ) : null}
    </Card>
  );
};

export default ElementCard;
