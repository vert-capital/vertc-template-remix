import api from "~/common/api.server";
import { AbsenceDetailModel, AbsenceTableModel } from "~/models/absence.model";
import { TableResponseModel } from "~/models/table.model";

export class AbsenceService {
  async list(request: Request): Promise<TableResponseModel<AbsenceTableModel>> {
    const url = new URL(request.url);

    const response = await api<any>(
      `/absence/requests/?${url.searchParams.toString()}`,
      request
    );

    return new TableResponseModel<AbsenceTableModel>(
      AbsenceTableModel,
      response
    );
  }

  async detail({
    id,
    request,
  }: {
    id: string;
    request: Request;
  }): Promise<AbsenceDetailModel> {
    const response = await api<AbsenceDetailModel>(
      `/absence/requests/${id}`,
      request
    );
    return new AbsenceDetailModel(response);
  }

  async new(values: any): Promise<void> {
    // const payload = new AbsencePostModel(values).validate();
    //  await api.post("/absence/create", {
    //    body: payload.toJson(),
    //  });
    // return new AbsencePostModel(payload.toJson());
  }

  async update(id: string, values: any): Promise<void> {
    // const payload = new AbsencePostModel(values).validate();
    //  await api.post("/absence/create", {
    //    body: payload.toJson(),
    //  });
    // return new AbsencePostModel(payload.toJson());
  }
}
