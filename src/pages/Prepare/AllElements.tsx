import Box from 'components/Box';
import AllProjects from 'pages/Prepare/AllProjects';
import AllWells from './AllWells';
import AllRigs from './AllRigs';

const AllElements = () => {
  return (
    <>
      <AllProjects />
      <Box marginTop={40}>
        <AllWells />
      </Box>
      <Box marginTop={40}>
        <AllRigs />
      </Box>
    </>
  );
};

export default AllElements;
