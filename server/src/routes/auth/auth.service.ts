import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User as UserModel } from '@prisma/client';
// import {  }

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async findOrAddUserForDB(
    external_id: string,
    email: string,
  ): Promise<UserModel> {
    const [firstname, lastname] = splitEmail(email);
    return (
      (await this.userService.user({ external_id })) ??
      (await this.userService.createUser({
        external_id,
        email,
        firstname,
        lastname,
      }))
    );
  }
}

function splitEmail(email: string) {
  // Match the first part before the @ symbol
  const match = email.match(/([^@]+)@/);

  if (match) {
    // Split the first part by a dot to get first and last names
    const [first, last] = match[1].split('.');
    return [first, last || '']; // If last name is missing, use an empty string
  } else {
    // If the email doesn't contain a dot, assume it's just the first name
    return [email.split('@')[0], ''];
  }
}
