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

  async new(request: Request): Promise<void> {
    // const response = await api<AbsenceDetailModel>(
    //   `/absence/requests/new`,
    //   request
    // );
    // return new AbsenceDetailModel(response);
  }

  async update(request: Request): Promise<void> {
    // const response = await api<AbsenceDetailModel>(
    //   `/absence/requests/new`,
    //   request
    // );
    // return new AbsenceDetailModel(response);
  }
}
