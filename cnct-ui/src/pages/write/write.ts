import { Component } from '@angular/core';
import { NavController, ModalController, ViewController, AlertController, NavParams } from 'ionic-angular';
import { StoreService } from "../../app/services/store.service";
import { StorageService } from "../../app/services/storage.service";
import { animations } from "../../app/animate";
/*
 Generated class for the Write page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-write',
    templateUrl: 'write.html',
    animations: animations
})
export class WritePage {
    storyContentPlaceholder: string = 'Once upon a time...';
    story: { title, content } = {
        title: '',
        content: ''
    };
    placeholderClick: boolean = true;
    lettersCountLeft = 200;
    lettersCountLimit = 200;
    curUser = null;
    messageId = 0;
    originalAuthor = '';
    constructor(public viewCtrl: ViewController, public params: NavParams, private store: StoreService, private storage: StorageService, public modalCtrl: ModalController, public alertCtrl: AlertController, ) {
        if (params && params.data && params.data.messageId) {
            this.messageId = params.data.messageId;
        }
        if (params && params.data && params.data.emailTo) {
            this.originalAuthor = params.data.emailTo;
        }

    }

    ionViewDidLoad() {
        console.log('Hello WritePage Page');
        this.curUser = this.storage.getItem('user');
    }

    showAlert(title, message) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    }

    checkCountOfWords() {
        this.lettersCountLeft = this.lettersCountLimit - this.story.content.length;
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    save() {
        this.store.createPost({
            message: {
                text: this.story.content,
                author: this.curUser.id,
                parent: this.messageId
            }
        }).then((newPost) => {
            if (this.originalAuthor && this.curUser.email !== this.originalAuthor) {
                let params = {
                    email: {
                        subject: 'CNCT: A new Reply to your message has been posted',
                        to: this.originalAuthor,
                        text: `User ${this.originalAuthor} has replied to your message: ${this.story.content}`,
                        htmlText: `User <b>${this.originalAuthor}</b> has replied to your message: <hr><p><i>${this.story.content}</i></p><BR><BR> CNCT Team.`
                    }
                }
                this.store.sendNotificationEmail(params).then(() => {
                    this.viewCtrl.dismiss();
                }).catch(console.error);
            }
            else {
                this.viewCtrl.dismiss();
            }
            console.log('New Post created' + JSON.stringify(newPost));
        })
            .catch((err) => this.showAlert('Error on saving yout post', err));
    }
}
