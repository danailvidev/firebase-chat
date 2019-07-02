import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  currentUser;
  chatsList = [];

  constructor(
    public auth: AuthService,
    private chatSvc: ChatService) {
    this.auth.getUser().then(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.getChats();
  }

  goToChats() {
    this.chatSvc.create();
  }

  getChats() {
    this.chatSvc.getList().then(snap => {
      snap.forEach(doc => {
        this.chatsList.push({ id: doc.id, ...doc.data() });
      });
    });
  }
}
