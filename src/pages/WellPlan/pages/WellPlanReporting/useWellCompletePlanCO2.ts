import wellsQueryKeys from 'api/queryKeys/wells';
import { TenantsService } from 'api/schema';
import useTenant from 'hooks/useTenant';
import { useQuery } from 'react-query';
import { noop } from 'utils/api';

async function fetch({
  tenantId,
  wellPlanId,
  start,
  end,
}: {
  tenantId: number;
  wellPlanId: number;
  start?: Date;
  end?: Date;
}) {
  const { data } = await TenantsService.tenantsWellsPlannersMeasuredCo2List(
    tenantId,
    wellPlanId,
    end?.toISOString(),
    start?.toISOString(),
  );
  return data;
}

const useWellPlanCO2 = ({
  wellPlanId,
  end,
  start,
}: {
  wellPlanId: number;
  start?: Date;
  end?: Date;
}) => {
  const { tenantId } = useTenant();

  return useQuery(
    tenantId
      ? wellsQueryKeys.wellCompletePlanCO2({
          tenantId,
          wellPlanId,
          start: start?.toISOString(),
          end: end?.toISOString(),
        })
      : [],
    tenantId
      ? () =>
          fetch({
            tenantId,
            wellPlanId,
            start,
            end,
          })
      : noop,
    {
      enabled: !!tenantId,
    },
  );
};

export default useWellPlanCO2;
