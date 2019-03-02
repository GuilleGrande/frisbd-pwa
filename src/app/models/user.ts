export interface Roles {
    client?: boolean;
    admin?: boolean;
}

export class User {
    uid: string;
    email: string;
    photoUrl?: string;
    displayName?: string;
    roles: Roles;
}