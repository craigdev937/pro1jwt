export interface IUser {
    id: number,
    first: string,
    last: string,
    email: string,
    password: string,
    image: string,
    created_at: string,
    updated_at: string
};

export interface IData {
    success: boolean,
    message: string,
    count: number,
    data: IUser[]
};

export interface AuthState {
    user: IUser | null,
    token: string | null,
    isAuth: boolean
};

export interface IAuth {
    user: IUser,
    token: string
};



