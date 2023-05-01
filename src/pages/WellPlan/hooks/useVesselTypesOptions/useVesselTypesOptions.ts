import useAllVesselTypes from 'pages/Assets/hooks/useAllVesselTypes';

const useVesselTypesOptions = () => {
  const { data: VesselTypesData } = useAllVesselTypes();
  return (VesselTypesData || []).map((customVessel) => ({
    value: customVessel.id,
    label: customVessel.type,
  }));
};

export default useVesselTypesOptions;
