import { DefaultOptionType } from 'rc-select/lib/Select';
import Box, { Flexbox } from 'components/Box';

export const STATUS_OPTIONS: DefaultOptionType[] = [
  {
    value: Number(true),
    label: (
      <Flexbox alignItems="center" gap={4}>
        <Box
          width={16}
          height={16}
          flexShrink={0}
          borderRadius="50%"
          backgroundColor="sunset.3"
        />
        <span>In progress</span>
      </Flexbox>
    ),
  },
  {
    value: Number(false),
    label: (
      <Flexbox alignItems="center" gap={4}>
        <Box
          width={16}
          height={16}
          flexShrink={0}
          borderRadius="50%"
          backgroundColor="turquoise.1"
        />
        <span>Complete</span>
      </Flexbox>
    ),
  },
];
