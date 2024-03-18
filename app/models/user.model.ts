import { z } from 'zod';

export class UserModel {
  id: number;
  nomeCompleto: string;
  email: string;
  avatar?: string;
  iniciais: string;

  constructor(data?: any) {
    this.id = data?.id || 0;
    this.nomeCompleto =
      data.nome || data.name || data.nome_completo || data.full_name || '';
    this.email = data.email;
    this.avatar =
      data.image ||
      data.avatar ||
      data?.avatar_url ||
      data?.imagem ||
      data?.url ||
      '';

    if (data?.name_initials?.length > 2) {
      this.iniciais = data.name_initials;
    } else if (this.nomeCompleto?.length > 2) {
      const arrName = this.nomeCompleto.split(' ');
      const primeiroNome = arrName[0];
      const ultimoNome = arrName[arrName.length - 1];
      if (ultimoNome) this.iniciais = `${primeiroNome[0]}${ultimoNome[1]}`;
      this.iniciais = `${primeiroNome[0]}${primeiroNome[1]}`;
    } else {
      this.iniciais = '';
    }
  }

  get primeiroNome(): string {
    return this.nomeCompleto.split(' ')[0];
  }

  get ultimoNome(): string {
    if (!this.nomeCompleto) return '';
    const arrName = this.nomeCompleto.split(' ');
    if (arrName.length < 2) return '';
    return arrName[arrName.length - 1];
  }

  toJson() {
    return {
      id: this.id,
      nome_completo: this.nomeCompleto,
      email: this.email,
      avatar: this.avatar,
      iniciais: this.iniciais,
    };
  }

  public static schema = z.object({
    id: z.number(),
    nomeCompleto: z.string(),
    avatar: z.string().optional(),
    iniciais: z.string().optional(),
    email: z.string().email(),
  });

  static validate(values: any) {
    const data = new UserModel(values);
    UserModel.schema.parse(data);
    return data;
  }
}
