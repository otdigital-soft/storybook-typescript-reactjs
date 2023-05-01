import JackupRigDetailsModal from 'containers/JackupRigDetailsModal';
import useCustomJackupRigs from '../../../useCustomJackupRigs';
import useShowCustomJackupRig from './useShowCustomJackupRig';
import { DRAFT_WIZARD_PAGE_SIZE } from 'consts';
import useCreateRigForm from 'containers/CreateRigForm/useCreateRigForm';
import SelectCardList from 'components/SelectCardList';

const SelectCustomJackupRigList = () => {
  const {
    data: customJackupRig,
    isLoading: isCustomJackupRigLoading,
    error: customJackupRigError,
    customJackupRigId,
    setCustomJackupRigId,
  } = useShowCustomJackupRig();
  const {
    data: customJackupRigs,
    isLoading: isCustomJackupRigsLoading,
    error: customJackupRigsError,
    page,
    setPage,
  } = useCustomJackupRigs({ pageSize: DRAFT_WIZARD_PAGE_SIZE });
  const { onRigSelect } = useCreateRigForm();

  return (
    <>
      <SelectCardList
        page={page}
        pageSize={DRAFT_WIZARD_PAGE_SIZE}
        data={customJackupRigs?.results || []}
        error={!!customJackupRigsError}
        loading={isCustomJackupRigsLoading}
        onPageChange={setPage}
        onClickDetails={(rig) => setCustomJackupRigId(rig.id)}
        onSelect={(rig) => onRigSelect(rig.id)}
        count={customJackupRigs?.count || 0}
      />
      <JackupRigDetailsModal
        rig={customJackupRig}
        loading={isCustomJackupRigLoading}
        error={!!customJackupRigError}
        onClose={() => setCustomJackupRigId(undefined)}
        visible={!!customJackupRigId}
        title="Custom rig details"
      />
    </>
  );
};

export default SelectCustomJackupRigList;
