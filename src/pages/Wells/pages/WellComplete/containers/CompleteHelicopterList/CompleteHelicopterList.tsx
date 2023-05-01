import { CheckOutlined, PlusOutlined } from '@ant-design/icons';
import Box, { Flexbox } from 'components/Box';
import Button from 'components/Button';
import { Title } from 'components/Typography';
import { useAddEditActions } from 'containers/AddEditActionsProvider';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import AddCompleteHelicopterDrawer from 'pages/Wells/pages/WellComplete/containers/AddCompleteHelicopterDrawer';
import EditCompleteHelicopterDrawer from 'pages/Wells/pages/WellComplete/containers/EditCompleteHelicopterDrawer';
import { WellCompleteAddEditActionContext } from 'pages/WellPlan/pages/UpdateWellCompletePlan/types';
import useCanEdit from 'pages/WellPlan/hooks/useCanEdit';
import { CompleteHelicopterUseList, CurrentStepEnum } from 'api/schema';
import useHelicopterListTableProps from 'pages/Wells/hooks/useHelicopterListTableProps';
import { StyledTable } from 'components/Table';
import useDeleteCompleteHelicopter from '../../hooks/useDeleteCompleteHelicopter';
import useApproveCompleteHelicopter from 'pages/Wells/pages/WellComplete/hooks/useApproveCompleteHelicopter';
import useHelicopterListColumns from 'pages/Wells/hooks/useHelicopterListColumns';

const CompleteHelicopterList = () => {
  const {
    onAddRow: onAddHelicopter,
    selectedRows: selectedHelicopterIds,
    setSelectedRows: setSelectedHelicopterIds,
    onEditRow: onEditHelicopter,
    onUnselectRow: onUnselectHelicopter,
  } = useAddEditActions<WellCompleteAddEditActionContext>('helicopters');
  const { data: wellPlanData, wellPlanId } = useCurrentWellPlan();
  const helicopters = wellPlanData?.complete_helicopter_uses || [];
  const selectedHelicopters = helicopters.filter((helicopter) =>
    selectedHelicopterIds.includes(helicopter.id),
  );
  const canEdit = useCanEdit(CurrentStepEnum.WELL_REVIEWING);
  const { onDeleteCompleteHelicopter } =
    useDeleteCompleteHelicopter(wellPlanId);
  const onDeleteHelicopter = (helicopterUse: CompleteHelicopterUseList) => {
    onDeleteCompleteHelicopter({
      helicopterUseId: helicopterUse.id,
      helicopterType: helicopterUse.helicopter_type.type,
      onDelete: () => {
        onUnselectHelicopter(helicopterUse.id);
      },
    });
  };
  const { mutate: onApproveHelicopter, isLoading: isApprovingHelicopter } =
    useApproveCompleteHelicopter(wellPlanId);
  const helicopterListColumns =
    useHelicopterListColumns<CompleteHelicopterUseList>({
      editable: canEdit,
      onDeleteHelicopter,
      onEditHelicopter,
      extraActions: [
        {
          key: 'approve',
          menuItemProps: ({ id, helicopter_type: { type }, approved }) => ({
            children: 'Approve',
            disabled: approved || !canEdit,
            onClick: () =>
              onApproveHelicopter({
                helicopterTypes: [type],
                helicopterUseIds: [id],
              }),
          }),
        },
      ],
    });
  const completeHelicoptersTableProps = useHelicopterListTableProps<
    CompleteHelicopterUseList,
    WellCompleteAddEditActionContext
  >({
    context: 'helicopters',
    rowSelection: true,
  });
  const canApprove = !(
    !selectedHelicopters?.length ||
    isApprovingHelicopter ||
    !canEdit
  );

  return (
    <>
      <Flexbox justifyContent="space-between" alignItems="center">
        <Title level={4}>Helicopters</Title>
        <Flexbox gap={8}>
          <Box width={168}>
            <Button
              type="success"
              icon={<PlusOutlined />}
              block
              onClick={onAddHelicopter}
              disabled={!canEdit}
              fontWeight={400}
            >
              Add helicopter
            </Button>
          </Box>
          <Box width={168}>
            <Button
              type="success"
              icon={<CheckOutlined />}
              disabled={!canApprove}
              block
              fontWeight={400}
              onClick={() => {
                if (selectedHelicopters?.length) {
                  onApproveHelicopter({
                    helicopterTypes: selectedHelicopters.map(
                      (helicopter) => helicopter.helicopter_type.type,
                    ),
                    helicopterUseIds: selectedHelicopters.map(
                      (helicopter) => helicopter.id,
                    ),
                    onSuccess: () => setSelectedHelicopterIds([]),
                  });
                }
              }}
            >
              Approve
            </Button>
          </Box>
        </Flexbox>
      </Flexbox>
      <Box marginTop={11}>
        <StyledTable<CompleteHelicopterUseList>
          dataSource={helicopters}
          columns={helicopterListColumns}
          {...completeHelicoptersTableProps}
        />
      </Box>
      <AddCompleteHelicopterDrawer />
      <EditCompleteHelicopterDrawer />
    </>
  );
};

export default CompleteHelicopterList;
