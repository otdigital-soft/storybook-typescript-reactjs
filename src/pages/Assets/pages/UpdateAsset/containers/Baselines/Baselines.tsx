import Box, { Flexbox } from 'components/Box';
import { Title } from 'components/Typography';
import Button from 'components/Button';
import { PlusOutlined } from '@ant-design/icons';
import useAssetId from 'pages/Assets/hooks/useAssetId';
import useBaselinesColumns from '../../hooks/useBaselinesColumns';
import { TableRowSelection } from 'antd/lib/table/interface';
import ActiveTable from 'pages/Assets/pages/UpdateAsset/components/ActiveTable';
import useAsset from 'pages/Assets/pages/UpdateAsset/hooks/useAsset';
import { Baseline } from 'api/schema';
import AddBaselineDrawer from 'pages/Assets/pages/UpdateAsset/containers/AddBaselineDrawer';
import EditBaselineDrawer from 'pages/Assets/pages/UpdateAsset/containers/EditBaselineDrawer';
import { useAddEditActions } from 'containers/AddEditActionsProvider';
import useActivateBaseline from 'pages/Assets/pages/UpdateAsset/hooks/useActivateBaseline';
import { UpdateAssetAddEditActionContext } from 'pages/Assets/pages/UpdateAsset/types';

const Baselines = () => {
  const assetId = useAssetId();
  const { data: assetData } = useAsset(assetId);
  const baselines = assetData?.baselines || [];
  const columns = useBaselinesColumns();
  const { onAddRow: onAddBaseline } =
    useAddEditActions<UpdateAssetAddEditActionContext>('baselines');
  const { onActivateBaseline, isActivatingBaseline } =
    useActivateBaseline(assetId);
  const rowSelection: TableRowSelection<Baseline> = {
    type: 'radio',
    selectedRowKeys:
      baselines
        .filter((baseline) => baseline.active)
        .map((baseline) => baseline.id) || [],
    getCheckboxProps: (record) => ({
      disabled: record.draft || isActivatingBaseline,
    }),
    columnTitle: 'Active',
    onSelect: (baseline) => onActivateBaseline(baseline),
  };

  return (
    <>
      <Flexbox justifyContent="space-between" alignItems="center">
        <Title level={4}>Baselines</Title>
        <Flexbox gap={8}>
          <Box width={168}>
            <Button
              type="success"
              icon={<PlusOutlined />}
              block
              onClick={onAddBaseline}
              fontWeight={400}
            >
              Add baseline
            </Button>
          </Box>
        </Flexbox>
      </Flexbox>
      <Box marginTop={10}>
        <ActiveTable
          pagination={false}
          rowSelection={rowSelection}
          locale={{
            emptyText: 'No baseline added',
          }}
          columns={columns}
          dataSource={baselines}
          rowKey={(row) => row.id}
          className="ant-table-with-actions"
        />
      </Box>
      <AddBaselineDrawer />
      <EditBaselineDrawer />
    </>
  );
};

export default Baselines;
