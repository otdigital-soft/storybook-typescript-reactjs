import SemiRigDetailsModal from 'containers/SemiRigDetailsModal';
import useConceptSemiRigs from '../../../useConceptSemiRigs';
import useShowConceptSemiRig from './useShowConceptSemiRig';
import { DRAFT_WIZARD_PAGE_SIZE } from 'consts';
import SelectCardList from 'components/SelectCardList';
import useCreateRigForm from 'containers/CreateRigForm/useCreateRigForm';

const SelectConceptSemiRigList = () => {
  const {
    data: conceptSemiRigs,
    error: conceptSemiRigsError,
    isLoading: isConceptSemiRigsLoading,
    page,
    setPage,
  } = useConceptSemiRigs({ pageSize: DRAFT_WIZARD_PAGE_SIZE });
  const {
    data: conceptSemiRig,
    error: conceptSemiRigError,
    isLoading: isConceptSemiRigLoading,
    conceptSemiRigId,
    setConceptSemiRigId,
  } = useShowConceptSemiRig();
  const { onRigSelect } = useCreateRigForm();

  return (
    <>
      <SelectCardList
        page={page}
        pageSize={DRAFT_WIZARD_PAGE_SIZE}
        data={conceptSemiRigs?.results || []}
        loading={isConceptSemiRigsLoading}
        error={!!conceptSemiRigsError}
        onPageChange={setPage}
        count={conceptSemiRigs?.count || 0}
        onClickDetails={(rig) => setConceptSemiRigId(rig.id)}
        onSelect={(rig) => onRigSelect(rig.id)}
      />
      <SemiRigDetailsModal
        rig={conceptSemiRig}
        loading={isConceptSemiRigLoading}
        error={!!conceptSemiRigError}
        onClose={() => setConceptSemiRigId(undefined)}
        visible={!!conceptSemiRigId}
        title="Concept rig details"
      />
    </>
  );
};

export default SelectConceptSemiRigList;
