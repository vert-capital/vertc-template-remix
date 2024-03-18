import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { AbsenceService } from '~/services/absence.service';

export async function loader({ request }: LoaderFunctionArgs) {
  const service = new AbsenceService();
  const response = await service.list(request);
  return json(response);
}
