export interface Users {
    User_Id:number;
    Username:string;
    Token:string;
}

export interface Address {
    User_Id:number;
    First_line:string;
    Second_Line:string|null;
    City:string;
    State:string;
    Country:string;
}

export interface User_details {
    User_Id:number;
    First_name:string;
    Last_name:string;
    Email:string;
    Contact_no:string;
}
