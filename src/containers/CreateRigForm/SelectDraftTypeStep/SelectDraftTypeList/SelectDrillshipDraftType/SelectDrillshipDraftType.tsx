import SelectDraftTypeList from '..';
import useCustomDrillships from '../../../useCustomDrillships';
import useConceptDrillships from '../../../useConceptDrillships';

const SelectDrillshipDraftType = () => {
  const { data: customDrillshipsData, isLoading: isLoadingCustomDrillships } =
    useCustomDrillships({ pageSize: 1 });
  const { data: conceptDrillshipsData, isLoading: isLoadingConceptDrillships } =
    useConceptDrillships({ pageSize: 1 });

  return (
    <SelectDraftTypeList
      customCount={customDrillshipsData?.count || 0}
      conceptCount={conceptDrillshipsData?.count || 0}
      loading={isLoadingCustomDrillships || isLoadingConceptDrillships}
    />
  );
};

export default SelectDrillshipDraftType;
