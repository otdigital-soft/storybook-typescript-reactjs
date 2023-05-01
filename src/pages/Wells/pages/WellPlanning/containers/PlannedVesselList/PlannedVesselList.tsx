import { PlusOutlined } from '@ant-design/icons';
import Box, { Flexbox } from 'components/Box';
import Button from 'components/Button';
import { Title } from 'components/Typography';
import { useAddEditActions } from 'containers/AddEditActionsProvider';
import { WellPlanningAddEditActionContext } from 'pages/WellPlan/pages/UpdateWellPlanPlanning/types';
import useCanEdit from 'pages/WellPlan/hooks/useCanEdit';
import { CurrentStepEnum, PlannedVesselUseList } from 'api/schema';
import EditPlannedVesselDrawer from 'pages/Wells/pages/WellPlanning/containers/EditPlannedVesselDrawer';
import AddPlannedVesselDrawer from 'pages/Wells/pages/WellPlanning/containers/AddPlannedVesselDrawer';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import useDeletePlannedVessel from 'pages/Wells/pages/WellPlanning/hooks/useDeletePlannedVessel';
import useVesselListColumns from 'pages/Wells/hooks/useVesselListColumns';
import useVesselListTableProps from 'pages/Wells/hooks/useVesselListTableProps';
import { StyledTable } from 'components/Table';

const PlannedVesselList = () => {
  const { onAddRow: onAddVessel } =
    useAddEditActions<WellPlanningAddEditActionContext>('vessels');
  const canEdit = useCanEdit(CurrentStepEnum.WELL_PLANNING);
  const { data: wellPlanData, wellPlanId } = useCurrentWellPlan();
  const { onUnselectRow: onUnselectVesselUse } =
    useAddEditActions<WellPlanningAddEditActionContext>('vessels');
  const vessels = wellPlanData?.planned_vessel_uses || [];
  const { onDeletePlannedVessel } = useDeletePlannedVessel(wellPlanId);
  const onDelete = (vesselUse: PlannedVesselUseList) => {
    onDeletePlannedVessel({
      vesselUseId: vesselUse.id,
      vesselType: vesselUse.vessel_type.type,
      onDelete: () => {
        onUnselectVesselUse(vesselUse.id);
      },
    });
  };
  const vesselListColumns = useVesselListColumns<PlannedVesselUseList>();
  const vesselUseTableProps = useVesselListTableProps<
    PlannedVesselUseList,
    WellPlanningAddEditActionContext
  >({
    onDeleteVesselUse: onDelete,
    context: 'vessels',
    editable: canEdit,
    columns: vesselListColumns,
  });

  return (
    <>
      <Flexbox justifyContent="space-between" alignItems="center">
        <Title level={4}>Vessels</Title>
        <Flexbox gap={8}>
          <Box width={168}>
            <Button
              type="success"
              icon={<PlusOutlined />}
              block
              disabled={!canEdit}
              onClick={onAddVessel}
              fontWeight={400}
            >
              Add vessel
            </Button>
          </Box>
        </Flexbox>
      </Flexbox>
      <Box marginTop={11}>
        <StyledTable<PlannedVesselUseList>
          dataSource={vessels}
          {...vesselUseTableProps}
        />
      </Box>
      <AddPlannedVesselDrawer />
      <EditPlannedVesselDrawer />
    </>
  );
};

export default PlannedVesselList;
