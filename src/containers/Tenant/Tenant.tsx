import useTenant from 'hooks/useTenant';
import { Spin } from 'antd';
import { isNotFoundError } from 'utils/api';
import Center from 'components/Center';
import Result from 'components/Result';

interface TenantProps {
  children: JSX.Element;
}

const Tenant = ({ children }: TenantProps) => {
  const { error: tenantError, isLoading: isLoadingTenant } = useTenant();

  if (isLoadingTenant) {
    return (
      <Center flexGrow={1}>
        <Spin size="large" />
      </Center>
    );
  }

  if (tenantError) {
    if (isNotFoundError(tenantError)) {
      return (
        <Center flexGrow={1}>
          <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
          />
        </Center>
      );
    }
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

export default Tenant;
