import HorizontalBar, {
  Separator,
  Bar,
  HorizontalBarTitle,
} from 'pages/WellPlan/components/HorizontalBar';
import { useTheme } from 'styled-components';
import { formatDuration } from 'pages/WellPlan/utils/duration';
import { calculateTotalPercentage } from 'utils/math';

interface ExpandedRowDurationHorizontalBarProps {
  duration: number;
  improvedDuration: number;
}

const ExpandedRowDurationHorizontalBar = ({
  improvedDuration,
  duration,
}: ExpandedRowDurationHorizontalBarProps) => {
  const { colors } = useTheme();
  const savedDuration = duration - improvedDuration;

  return (
    <HorizontalBar>
      <Bar
        width={calculateTotalPercentage(improvedDuration, duration)}
        backgroundColor="turquoise.7"
        title={
          <HorizontalBarTitle
            title="Improved duration"
            description={formatDuration(improvedDuration)}
          />
        }
      />
      <Separator borderStyle="solid" borderColor={colors.deepOcean[1]} />
      {savedDuration ? (
        <>
          <Bar
            width={calculateTotalPercentage(savedDuration, duration)}
            backgroundColor="gray.4"
            title={
              <HorizontalBarTitle
                title="Saved duration"
                description={formatDuration(savedDuration)}
              />
            }
          />
          <Separator borderStyle="solid" borderColor={colors.blue[7]} />
        </>
      ) : null}
    </HorizontalBar>
  );
};

export default ExpandedRowDurationHorizontalBar;
