import { Component, AfterViewInit } from '@angular/core';
import { NavController, ViewController, ModalController } from 'ionic-angular';
import { StoreService } from '../../app/services/store.service';
import { StorageService } from '../../app/services/storage.service';
import { Message } from '../../app/models/messages';
import { MessageLike } from '../../app/models/likes';

import { WritePage } from '../write/write';
import { ProfilePage } from '../profile/profile';
import { animations } from '../../app/animate';

/*
 Generated class for the Read page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-read',
  templateUrl: 'read.html',
  animations: animations
})
export class ReadPage implements AfterViewInit {

  loadingMessage: boolean = false;
  messages: Array<Message>;
  action: string;
  messageId: string | number;
  originalMessage: any;
  responseMessages: Array<Message>;
  showResponses: Boolean;
  randomColrs = {};

  constructor(public navCtrl: NavController,
    private viewCtrl: ViewController,
    private store: StoreService,
    private storage: StorageService,
    private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('Hello ReadPage Page');
  }

  ngAfterViewInit() {
    let params = this.viewCtrl.getNavParams();
    this.action = params.get('action');
    this.loadStory(params.get('id'));
  }

  loadStory(id: string | number) {
    this.loadingMessage = true;
    this.messageId = id;
    this.messages = [];
    this.store.getMessageStoryById(id)
      .then((msg: any) => {
        this.originalMessage = msg.message.filter(m => m.parent === 0)[0];
        this.messages.push(this.originalMessage);
        this.store.getMessageRepliesByParentId(id)
          .then((msgs: any) => {
            this.responseMessages = msgs.messages.filter(m => m.parent === id).sort((a, b) => a.createdAt <= b.createdAt);
            if (this.responseMessages && this.responseMessages.length) {
              this.showResponses = true;
            }
            this.messages = this.messages.concat(msgs.messages);
          }).catch(console.error)
      })
      .catch(console.error)
      .then(() => this.loadingMessage = false);
  }

  getRandomColor(email) {
    if (this.randomColrs[email]) {
      return this.randomColrs[email];
    }
    else {
      var letters = '0123456789ABCDEF'.split('');
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      this.randomColrs[email] = 'color: ' + color;
      return 'color: ' + color;
    }

  }

  openMessageModal() {
    let modal = this.modalCtrl.create(WritePage, { messageId: this.messageId, emailTo: this.originalMessage.users[0].email });
    modal.onDidDismiss(d => {
      this.loadStory(this.messageId);
    })
    modal.present();
  }

  loadUserProfile(id) {
    this.navCtrl.push(ProfilePage, { userId: id });
  }

  like(id) {
    let likeParams = {
      message: id,
      user: this.storage.getItem('user').id
    }
    let curMessage = this.messages.filter(m => m.id === id)[0];
    let existingLike = curMessage.likes.filter(l => l.message === id && l.user === this.storage.getItem('user').id);
    if (existingLike && existingLike.length) {
      console.log('Existing Like ' + JSON.stringify(existingLike, null, 2));
      this.store.removeLikeMessage(existingLike[0].id).then((s) => {
        let curLikeIndex = curMessage.likes.indexOf(existingLike[0]);
        console.log('Found current Like message at index =' + curLikeIndex);
        this.messages.filter(m => m.id === id)[0].likes.splice(curLikeIndex, 1);
      });
    }
    else {
      this.store.likeMessage(likeParams)
        .then((s: any) => {
          this.messages.filter(m => m.id === id)[0].likes.push(s.likes);
        })
    }
  }
}
