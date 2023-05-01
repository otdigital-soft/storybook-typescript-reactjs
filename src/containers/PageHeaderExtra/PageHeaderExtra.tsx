import Box, { Flexbox } from 'components/Box';
import NotificationMenu from 'containers/NotificationMenu';
import Search from 'containers/PageHeaderExtra/Search';

const PageHeaderExtra = () => {
  return (
    <Flexbox alignItems="flex-end">
      <Flexbox>
        <Box marginTop={8} marginRight={24}>
          <NotificationMenu />
        </Box>
        <Search />
      </Flexbox>
    </Flexbox>
  );
};

export default PageHeaderExtra;
