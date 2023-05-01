import useShowColumns from 'hooks/useShowColumns';

export type WellListColumns = {
  wellName: boolean;
  sidetrackName: boolean;
  typeOfWell: boolean;
  asset: boolean;
  field: boolean;
  wellLocation: boolean;
  wellDescription: boolean;
  wellPlanStatus: boolean;
  plannedStartDate: boolean;
  actualStartDate: boolean;
};

const initialValues: WellListColumns = {
  wellName: true,
  sidetrackName: true,
  typeOfWell: false,
  asset: true,
  field: true,
  wellLocation: true,
  wellDescription: true,
  wellPlanStatus: true,
  plannedStartDate: false,
  actualStartDate: false,
};

const useShowWellsColumns = () => {
  return useShowColumns<WellListColumns>({
    name: 'wellList',
    initialValues,
  });
};

export default useShowWellsColumns;
