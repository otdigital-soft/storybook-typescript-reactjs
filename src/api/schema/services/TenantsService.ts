/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AllHelicopterTypeList } from '../models/AllHelicopterTypeList';
import type { AllMaterialTypeList } from '../models/AllMaterialTypeList';
import type { AllVesselTypeList } from '../models/AllVesselTypeList';
import type { ApproveWellPlannerCompleteHelicopterUses } from '../models/ApproveWellPlannerCompleteHelicopterUses';
import type { ApproveWellPlannerCompleteSteps } from '../models/ApproveWellPlannerCompleteSteps';
import type { ApproveWellPlannerCompleteVesselUses } from '../models/ApproveWellPlannerCompleteVesselUses';
import type { AssetDetails } from '../models/AssetDetails';
import type { AssetList } from '../models/AssetList';
import type { AssetMode } from '../models/AssetMode';
import type { AssetPhase } from '../models/AssetPhase';
import type { AssetReferenceMaterial } from '../models/AssetReferenceMaterial';
import type { Baseline } from '../models/Baseline';
import type { BaselineDetails } from '../models/BaselineDetails';
import type { BaselineMode } from '../models/BaselineMode';
import type { BaselinePhase } from '../models/BaselinePhase';
import type { CompleteAssetList } from '../models/CompleteAssetList';
import type { ConceptDrillshipDetails } from '../models/ConceptDrillshipDetails';
import type { ConceptEMPElement } from '../models/ConceptEMPElement';
import type { ConceptJackupRigDetails } from '../models/ConceptJackupRigDetails';
import type { ConceptSemiRigDetails } from '../models/ConceptSemiRigDetails';
import type { ConceptWellDetails } from '../models/ConceptWellDetails';
import type { CreateAsset } from '../models/CreateAsset';
import type { CreateCustomDrillship } from '../models/CreateCustomDrillship';
import type { CreateCustomJackupRigDraft } from '../models/CreateCustomJackupRigDraft';
import type { CreateCustomSemiRig } from '../models/CreateCustomSemiRig';
import type { CreateCustomWell } from '../models/CreateCustomWell';
import type { CreateMaterialType } from '../models/CreateMaterialType';
import type { CreateUpdateBaseline } from '../models/CreateUpdateBaseline';
import type { CreateUpdateCompleteHelicopterUse } from '../models/CreateUpdateCompleteHelicopterUse';
import type { CreateUpdateCompleteVesselUse } from '../models/CreateUpdateCompleteVesselUse';
import type { CreateUpdateCustomMode } from '../models/CreateUpdateCustomMode';
import type { CreateUpdateCustomPhase } from '../models/CreateUpdateCustomPhase';
import type { CreateUpdateEmissionManagementPlan } from '../models/CreateUpdateEmissionManagementPlan';
import type { CreateUpdateEmissionReductionInitiative } from '../models/CreateUpdateEmissionReductionInitiative';
import type { CreateUpdateEMP } from '../models/CreateUpdateEMP';
import type { CreateUpdateHelicopterType } from '../models/CreateUpdateHelicopterType';
import type { CreateUpdatePlan } from '../models/CreateUpdatePlan';
import type { CreateUpdatePlannedHelicopterUse } from '../models/CreateUpdatePlannedHelicopterUse';
import type { CreateUpdatePlannedVesselUse } from '../models/CreateUpdatePlannedVesselUse';
import type { CreateUpdateProject } from '../models/CreateUpdateProject';
import type { CreateUpdateStudyElement } from '../models/CreateUpdateStudyElement';
import type { CreateUpdateVesselType } from '../models/CreateUpdateVesselType';
import type { CreateUpdateWell } from '../models/CreateUpdateWell';
import type { CreateWellName } from '../models/CreateWellName';
import type { CreateWellStep } from '../models/CreateWellStep';
import type { CustomDrillshipDetails } from '../models/CustomDrillshipDetails';
import type { CustomJackupRigDetails } from '../models/CustomJackupRigDetails';
import type { CustomRigList } from '../models/CustomRigList';
import type { CustomSemiRigDetails } from '../models/CustomSemiRigDetails';
import type { CustomWellDetails } from '../models/CustomWellDetails';
import type { CustomWellList } from '../models/CustomWellList';
import type { EmissionManagementPlan } from '../models/EmissionManagementPlan';
import type { EmissionManagementPlanDetails } from '../models/EmissionManagementPlanDetails';
import type { EmissionReductionInitiativeDetails } from '../models/EmissionReductionInitiativeDetails';
import type { EmissionReductionInitiativeList } from '../models/EmissionReductionInitiativeList';
import type { EMP } from '../models/EMP';
import type { Faq } from '../models/Faq';
import type { HelicopterTypeList } from '../models/HelicopterTypeList';
import type { Locked } from '../models/Locked';
import type { Login } from '../models/Login';
import type { MaterialTypeList } from '../models/MaterialTypeList';
import type { Me } from '../models/Me';
import type { MeUpdate } from '../models/MeUpdate';
import type { MonitorDetails } from '../models/MonitorDetails';
import type { MonitorElementDataset } from '../models/MonitorElementDataset';
import type { MoveWellPlannerStep } from '../models/MoveWellPlannerStep';
import type { PaginatedAssetListList } from '../models/PaginatedAssetListList';
import type { PaginatedConceptWellListList } from '../models/PaginatedConceptWellListList';
import type { PaginatedCustomRigListList } from '../models/PaginatedCustomRigListList';
import type { PaginatedCustomWellListList } from '../models/PaginatedCustomWellListList';
import type { PaginatedElementListList } from '../models/PaginatedElementListList';
import type { PaginatedHelicopterTypeListList } from '../models/PaginatedHelicopterTypeListList';
import type { PaginatedMaterialTypeListList } from '../models/PaginatedMaterialTypeListList';
import type { PaginatedMonitorListList } from '../models/PaginatedMonitorListList';
import type { PaginatedNotificationListList } from '../models/PaginatedNotificationListList';
import type { PaginatedProjectListList } from '../models/PaginatedProjectListList';
import type { PaginatedRigListList } from '../models/PaginatedRigListList';
import type { PaginatedSearchResultList } from '../models/PaginatedSearchResultList';
import type { PaginatedVesselTypeListList } from '../models/PaginatedVesselTypeListList';
import type { PaginatedWellPlannerListList } from '../models/PaginatedWellPlannerListList';
import type { PasswordChange } from '../models/PasswordChange';
import type { PasswordReset } from '../models/PasswordReset';
import type { PasswordResetChangePassword } from '../models/PasswordResetChangePassword';
import type { PlanDetails } from '../models/PlanDetails';
import type { PlanList } from '../models/PlanList';
import type { PrivacyPolicyConsent } from '../models/PrivacyPolicyConsent';
import type { ProjectDetails } from '../models/ProjectDetails';
import type { StudyElement } from '../models/StudyElement';
import type { StudyElementList } from '../models/StudyElementList';
import type { StudyMetric } from '../models/StudyMetric';
import type { SwappedStudyElements } from '../models/SwappedStudyElements';
import type { SwapStudyElements } from '../models/SwapStudyElements';
import type { Tenant } from '../models/Tenant';
import type { TenantInvitation } from '../models/TenantInvitation';
import type { TenantInvitationSignup } from '../models/TenantInvitationSignup';
import type { UnreadNotifications } from '../models/UnreadNotifications';
import type { UpdateAsset } from '../models/UpdateAsset';
import type { UpdateCustomDrillship } from '../models/UpdateCustomDrillship';
import type { UpdateCustomJackupRig } from '../models/UpdateCustomJackupRig';
import type { UpdateCustomSemiRig } from '../models/UpdateCustomSemiRig';
import type { UpdateCustomWell } from '../models/UpdateCustomWell';
import type { UpdateMaterialType } from '../models/UpdateMaterialType';
import type { UpdateWellPlannedStartDate } from '../models/UpdateWellPlannedStartDate';
import type { UpdateWellPlannerActualStartDate } from '../models/UpdateWellPlannerActualStartDate';
import type { UpdateWellPlannerEmissionReductionInitiatives } from '../models/UpdateWellPlannerEmissionReductionInitiatives';
import type { UpdateWellStep } from '../models/UpdateWellStep';
import type { VesselTypeList } from '../models/VesselTypeList';
import type { WellNameList } from '../models/WellNameList';
import type { WellPlannerCO2Dataset } from '../models/WellPlannerCO2Dataset';
import type { WellPlannerCO2SavedDataset } from '../models/WellPlannerCO2SavedDataset';
import type { WellPlannerCompleteSummary } from '../models/WellPlannerCompleteSummary';
import type { WellPlannerDetails } from '../models/WellPlannerDetails';
import type { WellPlannerList } from '../models/WellPlannerList';
import type { WellPlannerMeasurementDataset } from '../models/WellPlannerMeasurementDataset';
import type { WellPlannerModeList } from '../models/WellPlannerModeList';
import type { WellPlannerPhaseList } from '../models/WellPlannerPhaseList';
import type { WellPlannerPlannedStepCO2 } from '../models/WellPlannerPlannedStepCO2';
import type { WellPlannerSummary } from '../models/WellPlannerSummary';
import type { WellReferenceMaterial } from '../models/WellReferenceMaterial';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TenantsService {

    /**
     * Consent list
     * @param tenantId
     * @returns PrivacyPolicyConsent
     * @throws ApiError
     */
    public static tenantsConsentsList(
        tenantId: number,
    ): CancelablePromise<Array<PrivacyPolicyConsent>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/consents/',
            path: {
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Latest consent details
     * @param tenantId
     * @returns PrivacyPolicyConsent
     * @throws ApiError
     */
    public static tenantsConsentsLatestRetrieve(
        tenantId: number,
    ): CancelablePromise<PrivacyPolicyConsent> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/consents/latest/',
            path: {
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Delete account
     * @param tenantId
     * @returns void
     * @throws ApiError
     */
    public static tenantsDeleteAccountDestroy(
        tenantId: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/tenants/{tenant_id}/delete-account/',
            path: {
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Element list
     * @param tenantId
     * @param ordering Which field to use when ordering the results.
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PaginatedElementListList
     * @throws ApiError
     */
    public static tenantsElementsList(
        tenantId: number,
        ordering?: string,
        page?: number,
        pageSize?: number,
    ): CancelablePromise<PaginatedElementListList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/elements/',
            path: {
                'tenant_id': tenantId,
            },
            query: {
                'ordering': ordering,
                'page': page,
                'page_size': pageSize,
            },
        });
    }

    /**
     * Asset list
     * Returns a list of both draft and non-draft assets
     * @param tenantId
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PaginatedAssetListList
     * @throws ApiError
     */
    public static tenantsEmissionsAssetsList(
        tenantId: number,
        page?: number,
        pageSize?: number,
    ): CancelablePromise<PaginatedAssetListList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/emissions/assets/',
            path: {
                'tenant_id': tenantId,
            },
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }

    /**
     * Asset details
     * @param assetId
     * @param tenantId
     * @returns AssetDetails
     * @throws ApiError
     */
    public static tenantsEmissionsAssetsRetrieve(
        assetId: number,
        tenantId: number,
    ): CancelablePromise<AssetDetails> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/emissions/assets/{asset_id}/',
            path: {
                'asset_id': assetId,
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Baseline details
     * @param assetId
     * @param baselineId
     * @param tenantId
     * @returns BaselineDetails
     * @throws ApiError
     */
    public static tenantsEmissionsAssetsBaselinesRetrieve(
        assetId: number,
        baselineId: number,
        tenantId: number,
    ): CancelablePromise<BaselineDetails> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/emissions/assets/{asset_id}/baselines/{baseline_id}/',
            path: {
                'asset_id': assetId,
                'baseline_id': baselineId,
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Activate asset
     * @param assetId
     * @param baselineId
     * @param tenantId
     * @returns Baseline
     * @throws ApiError
     */
    public static tenantsEmissionsAssetsBaselinesActivateUpdate(
        assetId: number,
        baselineId: number,
        tenantId: number,
    ): CancelablePromise<Baseline> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tenants/{tenant_id}/emissions/assets/{asset_id}/baselines/{baseline_id}/activate/',
            path: {
                'asset_id': assetId,
                'baseline_id': baselineId,
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Delete baseline
     * @param assetId
     * @param baselineId
     * @param tenantId
     * @returns AssetDetails
     * @throws ApiError
     */
    public static tenantsEmissionsAssetsBaselinesDeleteDestroy(
        assetId: number,
        baselineId: number,
        tenantId: number,
    ): CancelablePromise<AssetDetails> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/tenants/{tenant_id}/emissions/assets/{asset_id}/baselines/{baseline_id}/delete/',
            path: {
                'asset_id': assetId,
                'baseline_id': baselineId,
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Duplicate baseline
     * @param assetId
     * @param baselineId
     * @param tenantId
     * @returns Baseline
     * @throws ApiError
     */
    public static tenantsEmissionsAssetsBaselinesDuplicateCreate(
        assetId: number,
        baselineId: number,
        tenantId: number,
    ): CancelablePromise<Baseline> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/emissions/assets/{asset_id}/baselines/{baseline_id}/duplicate/',
            path: {
                'asset_id': assetId,
                'baseline_id': baselineId,
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Emission management plan details
     * @param assetId
     * @param baselineId
     * @param emissionManagementPlanId
     * @param tenantId
     * @returns EmissionManagementPlanDetails
     * @throws ApiError
     */
    public static tenantsEmissionsAssetsBaselinesEmissionManagementPlansRetrieve(
        assetId: number,
        baselineId: number,
        emissionManagementPlanId: number,
        tenantId: number,
    ): CancelablePromise<EmissionManagementPlanDetails> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/emissions/assets/{asset_id}/baselines/{baseline_id}/emission-management-plans/{emission_management_plan_id}/',
            path: {
                'asset_id': assetId,
                'baseline_id': baselineId,
                'emission_management_plan_id': emissionManagementPlanId,
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Activate emission management plan
     * @param assetId
     * @param baselineId
     * @param emissionManagementPlanId
     * @param tenantId
     * @returns EmissionManagementPlan
     * @throws ApiError
     */
    public static tenantsEmissionsAssetsBaselinesEmissionManagementPlansActivateUpdate(
        assetId: number,
        baselineId: number,
        emissionManagementPlanId: number,
        tenantId: number,
    ): CancelablePromise<EmissionManagementPlan> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tenants/{tenant_id}/emissions/assets/{asset_id}/baselines/{baseline_id}/emission-management-plans/{emission_management_plan_id}/activate/',
            path: {
                'asset_id': assetId,
                'baseline_id': baselineId,
                'emission_management_plan_id': emissionManagementPlanId,
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Delete emission management plan
     * @param assetId
     * @param baselineId
     * @param emissionManagementPlanId
     * @param tenantId
     * @returns void
     * @throws ApiError
     */
    public static tenantsEmissionsAssetsBaselinesEmissionManagementPlansDeleteDestroy(
        assetId: number,
        baselineId: number,
        emissionManagementPlanId: number,
        tenantId: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/tenants/{tenant_id}/emissions/assets/{asset_id}/baselines/{baseline_id}/emission-management-plans/{emission_management_plan_id}/delete/',
            path: {
                'asset_id': assetId,
                'baseline_id': baselineId,
                'emission_management_plan_id': emissionManagementPlanId,
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Duplicate emission management plan
     * @param assetId
     * @param baselineId
     * @param emissionManagementPlanId
     * @param tenantId
     * @returns EmissionManagementPlan
     * @throws ApiError
     */
    public static tenantsEmissionsAssetsBaselinesEmissionManagementPlansDuplicateCreate(
        assetId: number,
        baselineId: number,
        emissionManagementPlanId: number,
        tenantId: number,
    ): CancelablePromise<EmissionManagementPlan> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/emissions/assets/{asset_id}/baselines/{baseline_id}/emission-management-plans/{emission_management_plan_id}/duplicate/',
            path: {
                'asset_id': assetId,
                'baseline_id': baselineId,
                'emission_management_plan_id': emissionManagementPlanId,
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Emission reduction initiative details
     * @param assetId
     * @param baselineId
     * @param emissionManagementPlanId
     * @param emissionReductionInitiativeId
     * @param tenantId
     * @returns EmissionReductionInitiativeDetails
     * @throws ApiError
     */
    public static tenantsEmissionsAssetsBaselinesEmissionManagementPlansEmissionReductionInitiativesRetrieve(
        assetId: number,
        baselineId: number,
        emissionManagementPlanId: number,
        emissionReductionInitiativeId: number,
        tenantId: number,
    ): CancelablePromise<EmissionReductionInitiativeDetails> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/emissions/assets/{asset_id}/baselines/{baseline_id}/emission-management-plans/{emission_management_plan_id}/emission-reduction-initiatives/{emission_reduction_initiative_id}/',
            path: {
                'asset_id': assetId,
                'baseline_id': baselineId,
                'emission_management_plan_id': emissionManagementPlanId,
                'emission_reduction_initiative_id': emissionReductionInitiativeId,
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Delete emission reduction initiative
     * @param assetId
     * @param baselineId
     * @param emissionManagementPlanId
     * @param emissionReductionInitiativeId
     * @param tenantId
     * @returns void
     * @throws ApiError
     */
    public static tenantsEmissionsAssetsBaselinesEmissionManagementPlansEmissionReductionInitiativesDeleteDestroy(
        assetId: number,
        baselineId: number,
        emissionManagementPlanId: number,
        emissionReductionInitiativeId: number,
        tenantId: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/tenants/{tenant_id}/emissions/assets/{asset_id}/baselines/{baseline_id}/emission-management-plans/{emission_management_plan_id}/emission-reduction-initiatives/{emission_reduction_initiative_id}/delete/',
            path: {
                'asset_id': assetId,
                'baseline_id': baselineId,
                'emission_management_plan_id': emissionManagementPlanId,
                'emission_reduction_initiative_id': emissionReductionInitiativeId,
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Update emission reduction initiative
     * @param assetId
     * @param baselineId
     * @param emissionManagementPlanId
     * @param emissionReductionInitiativeId
     * @param tenantId
     * @param requestBody
     * @returns EmissionReductionInitiativeDetails
     * @throws ApiError
     */
    public static tenantsEmissionsAssetsBaselinesEmissionManagementPlansEmissionReductionInitiativesUpdateUpdate(
        assetId: number,
        baselineId: number,
        emissionManagementPlanId: number,
        emissionReductionInitiativeId: number,
        tenantId: number,
        requestBody: CreateUpdateEmissionReductionInitiative,
    ): CancelablePromise<EmissionReductionInitiativeDetails> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tenants/{tenant_id}/emissions/assets/{asset_id}/baselines/{baseline_id}/emission-management-plans/{emission_management_plan_id}/emission-reduction-initiatives/{emission_reduction_initiative_id}/update/',
            path: {
                'asset_id': assetId,
                'baseline_id': baselineId,
                'emission_management_plan_id': emissionManagementPlanId,
                'emission_reduction_initiative_id': emissionReductionInitiativeId,
                'tenant_id': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Create emission reduction initiative
     * @param assetId
     * @param baselineId
     * @param emissionManagementPlanId
     * @param tenantId
     * @param requestBody
     * @returns EmissionReductionInitiativeDetails
     * @throws ApiError
     */
    public static tenantsEmissionsAssetsBaselinesEmissionManagementPlansEmissionReductionInitiativesCreateCreate(
        assetId: number,
        baselineId: number,
        emissionManagementPlanId: number,
        tenantId: number,
        requestBody: CreateUpdateEmissionReductionInitiative,
    ): CancelablePromise<EmissionReductionInitiativeDetails> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/emissions/assets/{asset_id}/baselines/{baseline_id}/emission-management-plans/{emission_management_plan_id}/emission-reduction-initiatives/create/',
            path: {
                'asset_id': assetId,
                'baseline_id': baselineId,
                'emission_management_plan_id': emissionManagementPlanId,
                'tenant_id': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Update emission management plan
     * @param assetId
     * @param baselineId
     * @param emissionManagementPlanId
     * @param tenantId
     * @param requestBody
     * @returns EmissionManagementPlanDetails
     * @throws ApiError
     */
    public static tenantsEmissionsAssetsBaselinesEmissionManagementPlansUpdateUpdate(
        assetId: number,
        baselineId: number,
        emissionManagementPlanId: number,
        tenantId: number,
        requestBody: CreateUpdateEmissionManagementPlan,
    ): CancelablePromise<EmissionManagementPlanDetails> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tenants/{tenant_id}/emissions/assets/{asset_id}/baselines/{baseline_id}/emission-management-plans/{emission_management_plan_id}/update/',
            path: {
                'asset_id': assetId,
                'baseline_id': baselineId,
                'emission_management_plan_id': emissionManagementPlanId,
                'tenant_id': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Create emission management plan
     * @param assetId
     * @param baselineId
     * @param tenantId
     * @param requestBody
     * @returns EmissionManagementPlanDetails
     * @throws ApiError
     */
    public static tenantsEmissionsAssetsBaselinesEmissionManagementPlansCreateCreate(
        assetId: number,
        baselineId: number,
        tenantId: number,
        requestBody: CreateUpdateEmissionManagementPlan,
    ): CancelablePromise<EmissionManagementPlanDetails> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/emissions/assets/{asset_id}/baselines/{baseline_id}/emission-management-plans/create/',
            path: {
                'asset_id': assetId,
                'baseline_id': baselineId,
                'tenant_id': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Baseline mode list
     * @param assetId
     * @param baselineId
     * @param tenantId
     * @returns BaselineMode
     * @throws ApiError
     */
    public static tenantsEmissionsAssetsBaselinesModesList(
        assetId: number,
        baselineId: number,
        tenantId: number,
    ): CancelablePromise<Array<BaselineMode>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/emissions/assets/{asset_id}/baselines/{baseline_id}/modes/',
            path: {
                'asset_id': assetId,
                'baseline_id': baselineId,
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Baseline phase list
     * @param assetId
     * @param baselineId
     * @param tenantId
     * @returns BaselinePhase
     * @throws ApiError
     */
    public static tenantsEmissionsAssetsBaselinesPhasesList(
        assetId: number,
        baselineId: number,
        tenantId: number,
    ): CancelablePromise<Array<BaselinePhase>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/emissions/assets/{asset_id}/baselines/{baseline_id}/phases/',
            path: {
                'asset_id': assetId,
                'baseline_id': baselineId,
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Update baseline
     * @param assetId
     * @param baselineId
     * @param tenantId
     * @param requestBody
     * @returns BaselineDetails
     * @throws ApiError
     */
    public static tenantsEmissionsAssetsBaselinesUpdateUpdate(
        assetId: number,
        baselineId: number,
        tenantId: number,
        requestBody: CreateUpdateBaseline,
    ): CancelablePromise<BaselineDetails> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tenants/{tenant_id}/emissions/assets/{asset_id}/baselines/{baseline_id}/update/',
            path: {
                'asset_id': assetId,
                'baseline_id': baselineId,
                'tenant_id': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Create baseline
     * @param assetId
     * @param tenantId
     * @param requestBody
     * @returns BaselineDetails
     * @throws ApiError
     */
    public static tenantsEmissionsAssetsBaselinesCreateCreate(
        assetId: number,
        tenantId: number,
        requestBody: CreateUpdateBaseline,
    ): CancelablePromise<BaselineDetails> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/emissions/assets/{asset_id}/baselines/create/',
            path: {
                'asset_id': assetId,
                'tenant_id': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Delete asset
     * @param assetId
     * @param tenantId
     * @returns void
     * @throws ApiError
     */
    public static tenantsEmissionsAssetsDeleteDestroy(
        assetId: number,
        tenantId: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/tenants/{tenant_id}/emissions/assets/{asset_id}/delete/',
            path: {
                'asset_id': assetId,
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Duplicate asset
     * @param assetId
     * @param tenantId
     * @returns AssetList
     * @throws ApiError
     */
    public static tenantsEmissionsAssetsDuplicateCreate(
        assetId: number,
        tenantId: number,
    ): CancelablePromise<AssetList> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/emissions/assets/{asset_id}/duplicate/',
            path: {
                'asset_id': assetId,
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Asset mode list
     * @param assetId
     * @param tenantId
     * @returns AssetMode
     * @throws ApiError
     */
    public static tenantsEmissionsAssetsModesList(
        assetId: number,
        tenantId: number,
    ): CancelablePromise<Array<AssetMode>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/emissions/assets/{asset_id}/modes/',
            path: {
                'asset_id': assetId,
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Update asset custom mode
     * @param assetId
     * @param customModeId
     * @param tenantId
     * @param requestBody
     * @returns AssetMode
     * @throws ApiError
     */
    public static tenantsEmissionsAssetsModesUpdateUpdate(
        assetId: number,
        customModeId: number,
        tenantId: number,
        requestBody: CreateUpdateCustomMode,
    ): CancelablePromise<AssetMode> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tenants/{tenant_id}/emissions/assets/{asset_id}/modes/{custom_mode_id}/update/',
            path: {
                'asset_id': assetId,
                'custom_mode_id': customModeId,
                'tenant_id': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Create asset custom mode
     * @param assetId
     * @param tenantId
     * @param requestBody
     * @returns AssetMode
     * @throws ApiError
     */
    public static tenantsEmissionsAssetsModesCreateCreate(
        assetId: number,
        tenantId: number,
        requestBody: CreateUpdateCustomMode,
    ): CancelablePromise<AssetMode> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/emissions/assets/{asset_id}/modes/create/',
            path: {
                'asset_id': assetId,
                'tenant_id': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Asset phase list
     * @param assetId
     * @param tenantId
     * @returns AssetPhase
     * @throws ApiError
     */
    public static tenantsEmissionsAssetsPhasesList(
        assetId: number,
        tenantId: number,
    ): CancelablePromise<Array<AssetPhase>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/emissions/assets/{asset_id}/phases/',
            path: {
                'asset_id': assetId,
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Update asset custom phase
     * @param assetId
     * @param customPhaseId
     * @param tenantId
     * @param requestBody
     * @returns AssetPhase
     * @throws ApiError
     */
    public static tenantsEmissionsAssetsPhasesUpdateUpdate(
        assetId: number,
        customPhaseId: number,
        tenantId: number,
        requestBody: CreateUpdateCustomPhase,
    ): CancelablePromise<AssetPhase> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tenants/{tenant_id}/emissions/assets/{asset_id}/phases/{custom_phase_id}/update/',
            path: {
                'asset_id': assetId,
                'custom_phase_id': customPhaseId,
                'tenant_id': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Create asset custom phase
     * @param assetId
     * @param tenantId
     * @param requestBody
     * @returns AssetPhase
     * @throws ApiError
     */
    public static tenantsEmissionsAssetsPhasesCreateCreate(
        assetId: number,
        tenantId: number,
        requestBody: CreateUpdateCustomPhase,
    ): CancelablePromise<AssetPhase> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/emissions/assets/{asset_id}/phases/create/',
            path: {
                'asset_id': assetId,
                'tenant_id': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Update asset
     * @param assetId
     * @param tenantId
     * @param requestBody
     * @returns AssetDetails
     * @throws ApiError
     */
    public static tenantsEmissionsAssetsUpdateUpdate(
        assetId: number,
        tenantId: number,
        requestBody: UpdateAsset,
    ): CancelablePromise<AssetDetails> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tenants/{tenant_id}/emissions/assets/{asset_id}/update/',
            path: {
                'asset_id': assetId,
                'tenant_id': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Complete asset list
     * Returns a list of non-draft assets
     * @param tenantId
     * @returns CompleteAssetList
     * @throws ApiError
     */
    public static tenantsEmissionsAssetsCompleteList(
        tenantId: number,
    ): CancelablePromise<Array<CompleteAssetList>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/emissions/assets/complete/',
            path: {
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Create asset
     * @param tenantId
     * @param requestBody
     * @returns AssetDetails
     * @throws ApiError
     */
    public static tenantsEmissionsAssetsCreateCreate(
        tenantId: number,
        requestBody: CreateAsset,
    ): CancelablePromise<AssetDetails> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/emissions/assets/create/',
            path: {
                'tenant_id': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Asset reference material
     * @param tenantId
     * @returns AssetReferenceMaterial
     * @throws ApiError
     */
    public static tenantsEmissionsAssetsReferenceMaterialRetrieve(
        tenantId: number,
    ): CancelablePromise<AssetReferenceMaterial> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/emissions/assets/reference-material/',
            path: {
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Paginated list of helicopter types
     * @param tenantId
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PaginatedHelicopterTypeListList
     * @throws ApiError
     */
    public static tenantsEmissionsHelicopterTypesList(
        tenantId: number,
        page?: number,
        pageSize?: number,
    ): CancelablePromise<PaginatedHelicopterTypeListList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/emissions/helicopter-types/',
            path: {
                'tenant_id': tenantId,
            },
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }

    /**
     * Delete helicopter type
     * @param helicopterTypeId
     * @param tenantId
     * @returns void
     * @throws ApiError
     */
    public static tenantsEmissionsHelicopterTypesDeleteDestroy(
        helicopterTypeId: number,
        tenantId: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/tenants/{tenant_id}/emissions/helicopter-types/{helicopter_type_id}/delete/',
            path: {
                'helicopter_type_id': helicopterTypeId,
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Update helicopter type
     * @param helicopterTypeId
     * @param tenantId
     * @param requestBody
     * @returns HelicopterTypeList
     * @throws ApiError
     */
    public static tenantsEmissionsHelicopterTypesUpdateUpdate(
        helicopterTypeId: number,
        tenantId: number,
        requestBody: CreateUpdateHelicopterType,
    ): CancelablePromise<HelicopterTypeList> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tenants/{tenant_id}/emissions/helicopter-types/{helicopter_type_id}/update/',
            path: {
                'helicopter_type_id': helicopterTypeId,
                'tenant_id': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * List of all helicopter types
     * @param tenantId
     * @returns AllHelicopterTypeList
     * @throws ApiError
     */
    public static tenantsEmissionsHelicopterTypesAllList(
        tenantId: number,
    ): CancelablePromise<Array<AllHelicopterTypeList>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/emissions/helicopter-types/all/',
            path: {
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Create helicopter type
     * @param tenantId
     * @param requestBody
     * @returns HelicopterTypeList
     * @throws ApiError
     */
    public static tenantsEmissionsHelicopterTypesCreateCreate(
        tenantId: number,
        requestBody: CreateUpdateHelicopterType,
    ): CancelablePromise<HelicopterTypeList> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/emissions/helicopter-types/create/',
            path: {
                'tenant_id': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Paginated list of material types
     * @param tenantId
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PaginatedMaterialTypeListList
     * @throws ApiError
     */
    public static tenantsEmissionsMaterialTypesList(
        tenantId: number,
        page?: number,
        pageSize?: number,
    ): CancelablePromise<PaginatedMaterialTypeListList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/emissions/material-types/',
            path: {
                'tenant_id': tenantId,
            },
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }

    /**
     * Delete material type
     * @param materialTypeId
     * @param tenantId
     * @returns void
     * @throws ApiError
     */
    public static tenantsEmissionsMaterialTypesDeleteDestroy(
        materialTypeId: number,
        tenantId: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/tenants/{tenant_id}/emissions/material-types/{material_type_id}/delete/',
            path: {
                'material_type_id': materialTypeId,
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Update material type
     * @param materialTypeId
     * @param tenantId
     * @param requestBody
     * @returns MaterialTypeList
     * @throws ApiError
     */
    public static tenantsEmissionsMaterialTypesUpdateUpdate(
        materialTypeId: number,
        tenantId: number,
        requestBody: UpdateMaterialType,
    ): CancelablePromise<MaterialTypeList> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tenants/{tenant_id}/emissions/material-types/{material_type_id}/update/',
            path: {
                'material_type_id': materialTypeId,
                'tenant_id': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * All material type list
     * @param tenantId
     * @returns AllMaterialTypeList
     * @throws ApiError
     */
    public static tenantsEmissionsMaterialTypesAllList(
        tenantId: number,
    ): CancelablePromise<Array<AllMaterialTypeList>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/emissions/material-types/all/',
            path: {
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Create material type
     * @param tenantId
     * @param requestBody
     * @returns MaterialTypeList
     * @throws ApiError
     */
    public static tenantsEmissionsMaterialTypesCreateCreate(
        tenantId: number,
        requestBody: CreateMaterialType,
    ): CancelablePromise<MaterialTypeList> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/emissions/material-types/create/',
            path: {
                'tenant_id': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Paginated list of vessel types
     * @param tenantId
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PaginatedVesselTypeListList
     * @throws ApiError
     */
    public static tenantsEmissionsVesselTypesList(
        tenantId: number,
        page?: number,
        pageSize?: number,
    ): CancelablePromise<PaginatedVesselTypeListList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/emissions/vessel-types/',
            path: {
                'tenant_id': tenantId,
            },
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }

    /**
     * Delete vessel type
     * @param tenantId
     * @param vesselTypeId
     * @returns void
     * @throws ApiError
     */
    public static tenantsEmissionsVesselTypesDeleteDestroy(
        tenantId: number,
        vesselTypeId: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/tenants/{tenant_id}/emissions/vessel-types/{vessel_type_id}/delete/',
            path: {
                'tenant_id': tenantId,
                'vessel_type_id': vesselTypeId,
            },
        });
    }

    /**
     * Update vessel type
     * @param tenantId
     * @param vesselTypeId
     * @param requestBody
     * @returns VesselTypeList
     * @throws ApiError
     */
    public static tenantsEmissionsVesselTypesUpdateUpdate(
        tenantId: number,
        vesselTypeId: number,
        requestBody: CreateUpdateVesselType,
    ): CancelablePromise<VesselTypeList> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tenants/{tenant_id}/emissions/vessel-types/{vessel_type_id}/update/',
            path: {
                'tenant_id': tenantId,
                'vessel_type_id': vesselTypeId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * List of all vessel types
     * @param tenantId
     * @returns AllVesselTypeList
     * @throws ApiError
     */
    public static tenantsEmissionsVesselTypesAllList(
        tenantId: number,
    ): CancelablePromise<Array<AllVesselTypeList>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/emissions/vessel-types/all/',
            path: {
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Create vessel type
     * @param tenantId
     * @param requestBody
     * @returns VesselTypeList
     * @throws ApiError
     */
    public static tenantsEmissionsVesselTypesCreateCreate(
        tenantId: number,
        requestBody: CreateUpdateVesselType,
    ): CancelablePromise<VesselTypeList> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/emissions/vessel-types/create/',
            path: {
                'tenant_id': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Well name list
     * @param tenantId
     * @returns WellNameList
     * @throws ApiError
     */
    public static tenantsEmissionsWellNamesList(
        tenantId: number,
    ): CancelablePromise<Array<WellNameList>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/emissions/well-names/',
            path: {
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Create well name
     * @param tenantId
     * @param requestBody
     * @returns WellNameList
     * @throws ApiError
     */
    public static tenantsEmissionsWellNamesCreateCreate(
        tenantId: number,
        requestBody: CreateWellName,
    ): CancelablePromise<WellNameList> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/emissions/well-names/create/',
            path: {
                'tenant_id': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Delete well complete helicopter use
     * @param completeHelicopterUseId
     * @param tenantId
     * @param wellPlannerId
     * @returns WellPlannerDetails
     * @throws ApiError
     */
    public static tenantsEmissionsWellsCompleteHelicopterUsesDeleteDestroy(
        completeHelicopterUseId: number,
        tenantId: number,
        wellPlannerId: number,
    ): CancelablePromise<WellPlannerDetails> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/tenants/{tenant_id}/emissions/wells/{well_planner_id}/complete/helicopter-uses/{complete_helicopter_use_id}/delete/',
            path: {
                'complete_helicopter_use_id': completeHelicopterUseId,
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
            },
        });
    }

    /**
     * Update well complete helicopter use
     * @param completeHelicopterUseId
     * @param tenantId
     * @param wellPlannerId
     * @param requestBody
     * @returns WellPlannerDetails
     * @throws ApiError
     */
    public static tenantsEmissionsWellsCompleteHelicopterUsesUpdateUpdate(
        completeHelicopterUseId: number,
        tenantId: number,
        wellPlannerId: number,
        requestBody: CreateUpdateCompleteHelicopterUse,
    ): CancelablePromise<WellPlannerDetails> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tenants/{tenant_id}/emissions/wells/{well_planner_id}/complete/helicopter-uses/{complete_helicopter_use_id}/update/',
            path: {
                'complete_helicopter_use_id': completeHelicopterUseId,
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Create well complete helicopter use
     * @param tenantId
     * @param wellPlannerId
     * @param requestBody
     * @returns WellPlannerDetails
     * @throws ApiError
     */
    public static tenantsEmissionsWellsCompleteHelicopterUsesCreateCreate(
        tenantId: number,
        wellPlannerId: number,
        requestBody: CreateUpdateCompleteHelicopterUse,
    ): CancelablePromise<WellPlannerDetails> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/emissions/wells/{well_planner_id}/complete/helicopter-uses/create/',
            path: {
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Delete well complete vessel use
     * @param completeVesselUseId
     * @param tenantId
     * @param wellPlannerId
     * @returns WellPlannerDetails
     * @throws ApiError
     */
    public static tenantsEmissionsWellsCompleteVesselUsesDeleteDestroy(
        completeVesselUseId: number,
        tenantId: number,
        wellPlannerId: number,
    ): CancelablePromise<WellPlannerDetails> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/tenants/{tenant_id}/emissions/wells/{well_planner_id}/complete/vessel-uses/{complete_vessel_use_id}/delete/',
            path: {
                'complete_vessel_use_id': completeVesselUseId,
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
            },
        });
    }

    /**
     * Update well complete vessel use
     * @param completeVesselUseId
     * @param tenantId
     * @param wellPlannerId
     * @param requestBody
     * @returns WellPlannerDetails
     * @throws ApiError
     */
    public static tenantsEmissionsWellsCompleteVesselUsesUpdateUpdate(
        completeVesselUseId: number,
        tenantId: number,
        wellPlannerId: number,
        requestBody: CreateUpdateCompleteVesselUse,
    ): CancelablePromise<WellPlannerDetails> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tenants/{tenant_id}/emissions/wells/{well_planner_id}/complete/vessel-uses/{complete_vessel_use_id}/update/',
            path: {
                'complete_vessel_use_id': completeVesselUseId,
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Create well complete vessel use
     * @param tenantId
     * @param wellPlannerId
     * @param requestBody
     * @returns WellPlannerDetails
     * @throws ApiError
     */
    public static tenantsEmissionsWellsCompleteVesselUsesCreateCreate(
        tenantId: number,
        wellPlannerId: number,
        requestBody: CreateUpdateCompleteVesselUse,
    ): CancelablePromise<WellPlannerDetails> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/emissions/wells/{well_planner_id}/complete/vessel-uses/create/',
            path: {
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Delete well
     * @param tenantId
     * @param wellPlannerId
     * @returns void
     * @throws ApiError
     */
    public static tenantsEmissionsWellsDeleteDestroy(
        tenantId: number,
        wellPlannerId: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/tenants/{tenant_id}/emissions/wells/{well_planner_id}/delete/',
            path: {
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
            },
        });
    }

    /**
     * Duplicate well
     * @param tenantId
     * @param wellPlannerId
     * @returns WellPlannerList
     * @throws ApiError
     */
    public static tenantsEmissionsWellsDuplicateCreate(
        tenantId: number,
        wellPlannerId: number,
    ): CancelablePromise<WellPlannerList> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/emissions/wells/{well_planner_id}/duplicate/',
            path: {
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
            },
        });
    }

    /**
     * Delete well planned helicopter use
     * @param plannedHelicopterUseId
     * @param tenantId
     * @param wellPlannerId
     * @returns WellPlannerDetails
     * @throws ApiError
     */
    public static tenantsEmissionsWellsPlannedHelicopterUsesDeleteDestroy(
        plannedHelicopterUseId: number,
        tenantId: number,
        wellPlannerId: number,
    ): CancelablePromise<WellPlannerDetails> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/tenants/{tenant_id}/emissions/wells/{well_planner_id}/planned/helicopter-uses/{planned_helicopter_use_id}/delete/',
            path: {
                'planned_helicopter_use_id': plannedHelicopterUseId,
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
            },
        });
    }

    /**
     * Update well planned helicopter use
     * @param plannedHelicopterUseId
     * @param tenantId
     * @param wellPlannerId
     * @param requestBody
     * @returns WellPlannerDetails
     * @throws ApiError
     */
    public static tenantsEmissionsWellsPlannedHelicopterUsesUpdateUpdate(
        plannedHelicopterUseId: number,
        tenantId: number,
        wellPlannerId: number,
        requestBody: CreateUpdatePlannedHelicopterUse,
    ): CancelablePromise<WellPlannerDetails> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tenants/{tenant_id}/emissions/wells/{well_planner_id}/planned/helicopter-uses/{planned_helicopter_use_id}/update/',
            path: {
                'planned_helicopter_use_id': plannedHelicopterUseId,
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Create well planned helicopter use
     * @param tenantId
     * @param wellPlannerId
     * @param requestBody
     * @returns WellPlannerDetails
     * @throws ApiError
     */
    public static tenantsEmissionsWellsPlannedHelicopterUsesCreateCreate(
        tenantId: number,
        wellPlannerId: number,
        requestBody: CreateUpdatePlannedHelicopterUse,
    ): CancelablePromise<WellPlannerDetails> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/emissions/wells/{well_planner_id}/planned/helicopter-uses/create/',
            path: {
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Update well planned start date
     * @param tenantId
     * @param wellPlannerId
     * @param requestBody
     * @returns WellPlannerDetails
     * @throws ApiError
     */
    public static tenantsEmissionsWellsPlannedStartDateUpdateUpdate(
        tenantId: number,
        wellPlannerId: number,
        requestBody: UpdateWellPlannedStartDate,
    ): CancelablePromise<WellPlannerDetails> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tenants/{tenant_id}/emissions/wells/{well_planner_id}/planned/start-date/update/',
            path: {
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Delete well planned vessel use
     * @param plannedVesselUseId
     * @param tenantId
     * @param wellPlannerId
     * @returns WellPlannerDetails
     * @throws ApiError
     */
    public static tenantsEmissionsWellsPlannedVesselUsesDeleteDestroy(
        plannedVesselUseId: number,
        tenantId: number,
        wellPlannerId: number,
    ): CancelablePromise<WellPlannerDetails> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/tenants/{tenant_id}/emissions/wells/{well_planner_id}/planned/vessel-uses/{planned_vessel_use_id}/delete/',
            path: {
                'planned_vessel_use_id': plannedVesselUseId,
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
            },
        });
    }

    /**
     * Update well planned vessel use
     * @param plannedVesselUseId
     * @param tenantId
     * @param wellPlannerId
     * @param requestBody
     * @returns WellPlannerDetails
     * @throws ApiError
     */
    public static tenantsEmissionsWellsPlannedVesselUsesUpdateUpdate(
        plannedVesselUseId: number,
        tenantId: number,
        wellPlannerId: number,
        requestBody: CreateUpdatePlannedVesselUse,
    ): CancelablePromise<WellPlannerDetails> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tenants/{tenant_id}/emissions/wells/{well_planner_id}/planned/vessel-uses/{planned_vessel_use_id}/update/',
            path: {
                'planned_vessel_use_id': plannedVesselUseId,
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Create well planned vessel use
     * @param tenantId
     * @param wellPlannerId
     * @param requestBody
     * @returns WellPlannerDetails
     * @throws ApiError
     */
    public static tenantsEmissionsWellsPlannedVesselUsesCreateCreate(
        tenantId: number,
        wellPlannerId: number,
        requestBody: CreateUpdatePlannedVesselUse,
    ): CancelablePromise<WellPlannerDetails> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/emissions/wells/{well_planner_id}/planned/vessel-uses/create/',
            path: {
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Update well
     * @param tenantId
     * @param wellPlannerId
     * @param requestBody
     * @returns WellPlannerDetails
     * @throws ApiError
     */
    public static tenantsEmissionsWellsUpdateUpdate(
        tenantId: number,
        wellPlannerId: number,
        requestBody: CreateUpdateWell,
    ): CancelablePromise<WellPlannerDetails> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tenants/{tenant_id}/emissions/wells/{well_planner_id}/update/',
            path: {
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Create well
     * @param tenantId
     * @param requestBody
     * @returns WellPlannerDetails
     * @throws ApiError
     */
    public static tenantsEmissionsWellsCreateCreate(
        tenantId: number,
        requestBody: CreateUpdateWell,
    ): CancelablePromise<WellPlannerDetails> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/emissions/wells/create/',
            path: {
                'tenant_id': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Concept emp element list
     * @param tenantId
     * @returns ConceptEMPElement
     * @throws ApiError
     */
    public static tenantsEmpsList(
        tenantId: number,
    ): CancelablePromise<Array<ConceptEMPElement>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/emps/',
            path: {
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Check invitation
     * @param tenantId
     * @param token
     * @returns TenantInvitation
     * @throws ApiError
     */
    public static tenantsInvitationsRetrieve(
        tenantId: number,
        token: string,
    ): CancelablePromise<TenantInvitation> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/invitations/{token}/',
            path: {
                'tenant_id': tenantId,
                'token': token,
            },
        });
    }

    /**
     * Accept invitation
     * @param tenantId
     * @param token
     * @returns void
     * @throws ApiError
     */
    public static tenantsInvitationsAcceptCreate(
        tenantId: number,
        token: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/invitations/{token}/accept/',
            path: {
                'tenant_id': tenantId,
                'token': token,
            },
        });
    }

    /**
     * Sign up from invitation
     * @param tenantId
     * @param token
     * @param requestBody
     * @returns Me
     * @throws ApiError
     */
    public static tenantsInvitationsSignupCreate(
        tenantId: number,
        token: string,
        requestBody: TenantInvitationSignup,
    ): CancelablePromise<Me> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/invitations/{token}/signup/',
            path: {
                'tenant_id': tenantId,
                'token': token,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Log in
     * @param tenantId
     * @param requestBody
     * @returns Me
     * @throws ApiError
     */
    public static tenantsLoginCreate(
        tenantId: number,
        requestBody: Login,
    ): CancelablePromise<Me> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/login/',
            path: {
                'tenant_id': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Log out
     * @param tenantId
     * @returns void
     * @throws ApiError
     */
    public static tenantsLogoutCreate(
        tenantId: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/logout/',
            path: {
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Get current user details
     * @param tenantId
     * @returns Me
     * @throws ApiError
     */
    public static tenantsMeRetrieve(
        tenantId: number,
    ): CancelablePromise<Me> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/me/',
            path: {
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * @param tenantId
     * @param formData
     * @returns Me
     * @throws ApiError
     */
    public static tenantsMeAvatarCreate(
        tenantId: number,
        formData?: {
            profile_image?: Blob;
        },
    ): CancelablePromise<Me> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/me/avatar/',
            path: {
                'tenant_id': tenantId,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }

    /**
     * @param tenantId
     * @returns void
     * @throws ApiError
     */
    public static tenantsMeAvatarDeleteDestroy(
        tenantId: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/tenants/{tenant_id}/me/avatar/delete/',
            path: {
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Get lockout status
     * @param tenantId
     * @returns Locked
     * @throws ApiError
     */
    public static tenantsMeLockedRetrieve(
        tenantId: number,
    ): CancelablePromise<Locked> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/me/locked/',
            path: {
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Change password
     * @param tenantId
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static tenantsMePasswordCreate(
        tenantId: number,
        requestBody: PasswordChange,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/me/password/',
            path: {
                'tenant_id': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Update current user details
     * @param tenantId
     * @param requestBody
     * @returns Me
     * @throws ApiError
     */
    public static tenantsMeUpdateCreate(
        tenantId: number,
        requestBody?: MeUpdate,
    ): CancelablePromise<Me> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/me/update/',
            path: {
                'tenant_id': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Monitor list
     * @param tenantId
     * @param ordering Which field to use when ordering the results.
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PaginatedMonitorListList
     * @throws ApiError
     */
    public static tenantsMonitorsList(
        tenantId: number,
        ordering?: string,
        page?: number,
        pageSize?: number,
    ): CancelablePromise<PaginatedMonitorListList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/monitors/',
            path: {
                'tenant_id': tenantId,
            },
            query: {
                'ordering': ordering,
                'page': page,
                'page_size': pageSize,
            },
        });
    }

    /**
     * Monitor details
     * @param monitorId
     * @param tenantId
     * @returns MonitorDetails
     * @throws ApiError
     */
    public static tenantsMonitorsRetrieve(
        monitorId: number,
        tenantId: number,
    ): CancelablePromise<MonitorDetails> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/monitors/{monitor_id}/',
            path: {
                'monitor_id': monitorId,
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Monitor element dataset list
     * @param elementId
     * @param monitorId
     * @param tenantId
     * @param type
     * @param format
     * @returns MonitorElementDataset
     * @throws ApiError
     */
    public static tenantsMonitorsElementsList(
        elementId: number,
        monitorId: number,
        tenantId: number,
        type: 'DAILY' | 'CUMULATIVE',
        format?: 'csv' | 'json',
    ): CancelablePromise<Array<MonitorElementDataset>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/monitors/{monitor_id}/elements/{element_id}/',
            path: {
                'element_id': elementId,
                'monitor_id': monitorId,
                'tenant_id': tenantId,
            },
            query: {
                'format': format,
                'type': type,
            },
        });
    }

    /**
     * Notification list
     * @param tenantId
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PaginatedNotificationListList
     * @throws ApiError
     */
    public static tenantsNotificationsList(
        tenantId: number,
        page?: number,
        pageSize?: number,
    ): CancelablePromise<PaginatedNotificationListList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/notifications/',
            path: {
                'tenant_id': tenantId,
            },
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }

    /**
     * Mark notification as read
     * @param notificationId
     * @param tenantId
     * @returns void
     * @throws ApiError
     */
    public static tenantsNotificationsReadCreate2(
        notificationId: number,
        tenantId: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/notifications/{notification_id}/read/',
            path: {
                'notification_id': notificationId,
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Mark all notifications as read
     * @param tenantId
     * @returns void
     * @throws ApiError
     */
    public static tenantsNotificationsReadCreate(
        tenantId: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/notifications/read/',
            path: {
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Number of unread notifications
     * @param tenantId
     * @returns UnreadNotifications
     * @throws ApiError
     */
    public static tenantsNotificationsUnreadRetrieve(
        tenantId: number,
    ): CancelablePromise<UnreadNotifications> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/notifications/unread/',
            path: {
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Reset password
     * @param tenantId
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static tenantsPasswordResetCreate(
        tenantId: number,
        requestBody: PasswordReset,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/password-reset/',
            path: {
                'tenant_id': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Validate password reset token
     * @param tenantId
     * @param token
     * @param uid
     * @returns void
     * @throws ApiError
     */
    public static tenantsPasswordResetRetrieve(
        tenantId: number,
        token: string,
        uid: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/password-reset/{uid}/{token}/',
            path: {
                'tenant_id': tenantId,
                'token': token,
                'uid': uid,
            },
        });
    }

    /**
     * Set a new password
     * @param tenantId
     * @param token
     * @param uid
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static tenantsPasswordResetChangeCreate(
        tenantId: number,
        token: string,
        uid: string,
        requestBody: PasswordResetChangePassword,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/password-reset/{uid}/{token}/change/',
            path: {
                'tenant_id': tenantId,
                'token': token,
                'uid': uid,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Latest policy accept
     * @param tenantId
     * @returns void
     * @throws ApiError
     */
    public static tenantsPoliciesLatestAcceptCreate(
        tenantId: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/policies/latest/accept/',
            path: {
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Project list
     * @param tenantId
     * @param ordering Which field to use when ordering the results.
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PaginatedProjectListList
     * @throws ApiError
     */
    public static tenantsProjectsList(
        tenantId: number,
        ordering?: string,
        page?: number,
        pageSize?: number,
    ): CancelablePromise<PaginatedProjectListList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/projects/',
            path: {
                'tenant_id': tenantId,
            },
            query: {
                'ordering': ordering,
                'page': page,
                'page_size': pageSize,
            },
        });
    }

    /**
     * Project details
     * @param projectId
     * @param tenantId
     * @returns ProjectDetails
     * @throws ApiError
     */
    public static tenantsProjectsRetrieve(
        projectId: number,
        tenantId: number,
    ): CancelablePromise<ProjectDetails> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/projects/{project_id}/',
            path: {
                'project_id': projectId,
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Delete project
     * @param projectId
     * @param tenantId
     * @returns void
     * @throws ApiError
     */
    public static tenantsProjectsDeleteDestroy(
        projectId: number,
        tenantId: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/tenants/{tenant_id}/projects/{project_id}/delete/',
            path: {
                'project_id': projectId,
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Project plan list
     * @param projectId
     * @param tenantId
     * @param ordering Which field to use when ordering the results.
     * @returns PlanList
     * @throws ApiError
     */
    public static tenantsProjectsPlansList(
        projectId: number,
        tenantId: number,
        ordering?: string,
    ): CancelablePromise<Array<PlanList>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/projects/{project_id}/plans/',
            path: {
                'project_id': projectId,
                'tenant_id': tenantId,
            },
            query: {
                'ordering': ordering,
            },
        });
    }

    /**
     * Plan details
     * @param planId
     * @param projectId
     * @param tenantId
     * @returns PlanDetails
     * @throws ApiError
     */
    public static tenantsProjectsPlansRetrieve(
        planId: number,
        projectId: number,
        tenantId: number,
    ): CancelablePromise<PlanDetails> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/projects/{project_id}/plans/{plan_id}/',
            path: {
                'plan_id': planId,
                'project_id': projectId,
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Delete project plan
     * @param planId
     * @param projectId
     * @param tenantId
     * @returns void
     * @throws ApiError
     */
    public static tenantsProjectsPlansDeleteDestroy(
        planId: number,
        projectId: number,
        tenantId: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/tenants/{tenant_id}/projects/{project_id}/plans/{plan_id}/delete/',
            path: {
                'plan_id': planId,
                'project_id': projectId,
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Update project plan
     * @param planId
     * @param projectId
     * @param tenantId
     * @param requestBody
     * @returns PlanDetails
     * @throws ApiError
     */
    public static tenantsProjectsPlansUpdateUpdate(
        planId: number,
        projectId: number,
        tenantId: number,
        requestBody: CreateUpdatePlan,
    ): CancelablePromise<PlanDetails> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tenants/{tenant_id}/projects/{project_id}/plans/{plan_id}/update/',
            path: {
                'plan_id': planId,
                'project_id': projectId,
                'tenant_id': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Create project plan
     * @param projectId
     * @param tenantId
     * @param requestBody
     * @returns PlanDetails
     * @throws ApiError
     */
    public static tenantsProjectsPlansCreateCreate(
        projectId: number,
        tenantId: number,
        requestBody: CreateUpdatePlan,
    ): CancelablePromise<PlanDetails> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/projects/{project_id}/plans/create/',
            path: {
                'project_id': projectId,
                'tenant_id': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Project rig list
     * @param projectId
     * @param tenantId
     * @param draft
     * @param ordering Which field to use when ordering the results.
     * @param studiable Studiable
     * @returns CustomRigList
     * @throws ApiError
     */
    public static tenantsProjectsRigsList(
        projectId: number,
        tenantId: number,
        draft?: boolean,
        ordering?: string,
        studiable?: boolean,
    ): CancelablePromise<Array<CustomRigList>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/projects/{project_id}/rigs/',
            path: {
                'project_id': projectId,
                'tenant_id': tenantId,
            },
            query: {
                'draft': draft,
                'ordering': ordering,
                'studiable': studiable,
            },
        });
    }

    /**
     * Retrieve project rig emp details
     * @param projectId
     * @param rigId
     * @param rigType
     * @param tenantId
     * @returns EMP
     * @throws ApiError
     */
    public static tenantsProjectsRigsEmpRetrieve(
        projectId: number,
        rigId: number,
        rigType: string,
        tenantId: number,
    ): CancelablePromise<EMP> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/projects/{project_id}/rigs/{rig_type}/{rig_id}/emp/',
            path: {
                'project_id': projectId,
                'rig_id': rigId,
                'rig_type': rigType,
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Create project rig emp
     * @param projectId
     * @param rigId
     * @param rigType
     * @param tenantId
     * @param requestBody
     * @returns EMP
     * @throws ApiError
     */
    public static tenantsProjectsRigsEmpCreateCreate(
        projectId: number,
        rigId: number,
        rigType: string,
        tenantId: number,
        requestBody: CreateUpdateEMP,
    ): CancelablePromise<EMP> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/projects/{project_id}/rigs/{rig_type}/{rig_id}/emp/create/',
            path: {
                'project_id': projectId,
                'rig_id': rigId,
                'rig_type': rigType,
                'tenant_id': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Delete project rig emp
     * @param projectId
     * @param rigId
     * @param rigType
     * @param tenantId
     * @returns void
     * @throws ApiError
     */
    public static tenantsProjectsRigsEmpDeleteDestroy(
        projectId: number,
        rigId: number,
        rigType: string,
        tenantId: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/tenants/{tenant_id}/projects/{project_id}/rigs/{rig_type}/{rig_id}/emp/delete/',
            path: {
                'project_id': projectId,
                'rig_id': rigId,
                'rig_type': rigType,
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Update project rig emp
     * @param projectId
     * @param rigId
     * @param rigType
     * @param tenantId
     * @param requestBody
     * @returns EMP
     * @throws ApiError
     */
    public static tenantsProjectsRigsEmpUpdateUpdate(
        projectId: number,
        rigId: number,
        rigType: string,
        tenantId: number,
        requestBody: CreateUpdateEMP,
    ): CancelablePromise<EMP> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tenants/{tenant_id}/projects/{project_id}/rigs/{rig_type}/{rig_id}/emp/update/',
            path: {
                'project_id': projectId,
                'rig_id': rigId,
                'rig_type': rigType,
                'tenant_id': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Update project
     * @param projectId
     * @param tenantId
     * @param requestBody
     * @returns ProjectDetails
     * @throws ApiError
     */
    public static tenantsProjectsUpdateUpdate(
        projectId: number,
        tenantId: number,
        requestBody: CreateUpdateProject,
    ): CancelablePromise<ProjectDetails> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tenants/{tenant_id}/projects/{project_id}/update/',
            path: {
                'project_id': projectId,
                'tenant_id': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Project well list
     * @param projectId
     * @param tenantId
     * @param draft
     * @param ordering Which field to use when ordering the results.
     * @returns CustomWellList
     * @throws ApiError
     */
    public static tenantsProjectsWellsList(
        projectId: number,
        tenantId: number,
        draft?: boolean,
        ordering?: string,
    ): CancelablePromise<Array<CustomWellList>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/projects/{project_id}/wells/',
            path: {
                'project_id': projectId,
                'tenant_id': tenantId,
            },
            query: {
                'draft': draft,
                'ordering': ordering,
            },
        });
    }

    /**
     * Create project
     * @param tenantId
     * @param requestBody
     * @returns ProjectDetails
     * @throws ApiError
     */
    public static tenantsProjectsCreateCreate(
        tenantId: number,
        requestBody: CreateUpdateProject,
    ): CancelablePromise<ProjectDetails> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/projects/create/',
            path: {
                'tenant_id': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Concept drillship list
     * @param tenantId
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PaginatedRigListList
     * @throws ApiError
     */
    public static tenantsRigsConceptDrillshipList(
        tenantId: number,
        page?: number,
        pageSize?: number,
    ): CancelablePromise<PaginatedRigListList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/rigs/concept/drillship/',
            path: {
                'tenant_id': tenantId,
            },
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }

    /**
     * Concept drillship details
     * @param rigId
     * @param tenantId
     * @returns ConceptDrillshipDetails
     * @throws ApiError
     */
    public static tenantsRigsConceptDrillshipRetrieve(
        rigId: number,
        tenantId: number,
    ): CancelablePromise<ConceptDrillshipDetails> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/rigs/concept/drillship/{rig_id}/',
            path: {
                'rig_id': rigId,
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Concept jackup rig list
     * @param tenantId
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PaginatedRigListList
     * @throws ApiError
     */
    public static tenantsRigsConceptJackupList(
        tenantId: number,
        page?: number,
        pageSize?: number,
    ): CancelablePromise<PaginatedRigListList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/rigs/concept/jackup/',
            path: {
                'tenant_id': tenantId,
            },
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }

    /**
     * Concept jackup rig details
     * @param rigId
     * @param tenantId
     * @returns ConceptJackupRigDetails
     * @throws ApiError
     */
    public static tenantsRigsConceptJackupRetrieve(
        rigId: number,
        tenantId: number,
    ): CancelablePromise<ConceptJackupRigDetails> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/rigs/concept/jackup/{rig_id}/',
            path: {
                'rig_id': rigId,
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Concept semi rig list
     * @param tenantId
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PaginatedRigListList
     * @throws ApiError
     */
    public static tenantsRigsConceptSemiList(
        tenantId: number,
        page?: number,
        pageSize?: number,
    ): CancelablePromise<PaginatedRigListList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/rigs/concept/semi/',
            path: {
                'tenant_id': tenantId,
            },
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }

    /**
     * Concept semi rig details
     * @param rigId
     * @param tenantId
     * @returns ConceptSemiRigDetails
     * @throws ApiError
     */
    public static tenantsRigsConceptSemiRetrieve(
        rigId: number,
        tenantId: number,
    ): CancelablePromise<ConceptSemiRigDetails> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/rigs/concept/semi/{rig_id}/',
            path: {
                'rig_id': rigId,
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Custom rig list
     * @param tenantId
     * @param draft
     * @param latest
     * @param ordering Which field to use when ordering the results.
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PaginatedCustomRigListList
     * @throws ApiError
     */
    public static tenantsRigsCustomList(
        tenantId: number,
        draft?: boolean,
        latest?: boolean,
        ordering?: string,
        page?: number,
        pageSize?: number,
    ): CancelablePromise<PaginatedCustomRigListList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/rigs/custom/',
            path: {
                'tenant_id': tenantId,
            },
            query: {
                'draft': draft,
                'latest': latest,
                'ordering': ordering,
                'page': page,
                'page_size': pageSize,
            },
        });
    }

    /**
     * Custom drillship list
     * @param tenantId
     * @param draft
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PaginatedRigListList
     * @throws ApiError
     */
    public static tenantsRigsCustomDrillshipList(
        tenantId: number,
        draft?: boolean,
        page?: number,
        pageSize?: number,
    ): CancelablePromise<PaginatedRigListList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/rigs/custom/drillship/',
            path: {
                'tenant_id': tenantId,
            },
            query: {
                'draft': draft,
                'page': page,
                'page_size': pageSize,
            },
        });
    }

    /**
     * Custom drillship details
     * @param rigId
     * @param tenantId
     * @returns CustomDrillshipDetails
     * @throws ApiError
     */
    public static tenantsRigsCustomDrillshipRetrieve(
        rigId: number,
        tenantId: number,
    ): CancelablePromise<CustomDrillshipDetails> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/rigs/custom/drillship/{rig_id}/',
            path: {
                'rig_id': rigId,
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Delete custom drillship
     * @param rigId
     * @param tenantId
     * @returns void
     * @throws ApiError
     */
    public static tenantsRigsCustomDrillshipDeleteDestroy(
        rigId: number,
        tenantId: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/tenants/{tenant_id}/rigs/custom/drillship/{rig_id}/delete/',
            path: {
                'rig_id': rigId,
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Update custom drillship
     * @param rigId
     * @param tenantId
     * @param requestBody
     * @returns CustomDrillshipDetails
     * @throws ApiError
     */
    public static tenantsRigsCustomDrillshipUpdateUpdate(
        rigId: number,
        tenantId: number,
        requestBody: UpdateCustomDrillship,
    ): CancelablePromise<CustomDrillshipDetails> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tenants/{tenant_id}/rigs/custom/drillship/{rig_id}/update/',
            path: {
                'rig_id': rigId,
                'tenant_id': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Create custom drillship
     * @param tenantId
     * @param requestBody
     * @returns CustomDrillshipDetails
     * @throws ApiError
     */
    public static tenantsRigsCustomDrillshipCreateCreate(
        tenantId: number,
        requestBody: CreateCustomDrillship,
    ): CancelablePromise<CustomDrillshipDetails> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/rigs/custom/drillship/create/',
            path: {
                'tenant_id': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Custom jackup rig list
     * @param tenantId
     * @param draft
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PaginatedRigListList
     * @throws ApiError
     */
    public static tenantsRigsCustomJackupList(
        tenantId: number,
        draft?: boolean,
        page?: number,
        pageSize?: number,
    ): CancelablePromise<PaginatedRigListList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/rigs/custom/jackup/',
            path: {
                'tenant_id': tenantId,
            },
            query: {
                'draft': draft,
                'page': page,
                'page_size': pageSize,
            },
        });
    }

    /**
     * Custom jackup rig details
     * @param rigId
     * @param tenantId
     * @returns CustomJackupRigDetails
     * @throws ApiError
     */
    public static tenantsRigsCustomJackupRetrieve(
        rigId: number,
        tenantId: number,
    ): CancelablePromise<CustomJackupRigDetails> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/rigs/custom/jackup/{rig_id}/',
            path: {
                'rig_id': rigId,
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Delete custom jackup rig
     * @param rigId
     * @param tenantId
     * @returns void
     * @throws ApiError
     */
    public static tenantsRigsCustomJackupDeleteDestroy(
        rigId: number,
        tenantId: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/tenants/{tenant_id}/rigs/custom/jackup/{rig_id}/delete/',
            path: {
                'rig_id': rigId,
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Update custom jackup rig
     * @param rigId
     * @param tenantId
     * @param requestBody
     * @returns CustomJackupRigDetails
     * @throws ApiError
     */
    public static tenantsRigsCustomJackupUpdateUpdate(
        rigId: number,
        tenantId: number,
        requestBody: UpdateCustomJackupRig,
    ): CancelablePromise<CustomJackupRigDetails> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tenants/{tenant_id}/rigs/custom/jackup/{rig_id}/update/',
            path: {
                'rig_id': rigId,
                'tenant_id': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Create custom jackup rig
     * @param tenantId
     * @param requestBody
     * @returns CustomJackupRigDetails
     * @throws ApiError
     */
    public static tenantsRigsCustomJackupCreateCreate(
        tenantId: number,
        requestBody: CreateCustomJackupRigDraft,
    ): CancelablePromise<CustomJackupRigDetails> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/rigs/custom/jackup/create/',
            path: {
                'tenant_id': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Custom semi rig list
     * @param tenantId
     * @param draft
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PaginatedRigListList
     * @throws ApiError
     */
    public static tenantsRigsCustomSemiList(
        tenantId: number,
        draft?: boolean,
        page?: number,
        pageSize?: number,
    ): CancelablePromise<PaginatedRigListList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/rigs/custom/semi/',
            path: {
                'tenant_id': tenantId,
            },
            query: {
                'draft': draft,
                'page': page,
                'page_size': pageSize,
            },
        });
    }

    /**
     * Custom semi rig details
     * @param rigId
     * @param tenantId
     * @returns CustomSemiRigDetails
     * @throws ApiError
     */
    public static tenantsRigsCustomSemiRetrieve(
        rigId: number,
        tenantId: number,
    ): CancelablePromise<CustomSemiRigDetails> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/rigs/custom/semi/{rig_id}/',
            path: {
                'rig_id': rigId,
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Delete custom semi rig
     * @param rigId
     * @param tenantId
     * @returns void
     * @throws ApiError
     */
    public static tenantsRigsCustomSemiDeleteDestroy(
        rigId: number,
        tenantId: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/tenants/{tenant_id}/rigs/custom/semi/{rig_id}/delete/',
            path: {
                'rig_id': rigId,
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Update custom semi rig
     * @param rigId
     * @param tenantId
     * @param requestBody
     * @returns CustomSemiRigDetails
     * @throws ApiError
     */
    public static tenantsRigsCustomSemiUpdateUpdate(
        rigId: number,
        tenantId: number,
        requestBody: UpdateCustomSemiRig,
    ): CancelablePromise<CustomSemiRigDetails> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tenants/{tenant_id}/rigs/custom/semi/{rig_id}/update/',
            path: {
                'rig_id': rigId,
                'tenant_id': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Create custom semi rig
     * @param tenantId
     * @param requestBody
     * @returns CustomSemiRigDetails
     * @throws ApiError
     */
    public static tenantsRigsCustomSemiCreateCreate(
        tenantId: number,
        requestBody: CreateCustomSemiRig,
    ): CancelablePromise<CustomSemiRigDetails> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/rigs/custom/semi/create/',
            path: {
                'tenant_id': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Search
     * @param query
     * @param tenantId
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PaginatedSearchResultList
     * @throws ApiError
     */
    public static tenantsSearchList(
        query: string,
        tenantId: number,
        page?: number,
        pageSize?: number,
    ): CancelablePromise<PaginatedSearchResultList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/search/',
            path: {
                'tenant_id': tenantId,
            },
            query: {
                'page': page,
                'page_size': pageSize,
                'query': query,
            },
        });
    }

    /**
     * Study element list
     * @param projectId
     * @param tenantId
     * @returns StudyElementList
     * @throws ApiError
     */
    public static tenantsStudiesElementsList(
        projectId: number,
        tenantId: number,
    ): CancelablePromise<Array<StudyElementList>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/studies/{project_id}/elements/',
            path: {
                'project_id': projectId,
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Study element details
     * @param elementId
     * @param projectId
     * @param tenantId
     * @returns StudyElement
     * @throws ApiError
     */
    public static tenantsStudiesElementsRetrieve(
        elementId: number,
        projectId: number,
        tenantId: number,
    ): CancelablePromise<StudyElement> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/studies/{project_id}/elements/{element_id}/',
            path: {
                'element_id': elementId,
                'project_id': projectId,
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Delete study element
     * @param elementId
     * @param projectId
     * @param tenantId
     * @returns void
     * @throws ApiError
     */
    public static tenantsStudiesElementsDeleteDestroy(
        elementId: number,
        projectId: number,
        tenantId: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/tenants/{tenant_id}/studies/{project_id}/elements/{element_id}/delete/',
            path: {
                'element_id': elementId,
                'project_id': projectId,
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Update study element
     * @param elementId
     * @param projectId
     * @param tenantId
     * @param requestBody
     * @returns StudyElementList
     * @throws ApiError
     */
    public static tenantsStudiesElementsUpdateUpdate(
        elementId: number,
        projectId: number,
        tenantId: number,
        requestBody: CreateUpdateStudyElement,
    ): CancelablePromise<StudyElementList> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tenants/{tenant_id}/studies/{project_id}/elements/{element_id}/update/',
            path: {
                'element_id': elementId,
                'project_id': projectId,
                'tenant_id': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Create study element
     * @param projectId
     * @param tenantId
     * @param requestBody
     * @returns StudyElementList
     * @throws ApiError
     */
    public static tenantsStudiesElementsCreateCreate(
        projectId: number,
        tenantId: number,
        requestBody: CreateUpdateStudyElement,
    ): CancelablePromise<StudyElementList> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/studies/{project_id}/elements/create/',
            path: {
                'project_id': projectId,
                'tenant_id': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Swap study elements
     * @param projectId
     * @param tenantId
     * @param requestBody
     * @returns SwappedStudyElements
     * @throws ApiError
     */
    public static tenantsStudiesElementsSwapCreate(
        projectId: number,
        tenantId: number,
        requestBody: SwapStudyElements,
    ): CancelablePromise<SwappedStudyElements> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/studies/{project_id}/elements/swap/',
            path: {
                'project_id': projectId,
                'tenant_id': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Study metric list
     * @param tenantId
     * @returns StudyMetric
     * @throws ApiError
     */
    public static tenantsStudiesMetricsList(
        tenantId: number,
    ): CancelablePromise<Array<StudyMetric>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/studies/metrics/',
            path: {
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * @param tenantId
     * @returns Faq
     * @throws ApiError
     */
    public static tenantsSupportFaqList(
        tenantId: number,
    ): CancelablePromise<Array<Faq>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/support/faq/',
            path: {
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Concept well list
     * @param tenantId
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PaginatedConceptWellListList
     * @throws ApiError
     */
    public static tenantsWellsConceptList(
        tenantId: number,
        page?: number,
        pageSize?: number,
    ): CancelablePromise<PaginatedConceptWellListList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/wells/concept/',
            path: {
                'tenant_id': tenantId,
            },
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }

    /**
     * Concept well details
     * @param tenantId
     * @param wellId
     * @returns ConceptWellDetails
     * @throws ApiError
     */
    public static tenantsWellsConceptRetrieve(
        tenantId: number,
        wellId: number,
    ): CancelablePromise<ConceptWellDetails> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/wells/concept/{well_id}/',
            path: {
                'tenant_id': tenantId,
                'well_id': wellId,
            },
        });
    }

    /**
     * Custom well list
     * @param tenantId
     * @param draft
     * @param latest
     * @param ordering Which field to use when ordering the results.
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PaginatedCustomWellListList
     * @throws ApiError
     */
    public static tenantsWellsCustomList(
        tenantId: number,
        draft?: boolean,
        latest?: boolean,
        ordering?: string,
        page?: number,
        pageSize?: number,
    ): CancelablePromise<PaginatedCustomWellListList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/wells/custom/',
            path: {
                'tenant_id': tenantId,
            },
            query: {
                'draft': draft,
                'latest': latest,
                'ordering': ordering,
                'page': page,
                'page_size': pageSize,
            },
        });
    }

    /**
     * Custom well details
     * @param tenantId
     * @param wellId
     * @returns CustomWellDetails
     * @throws ApiError
     */
    public static tenantsWellsCustomRetrieve(
        tenantId: number,
        wellId: number,
    ): CancelablePromise<CustomWellDetails> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/wells/custom/{well_id}/',
            path: {
                'tenant_id': tenantId,
                'well_id': wellId,
            },
        });
    }

    /**
     * Delete custom well
     * @param tenantId
     * @param wellId
     * @returns void
     * @throws ApiError
     */
    public static tenantsWellsCustomDeleteDestroy(
        tenantId: number,
        wellId: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/tenants/{tenant_id}/wells/custom/{well_id}/delete/',
            path: {
                'tenant_id': tenantId,
                'well_id': wellId,
            },
        });
    }

    /**
     * Update custom well
     * @param tenantId
     * @param wellId
     * @param requestBody
     * @returns CustomWellDetails
     * @throws ApiError
     */
    public static tenantsWellsCustomUpdateUpdate(
        tenantId: number,
        wellId: number,
        requestBody: UpdateCustomWell,
    ): CancelablePromise<CustomWellDetails> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tenants/{tenant_id}/wells/custom/{well_id}/update/',
            path: {
                'tenant_id': tenantId,
                'well_id': wellId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Create custom well
     * @param tenantId
     * @param requestBody
     * @returns CustomWellDetails
     * @throws ApiError
     */
    public static tenantsWellsCustomCreateCreate(
        tenantId: number,
        requestBody: CreateCustomWell,
    ): CancelablePromise<CustomWellDetails> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/wells/custom/create/',
            path: {
                'tenant_id': tenantId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Well planner list
     * @param tenantId
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PaginatedWellPlannerListList
     * @throws ApiError
     */
    public static tenantsWellsPlannersList(
        tenantId: number,
        page?: number,
        pageSize?: number,
    ): CancelablePromise<PaginatedWellPlannerListList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/wells/planners/',
            path: {
                'tenant_id': tenantId,
            },
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }

    /**
     * Get well planner details
     * @param tenantId
     * @param wellPlannerId
     * @returns WellPlannerDetails
     * @throws ApiError
     */
    public static tenantsWellsPlannersRetrieve(
        tenantId: number,
        wellPlannerId: number,
    ): CancelablePromise<WellPlannerDetails> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/wells/planners/{well_planner_id}/',
            path: {
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
            },
        });
    }

    /**
     * Complete well planner complete
     * @param tenantId
     * @param wellPlannerId
     * @returns WellPlannerDetails
     * @throws ApiError
     */
    public static tenantsWellsPlannersCompleteCompleteCreate(
        tenantId: number,
        wellPlannerId: number,
    ): CancelablePromise<WellPlannerDetails> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/wells/planners/{well_planner_id}/complete/complete/',
            path: {
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
            },
        });
    }

    /**
     * Approve well planner complete helicopter uses
     * @param tenantId
     * @param wellPlannerId
     * @param requestBody
     * @returns WellPlannerDetails
     * @throws ApiError
     */
    public static tenantsWellsPlannersCompleteHelicopterUsesApproveUpdate(
        tenantId: number,
        wellPlannerId: number,
        requestBody: ApproveWellPlannerCompleteHelicopterUses,
    ): CancelablePromise<WellPlannerDetails> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tenants/{tenant_id}/wells/planners/{well_planner_id}/complete/helicopter-uses/approve/',
            path: {
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Update well planner actual start date
     * @param tenantId
     * @param wellPlannerId
     * @param requestBody
     * @returns WellPlannerDetails
     * @throws ApiError
     */
    public static tenantsWellsPlannersCompleteStartDateUpdateUpdate(
        tenantId: number,
        wellPlannerId: number,
        requestBody: UpdateWellPlannerActualStartDate,
    ): CancelablePromise<WellPlannerDetails> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tenants/{tenant_id}/wells/planners/{well_planner_id}/complete/start-date/update/',
            path: {
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Delete well planner complete step
     * @param tenantId
     * @param wellPlannerCompleteStepId
     * @param wellPlannerId
     * @returns void
     * @throws ApiError
     */
    public static tenantsWellsPlannersCompleteStepsDeleteDestroy(
        tenantId: number,
        wellPlannerCompleteStepId: number,
        wellPlannerId: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/tenants/{tenant_id}/wells/planners/{well_planner_id}/complete/steps/{well_planner_complete_step_id}/delete/',
            path: {
                'tenant_id': tenantId,
                'well_planner_complete_step_id': wellPlannerCompleteStepId,
                'well_planner_id': wellPlannerId,
            },
        });
    }

    /**
     * Duplicate well planner complete step
     * @param tenantId
     * @param wellPlannerCompleteStepId
     * @param wellPlannerId
     * @returns WellPlannerDetails
     * @throws ApiError
     */
    public static tenantsWellsPlannersCompleteStepsDuplicateCreate(
        tenantId: number,
        wellPlannerCompleteStepId: number,
        wellPlannerId: number,
    ): CancelablePromise<WellPlannerDetails> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/wells/planners/{well_planner_id}/complete/steps/{well_planner_complete_step_id}/duplicate/',
            path: {
                'tenant_id': tenantId,
                'well_planner_complete_step_id': wellPlannerCompleteStepId,
                'well_planner_id': wellPlannerId,
            },
        });
    }

    /**
     * Update well planner complete step emission reduction initiatives
     * @param tenantId
     * @param wellPlannerCompleteStepId
     * @param wellPlannerId
     * @param requestBody
     * @returns WellPlannerDetails
     * @throws ApiError
     */
    public static tenantsWellsPlannersCompleteStepsEmpInitiativesUpdateUpdate(
        tenantId: number,
        wellPlannerCompleteStepId: number,
        wellPlannerId: number,
        requestBody: UpdateWellPlannerEmissionReductionInitiatives,
    ): CancelablePromise<WellPlannerDetails> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tenants/{tenant_id}/wells/planners/{well_planner_id}/complete/steps/{well_planner_complete_step_id}/emp-initiatives/update/',
            path: {
                'tenant_id': tenantId,
                'well_planner_complete_step_id': wellPlannerCompleteStepId,
                'well_planner_id': wellPlannerId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Move well planner complete step
     * @param tenantId
     * @param wellPlannerCompleteStepId
     * @param wellPlannerId
     * @param requestBody
     * @returns WellPlannerDetails
     * @throws ApiError
     */
    public static tenantsWellsPlannersCompleteStepsMoveUpdate(
        tenantId: number,
        wellPlannerCompleteStepId: number,
        wellPlannerId: number,
        requestBody: MoveWellPlannerStep,
    ): CancelablePromise<WellPlannerDetails> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tenants/{tenant_id}/wells/planners/{well_planner_id}/complete/steps/{well_planner_complete_step_id}/move/',
            path: {
                'tenant_id': tenantId,
                'well_planner_complete_step_id': wellPlannerCompleteStepId,
                'well_planner_id': wellPlannerId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Update well planner complete step
     * @param tenantId
     * @param wellPlannerCompleteStepId
     * @param wellPlannerId
     * @param requestBody
     * @returns WellPlannerDetails
     * @throws ApiError
     */
    public static tenantsWellsPlannersCompleteStepsUpdateUpdate(
        tenantId: number,
        wellPlannerCompleteStepId: number,
        wellPlannerId: number,
        requestBody: UpdateWellStep,
    ): CancelablePromise<WellPlannerDetails> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tenants/{tenant_id}/wells/planners/{well_planner_id}/complete/steps/{well_planner_complete_step_id}/update/',
            path: {
                'tenant_id': tenantId,
                'well_planner_complete_step_id': wellPlannerCompleteStepId,
                'well_planner_id': wellPlannerId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Approve well planner complete steps
     * @param tenantId
     * @param wellPlannerId
     * @param requestBody
     * @returns WellPlannerDetails
     * @throws ApiError
     */
    public static tenantsWellsPlannersCompleteStepsApproveUpdate(
        tenantId: number,
        wellPlannerId: number,
        requestBody: ApproveWellPlannerCompleteSteps,
    ): CancelablePromise<WellPlannerDetails> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tenants/{tenant_id}/wells/planners/{well_planner_id}/complete/steps/approve/',
            path: {
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Create well planner complete step
     * @param tenantId
     * @param wellPlannerId
     * @param requestBody
     * @returns WellPlannerDetails
     * @throws ApiError
     */
    public static tenantsWellsPlannersCompleteStepsCreateCreate(
        tenantId: number,
        wellPlannerId: number,
        requestBody: CreateWellStep,
    ): CancelablePromise<WellPlannerDetails> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/wells/planners/{well_planner_id}/complete/steps/create/',
            path: {
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Get well planner complete summary
     * @param tenantId
     * @param wellPlannerId
     * @returns WellPlannerCompleteSummary
     * @throws ApiError
     */
    public static tenantsWellsPlannersCompleteSummaryRetrieve(
        tenantId: number,
        wellPlannerId: number,
    ): CancelablePromise<WellPlannerCompleteSummary> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/wells/planners/{well_planner_id}/complete/summary/',
            path: {
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
            },
        });
    }

    /**
     * Approve well planner complete vessel uses
     * @param tenantId
     * @param wellPlannerId
     * @param requestBody
     * @returns WellPlannerDetails
     * @throws ApiError
     */
    public static tenantsWellsPlannersCompleteVesselUsesApproveUpdate(
        tenantId: number,
        wellPlannerId: number,
        requestBody: ApproveWellPlannerCompleteVesselUses,
    ): CancelablePromise<WellPlannerDetails> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tenants/{tenant_id}/wells/planners/{well_planner_id}/complete/vessel-uses/approve/',
            path: {
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Emission reduction initiative list
     * @param tenantId
     * @param wellPlannerId
     * @returns EmissionReductionInitiativeList
     * @throws ApiError
     */
    public static tenantsWellsPlannersEmissionReductionInitiativesList(
        tenantId: number,
        wellPlannerId: number,
    ): CancelablePromise<Array<EmissionReductionInitiativeList>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/wells/planners/{well_planner_id}/emission-reduction-initiatives/',
            path: {
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
            },
        });
    }

    /**
     * Get well planner measured air temperature dataset
     * @param tenantId
     * @param wellPlannerId
     * @param endDate
     * @param startDate
     * @returns WellPlannerMeasurementDataset
     * @throws ApiError
     */
    public static tenantsWellsPlannersMeasuredAirTemperatureList(
        tenantId: number,
        wellPlannerId: number,
        endDate?: string,
        startDate?: string,
    ): CancelablePromise<Array<WellPlannerMeasurementDataset>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/wells/planners/{well_planner_id}/measured/air-temperature/',
            path: {
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
            },
            query: {
                'end_date': endDate,
                'start_date': startDate,
            },
        });
    }

    /**
     * Get well planner measured CO2 dataset
     * @param tenantId
     * @param wellPlannerId
     * @param endDate
     * @param startDate
     * @returns WellPlannerCO2Dataset
     * @throws ApiError
     */
    public static tenantsWellsPlannersMeasuredCo2List(
        tenantId: number,
        wellPlannerId: number,
        endDate?: string,
        startDate?: string,
    ): CancelablePromise<Array<WellPlannerCO2Dataset>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/wells/planners/{well_planner_id}/measured/co2/',
            path: {
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
            },
            query: {
                'end_date': endDate,
                'start_date': startDate,
            },
        });
    }

    /**
     * Get well planner measured wave heave dataset
     * @param tenantId
     * @param wellPlannerId
     * @param endDate
     * @param startDate
     * @returns WellPlannerMeasurementDataset
     * @throws ApiError
     */
    public static tenantsWellsPlannersMeasuredWaveHeaveList(
        tenantId: number,
        wellPlannerId: number,
        endDate?: string,
        startDate?: string,
    ): CancelablePromise<Array<WellPlannerMeasurementDataset>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/wells/planners/{well_planner_id}/measured/wave-heave/',
            path: {
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
            },
            query: {
                'end_date': endDate,
                'start_date': startDate,
            },
        });
    }

    /**
     * Get well planner measured wind speed dataset
     * @param tenantId
     * @param wellPlannerId
     * @param endDate
     * @param startDate
     * @returns WellPlannerMeasurementDataset
     * @throws ApiError
     */
    public static tenantsWellsPlannersMeasuredWindSpeedList(
        tenantId: number,
        wellPlannerId: number,
        endDate?: string,
        startDate?: string,
    ): CancelablePromise<Array<WellPlannerMeasurementDataset>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/wells/planners/{well_planner_id}/measured/wind-speed/',
            path: {
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
            },
            query: {
                'end_date': endDate,
                'start_date': startDate,
            },
        });
    }

    /**
     * Well planner mode list
     * @param tenantId
     * @param wellPlannerId
     * @returns WellPlannerModeList
     * @throws ApiError
     */
    public static tenantsWellsPlannersModesList(
        tenantId: number,
        wellPlannerId: number,
    ): CancelablePromise<Array<WellPlannerModeList>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/wells/planners/{well_planner_id}/modes/',
            path: {
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
            },
        });
    }

    /**
     * Well planner phase list
     * @param tenantId
     * @param wellPlannerId
     * @returns WellPlannerPhaseList
     * @throws ApiError
     */
    public static tenantsWellsPlannersPhasesList(
        tenantId: number,
        wellPlannerId: number,
    ): CancelablePromise<Array<WellPlannerPhaseList>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/wells/planners/{well_planner_id}/phases/',
            path: {
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
            },
        });
    }

    /**
     * Get well planner planned CO2 dataset
     * @param tenantId
     * @param wellPlannerId
     * @param endDate
     * @param startDate
     * @returns WellPlannerCO2Dataset
     * @throws ApiError
     */
    public static tenantsWellsPlannersPlannedCo2List(
        tenantId: number,
        wellPlannerId: number,
        endDate?: string,
        startDate?: string,
    ): CancelablePromise<Array<WellPlannerCO2Dataset>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/wells/planners/{well_planner_id}/planned/co2/',
            path: {
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
            },
            query: {
                'end_date': endDate,
                'start_date': startDate,
            },
        });
    }

    /**
     * Get well planner planned CO2 saved dataset
     * @param tenantId
     * @param wellPlannerId
     * @param endDate
     * @param startDate
     * @returns WellPlannerCO2SavedDataset
     * @throws ApiError
     */
    public static tenantsWellsPlannersPlannedCo2SavedList(
        tenantId: number,
        wellPlannerId: number,
        endDate?: string,
        startDate?: string,
    ): CancelablePromise<Array<WellPlannerCO2SavedDataset>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/wells/planners/{well_planner_id}/planned/co2/saved/',
            path: {
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
            },
            query: {
                'end_date': endDate,
                'start_date': startDate,
            },
        });
    }

    /**
     * Complete well planner planned
     * @param tenantId
     * @param wellPlannerId
     * @returns WellPlannerDetails
     * @throws ApiError
     */
    public static tenantsWellsPlannersPlannedCompleteCreate(
        tenantId: number,
        wellPlannerId: number,
    ): CancelablePromise<WellPlannerDetails> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/wells/planners/{well_planner_id}/planned/complete/',
            path: {
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
            },
        });
    }

    /**
     * Get well planner planned step CO2
     * @param tenantId
     * @param wellPlannerId
     * @param wellPlannerPlannedStepId
     * @returns WellPlannerPlannedStepCO2
     * @throws ApiError
     */
    public static tenantsWellsPlannersPlannedStepsCo2Retrieve(
        tenantId: number,
        wellPlannerId: number,
        wellPlannerPlannedStepId: number,
    ): CancelablePromise<WellPlannerPlannedStepCO2> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/wells/planners/{well_planner_id}/planned/steps/{well_planner_planned_step_id}/co2/',
            path: {
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
                'well_planner_planned_step_id': wellPlannerPlannedStepId,
            },
        });
    }

    /**
     * Delete well planner planned step
     * @param tenantId
     * @param wellPlannerId
     * @param wellPlannerPlannedStepId
     * @returns void
     * @throws ApiError
     */
    public static tenantsWellsPlannersPlannedStepsDeleteDestroy(
        tenantId: number,
        wellPlannerId: number,
        wellPlannerPlannedStepId: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/tenants/{tenant_id}/wells/planners/{well_planner_id}/planned/steps/{well_planner_planned_step_id}/delete/',
            path: {
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
                'well_planner_planned_step_id': wellPlannerPlannedStepId,
            },
        });
    }

    /**
     * Duplicate well planner planned step
     * @param tenantId
     * @param wellPlannerId
     * @param wellPlannerPlannedStepId
     * @returns WellPlannerDetails
     * @throws ApiError
     */
    public static tenantsWellsPlannersPlannedStepsDuplicateCreate(
        tenantId: number,
        wellPlannerId: number,
        wellPlannerPlannedStepId: number,
    ): CancelablePromise<WellPlannerDetails> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/wells/planners/{well_planner_id}/planned/steps/{well_planner_planned_step_id}/duplicate/',
            path: {
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
                'well_planner_planned_step_id': wellPlannerPlannedStepId,
            },
        });
    }

    /**
     * Update well planner planned step emission reduction initiatives
     * @param tenantId
     * @param wellPlannerId
     * @param wellPlannerPlannedStepId
     * @param requestBody
     * @returns WellPlannerDetails
     * @throws ApiError
     */
    public static tenantsWellsPlannersPlannedStepsEmpInitiativesUpdateUpdate(
        tenantId: number,
        wellPlannerId: number,
        wellPlannerPlannedStepId: number,
        requestBody: UpdateWellPlannerEmissionReductionInitiatives,
    ): CancelablePromise<WellPlannerDetails> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tenants/{tenant_id}/wells/planners/{well_planner_id}/planned/steps/{well_planner_planned_step_id}/emp-initiatives/update/',
            path: {
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
                'well_planner_planned_step_id': wellPlannerPlannedStepId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Move well planner planned step
     * @param tenantId
     * @param wellPlannerId
     * @param wellPlannerPlannedStepId
     * @param requestBody
     * @returns WellPlannerDetails
     * @throws ApiError
     */
    public static tenantsWellsPlannersPlannedStepsMoveUpdate(
        tenantId: number,
        wellPlannerId: number,
        wellPlannerPlannedStepId: number,
        requestBody: MoveWellPlannerStep,
    ): CancelablePromise<WellPlannerDetails> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tenants/{tenant_id}/wells/planners/{well_planner_id}/planned/steps/{well_planner_planned_step_id}/move/',
            path: {
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
                'well_planner_planned_step_id': wellPlannerPlannedStepId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Update well planner planned step
     * @param tenantId
     * @param wellPlannerId
     * @param wellPlannerPlannedStepId
     * @param requestBody
     * @returns WellPlannerDetails
     * @throws ApiError
     */
    public static tenantsWellsPlannersPlannedStepsUpdateUpdate(
        tenantId: number,
        wellPlannerId: number,
        wellPlannerPlannedStepId: number,
        requestBody: UpdateWellStep,
    ): CancelablePromise<WellPlannerDetails> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tenants/{tenant_id}/wells/planners/{well_planner_id}/planned/steps/{well_planner_planned_step_id}/update/',
            path: {
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
                'well_planner_planned_step_id': wellPlannerPlannedStepId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Create well planner planned step
     * @param tenantId
     * @param wellPlannerId
     * @param requestBody
     * @returns WellPlannerDetails
     * @throws ApiError
     */
    public static tenantsWellsPlannersPlannedStepsCreateCreate(
        tenantId: number,
        wellPlannerId: number,
        requestBody: CreateWellStep,
    ): CancelablePromise<WellPlannerDetails> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tenants/{tenant_id}/wells/planners/{well_planner_id}/planned/steps/create/',
            path: {
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Get well planner planned summary
     * @param tenantId
     * @param wellPlannerId
     * @returns WellPlannerSummary
     * @throws ApiError
     */
    public static tenantsWellsPlannersPlannedSummaryRetrieve(
        tenantId: number,
        wellPlannerId: number,
    ): CancelablePromise<WellPlannerSummary> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/wells/planners/{well_planner_id}/planned/summary/',
            path: {
                'tenant_id': tenantId,
                'well_planner_id': wellPlannerId,
            },
        });
    }

    /**
     * Well reference material
     * @param tenantId
     * @returns WellReferenceMaterial
     * @throws ApiError
     */
    public static tenantsWellsReferenceMaterialRetrieve(
        tenantId: number,
    ): CancelablePromise<WellReferenceMaterial> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/{tenant_id}/wells/reference-material/',
            path: {
                'tenant_id': tenantId,
            },
        });
    }

    /**
     * Check tenant details
     * @param subdomain
     * @returns Tenant
     * @throws ApiError
     */
    public static tenantsSubdomainsRetrieve(
        subdomain: string,
    ): CancelablePromise<Tenant> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tenants/subdomains/{subdomain}/',
            path: {
                'subdomain': subdomain,
            },
        });
    }

}