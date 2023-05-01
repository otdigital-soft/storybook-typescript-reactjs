import useProject from 'hooks/useProject';
import useEMPConceptElements from 'hooks/useEMPConceptElements';
import useCustomEMP from 'hooks/useCustomEMP';
import { RigType } from 'routes';
import { isNotFoundError } from 'utils/api';

const useUpdateEMPData = (
  projectId: number,
  rigId: number,
  rigType: RigType,
) => {
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
  const {
    data: empData,
    isLoading: isLoadingEMP,
    error: empError,
  } = useCustomEMP({
    projectId,
    rigId,
    rigType,
  });

  return {
    projectData,
    empConceptElementsData,
    empData,
    dataError: empConceptElementsError || projectError || empError,
    dataNotFoundError: [empConceptElementsError, projectError, empError]
      .filter(Boolean)
      .filter((error) => isNotFoundError(error))[0],
    isLoadingData:
      isLoadingEMPConceptElements || isLoadingProject || isLoadingEMP,
  };
};

export default useUpdateEMPData;
