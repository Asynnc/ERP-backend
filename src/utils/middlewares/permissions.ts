import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../../modules/user/model/User";
import AppError from '../errors/AppError';


export function can(permissionsRoutes: string[]) {
  return async (request: Request, response: Response, next: NextFunction) => {

    const userId = request.user.id;

    const userRepo = getRepository(User)

    const user = await userRepo.findOne({
      where: { id: userId },
      relations: ["permissions"],
    });

    if (!user) {
      throw new AppError('User does not exists', 404)
    }

    const permissionExists = user.permissions
      .map((permission) => permission.name)
      .some((permission) => permissionsRoutes.includes(permission));

    if (!permissionExists) {
      throw new AppError('Permission Unauthorized', 401)
    }

    return next();
  };
}

export function is(rolesRoutes: string[]) {
  return async (request: Request, response: Response, next: NextFunction) => {

    const userId = request.user.id;

    const userRepo = getRepository(User)

    const user = await userRepo.findOne({
      where: { id: userId },
      relations: ["roles"],
    });

    if (!user) {
      throw new AppError('User does not exists', 404)
    }

    const roleExists = user.roles
      .map((role) => role.name)
      .some((role) => rolesRoutes.includes(role));

    if (!roleExists) {
      throw new AppError('Role Unauthorized', 401)
    }

    return next();
  };
}
