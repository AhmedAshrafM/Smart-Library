export type CreateUserParams = {
  email: string;
  password: string;
};
export type UpdateUserParams = {
  email: string;
  password: string;
};
export type CreateRoleParams = {
  roleName: string;
};
export type UpdateRoleParams = {
  roleName: string;
};
export type CreateBookParams = {
  bookTitle: string;
  copyWriteYear: number;
  subject: string;
  editionNumber: number;
  numberOfPages: number;
  authorIds: number[];
  publisherIds: number[];
  genreIds:number[];
};
export type CreateLogParams = {
  type: string;
  body: any;
  entity: string;
}