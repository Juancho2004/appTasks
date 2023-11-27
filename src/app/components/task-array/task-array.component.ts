import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Taks } from 'src/app/models/task';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-task-array',
  templateUrl: './task-array.component.html',

})
export class TaskArrayComponent implements OnInit, OnDestroy{

  showlist: boolean = false;
  @Input() taksList : Taks[] = [];
  suscription !: Subscription

  constructor(
    private taksService: TaskService
  ){
    this.taksService.isEmpty();
  }

  ngOnInit(): void {
    this.suscription = this.taksService.tasksArray$.subscribe(taks => {
      if(taks){
        this.showlist = this.taksService.isEmpty()
      }
    })
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe()
  }
}
