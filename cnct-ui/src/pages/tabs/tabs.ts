import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { NavController } from "ionic-angular";
import { LibraryPage } from "../library/library";
import { ProfilePage } from "../profile/profile";
import { WritePage } from "../write/write";
import { animations } from "../../app/animate";

@Component({
  templateUrl: 'tabs.html',
  animations: animations
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = LibraryPage;
  tab2Root: any = ProfilePage;
  tab3Root: any = AboutPage;

  constructor(private nav: NavController) {

  }
}
