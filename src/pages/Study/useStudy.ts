import useProject from 'hooks/useProject';
import useProjectPlans from 'pages/Project/useProjectPlans';
import useProjectRigs from 'pages/Project/useProjectRigs';
import { isNotFoundError } from 'utils/api';
import useStudyElements from 'pages/Study/useStudyElements';
import useStudyMetrics from 'pages/Study/useStudyMetrics';

const useStudy = (projectId: number) => {
  const {
    data: projectData,
    isLoading: isLoadingProject,
    error: projectError,
  } = useProject(projectId);
  const {
    data: projectRigsData,
    isLoading: isLoadingProjectRigs,
    error: projectRigsError,
  } = useProjectRigs({
    projectId,
    draft: false,
    studiable: true,
  });
  const {
    data: projectPlansData,
    isLoading: isLoadingProjectPlans,
    error: projectPlansError,
  } = useProjectPlans({ projectId, draft: false });
  const {
    data: studyElementsData,
    isLoading: isLoadingStudyElements,
    error: studyElementsError,
  } = useStudyElements(projectId);
  const { isLoading: isLoadingStudyMetrics, error: studyMetricsError } =
    useStudyMetrics();

  return {
    projectData,
    projectRigsData,
    projectPlansData,
    studyElementsData,
    isLoadingStudy:
      isLoadingProject ||
      isLoadingProjectRigs ||
      isLoadingProjectPlans ||
      isLoadingStudyElements ||
      isLoadingStudyMetrics,
    studyError:
      projectError ||
      projectRigsError ||
      projectPlansError ||
      studyElementsError ||
      studyMetricsError,
    studyNotFoundError: [
      projectError,
      projectRigsError,
      projectPlansError,
      studyElementsError,
      studyMetricsError,
    ]
      .filter(Boolean)
      .filter((error) => isNotFoundError(error))[0],
  };
};

export default useStudy;
