import DrillshipDetailsModal from 'containers/DrillshipDetailsModal';
import { DRAFT_WIZARD_PAGE_SIZE } from 'consts';
import SelectCardList from 'components/SelectCardList';
import useCreateRigForm from 'containers/CreateRigForm/useCreateRigForm';
import useConceptDrillships from 'containers/CreateRigForm/useConceptDrillships';
import useShowConceptDrillship from './useShowConceptDrillship';

const SelectConceptDrillshipList = () => {
  const {
    data: conceptDrillshipsData,
    error: conceptDrillshipsError,
    isLoading: isLoadingConceptDrillships,
    page,
    setPage,
  } = useConceptDrillships({ pageSize: DRAFT_WIZARD_PAGE_SIZE });
  const {
    data: conceptDrillshipData,
    error: conceptDrillshipError,
    isLoading: isLoadingConceptDrillship,
    conceptDrillshipId,
    setConceptDrillshipId,
  } = useShowConceptDrillship();
  const { onRigSelect } = useCreateRigForm();

  return (
    <>
      <SelectCardList
        page={page}
        pageSize={DRAFT_WIZARD_PAGE_SIZE}
        data={conceptDrillshipsData?.results || []}
        loading={isLoadingConceptDrillships}
        error={!!conceptDrillshipsError}
        onPageChange={setPage}
        count={conceptDrillshipsData?.count || 0}
        onClickDetails={(rig) => setConceptDrillshipId(rig.id)}
        onSelect={(rig) => onRigSelect(rig.id)}
      />
      <DrillshipDetailsModal
        rig={conceptDrillshipData}
        loading={isLoadingConceptDrillship}
        error={!!conceptDrillshipError}
        onClose={() => setConceptDrillshipId(undefined)}
        visible={!!conceptDrillshipId}
        title="Concept rig details"
      />
    </>
  );
};

export default SelectConceptDrillshipList;
