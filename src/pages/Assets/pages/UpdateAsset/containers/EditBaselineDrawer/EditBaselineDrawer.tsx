import { useAddEditActions } from 'containers/AddEditActionsProvider';
import useAssetId from 'pages/Assets/hooks/useAssetId';
import { BaselineDetails } from 'api/schema';
import { EditFormDrawer } from 'containers/FormDrawer';
import BaselineForm, { FormValues } from '../BaselineForm';
import useUpdateBaseline from 'pages/Assets/pages/UpdateAsset/hooks/useUpdateBaseline';
import useBaseline from 'pages/Assets/pages/UpdateAsset/hooks/useBaseline';
import { Flexbox } from 'components/Box';
import useDimensions from 'hooks/useDimensions';
import InputsHeightProvider from '../InputsHeightProvider';
import { Text } from 'components/Typography';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { MODIFIED_TIME_FORMAT } from 'pages/Assets/pages/UpdateAsset/consts';
import { UpdateAssetAddEditActionContext } from 'pages/Assets/pages/UpdateAsset/types';

const EditBaselineDrawer = () => {
  const { onCloseDrawer, editedRow: editedBaselineId } =
    useAddEditActions<UpdateAssetAddEditActionContext>('baselines');
  const assetId = useAssetId();
  const { data: baselineData, isLoading: isLoadingBaseline } = useBaseline(
    assetId,
    editedBaselineId,
  );
  const {
    validationSchema,
    initialValues,
    updateBaselineMutation: {
      mutateAsync: onEditBaseline,
      isLoading: isEditingBaseline,
    },
  } = useUpdateBaseline({
    onSuccess: onCloseDrawer,
    baseline: baselineData,
    assetId,
  });
  const [ref, size] = useDimensions<HTMLDivElement>();
  return (
    <EditFormDrawer<
      FormValues,
      BaselineDetails,
      UpdateAssetAddEditActionContext
    >
      title="Edit baseline"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onEditBaseline}
      isSubmitting={isEditingBaseline}
      width={816}
      loading={isLoadingBaseline || !baselineData}
      validateOnChange={false}
      context="baselines"
      bodyStyle={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <>
        {baselineData ? (
          <Text strong>
            Modified:{' '}
            {format(parseISO(baselineData.updated_at), MODIFIED_TIME_FORMAT)}
          </Text>
        ) : null}
        <Flexbox
          flexDirection="column"
          flexGrow={1}
          overflow="hidden"
          ref={ref}
          marginTop={8}
        >
          <InputsHeightProvider height={size ? size.height - 297 : size}>
            <BaselineForm />
          </InputsHeightProvider>
        </Flexbox>
      </>
    </EditFormDrawer>
  );
};

export default EditBaselineDrawer;
