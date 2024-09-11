import { SetMetadata } from "@nestjs/common";
import { RoleEnum } from "../roles/roles.enum";

export const IS_PUBLIC_KEY = 'xelmisawvdomi';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const ROLE_KEY = 'roles';
export const Roles = (...roles: RoleEnum[]) => SetMetadata(ROLE_KEY, roles)