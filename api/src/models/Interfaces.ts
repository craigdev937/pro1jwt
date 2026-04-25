export interface JwtPayload {
    id: number,
    email: string
};

export interface IReg {
    id: number,
    first: string,
    last: string,
    email: string,
    password: string,
    image: string,
    created_at?: string,
    updated_at?: string
};





