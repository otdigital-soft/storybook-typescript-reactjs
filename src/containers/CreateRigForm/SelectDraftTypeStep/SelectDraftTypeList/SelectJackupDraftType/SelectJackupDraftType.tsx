import useConceptJackupRigs from '../../../useConceptJackupRigs';
import useCustomJackupRigs from '../../../useCustomJackupRigs';
import SelectDraftTypeList from '..';

const SelectJackupDraftType = () => {
  const { data: customJackupRigs, isLoading: isCustomJackupRigsLoading } =
    useCustomJackupRigs({ pageSize: 1 });
  const { data: conceptJackupRigs, isLoading: isConceptJackupRigsLoading } =
    useConceptJackupRigs({ pageSize: 1 });

  return (
    <SelectDraftTypeList
      customCount={customJackupRigs?.count || 0}
      conceptCount={conceptJackupRigs?.count || 0}
      loading={isCustomJackupRigsLoading || isConceptJackupRigsLoading}
    />
  );
};

export default SelectJackupDraftType;
