import Center from 'components/Center';
import Result from 'components/Result';

const NoMatch = () => {
  return (
    <Center flexGrow={1}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
      />
    </Center>
  );
};

export default NoMatch;
