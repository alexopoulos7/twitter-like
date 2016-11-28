import { Component, AfterViewInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../app/services/storage.service';
import { animations } from '../../app/animate';
import { StoreService } from '../../app/services/store.service';
import { ReadPage } from '../read/read';
import { LoginPage } from '../login/login';
import { Message } from '../../app/models/messages';
import { MessageLike } from '../../app/models/likes';
import { User } from '../../app/models/users';

/*
 Generated class for the Profile page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  animations: animations
})
export class ProfilePage implements AfterViewInit {

  public loadingMessages: boolean = true;

  user: User | any = {};
  errorMessage: String;
  userId: Number;
  userAvatar: String;
  userMessages: Array<any>;
  author: String;
  showLogOut: Boolean;

  constructor(public navCtrl: NavController, params: NavParams, private storage: StorageService, private store: StoreService) {
    this.loadingMessages = true;
    if (params && params.data && params.data.userId) {
      this.userId = params.data.userId;
      let loggedInUser = this.storage.getItem('user');
      this.showLogOut = false;
      if (loggedInUser.id === this.userId) {
        this.showLogOut = true;
        this.author = 'you';
      }
    }
    else {
      this.user = this.storage.getItem('user');
      this.userId = this.user.id;
      this.author = 'you';
      this.showLogOut = true;
    }

  }

  ionViewDidLoad() {
    console.log('Hello ProfilePage Page');
  }

  ngAfterViewInit() {
  }

  ionViewWillEnter() {
    this.loadAllUserInformation();
  }


  /**
   * Get User User Messages Information
   */
  loadAllUserInformation() {
    this.store.getAllUserInformationById(this.userId)
      .then((user: any) => {
        if (user.user && user.user.length) {
          this.user = user.user[0];
          if (this.author !== 'you') {
            this.author = user.email;
          }
          this.userAvatar = this.user.avatar ? this.user.avatar : (this.user.sex === 'boy' ? '../../assets/img/male.png' : '../../assets/img/female.png');
          this.loadUserMessages();
          this.loadingMessages = false;
        } else {
          this.errorMessage = 'Cannot find profile for User';
        }
      })
      .catch(console.error);
  }


  loadUserMessages() {
    this.userMessages = [];
    this.user.messages.forEach(m => {
      this.store.getMessageStoryById(m.id)
        .then((msg: any) => {
          this.userMessages.push(msg.message[0]);
        });
    });
  }


  logout() {
    this.storage.deleteItem('user');
    this.navCtrl.setRoot(LoginPage);
  }


  /**
   * Like or Unlike a Message
   * Each user can do only one like for each Message
   */
  like(id) {
    let likeParams = {
      message: id,
      user: this.userId
    }
    let curMessage = this.userMessages.filter(m => m.id === id)[0];
    let existingLike = curMessage.likes.filter(l => l.message === id && l.user === this.userId);
    if (existingLike && existingLike.length) {
      this.store.removeLikeMessage(existingLike[0].id).then((s) => {
        let curLikeIndex = curMessage.likes.indexOf(existingLike[0]);
        this.userMessages.filter(m => m.id === id)[0].likes.splice(curLikeIndex, 1);
      });
    }
    else {
      this.store.likeMessage(likeParams)
        .then((s: any) => {
          this.userMessages.filter(m => m.id === id)[0].likes.push(s.likes);
        })
    }
  }


  showMessage(message) {
    if (message.parent) {
      this.navCtrl.push(ReadPage, { id: message.parent });
    }
    else {
      this.navCtrl.push(ReadPage, { id: message.id });
    }
  }
}
