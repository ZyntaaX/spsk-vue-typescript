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
    role: {
        title: string;
        claims: {
            key: string;
        }[];
    };
    posts: {
        id: string;
    }[];
    comments: object[];
    profile_picture_id: string;
    profile_picture_url?: string;
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
      role,
      profile_picture_id
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
      role,
      profile_picture_id,
  } as UserModel
}