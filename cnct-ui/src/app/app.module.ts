import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { LibraryPage } from '../pages/library/library';
import { WritePage } from '../pages/write/write';
import { ProfilePage } from '../pages/profile/profile';
import { StoreService } from './services/store.service';
import { StorageService } from './services/storage.service';
import { ReadPage } from '../pages/read/read';
// import { FacebookPage } from '../pages/facebook/facebook';

@NgModule({
    declarations: [
        MyApp,
        AboutPage,
        TabsPage,
        LoginPage,
        RegisterPage,
        ProfilePage,
        LibraryPage,
        WritePage,
        ReadPage,
        // FacebookPage
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AboutPage,
        TabsPage,
        LoginPage,
        RegisterPage,
        ProfilePage,
        LibraryPage,
        WritePage,
        ReadPage,
        // FacebookPage
    ],
    providers: [StoreService, StorageService],
})
export class AppModule {
}
