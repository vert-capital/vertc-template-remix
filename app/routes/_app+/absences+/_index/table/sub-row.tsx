import { CopyableText, Icons } from '@vert-capital/design-system-ui';
import { AbsenceTableModel } from '~/models/absence.model';

type Props = {
  data: AbsenceTableModel;
};
export function SubRow({ data }: Props) {
  return (
    <div className="w-auto h-auto flex justify-start items-start space-x-2 ml-6">
      <div className="relative">
        <div className="h-5 w-0.5 bg-brand/50"></div>
        <div className="h-[0.100rem] w-4 bg-brand/50"></div>
      </div>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 w-full m-1 p-2 rounded-md bg-muted">
        <div className="flex flex-col justify-start items-start">
          <div className="font-semibold text-xs">Email</div>
          <CopyableText
            className="text-xs [&_.line-clamp-1]:w-max [&_.line-clamp-1]:mr-1"
            text={data.email || 'Nenhum email cadastrado'}
            icon={
              <Icons.Mail className="h-3 w-3 mt-[0.18rem] mr-1 stroke-brand" />
            }
          />
        </div>
        <div className="flex flex-col justify-start items-start">
          <div className="font-semibold text-xs">Gestor</div>
          <CopyableText
            className="text-xs [&_.line-clamp-1]:w-max [&_.line-clamp-1]:mr-1"
            text={data.gestor || 'Nenhum gestor cadastrado'}
            icon={
              <Icons.User2 className="h-3 w-3 mt-[0.18rem] mr-1 stroke-brand" />
            }
          />
        </div>
        <div className="flex flex-col justify-start items-start">
          <div className="font-semibold text-xs">Time</div>
          <CopyableText
            className="text-xs [&_.line-clamp-1]:w-max [&_.line-clamp-1]:mr-1"
            text={data.time || 'Nenhum time cadastrado'}
            icon={
              <Icons.Users2 className="h-3 w-3 mt-[0.18rem] mr-1 stroke-brand" />
            }
          />
        </div>
      </div>
    </div>
  );
}
