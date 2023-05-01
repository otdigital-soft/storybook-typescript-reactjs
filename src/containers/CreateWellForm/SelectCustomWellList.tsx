import useCustomWells from 'hooks/useCustomWells';
import { DRAFT_WIZARD_PAGE_SIZE } from 'consts';
import useShowCustomWell from './useShowCustomWell';
import WellDetailsModal from './WellDetailsModal';
import SelectCardList from 'components/SelectCardList';
import useCreateWellForm from 'containers/CreateWellForm/useCreateWellForm';

const SelectCustomWellList = () => {
  const {
    data: customWellsData,
    error: customWellsError,
    isLoading: isLoadingCustomWells,
    page,
    changePage,
  } = useCustomWells({ initialPageSize: DRAFT_WIZARD_PAGE_SIZE, draft: false });
  const {
    data: customWellData,
    error: customWellError,
    isLoading: isLoadingCustomWell,
    customWellId,
    setCustomWellId,
  } = useShowCustomWell();
  const { selectWell } = useCreateWellForm();
  return (
    <>
      <SelectCardList
        page={page}
        pageSize={DRAFT_WIZARD_PAGE_SIZE}
        data={
          customWellsData?.results?.map((result) => ({
            ...result,
            name: result.name || '',
          })) || []
        }
        loading={isLoadingCustomWells}
        error={!!customWellsError}
        onPageChange={changePage}
        onClickDetails={(well) => setCustomWellId(well.id)}
        onSelect={(well) => selectWell(well.id)}
        count={customWellsData?.count || 0}
      />
      <WellDetailsModal
        data={customWellData}
        loading={isLoadingCustomWell}
        error={!!customWellError}
        onClose={() => setCustomWellId(undefined)}
        visible={!!customWellId}
        title="Custom well details"
      />
    </>
  );
};

export default SelectCustomWellList;
