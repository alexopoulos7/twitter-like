import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable()
/**
 * Local Storage Service
 */
export class StorageService {

  constructor() {

  }

  save(key, value) {
    try {
      return localStorage.setItem(`nes-${environment.stage}-${key}`, JSON.stringify(value));
    } catch (e) {
      return localStorage.setItem(`nes-${environment.stage}-${key}`, value);
    }
  }

  getItem(key) {
    try {
      return JSON.parse(localStorage.getItem(`nes-${environment.stage}-${key}`))
    } catch (e) {
      return localStorage.getItem(`nes-${environment.stage}-${key}`);
    }
  }

  deleteItem(key) {
    try {
      return localStorage.removeItem(`nes-${environment.stage}-${key}`);
    } catch (e) {
      return localStorage.removeItem(`nes-${environment.stage}-${key}`);
    }
  }
}