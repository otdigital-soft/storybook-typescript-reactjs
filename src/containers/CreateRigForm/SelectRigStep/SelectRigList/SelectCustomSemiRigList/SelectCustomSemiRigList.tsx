import SemiRigDetailsModal from 'containers/SemiRigDetailsModal';
import useCustomSemiRigs from '../../../useCustomSemiRigs';
import useShowCustomSemiRig from './useShowCustomSemiRig';
import { DRAFT_WIZARD_PAGE_SIZE } from 'consts';
import SelectCardList from 'components/SelectCardList';
import useCreateRigForm from 'containers/CreateRigForm/useCreateRigForm';

const SelectCustomSemiRigList = () => {
  const {
    data: customSemiRig,
    isLoading: isCustomSemiRigLoading,
    error: customSemiRigError,
    customSemiRigId,
    setCustomSemiRigId,
  } = useShowCustomSemiRig();
  const {
    data: customSemiRigs,
    isLoading: isCustomSemiRigsLoading,
    error: customSemiRigsError,
    page,
    setPage,
  } = useCustomSemiRigs({ pageSize: DRAFT_WIZARD_PAGE_SIZE });
  const { onRigSelect } = useCreateRigForm();

  return (
    <>
      <SelectCardList
        page={page}
        pageSize={DRAFT_WIZARD_PAGE_SIZE}
        data={customSemiRigs?.results || []}
        error={!!customSemiRigsError}
        loading={isCustomSemiRigsLoading}
        onPageChange={setPage}
        count={customSemiRigs?.count || 0}
        onClickDetails={(rig) => setCustomSemiRigId(rig.id)}
        onSelect={(rig) => onRigSelect(rig.id)}
      />
      <SemiRigDetailsModal
        rig={customSemiRig}
        loading={isCustomSemiRigLoading}
        error={!!customSemiRigError}
        onClose={() => setCustomSemiRigId(undefined)}
        visible={!!customSemiRigId}
        title="Custom rig details"
      />
    </>
  );
};

export default SelectCustomSemiRigList;
