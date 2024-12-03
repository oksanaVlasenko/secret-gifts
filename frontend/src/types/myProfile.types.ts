export type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type User = {
  email: string | number | null | undefined;
  name: string | number | null | undefined;
  phone: string;
  birthday: Value;
}

export type UserError = {
  emailErrors: boolean,
  errorPhone: boolean,
  existUserByEmail: string | number | null | undefined
}

export type Flags = {
  updating: boolean,
  loading: boolean
}