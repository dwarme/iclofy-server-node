import { IUser, IUserCreateInput } from "../types";

class User{
    static async create(input: IUserCreateInput): Promise<IUser>{

    }

    static async retrieve(email: string): Promise<IUser>{
        
    }

    static async updateName(): Promise<IUser>{

    }

    static async updateEmail(): Promise<IUser>{

    }

    static async updatePassword(): Promise<IUser>{

    }

    static async updatePermissions(): Promise<IUser>{

    }
}

export default User;