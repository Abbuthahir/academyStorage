import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { BehaviorSubject, filter, switchMap, from, of } from 'rxjs';


const STORAGE_KEY = 'mylist';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private storageReady = new BehaviorSubject(false);
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    console.log('Init');
    await this.storage.defineDriver(cordovaSQLiteDriver);
    await this.storage.create();
    console.log('Done');
    this.storageReady.next(true);
  }
  getData() {
    console.log('Get Data');
    return this.storageReady.pipe(
      filter(ready => ready),
      switchMap(_ => {
        console.log('Lets go');
        return from(this.storage.get(STORAGE_KEY)) || of([]);
      })
    )

  }

  async addData(item: any) {
    const storedData = await this.storage.get(STORAGE_KEY) || [];
    storedData.push(item);
    return this.storage.set(STORAGE_KEY, storedData)
  }

  async removeItem(index: any) {
    const storedData = await this.storage.get(STORAGE_KEY) || [];
    storedData.splice(index, 1);
    return this.storage.set(STORAGE_KEY, storedData)
  }
}
