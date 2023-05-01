import { MoreOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import {
  CurrentStepEnum,
  WellPlannerList,
  WellPlannerListAsset,
} from 'api/schema';
import Box from 'components/Box';
import Button from 'components/Button';
import Menu from 'components/Menu';
import { useMemo } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from 'routes';
import WellStatusCell from '../../components/WellStatusCell';
import { SettingOutlined } from '@ant-design/icons';
import { useTheme } from 'styled-components';
import CheckboxMenu, { CheckboxMenuItemProps } from 'components/CheckboxMenu';
import useShowWellsColumns, {
  WellListColumns,
} from 'pages/Wells/pages/WellList/hooks/useShowWellsColumns';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { DATE_FORMAT_WITH_DOTS } from 'consts';
import useDeleteWell from '../useDeleteWell';
import useDuplicateWell from '../useDuplicateWell';

const useWellsColumns = () => {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const {
    onSelectColumn,
    onSelectAllColumns,
    values: columnValues,
  } = useShowWellsColumns();
  const { onDeleteWell, isDeletingWell } = useDeleteWell();
  const { onDuplicateWell, isDuplicatingWell } = useDuplicateWell();
  const selectableColumns: CheckboxMenuItemProps<keyof WellListColumns>[] =
    useMemo(
      () => [
        { title: 'Well name', checked: columnValues.wellName, key: 'wellName' },
        {
          title: 'Sidetrack name',
          checked: columnValues.sidetrackName,
          key: 'sidetrackName',
        },
        {
          title: 'Type of well',
          checked: columnValues.typeOfWell,
          key: 'typeOfWell',
        },
        { title: 'Asset', checked: columnValues.asset, key: 'asset' },
        { title: 'Field', checked: columnValues.field, key: 'field' },
        {
          title: 'Well location',
          checked: columnValues.wellLocation,
          key: 'wellLocation',
        },
        {
          title: 'Well description',
          checked: columnValues.wellDescription,
          key: 'wellDescription',
        },
        {
          title: 'Well plan status',
          checked: columnValues.wellPlanStatus,
          key: 'wellPlanStatus',
        },
        {
          title: 'Planned start date',
          checked: columnValues.plannedStartDate,
          key: 'plannedStartDate',
        },
        {
          title: 'Actual start date',
          checked: columnValues.actualStartDate,
          key: 'actualStartDate',
        },
      ],
      [columnValues],
    );
  const columns: ColumnsType<WellPlannerList> = useMemo(
    () =>
      [
        {
          title: 'Well name',
          dataIndex: 'name',
          width: 150,
          show: columnValues.wellName,
          render: (name: WellPlannerList['name']) => name.name,
        },
        {
          title: 'Sidetrack name',
          dataIndex: 'sidetrack',
          width: 150,
          show: columnValues.sidetrackName,
        },
        {
          title: 'Type of well',
          dataIndex: 'type',
          width: 150,
          show: columnValues.typeOfWell,
        },
        {
          title: 'Asset',
          dataIndex: 'asset',
          width: 150,
          render: (asset: WellPlannerListAsset) => asset.name,
          show: columnValues.asset,
        },
        {
          title: 'Field',
          dataIndex: 'field',
          width: 150,
          show: columnValues.field,
        },
        {
          title: 'Well location',
          dataIndex: 'location',
          width: 150,
          show: columnValues.wellLocation,
        },
        {
          title: 'Well description',
          dataIndex: 'description',
          width: 264,
          show: columnValues.wellDescription,
        },
        {
          title: 'Well plan status',
          dataIndex: 'current_step',
          width: 200,
          show: columnValues.wellPlanStatus,
          render: (currentStep: CurrentStepEnum) => (
            <WellStatusCell currentStep={currentStep} />
          ),
        },
        {
          title: 'Planned start date',
          dataIndex: 'planned_start_date',
          width: 150,
          show: columnValues.plannedStartDate,
          render: (plannedStartDate: WellPlannerList['planned_start_date']) => {
            return format(parseISO(plannedStartDate), DATE_FORMAT_WITH_DOTS);
          },
        },
        {
          title: 'Actual start date',
          dataIndex: 'actual_start_date',
          width: 150,
          show: columnValues.actualStartDate,
          render: (actualStartDate: WellPlannerList['actual_start_date']) => {
            return actualStartDate
              ? format(parseISO(actualStartDate), DATE_FORMAT_WITH_DOTS)
              : actualStartDate;
          },
        },
        {
          key: 'actions',
          className: 'ant-table-cell-actions ant-table-column-choose-columns',
          width: 48,
          show: true,
          filterDropdown: () => {
            return (
              <CheckboxMenu
                items={selectableColumns}
                onItemChange={onSelectColumn}
                onSelectAllChange={onSelectAllColumns}
              />
            );
          },
          filterIcon: () => (
            <SettingOutlined
              style={{ color: colors.text.primary, fontSize: 16 }}
            />
          ),
          render: (well: WellPlannerList) => {
            const menu = (
              <Menu
                width={181}
                onClick={({ domEvent }) => {
                  domEvent.stopPropagation();
                }}
              >
                <Menu.Item
                  key="edit"
                  onClick={() =>
                    navigate(
                      generatePath(routes.updateWellPlan, {
                        wellPlanId: String(well.id),
                      }),
                    )
                  }
                >
                  Edit
                </Menu.Item>
                <Menu.Item
                  key="duplicate"
                  onClick={() => onDuplicateWell(well)}
                  disabled={isDuplicatingWell}
                >
                  Duplicate
                </Menu.Item>
                <Menu.Item
                  key="delete"
                  onClick={() => onDeleteWell(well)}
                  disabled={isDeletingWell}
                >
                  Delete
                </Menu.Item>
              </Menu>
            );
            return (
              <Dropdown overlay={menu} trigger={['click']}>
                <Box onClick={(event) => event.stopPropagation()}>
                  <Button type="link" icon={<MoreOutlined />} block />
                </Box>
              </Dropdown>
            );
          },
        },
      ].filter((column) => column.show || column.show === undefined),
    [
      columnValues,
      selectableColumns,
      onSelectColumn,
      onSelectAllColumns,
      colors.text.primary,
      navigate,
      isDeletingWell,
      onDeleteWell,
      isDuplicatingWell,
      onDuplicateWell,
    ],
  );
  return columns;
};

export default useWellsColumns;
