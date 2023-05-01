import { Spin } from 'antd';
import Center from 'components/Center';
import useMe from 'hooks/useMe';
import { useEffect } from 'react';
import Logger from 'utils/logger';
import Result from 'components/Result';

interface UserProps {
  children: JSX.Element;
}

const User = ({ children }: UserProps) => {
  const { error: meError, isLoading: isLoadingMe, data: meData } = useMe();

  useEffect(() => {
    if (meData) {
      Logger.setUser(meData);
    }
  }, [meData]);

  if (isLoadingMe) {
    return (
      <Center flexGrow={1}>
        <Spin size="large" />
      </Center>
    );
  }

  if (meError) {
    return (
      <Center flexGrow={1}>
        <Result
          status="500"
          title="Unexpected Error"
          subTitle="Sorry, the page you visited cannot be loaded."
        />
      </Center>
    );
  }

  return children;
};

export default User;
