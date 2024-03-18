import { useSearchParams } from '@remix-run/react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DataTable,
  Icons,
  cn,
} from '@vert-capital/design-system-ui';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import apiClient from '~/common/api.client';
import queryKey from '~/common/queryKey';
import routes from '~/common/routes';
import { AbsenceTableModel } from '~/models/absence.model';
import { TableResponseModel } from '~/models/table.model';
import { columns } from './columns';
import { SubRow } from './sub-row';

export default function AbsenceTable() {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(0);

  const loadData = () => {
    const query = new URLSearchParams();
    if (page > 0) query.set('page', page.toString());
    else query.delete('page');
    const url = `${routes.api.absences.list}?${query.toString()}`;
    return apiClient<TableResponseModel<AbsenceTableModel>>(url);
  };

  const {
    data,
    isLoading: loading,
    error,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: [queryKey.absenceList, { page }],
    queryFn: loadData,
    retry: false,
    keepPreviousData: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (searchParams.has('page')) {
      const page = searchParams.get('page');
      if (page) setPage(parseInt(page));
    }
  }, []);

  return (
    <Card className="w-full">
      <CardHeader className="w-full flex flex-row justify-between items-center space-x-4 space-y-0">
        <div className="flex flex-col justify-center items-start">
          <CardTitle className="text-lg">Solicitações de Ausências</CardTitle>
        </div>
        <div className="flex justify-end items-center space-x-3">
          <Button
            type="button"
            variant={'secondary'}
            size={'icon'}
            title="Atualizar lista"
            onClick={() => refetch()}
          >
            <Icons.RefreshCcw
              className={cn('h-4 w-4', { 'animate-fast-spin': isRefetching })}
            />
          </Button>
          <Button type="button" size={'default'}>
            Nova Solicitação
            <Icons.Plus className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          className="lg:table-fixed"
          initialHeight="19.2rem"
          columns={columns}
          data={data?.registros}
          options={{
            loading: loading,
            error: error as string,
            pagination: {
              pageSize: data?.tamanhoPagina,
              page: data?.paginaAtual,
              pageCount: data?.totalPaginas,
              rowCount: data?.totalRegistros,
            },
          }}
          onPaginationChange={({ page: _page }) => setPage(_page)}
          onRefresh={() => refetch()}
          renderRowDetails={(row) => <SubRow data={row} />}
        />
      </CardContent>
    </Card>
  );
}
