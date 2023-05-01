import { useQuery } from 'react-query';
import wellsQueryKeys from 'api/queryKeys/wells';
import useTenant from 'hooks/useTenant';
import { noop } from 'utils/api';
import { TenantsService } from 'api/schema';

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
  const { data } =
    await TenantsService.tenantsWellsPlannersMeasuredWaveHeaveList(
      tenantId,
      wellPlanId,
      end?.toISOString(),
      start?.toISOString(),
    );
  return data;
}

const useWellMeasuredWaveHeave = ({
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
      ? wellsQueryKeys.wellMeasuredWaveHeave({
          tenantId,
          wellPlanId,
          start: start?.toISOString(),
          end: end?.toISOString(),
        })
      : [],
    tenantId ? () => fetch({ tenantId, wellPlanId, start, end }) : noop,
    {
      enabled: !!tenantId,
    },
  );
};

export default useWellMeasuredWaveHeave;
