import { useMutation, useQueryClient } from 'react-query';
import rigsServices from 'api/services/rigs';
import rigsQueryKeys from 'api/queryKeys/rigs';
import projectsQueryKeys from 'api/queryKeys/projects';

import useTenant from 'hooks/useTenant';
import {
  CreateCustomDrillship,
  CreateCustomJackupRigDraft,
  CreateCustomSemiRig,
  CustomDrillshipDetails,
  CustomJackupRigDetails,
  CustomSemiRigDetails,
} from 'api/schema';
import { useNavigate, useParams } from 'react-router-dom';
import { RigType } from 'routes';
import { notification } from 'antd';
import { generateUpdateRigPath } from 'routes/utils';
import Logger from 'utils/logger';
import {
  CreateRigDraftType,
  CreateRigType,
} from 'containers/CreateRigForm/CreateRigFormProvider';

const useCreateRigDraft = () => {
  const navigate = useNavigate();
  const { tenantId } = useTenant();
  const { projectId } = useParams<{ projectId: string }>();
  const queryClient = useQueryClient();

  const invalidateRigQueries = async () => {
    if (!tenantId) {
      throw new Error('Missing tenant id.');
    }

    await queryClient.invalidateQueries(rigsQueryKeys.allCustomRigs(tenantId));

    if (projectId) {
      await queryClient.invalidateQueries(
        projectsQueryKeys.allProjectRigs(tenantId, Number(projectId)),
      );
    }
  };

  const {
    mutate: onCreateCustomJackupRigDraft,
    isLoading: isCreatingCustomJackupRig,
  } = useMutation(
    (data: CreateCustomJackupRigDraft) => {
      if (!tenantId) {
        throw new Error('Missing tenant id.');
      }

      return rigsServices.createJackup(tenantId, {
        ...data,
        project: projectId ? Number(projectId) : undefined,
      });
    },
    {
      onSuccess: async (data) => {
        if (!tenantId) {
          throw new Error('Missing tenant id.');
        }

        const customJackupQueryKey = rigsQueryKeys.customJackup(
          tenantId,
          data.id,
        );
        queryClient.setQueryData<CustomJackupRigDetails>(
          customJackupQueryKey,
          data,
        );

        await invalidateRigQueries();
        navigate(
          generateUpdateRigPath(
            data.id,
            RigType.Jackup,
            projectId ? Number(projectId) : undefined,
          ),
        );
      },
      onError: (error, variables) => {
        notification.error({
          message: 'Rig cannot be selected right now',
        });
        Logger.error('Unable to create draft jackup rig', error, variables);
      },
    },
  );

  const {
    mutate: onCreateCustomSemiRigDraft,
    isLoading: isCreatingCustomSemiRigDraft,
  } = useMutation(
    (data: CreateCustomSemiRig) => {
      if (!tenantId) {
        throw new Error('Missing tenant id.');
      }

      return rigsServices.createSemi(tenantId, {
        ...data,
        project: projectId ? Number(projectId) : undefined,
      });
    },
    {
      onSuccess: async (data) => {
        if (!tenantId) {
          throw new Error('Missing tenant id.');
        }

        const customSemiQueryKey = rigsQueryKeys.customSemi(tenantId, data.id);
        queryClient.setQueryData<CustomSemiRigDetails>(
          customSemiQueryKey,
          data,
        );

        await invalidateRigQueries();
        navigate(
          generateUpdateRigPath(
            data.id,
            RigType.Semi,
            projectId ? Number(projectId) : undefined,
          ),
        );
      },
      onError: (error, variables) => {
        notification.error({
          message: 'Rig cannot be selected right now',
        });
        Logger.error('Unable to create draft semi rig', error, variables);
      },
    },
  );

  const {
    mutate: onCreateCustomDrillshipDraft,
    isLoading: isCreatingCustomDrillshipDraft,
  } = useMutation(
    (data: CreateCustomDrillship) => {
      if (!tenantId) {
        throw new Error('Missing tenant id.');
      }

      return rigsServices.createDrillship(tenantId, {
        ...data,
        project: projectId ? Number(projectId) : undefined,
      });
    },
    {
      onSuccess: async (data) => {
        if (!tenantId) {
          throw new Error('Missing tenant id.');
        }

        const customDrillshipQueryKey = rigsQueryKeys.customDrillship(
          tenantId,
          data.id,
        );
        queryClient.setQueryData<CustomDrillshipDetails>(
          customDrillshipQueryKey,
          data,
        );

        await invalidateRigQueries();
        navigate(
          generateUpdateRigPath(
            data.id,
            RigType.Drillship,
            projectId ? Number(projectId) : undefined,
          ),
        );
      },
      onError: (error, variables) => {
        notification.error({
          message: 'Rig cannot be selected right now',
        });
        Logger.error('Unable to create draft drillship', error, variables);
      },
    },
  );

  const createJackupDraftFromConcept = async (conceptRigId: number) => {
    if (!tenantId) {
      throw new Error('Missing tenant id.');
    }

    const data = await rigsServices.conceptJackup(tenantId, conceptRigId);
    return onCreateCustomJackupRigDraft({
      ...data,
      draft: true,
      name: `Draft based on ${data.name}`,
    });
  };

  const createJackupDraftFromCustom = async (customRigId: number) => {
    if (!tenantId) {
      throw new Error('Missing tenant id.');
    }

    const data = await rigsServices.customJackup(tenantId, customRigId);
    return onCreateCustomJackupRigDraft({
      ...data,
      draft: true,
      name: `Draft based on ${data.name}`,
    });
  };

  const createSemiDraftFromConcept = async (conceptRigId: number) => {
    if (!tenantId) {
      throw new Error('Missing tenant id.');
    }

    const data = await rigsServices.conceptSemi(tenantId, conceptRigId);
    return onCreateCustomSemiRigDraft({
      ...data,
      draft: true,
      name: `Draft based on ${data.name}`,
    });
  };

  const createSemiDraftFromCustom = async (customRigId: number) => {
    if (!tenantId) {
      throw new Error('Missing tenant id.');
    }

    const data = await rigsServices.customSemi(tenantId, customRigId);
    return onCreateCustomSemiRigDraft({
      ...data,
      draft: true,
      name: `Draft based on ${data.name}`,
    });
  };

  const createDrillshipDraftFromConcept = async (conceptRigId: number) => {
    if (!tenantId) {
      throw new Error('Missing tenant id.');
    }

    const data = await rigsServices.conceptDrillship(tenantId, conceptRigId);
    return onCreateCustomDrillshipDraft({
      ...data,
      draft: true,
      name: `Draft based on ${data.name}`,
    });
  };

  const createDrillshipDraftFromCustom = async (customRigId: number) => {
    if (!tenantId) {
      throw new Error('Missing tenant id.');
    }

    const data = await rigsServices.customDrillship(tenantId, customRigId);
    return onCreateCustomDrillshipDraft({
      ...data,
      draft: true,
      name: `Draft based on ${data.name}`,
    });
  };

  const createJackupDraftEmpty = () => {
    return onCreateCustomJackupRigDraft({
      draft: true,
      name: 'Empty jackup draft',
    });
  };

  const createSemiDraftEmpty = () => {
    return onCreateCustomSemiRigDraft({
      draft: true,
      name: 'Empty semi draft',
    });
  };

  const createDrillshipDraftEmpty = () => {
    return onCreateCustomDrillshipDraft({
      draft: true,
      name: 'Empty drillship',
    });
  };

  const createEmptyDraftRig = (rigType: CreateRigType) => {
    if (rigType === CreateRigType.Jackup) {
      return createJackupDraftEmpty();
    } else if (rigType == CreateRigType.Semi) {
      return createSemiDraftEmpty();
    } else if (rigType == CreateRigType.Drillship) {
      return createDrillshipDraftEmpty();
    } else {
      Logger.error(
        `Unable to create empty draft rig. Unknown rig type: ${rigType}`,
      );
      return;
    }
  };

  const createDraftRigFromRig = (
    rigType: CreateRigType,
    draftType: CreateRigDraftType,
    rigId: number,
  ) => {
    if (
      rigType === CreateRigType.Jackup &&
      draftType == CreateRigDraftType.Custom
    ) {
      return createJackupDraftFromCustom(rigId);
    } else if (
      rigType === CreateRigType.Jackup &&
      draftType === CreateRigDraftType.Concept
    ) {
      return createJackupDraftFromConcept(rigId);
    } else if (
      rigType === CreateRigType.Semi &&
      draftType === CreateRigDraftType.Custom
    ) {
      return createSemiDraftFromCustom(rigId);
    } else if (
      rigType === CreateRigType.Semi &&
      draftType === CreateRigDraftType.Concept
    ) {
      return createSemiDraftFromConcept(rigId);
    } else if (
      rigType === CreateRigType.Drillship &&
      draftType === CreateRigDraftType.Custom
    ) {
      return createDrillshipDraftFromCustom(rigId);
    } else if (
      rigType === CreateRigType.Drillship &&
      draftType === CreateRigDraftType.Concept
    ) {
      return createDrillshipDraftFromConcept(rigId);
    } else {
      Logger.error(
        `Unable to create a draft rig from another rig. Unknown rig type: ${draftType} ${rigType}`,
        undefined,
        {
          rigId,
          rigType,
          draftType,
        },
      );
      return;
    }
  };

  const onCreateRigDraft = (
    rigType: CreateRigType,
    draftType: CreateRigDraftType | undefined,
    rigId: number | undefined,
  ) => {
    if (rigId && draftType) {
      return createDraftRigFromRig(rigType, draftType, rigId);
    } else {
      return createEmptyDraftRig(rigType);
    }
  };

  return {
    onCreateRigDraft,
    isCreatingRigDraft:
      isCreatingCustomJackupRig ||
      isCreatingCustomSemiRigDraft ||
      isCreatingCustomDrillshipDraft,
  };
};

export default useCreateRigDraft;
