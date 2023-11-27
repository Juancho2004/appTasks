import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Taks } from '../models/task';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskArray: Taks[] = [];
  private tasksArray = new BehaviorSubject<Taks[]>([]);
  public tasksArray$ : Observable<Taks[]> = this.tasksArray.asObservable();
  seletectTaks: Taks = new Taks();

  constructor(
    private storageService: LocalStorageService
  ) { }

  isEmpty(): boolean {
    return this.taskArray.length === 0
  }

  getLocalstorage(){
    if(localStorage.getItem('mydayapp')){
      this.taskArray = this.storageService.readStorage();
      this.saveTasks();
    }
  }

  createTaks(task: string){

    // if (this.taskArray.length === 0) {
    //   this.seletectTaks .id = this.taskArray.length + 1
    //   this.taskArray.push(this.seletectTaks)
    // }
    const newTask : Taks = {
      id: new Date().getTime(),
      task,
      completed: false
    }

    this.taskArray = [...this.taskArray, newTask]
    this.saveTasks();
  }

  deleteTaks(task: Taks){
    this.taskArray = this.taskArray.filter(tk => tk.id != task.id);
    this.saveTasks();
  }

  update(task: Taks){
    const index = this.taskArray.findIndex(tk => tk.id == task.id);
    this.taskArray[index]= task;
    this.saveTasks();
  }

  getTaskPedingLength(): number{
    return this.taskArray.filter(tk => !tk.completed).length
  }

  getTaskCompletedLength(): number{
    return this.taskArray.filter(tk => tk.completed).length
  }

  getTaskPeding():Taks[]{
    return this.taskArray.filter(tk => !tk.completed)
  }

  getTaskCompleted():Taks[]{
    return this.taskArray.filter(tk => tk.completed)
  }

  clearCompletedTasks(){
    this.taskArray = this.taskArray.filter(tk => !tk.completed);
    this.saveTasks();
  }

  private saveTasks(){
    this.tasksArray.next(this.taskArray)
    this.storageService.save(this.taskArray)
  }

  toggle(id: Taks['id']): void{
    this.taskArray = this.taskArray.map((task) =>
      task.id === id ? {...task, completed: !task.completed}: task
    )

    this.saveTasks();
  }
}
