import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { handleError } from "@vert-capital/common";
import { AbsenceService } from "~/services/absence.service";

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const service = new AbsenceService();
    const response = await service.update(request);
    return json(response);
  } catch (error) {
    return json({ error: handleError(error) });
  }
}
