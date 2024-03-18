import { Link } from '@remix-run/react';
import { urlTransform } from '@vert-capital/common';
import {
  Badge,
  DataTableHeader,
  Icons,
  cn,
  type RT,
} from '@vert-capital/design-system-ui';
import routes from '~/common/routes';

import { AbsenceTableModel } from '~/models/absence.model';
import { getAbsenceStatus, getColorAbsenceStatus } from '~/models/status.model';

export const columns: RT.ColumnDef<AbsenceTableModel>[] = [
  {
    accessorKey: 'nome',
    header: ({ column }) => (
      <DataTableHeader title="Solicitante" column={column} />
    ),
    cell: ({ row }) => {
      const label: string = row.getValue('nome');
      return (
        <div className="flex justify-start items-center space-x-2">
          {!row.getIsExpanded() ? (
            <Icons.PlusSquare
              className={cn('h-4 w-4 stroke-muted-foreground cursor-pointer')}
              onClick={() => row.toggleExpanded()}
            />
          ) : (
            <Icons.MinusSquare
              className={cn('h-4 w-4 stroke-brand cursor-pointer')}
              onClick={() => row.toggleExpanded()}
            />
          )}
          <div title={label} className="w-[180px] truncate">
            {label}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'tipo',
    header: ({ column }) => (
      <DataTableHeader title="Solicitação" column={column} />
    ),
    cell: ({ row }) => {
      const tipo = row.getValue('tipo') as string;
      return (
        <div className="line-clamp-1 min-w-[150px]" title={tipo}>
          {tipo}
        </div>
      );
    },
  },
  {
    accessorKey: 'dataInicio',
    header: ({ column }) => (
      <DataTableHeader title="Data Inicial" column={column} />
    ),
    cell: ({ row }) => {
      const dataInicio = row.getValue('dataInicio') as string;
      return (
        <div title={dataInicio} className="max-w-[180px] truncate">
          {dataInicio}
        </div>
      );
    },
  },
  {
    accessorKey: 'dataFim',
    header: ({ column }) => (
      <DataTableHeader title="Data Final" column={column} />
    ),
    cell: ({ row }) => {
      const dataFim = row.getValue('dataFim') as string;
      return (
        <div title={dataFim} className="max-w-[180px] truncate">
          {dataFim}
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableHeader title="Status" column={column} />,
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <div className="min-w-[110px]">
          <Badge
            variant={'outline'}
            className={cn(
              'line-clamp-1 w-max rounded-md',
              getColorAbsenceStatus(status)
            )}
            title={getAbsenceStatus(status)}
          >
            {getAbsenceStatus(status)}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: 'action',
    header: ({ column }) => <DataTableHeader title="" column={column} />,
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <div className="relative w-full flex justify-end items-center space-x-2">
          <div className="absolute right-8 p-1.5 rounded-full hover:bg-brand/10 cursor-pointer">
            <Link
              title="Editar"
              to={urlTransform({
                url: routes.absence.detail,
                params: {
                  id: id,
                },
              })}
            >
              <Icons.ExternalLink className="h-4 w-4 stroke-brand" />
            </Link>
          </div>
          <div
            className="absolute right-1 p-1.5 rounded-full hover:bg-destructive/10 group cursor-pointer"
            title="Excluir"
          >
            <Icons.Trash2 className="h-4 w-4 stroke-brand group-hover:stroke-destructive" />
          </div>
        </div>
      );
    },
  },
];
