import { PlusOutlined } from '@ant-design/icons';
import Box, { Flexbox } from 'components/Box';
import Button from 'components/Button';
import Pagination from 'components/Pagination';
import { usePaginationProvider } from 'components/PaginationProvider';
import { FixedRow } from 'components/Row';
import { StyledTable } from 'components/Table';
import { Title } from 'components/Typography';

import PaginationProvider from 'components/PaginationProvider';
import { LIST_PAGE_SIZE } from 'consts';
import { useAddEditActions } from 'containers/AddEditActionsProvider';
import useMaterialTypes from 'pages/Assets/hooks/useMaterialTypes';
import useMaterialColumns from '../../hooks/useMaterialColumns';
import { AssetListAddEditActionContext } from '../../types';
import AddMaterialTypeDrawer from '../AddMaterialTypeDrawer';
import EditMaterialTypeDrawer from '../EditMaterialTypeDrawer';

const Materials = () => {
  const { changePage, page, pageSize } = usePaginationProvider();
  const {
    isLoading: isLoadingMaterialTypes,
    error: materialTypesError,
    data: materialTypesData,
  } = useMaterialTypes({
    pageSize,
    page,
  });
  const columns = useMaterialColumns();
  const { onAddRow: onAddMaterialType } =
    useAddEditActions<AssetListAddEditActionContext>('materials');

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
            onClick={onAddMaterialType}
            fontWeight={400}
          >
            Add material
          </Button>
        </Box>
      </Flexbox>
      <Box marginTop={7}>
        <StyledTable
          locale={{
            emptyText: materialTypesError
              ? 'Unable to load materials'
              : isLoadingMaterialTypes
              ? 'Loading materials'
              : 'No material added',
          }}
          pagination={false}
          loading={isLoadingMaterialTypes}
          columns={columns}
          dataSource={materialTypesData?.results || []}
          rowKey={(row) => row.id}
          className="ant-table-with-actions"
        />
      </Box>
      <FixedRow paddingX={28} paddingY={21}>
        <Pagination
          current={page}
          pageSize={pageSize}
          hideOnSinglePage={true}
          total={materialTypesData?.count || 0}
          showSizeChanger={false}
          onChange={changePage}
        />
      </FixedRow>
      <AddMaterialTypeDrawer />
      <EditMaterialTypeDrawer />
    </>
  );
};

const DefaultMaterials = () => {
  return (
    <PaginationProvider initialPageSize={LIST_PAGE_SIZE} initialPage={1}>
      <Materials />
    </PaginationProvider>
  );
};

export default DefaultMaterials;
