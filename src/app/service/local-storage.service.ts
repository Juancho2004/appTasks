import { Injectable } from '@angular/core';
import { Taks } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private key = 'mydayapp'

  constructor() {}

  save(task: Taks[]): void{
    localStorage.setItem(this.key, JSON.stringify(task))
  }

  readStorage(){
    return JSON.parse(
      localStorage.getItem(this.key) || '[]'
    );
  }
}
