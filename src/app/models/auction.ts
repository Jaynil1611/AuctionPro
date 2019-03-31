import { Time } from '@angular/common';

export interface Auction {
    User_Id:number;
    Title:string;
    Description:string;
    startDate:Date;
    startTime:Time;
    endDate:Date;
    endTime:Time;
}