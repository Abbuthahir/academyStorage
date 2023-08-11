import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  listData: any[] = [];

  constructor(private dataService: DataService) {
    this.loadData();
  }

  async loadData() {
    // this.listData = await this.dataService.getData();
    this.dataService.getData().subscribe(res => {
      this.listData = res;
    });
  }

  async addData() {
    await this.dataService.addData(`Abbu ${Math.floor(Math.random() * 100)}`);
    this.loadData();
  }

  async removeItem(index: any) {
    this.dataService.removeItem(index);
    this.listData.splice(index, 1);
  }

}
