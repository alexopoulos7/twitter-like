import { Component, AfterViewInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { FBConnector } from '../../app/services/facebook.service';
import { StoreService } from '../../app/services/store.service';
import { StorageService } from '../../app/services/storage.service';
import { animations } from '../../app/animate';
import { RegisterPage } from '../register/register';

declare var FB;
/*
 Generated class for the Login page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
    animations: animations
})
export class LoginPage implements AfterViewInit {

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
     * Simple Login
     */
    login() {
        if (this.usermail && this.password) {
            this.tryLogin(this.usermail, this.password);
        }
        else {
            this.showAlert('Missing Login Details', 'Please provide both Email and Password');
        }
    }

    /**
     * Really simple register of user  
     */
    register() {
        this.navCtrl.push(RegisterPage);
    }

    // /**
    //  * Login to facebook from web or native items
    //  */
    // login() {
    //   let p;
    //   let fbConn: FBConnector = new FBConnector();
    //   if (window['cordova']) {
    //     p = fbConn.getLoginStatus()
    //       .then(r => {
    //         console.log(JSON.stringify(r));
    //         if (r.status === 'connected') {
    //           return Promise.resolve(r);
    //         } else {
    //           return fbConn.logout()
    //             .then(() => console.log('Logged Out'))
    //             .catch(e => console.log('Log Out Error', e))
    //             .then(() => fbConn.login(['email', 'user_friends', 'taggable_friends']));
    //         }
    //       });
    //   } else {
    //     p = new Promise((resolve, reject) => {
    //       try {
    //         fbConn.Web.login((response) => {
    //           if (response.status === 'connected') {
    //             resolve(response);
    //           } else {
    //             reject(response);
    //           }
    //         });
    //       } catch (err) {
    //         reject(err);
    //       }
    //     });
    //   }

    //   p
    //     .then(response => this.store.sendToken(response))
    //     .then(user => this.navCtrl.setRoot(TabsPage))
    //     .catch(e => console.error(e));
    // }
}
