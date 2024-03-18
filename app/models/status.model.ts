export enum AbsenceStatusEnum {
  approved = 'approved',
  pending = 'pending',
  rejected = 'rejected',
}

export const getAbsenceStatus = (status?: string) => {
  switch (status) {
    case AbsenceStatusEnum.approved:
      return 'Aprovado';
    case AbsenceStatusEnum.pending:
      return 'Pendente';
    case AbsenceStatusEnum.rejected:
      return 'Rejeitado';
    default:
      return 'Indefinido';
  }
};

export const listAbsenceStatus = () => {
  return Object.keys(AbsenceStatusEnum).map((status) => ({
    value: status,
    label: getAbsenceStatus(status as AbsenceStatusEnum),
  }));
};

export const getColorAbsenceStatus = (status?: string) => {
  switch (status) {
    case AbsenceStatusEnum.approved:
      return 'bg-success/10 text-success/100 border-success/100';
    case AbsenceStatusEnum.rejected:
      return 'bg-destructive/10 text-destructive/100 border-destructive/100';
    case AbsenceStatusEnum.pending:
      return 'bg-warning/10 text-warning/100 border-warning/100';
    default:
      return 'bg-muted-foreground/10 text-muted-foreground/100 border-muted-foreground/100';
  }
};
