export interface NamePageVO{
    current:number;
    size:number;
    name?:string;
}

export interface Permission {
    id:string;
    pid:string;
    lvl:number;
    code:string;
    sortIdx:number;
    name:string;
    path:string;
    icon:string;
    type:string;
    status:number;
    description:string;
    creatorId:string;
    createTime:string;
    modifierId:string;
    modifiedTime:string;
}
