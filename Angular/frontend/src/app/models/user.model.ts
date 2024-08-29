export interface UserModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    isDeleted: boolean;
    isAdmin: boolean;
    createdOn: Date;
    updatedOn: Date;
}
