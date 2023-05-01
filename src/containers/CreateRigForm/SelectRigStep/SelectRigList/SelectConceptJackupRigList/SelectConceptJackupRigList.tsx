import SelectCardList from 'components/SelectCardList';
import { DRAFT_WIZARD_PAGE_SIZE } from 'consts';
import useCreateRigForm from 'containers/CreateRigForm/useCreateRigForm';
import JackupRigDetailsModal from 'containers/JackupRigDetailsModal';
import useConceptJackupRigs from '../../../useConceptJackupRigs';
import useShowConceptJakcupRig from './useShowConceptJackupRig';

const SelectConceptJackupRigList = () => {
  const {
    data: conceptJackupRigs,
    error: conceptJackupRigsError,
    isLoading: isConceptJackupRigsLoading,
    page,
    setPage,
  } = useConceptJackupRigs({ pageSize: DRAFT_WIZARD_PAGE_SIZE });
  const {
    data: conceptJackupRig,
    error: conceptJackupRigError,
    isLoading: isConceptJackupRigLoading,
    conceptJackupRigId,
    setConceptJackupRigId,
  } = useShowConceptJakcupRig();
  const { onRigSelect } = useCreateRigForm();

  return (
    <>
      <SelectCardList
        page={page}
        pageSize={DRAFT_WIZARD_PAGE_SIZE}
        data={conceptJackupRigs?.results || []}
        loading={isConceptJackupRigsLoading}
        error={!!conceptJackupRigsError}
        onPageChange={setPage}
        count={conceptJackupRigs?.count || 0}
        onClickDetails={(rig) => setConceptJackupRigId(rig.id)}
        onSelect={(rig) => onRigSelect(rig.id)}
      />
      <JackupRigDetailsModal
        rig={conceptJackupRig}
        loading={isConceptJackupRigLoading}
        error={!!conceptJackupRigError}
        onClose={() => setConceptJackupRigId(undefined)}
        visible={!!conceptJackupRigId}
        title="Concept rig details"
      />
    </>
  );
};

export default SelectConceptJackupRigList;
