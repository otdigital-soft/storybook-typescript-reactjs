import Box, { Flexbox } from 'components/Box';
import Divider from 'components/Divider';
import PageHeaderExtra from 'containers/PageHeaderExtra';

interface PageHeaderExtraActionsProps {
  children: JSX.Element;
}

const PageHeaderExtraActions = ({ children }: PageHeaderExtraActionsProps) => {
  return (
    <Flexbox>
      <Flexbox gap={8}>{children}</Flexbox>
      <Box marginLeft={8} marginRight={6}>
        <Divider type="vertical" height="100%" />
      </Box>
      <PageHeaderExtra />
    </Flexbox>
  );
};

export default PageHeaderExtraActions;
