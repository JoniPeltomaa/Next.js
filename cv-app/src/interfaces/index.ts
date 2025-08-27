export interface IUser {
    _id : string
    name : string,
    email: string,
    profilePicture: string,
    profileDataForResume : any
    isAdmin : boolean
}

export interface ITemplate {
    _id: string
    name: string
    html: string
    thumbnail: string
}
export interface IOsaaminen {
    tekniikka: string;
    arviointi: number;
    
}

export interface IKieli {
    kieli: string;
    arviointi: number;
    
}

