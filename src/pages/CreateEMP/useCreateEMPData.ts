import useProject from 'hooks/useProject';
import useEMPConceptElements from 'hooks/useEMPConceptElements';
import { isNotFoundError } from 'utils/api';

const useCreateEMPData = (projectId: number) => {
  const {
    data: projectData,
    isLoading: isLoadingProject,
    error: projectError,
  } = useProject(Number(projectId));
  const {
    data: empConceptElementsData,
    isLoading: isLoadingEMPConceptElements,
    error: empConceptElementsError,
  } = useEMPConceptElements();

  return {
    projectData,
    empConceptElementsData,
    dataError: empConceptElementsError || projectError,
    dataNotFoundError: [empConceptElementsError, projectError]
      .filter(Boolean)
      .filter((error) => isNotFoundError(error))[0],
    isLoadingData: isLoadingEMPConceptElements || isLoadingProject,
  };
};

export default useCreateEMPData;
