import { PlusOutlined } from '@ant-design/icons';
import Box, { Flexbox } from 'components/Box';
import Button from 'components/Button';
import { Title } from 'components/Typography';
import { useAddEditActions } from 'containers/AddEditActionsProvider';
import AddPlanHelicopterDrawer from 'pages/Wells/pages/WellPlanning/containers/AddPlannedHelicopterDrawer';
import EditPlanHelicopterDrawer from 'pages/Wells/pages/WellPlanning/containers/EditPlannedHelicopterDrawer';
import { WellPlanningAddEditActionContext } from 'pages/WellPlan/pages/UpdateWellPlanPlanning/types';
import useCanEdit from 'pages/WellPlan/hooks/useCanEdit';
import { CurrentStepEnum, PlannedHelicopterUseList } from 'api/schema';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import useHelicopterListTableProps from 'pages/Wells/hooks/useHelicopterListTableProps';
import { StyledTable } from 'components/Table';
import useDeletePlannedHelicopter from '../../hooks/useDeletePlannedHelicopter';
import useHelicopterListColumns from 'pages/Wells/hooks/useHelicopterListColumns';

const PlannedHelicopterList = () => {
  const {
    onAddRow: onAddHelicopter,
    onUnselectRow: onUnselectHelicopter,
    onEditRow: onEditHelicopter,
  } = useAddEditActions<WellPlanningAddEditActionContext>('helicopters');
  const canEdit = useCanEdit(CurrentStepEnum.WELL_PLANNING);
  const { data: wellPlanData, wellPlanId } = useCurrentWellPlan();
  const helicopters = wellPlanData?.planned_helicopter_uses || [];
  const { onDeletePlannedHelicopter } = useDeletePlannedHelicopter(wellPlanId);
  const onDeleteHelicopter = (helicopterUse: PlannedHelicopterUseList) => {
    onDeletePlannedHelicopter({
      helicopterUseId: helicopterUse.id,
      helicopterType: helicopterUse.helicopter_type.type,
      onDelete: () => {
        onUnselectHelicopter(helicopterUse.id);
      },
    });
  };
  const helicopterListColumns =
    useHelicopterListColumns<PlannedHelicopterUseList>({
      editable: canEdit,
      onDeleteHelicopter,
      onEditHelicopter,
    });
  const plannedHelicoptersTableProps = useHelicopterListTableProps<
    PlannedHelicopterUseList,
    WellPlanningAddEditActionContext
  >({
    context: 'helicopters',
    rowSelection: false,
  });

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
              disabled={!canEdit}
              onClick={onAddHelicopter}
              fontWeight={400}
            >
              Add helicopter
            </Button>
          </Box>
        </Flexbox>
      </Flexbox>
      <Box marginTop={11}>
        <StyledTable<PlannedHelicopterUseList>
          dataSource={helicopters}
          columns={helicopterListColumns}
          {...plannedHelicoptersTableProps}
        />
      </Box>
      <AddPlanHelicopterDrawer />
      <EditPlanHelicopterDrawer />
    </>
  );
};

export default PlannedHelicopterList;
