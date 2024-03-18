export class AbsenceTypeModel {
  id: number;
  nome: string;
  tipoData: string;
  precisaAprovar: boolean;
  podeEnviarAnexo?: boolean;
  anexoObrigatorio?: boolean;

  constructor(data?: any) {
    this.id = data?.id || 0;
    this.nome = data.name || '';
    this.tipoData = data?.date_type || '';
    this.precisaAprovar = data.need_approve;
    this.podeEnviarAnexo = data.can_send_file;
    this.anexoObrigatorio = data.file_required;
  }
}

export class AbsenceTableModel {
  id?: number;
  nome: string;
  email: string;
  time: string;
  gestor: string;
  tipo: string;
  status?: string;
  dataInicio: string;
  dataFim: string;
  justificativa?: string;
  anexo?: File;

  constructor(data?: any) {
    this.id = data?.id || 0;
    this.nome = data?.user?.name || '';
    this.email = data?.user?.email || '';
    this.time = data?.team?.name || '';
    this.gestor = data?.team?.gestor?.user?.name || '';
    this.tipo = data?.type_absence?.name || '';
    this.status = data?.status || '';
    this.dataInicio = data?.start_date_formated || '';
    this.dataFim = data?.end_date_formated || '';
    this.justificativa = data?.comment || '';
    this.anexo = data?.attachment;
  }

  toJson() {
    return {
      id: this.id,
      type_absence: this.tipo,
      start_date: this.dataInicio,
      end_date: this.dataFim,
      comment: this.justificativa,
      attachment: this.anexo,
    };
  }

  toMultiPartFormData() {
    const formData = new FormData();
    formData.append('type_absence', this.tipo.toString());
    formData.append('start_date', this.dataInicio);
    formData.append('end_date', this.dataFim);
    formData.append('comment', this.justificativa || '');
    formData.append('attachment', this.anexo as Blob);
    return formData;
  }
}
