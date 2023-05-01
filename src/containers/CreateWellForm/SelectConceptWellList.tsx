import useConceptWells from 'hooks/useConceptWells';
import { DRAFT_WIZARD_PAGE_SIZE } from 'consts';
import WellDetailsModal from './WellDetailsModal';
import useShowConceptWell from './useShowConceptWell';
import SelectCardList from 'components/SelectCardList';
import useCreateWellForm from 'containers/CreateWellForm/useCreateWellForm';

const SelectConceptWellList = () => {
  const {
    data: conceptWellsData,
    error: conceptWellsError,
    isLoading: isLoadingConceptWells,
    page,
    setPage,
  } = useConceptWells({ pageSize: DRAFT_WIZARD_PAGE_SIZE });
  const {
    data: conceptWellData,
    error: conceptWellError,
    isLoading: isLoadingConceptWell,
    conceptWellId,
    setConceptWellId,
  } = useShowConceptWell();
  const { selectWell } = useCreateWellForm();
  return (
    <>
      <SelectCardList
        page={page}
        pageSize={DRAFT_WIZARD_PAGE_SIZE}
        data={conceptWellsData?.results || []}
        loading={isLoadingConceptWells}
        error={!!conceptWellsError}
        onPageChange={setPage}
        onClickDetails={(well) => setConceptWellId(well.id)}
        onSelect={(well) => selectWell(well.id)}
        count={conceptWellsData?.count || 0}
      />
      <WellDetailsModal
        data={conceptWellData}
        loading={isLoadingConceptWell}
        error={!!conceptWellError}
        onClose={() => setConceptWellId(undefined)}
        visible={!!conceptWellId}
        title="Concept well details"
      />
    </>
  );
};

export default SelectConceptWellList;
