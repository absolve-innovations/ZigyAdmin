import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './layouts/layout/layout.module';
import { HomeModule } from './Pages/home/home.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { DatePipe,AsyncPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS, } from '@angular/common/http';
import { JwtInterceptor } from './Shared/helper/jwt.interceptor';
import { AuthModule } from './Pages/auth/auth.module';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { AngularFireModule } from '@angular/fire/compat';
import { MessagingService } from './Shared/service/messaging-service';
import { OfflineStatusService } from './Shared/service/onlineStatus.service ';
import { OfflineComponent } from './offline/offline.component';


@NgModule({
  declarations: [
    AppComponent,
    OfflineComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HomeModule,
    AngularEditorModule,
    NgxSpinnerModule,
    AuthModule,
    HttpClientModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    AngularFireAuthModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAtgPbLrU_XnfTwplgsLKmoNKLjxHI6tFY",
      authDomain: "zigykart-b0119.firebaseapp.com",
      projectId: "zigykart-b0119",
      storageBucket: "zigykart-b0119.appspot.com",
      messagingSenderId: "666871617978",
      appId: "1:666871617978:web:d54082e877d697b5f42583",
      measurementId: "G-LD79BMXQWR"
    }),
    AngularFireMessagingModule,  
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [MessagingService,AsyncPipe,DatePipe,OfflineStatusService, { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
