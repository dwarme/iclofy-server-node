import { IUserPermission } from "../types"

export const CORS_ORIGIN = process.env?.NODE_ENV === 'production' ? [] : ['http://localhost:3000']

export const VALIDE_USER_PERMISSIONS: IUserPermission[] = ['admin', 'full']