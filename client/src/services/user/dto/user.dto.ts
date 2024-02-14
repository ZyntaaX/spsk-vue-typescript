import { DateTime } from 'luxon';

export type UserModel = {
    id: string;
    external_id: string;
    email: string;
    phone_number?: string;
    firstname: string;
    lastname: string;
    created_at: DateTime;
    last_login: DateTime;
    role: object;
    posts: [];
    comments: [];
} | undefined;

export function mapUserModel(apiResponse: any) : UserModel {
  const {
      id,
      external_id,
      email,
      last_login,
      created_at,
      firstname,
      lastname,
      phone_number,
      posts,
      comments,
      role
  } = apiResponse;
  return {
      id,
      external_id,
      email,
      last_login,
      created_at,
      firstname,
      lastname,
      phone_number,
      posts,
      comments,
      role
  } as UserModel
}