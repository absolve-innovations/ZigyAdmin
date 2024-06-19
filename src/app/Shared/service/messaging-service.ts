import { Injectable } from "@angular/core";
import { AngularFireMessaging } from "@angular/fire/compat/messaging";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class MessagingService {
    
    currentMessage = new BehaviorSubject<any>(null);

    constructor(private angularfireMessaging: AngularFireMessaging) { }
    requestPermission() {
        
        this.angularfireMessaging.requestToken.subscribe((token: any) => {
             localStorage.setItem('token', token);
          
        }, (err) => {

        });
    }

    receiveMessaging() {
        
        this.angularfireMessaging.messages.subscribe((payload) => {

            this.currentMessage.next(payload)
        });
    }

}