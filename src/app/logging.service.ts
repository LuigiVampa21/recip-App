import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })

export class LoggingService {
    lastlog: string;

    prinLog(msg:string){
        console.log(msg);
        console.log(this.lastlog);
        this.lastlog = msg;
    }
}