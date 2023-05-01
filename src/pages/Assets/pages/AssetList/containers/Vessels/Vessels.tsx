import Box, { Flexbox } from 'components/Box';
import { Title } from 'components/Typography';
import Button from 'components/Button';
import { PlusOutlined } from '@ant-design/icons';
import { StyledTable } from 'components/Table';
import useVesselTypes from 'pages/Assets/hooks/useVesselTypes';
import useVesselsColumns from '../../hooks/useVesselsColumns';
import { useAddEditActions } from 'containers/AddEditActionsProvider';
import AddVesselTypeDrawer from '../AddVesselTypeDrawer';
import EditVesselTypeDrawer from '../EditVesselTypeDrawer';
import PaginationProvider, {
  usePaginationProvider,
} from 'components/PaginationProvider';
import Pagination from 'components/Pagination';
import { FixedRow } from 'components/Row';
import { LIST_PAGE_SIZE } from 'consts';
import { AssetListAddEditActionContext } from 'pages/Assets/pages/AssetList/types';

const Vessels = () => {
  const { changePage, page, pageSize } = usePaginationProvider();
  const {
    isLoading: isLoadingVesselTypes,
    error: vesselTypesError,
    data: vesselTypesData,
  } = useVesselTypes({
    pageSize,
    page,
  });
  const columns = useVesselsColumns();
  const { onAddRow: onAddVesselType } =
    useAddEditActions<AssetListAddEditActionContext>('vessels');

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
            onClick={onAddVesselType}
            fontWeight={400}
          >
            Add vessel
          </Button>
        </Box>
      </Flexbox>
      <Box marginTop={7}>
        <StyledTable
          locale={{
            emptyText: vesselTypesError
              ? 'Unable to load vessels'
              : isLoadingVesselTypes
              ? 'Loading vessels'
              : 'No vessel added',
          }}
          pagination={false}
          loading={isLoadingVesselTypes}
          columns={columns}
          dataSource={vesselTypesData?.results || []}
          rowKey={(row) => row.id}
          className="ant-table-with-actions"
        />
      </Box>
      <FixedRow paddingX={28} paddingY={21}>
        <Pagination
          current={page}
          pageSize={pageSize}
          hideOnSinglePage={true}
          total={vesselTypesData?.count || 0}
          showSizeChanger={false}
          onChange={changePage}
        />
      </FixedRow>
      <AddVesselTypeDrawer />
      <EditVesselTypeDrawer />
    </>
  );
};

const DefaultVessels = () => {
  return (
    <PaginationProvider initialPageSize={LIST_PAGE_SIZE} initialPage={1}>
      <Vessels />
    </PaginationProvider>
  );
};

export default DefaultVessels;
