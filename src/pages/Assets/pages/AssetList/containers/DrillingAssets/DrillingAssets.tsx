import { PlusOutlined } from '@ant-design/icons';
import Box, { Flexbox } from 'components/Box';
import Button from 'components/Button';
import Pagination from 'components/Pagination';
import PaginationProvider, {
  usePaginationProvider,
} from 'components/PaginationProvider';
import { FixedRow } from 'components/Row';
import { StyledTable } from 'components/Table';
import { rowClassNames } from 'components/Table/StyledTable';
import { Title } from 'components/Typography';
import { LIST_PAGE_SIZE } from 'consts';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from 'routes';
import useAssets from '../../hooks/useAssets';
import useDrillingAssetsColumns from '../../hooks/useDrillingAssetsColumns';

const DrillingAssets = () => {
  const { changePage, page, pageSize } = usePaginationProvider();
  const {
    isLoading: isLoadingAssets,
    error: assetsError,
    data: assetsData,
  } = useAssets({
    pageSize,
    page,
  });
  const columns = useDrillingAssetsColumns();
  const navigate = useNavigate();

  return (
    <>
      <Flexbox justifyContent="space-between" alignItems="center">
        <Title level={5} fontWeight={400}>
          EPA Scope 1 - Direct
        </Title>
        <Box width={168}>
          <Button
            type="success"
            icon={<PlusOutlined />}
            block
            onClick={() => {
              navigate(routes.createAsset);
            }}
            fontWeight={400}
          >
            Add drilling asset
          </Button>
        </Box>
      </Flexbox>
      <Box marginTop={7}>
        <StyledTable
          onRow={(record) => {
            return {
              onClick: () => {
                navigate(
                  generatePath(routes.updateAsset, {
                    assetId: String(record.id),
                  }),
                );
              },
            };
          }}
          pagination={false}
          locale={{
            emptyText: assetsError
              ? 'Unable to load drilling assets'
              : isLoadingAssets
              ? 'Loading drilling assets'
              : 'No drilling asset added',
          }}
          loading={isLoadingAssets}
          columns={columns}
          dataSource={assetsData?.results || []}
          rowKey={(row) => row.id}
          rowClassName={rowClassNames.cursorPointer}
          className="ant-table-with-actions"
        />
      </Box>
      <FixedRow paddingX={28} paddingY={21}>
        <Pagination
          current={page}
          pageSize={pageSize}
          hideOnSinglePage={true}
          total={assetsData?.count || 0}
          showSizeChanger={false}
          onChange={changePage}
        />
      </FixedRow>
    </>
  );
};

const DefaultDrillingAssets = () => {
  return (
    <PaginationProvider initialPageSize={LIST_PAGE_SIZE} initialPage={1}>
      <DrillingAssets />
    </PaginationProvider>
  );
};

export default DefaultDrillingAssets;
