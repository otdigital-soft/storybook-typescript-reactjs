import { PlusOutlined } from '@ant-design/icons';
import Box, { Flexbox } from 'components/Box';
import Button from 'components/Button';
import Pagination from 'components/Pagination';
import PaginationProvider, {
  usePaginationProvider,
} from 'components/PaginationProvider';
import { FixedRow } from 'components/Row';
import { StyledTable } from 'components/Table';
import { Title } from 'components/Typography';
import { LIST_PAGE_SIZE } from 'consts';
import { useAddEditActions } from 'containers/AddEditActionsProvider';
import useHelicopterTypes from 'pages/Assets/hooks/useHelicopterTypes';
import useHelicoptersColumns from '../../hooks/useHelicoptersColumns';
import AddHelicopterTypeDrawer from '../AddHelicopterTypeDrawer';
import EditHelicopterTypeDrawer from '../EditHelicopterTypeDrawer';
import { AssetListAddEditActionContext } from 'pages/Assets/pages/AssetList/types';

const Helicopters = () => {
  const { changePage, page, pageSize } = usePaginationProvider();
  const {
    isLoading: isLoadingHelicopterTypes,
    error: helicopterTypesError,
    data: helicopterTypesData,
  } = useHelicopterTypes({
    pageSize,
    page,
  });
  const columns = useHelicoptersColumns();
  const { onAddRow: onAddHelicopterType } =
    useAddEditActions<AssetListAddEditActionContext>('helicopters');

  return (
    <>
      <Flexbox justifyContent="space-between" alignItems="center">
        <Flexbox flexDirection="column">
          <Title level={5} fontWeight={400}>
            EPA Scope 3 - Indirect
          </Title>
        </Flexbox>
        <Box width={168}>
          <Button
            type="success"
            icon={<PlusOutlined />}
            block
            onClick={onAddHelicopterType}
            fontWeight={400}
          >
            Add helicopter
          </Button>
        </Box>
      </Flexbox>
      <Box marginTop={7}>
        <StyledTable
          locale={{
            emptyText: helicopterTypesError
              ? 'Unable to load helicopters'
              : isLoadingHelicopterTypes
              ? 'Loading helicopters'
              : 'No helicopter added',
          }}
          pagination={false}
          loading={isLoadingHelicopterTypes}
          columns={columns}
          dataSource={helicopterTypesData?.results || []}
          rowKey={(row) => row.id}
          className="ant-table-with-actions"
        />
      </Box>
      <FixedRow paddingX={28} paddingY={21}>
        <Pagination
          current={page}
          pageSize={pageSize}
          hideOnSinglePage={true}
          total={helicopterTypesData?.count || 0}
          showSizeChanger={false}
          onChange={changePage}
        />
      </FixedRow>
      <AddHelicopterTypeDrawer />
      <EditHelicopterTypeDrawer />
    </>
  );
};

const DefaultHelicopters = () => {
  return (
    <PaginationProvider initialPageSize={LIST_PAGE_SIZE} initialPage={1}>
      <Helicopters />
    </PaginationProvider>
  );
};

export default DefaultHelicopters;
