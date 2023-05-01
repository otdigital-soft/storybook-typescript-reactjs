import useAllHelicopterTypes from 'pages/Assets/hooks/useAllHelicopterTypes';

const useHelicopterTypesOptions = () => {
  const { data: helicopterTypesData } = useAllHelicopterTypes();
  return (helicopterTypesData || []).map((helicopterType) => ({
    value: helicopterType.id,
    label: helicopterType.type,
  }));
};

export default useHelicopterTypesOptions;
