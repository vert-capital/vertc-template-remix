import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { formDataValues, handleError } from "@vert-capital/common";
import invariant from "tiny-invariant";
import { AbsencePostModel } from "~/models/absence.model";
import { AbsenceService } from "~/services/absence.service";

export async function action({ request, params }: ActionFunctionArgs) {
  const absenceId = params.id;
  invariant(absenceId, "Absence ID is required");
  const { ...values } = await formDataValues({ request });
  try {
    const service = new AbsenceService();
    await service.update(absenceId, values);
    return json({
      nome: "",
      email: "",
      time: "",
      gestor: "",
      tipo: "",
      dataInicio: "",
      dataFim: "",
    } as AbsencePostModel);
  } catch (error) {
    return json({ error: handleError(error) });
  }
}
