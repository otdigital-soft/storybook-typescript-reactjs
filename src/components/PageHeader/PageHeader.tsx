import styled from 'styled-components';
import { BreadcrumbProps, PageHeader as AntdPageHeader } from 'antd';
import { Link } from 'react-router-dom';
import { normalizeValue } from 'utils/style';

export const defaultBreadcrumbItemRender: BreadcrumbProps['itemRender'] = (
  route,
  params,
  routes,
) => {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <Link to={route.path}>{route.breadcrumbName}</Link>
  );
};

const PageHeader = styled(AntdPageHeader)<{ pX?: number | string }>`
  & {
    ${({ pX }) =>
      pX !== undefined
        ? `padding-left: ${normalizeValue(pX)}; padding-right: ${normalizeValue(
            pX,
          )};`
        : undefined}
  }
  .ant-page-header-heading-left {
    margin: 0;
  }
  .ant-page-header-heading-extra {
    margin: 0;
  }
  .ant-breadcrumb > span:last-child {
    font-weight: 600;
  }
  .ant-page-header-back {
    font-size: 24px;
    margin-right: 12px;
  }
`;

export default PageHeader;
