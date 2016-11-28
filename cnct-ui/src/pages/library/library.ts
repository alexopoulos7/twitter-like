import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { animations } from '../../app/animate';
import { ReadPage } from '../read/read';
import { WritePage } from '../write/write';
import { ProfilePage } from '../profile/profile';
import { StoreService } from '../../app/services/store.service';
import { StorageService } from '../../app/services/storage.service';
import { Message } from '../../app/models/messages';
import { MessageLike } from '../../app/models/likes';

/*
 Generated class for the Library page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-library',
  templateUrl: 'library.html',
  animations: animations
})
export class LibraryPage {

  searchQuery: string = '';
  items: Array<Message>;
  foundItems: Array<Message>;
  loadingFeatured: boolean = false;

  constructor(public navCtrl: NavController, private store: StoreService, public modalCtrl: ModalController, private storage: StorageService) {
    this.initializeItems();
  }
  ionViewWillEnter() {
    this.initializeItems();
  }
  ionViewDidLoad() {
    console.log('Hello LibraryPage Page');
  }


  initializeItems() {
    return new Promise((resolve, reject) => {
      this.loadingFeatured = true;
      this.store.getAllMessages('params=' + JSON.stringify({ sort: 'createdAt DESC', where: { parent: 0 } }))
        .then((items: any) => {
          if (items && items.messages.length) {
            this.items = items.messages;
            this.foundItems = items.messages;
          }
        })
        .catch(err => { console.log(err); })
        .then(() => { this.loadingFeatured = false; return resolve(); });
    })
  }

  getItems(ev: any) {
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.foundItems = this.items.filter((item: any) => {
        return (item.text.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.users[0].email.toLowerCase().indexOf(val.toLowerCase()) > -1)
      })
    }
    else {
      this.foundItems = this.items;
    }
  }

  readPost(id: number) {
    this.navCtrl.push(ReadPage, { id: id });
  }
  openMessageModal() {
    let modal = this.modalCtrl.create(WritePage);
    modal.onDidDismiss(d => {
      this.initializeItems();
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
    let curMessage = this.items.filter(m => m.id === id)[0];
    let existingLike = curMessage.likes.filter(l => l.message === id && l.user === this.storage.getItem('user').id);
    if (existingLike && existingLike.length) {
      console.log('Existing Like ' + JSON.stringify(existingLike, null, 2));
      this.store.removeLikeMessage(existingLike[0].id).then((s) => {
        let curLikeIndex = curMessage.likes.indexOf(existingLike[0]);
        console.log('Found current Like message at index =' + curLikeIndex);
        this.items.filter(m => m.id === id)[0].likes.splice(curLikeIndex, 1);
      });
    }
    else {
      this.store.likeMessage(likeParams)
        .then((s: any) => {
          this.items.filter(m => m.id === id)[0].likes.push(s.likes);
        })
    }
  }
}
