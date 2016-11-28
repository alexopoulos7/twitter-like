import { Component, AfterViewInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { StoreService } from '../../app/services/store.service';
import { StorageService } from '../../app/services/storage.service';
import { animations } from '../../app/animate';

/*
 Generated class for the Register page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
    animations: animations
})
export class RegisterPage implements AfterViewInit {

    showButton = false;
    name = '';
    newUsermail = '';
    password = '';
    newPassword = '';
    usermail = '';
    sex = '';
    constructor(public navCtrl: NavController, public alertCtrl: AlertController, private store: StoreService, private storage: StorageService) {
    }

    ngAfterViewInit() {
        this.checkIfAlreadyLoggedIn();
    }

    checkIfAlreadyLoggedIn() {
        let storedUser = this.storage.getItem('user');
        if (storedUser) {
            //lets check if user credentials match in db
            this.tryLogin(storedUser.email, storedUser.password);
        }
    }

    showAlert(title, message) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    }

    tryLogin(username, password) {
        this.store.login(username, password).then(() => {
            this.navCtrl.setRoot(TabsPage);
        }).catch((err) => {
            console.log(err); this.showAlert('Error During Login', err); this.storage.deleteItem('user');
        });
    }

    /**
     * Really simple register of user  
     */
    register() {
        if (this.newUsermail && this.newPassword) {
            this.store.registerUser(this.newUsermail, this.newPassword, this.name, this.sex).then(() => {
                this.navCtrl.setRoot(TabsPage);
            }).catch((err) => { console.error('Error on registering ' + err); this.showAlert('Errod on Creating new User', err); });
        }
        else {
            this.showAlert('Missing Details', 'Please provide both Email and Password');
        }
    }
}
