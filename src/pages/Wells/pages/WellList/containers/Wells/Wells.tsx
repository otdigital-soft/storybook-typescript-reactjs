import { PlusOutlined } from '@ant-design/icons';
import Box, { Flexbox } from 'components/Box';
import Button from 'components/Button';
import Pagination from 'components/Pagination';
import PaginationProvider, {
  usePaginationProvider,
} from 'components/PaginationProvider';
import { FixedRow } from 'components/Row';
import { StyledTable } from 'components/Table';
import { rowClassNames } from 'components/Table/StyledTable';
import { Title } from 'components/Typography';
import { LIST_PAGE_SIZE } from 'consts';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from 'routes';
import useWells from '../../hooks/useWells';
import useWellsColumns from '../../hooks/useWellsColumns';

const Wells = () => {
  const { changePage, page, pageSize } = usePaginationProvider();
  const {
    isLoading: isLoadingWells,
    error: wellsError,
    data: wellsData,
  } = useWells({
    pageSize,
    page,
  });
  const columns = useWellsColumns();
  const navigate = useNavigate();

  return (
    <>
      <Flexbox justifyContent="space-between" alignItems="center">
        <Title level={4}>Wells</Title>
        <Box width={168}>
          <Button
            type="success"
            icon={<PlusOutlined />}
            block
            onClick={() => {
              navigate(routes.createWellPlan);
            }}
            fontWeight={400}
          >
            Add well
          </Button>
        </Box>
      </Flexbox>
      <Box marginTop={7}>
        <StyledTable
          onRow={(record) => {
            return {
              onClick: () => {
                navigate(
                  generatePath(routes.updateWellPlan, {
                    wellPlanId: String(record.id),
                  }),
                );
              },
            };
          }}
          pagination={false}
          locale={{
            emptyText: wellsError
              ? 'Unable to load wells'
              : isLoadingWells
              ? 'Loading wells'
              : 'No  well added',
          }}
          loading={isLoadingWells}
          columns={columns}
          dataSource={wellsData?.results || []}
          rowKey={(row) => row.id}
          className="ant-table-with-actions"
          rowClassName={rowClassNames.cursorPointer}
        />
      </Box>
      <FixedRow paddingX={28} paddingY={21}>
        <Pagination
          current={page}
          pageSize={pageSize}
          hideOnSinglePage={true}
          total={wellsData?.count || 0}
          showSizeChanger={false}
          onChange={changePage}
        />
      </FixedRow>
    </>
  );
};

const DefaultWells = () => {
  return (
    <PaginationProvider initialPageSize={LIST_PAGE_SIZE} initialPage={1}>
      <Wells />
    </PaginationProvider>
  );
};

export default DefaultWells;
