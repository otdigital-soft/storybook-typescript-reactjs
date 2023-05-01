import { useQuery } from 'react-query';
import studiesServices from 'api/services/studies';
import studiesQueryKeys from 'api/queryKeys/studies';
import useTenant from 'hooks/useTenant';
import { noop } from 'utils/api';
import { StudyElement } from 'api/schema';

const shouldPollStudyElement = (element: StudyElement) =>
  element.rigs.some((rig) => rig.value === null);

const useShortPollStudyElement = (projectId: number, elementId: number) => {
  const { tenantId } = useTenant();

  return useQuery(
    tenantId
      ? studiesQueryKeys.studyElement(tenantId, projectId, elementId)
      : [],
    tenantId
      ? () => studiesServices.studyElement(tenantId, projectId, elementId)
      : noop,
    {
      enabled: !!tenantId,
      refetchInterval: (data) => {
        if (data && shouldPollStudyElement(data)) {
          return 5000;
        }

        return false;
      },
    },
  );
};

export default useShortPollStudyElement;
