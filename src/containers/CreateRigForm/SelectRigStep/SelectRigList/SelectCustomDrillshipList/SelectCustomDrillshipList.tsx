import useShowCustomDrillship from './useShowCustomDrillship';
import { DRAFT_WIZARD_PAGE_SIZE } from 'consts';
import SelectCardList from 'components/SelectCardList';
import useCreateRigForm from 'containers/CreateRigForm/useCreateRigForm';
import useCustomDrillships from 'containers/CreateRigForm/useCustomDrillships';
import DrillshipDetailsModal from 'containers/DrillshipDetailsModal';

const SelectCustomDrillshipList = () => {
  const {
    data: customDrillshipData,
    isLoading: isLoadingCustomDrillship,
    error: customDrillshipError,
    customDrillshipId,
    setCustomDrillshipId,
  } = useShowCustomDrillship();
  const {
    data: customDrillshipsData,
    isLoading: isLoadingCustomDrillships,
    error: customDrillshipsError,
    page,
    setPage,
  } = useCustomDrillships({ pageSize: DRAFT_WIZARD_PAGE_SIZE });
  const { onRigSelect } = useCreateRigForm();

  return (
    <>
      <SelectCardList
        page={page}
        pageSize={DRAFT_WIZARD_PAGE_SIZE}
        data={customDrillshipsData?.results || []}
        error={!!customDrillshipsError}
        loading={isLoadingCustomDrillships}
        onPageChange={setPage}
        count={customDrillshipsData?.count || 0}
        onClickDetails={(rig) => setCustomDrillshipId(rig.id)}
        onSelect={(rig) => onRigSelect(rig.id)}
      />
      <DrillshipDetailsModal
        rig={customDrillshipData}
        loading={isLoadingCustomDrillship}
        error={!!customDrillshipError}
        onClose={() => setCustomDrillshipId(undefined)}
        visible={!!customDrillshipId}
        title="Custom rig details"
      />
    </>
  );
};

export default SelectCustomDrillshipList;
