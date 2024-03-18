import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, useNavigate } from '@remix-run/react';
import {
  Button,
  Card,
  CardContent,
  Icons,
  Separator,
} from '@vert-capital/design-system-ui';
import { AbsenceService } from '~/services/absence.service';

export async function loader({ request, params }: LoaderFunctionArgs) {
  const service = new AbsenceService();
  const data = await service.detail({
    id: params.id as string,
    request,
  });
  return json({ data });
}

export default function AbsenceDetail() {
  const { data } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center pt-3 pb-5 space-y-2">
        <div className="w-full flex justify-start items-center space-x-2">
          <Button
            variant={'ghost'}
            size={'icon'}
            onClick={goBack}
            className="h-8 w-8"
          >
            <Icons.ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="w-full flex justify-start items-center ml-20">
            <h1 className="text-3xl font-bold">Solicitação de Ausência</h1>
          </div>
        </div>
      </div>
      <Separator className="mb-4" />
      <div className="w-full h-auto bg-transparent flex flex-col justify-start items-start">
        <Card className="w-full">
          <CardContent className="space-y-4 flex flex-col justify-start items-start">
            <h1>{data.nome}</h1>
            <p>{data.email}</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
