import SelectDraftTypeList from '..';
import useCustomSemiRigs from '../../../useCustomSemiRigs';
import useConceptSemiRigs from '../../../useConceptSemiRigs';

const SelectSemiDraftType = () => {
  const { data: customSemiRigs, isLoading: isCustomSemiRigsLoading } =
    useCustomSemiRigs({ pageSize: 1 });
  const { data: conceptSemiRigs, isLoading: isConceptSemiRigsLoading } =
    useConceptSemiRigs({ pageSize: 1 });

  return (
    <SelectDraftTypeList
      customCount={customSemiRigs?.count || 0}
      conceptCount={conceptSemiRigs?.count || 0}
      loading={isCustomSemiRigsLoading || isConceptSemiRigsLoading}
    />
  );
};

export default SelectSemiDraftType;
