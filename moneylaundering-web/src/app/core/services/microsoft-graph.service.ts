import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

declare const $: any;


@Injectable({
  providedIn: 'root'
})
export class MicrosoftGraphService {
  private authWindow: Window;

  constructor(private authService: AuthService) {
    this.initializeEventToken(this.authService)
  }
 

  initializeEventToken(authService) {
    
    $(window).on("message", function (this) {
      let message = this.event as MessageEvent
      authService.handleMessage(message);
    })
 
  }

  login() {
    var url = 'https://login.microsoftonline.com/'+ environment.activeDirectory.tenatID +'/oauth2/v2.0/authorize?client_id=' + environment.activeDirectory.appId + '&response_type=code&redirect_uri=' + environment.activeDirectory.redirectUri + '&response_mode=query&scope=offline_access%20user.read&state=12345';
    var w = 600;
    var h = 400;
    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 2) - (h / 2);
    this.authWindow = window.open(url, null);
  }

  closeWindow() {
    if (this.authWindow)
      this.authWindow.close();
  }

}

