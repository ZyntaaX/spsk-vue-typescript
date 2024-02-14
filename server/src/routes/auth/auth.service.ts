import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User as UserModel } from '@prisma/client';
import { DateTime } from 'luxon';
import { UserRoleService } from '../user-role/user.role.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private userRoleService: UserRoleService,
  ) {}

  async findOrAddUserForDB(
    external_id: string,
    email: string,
  ): Promise<UserModel> {
    const [firstname, lastname] = splitEmail(email);
    const user = await this.userService.user({ external_id });
    if (user) {
      return await this.userService.updateUser({
        where: { id: user.id },
        data: { last_login: DateTime.now().toISO() },
      });
    }

    // let memberRole = await this.userRoleService.userRole({
    //   title: 'member',
    // });

    // if (!memberRole) {
    //   memberRole = await this.userRoleService.createUserRole({
    //     title: 'member',
    //   });
    // }

    return await this.userService.createUser({
      external_id,
      email,
      firstname,
      lastname,
      last_login: DateTime.now().toISO(),
      // role: { connect: { id: memberRole.id } },
    });
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
