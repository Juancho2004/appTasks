import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Taks } from 'src/app/models/task';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
})
export class PendingComponent implements OnInit, OnDestroy {

  pendingTask: Taks[] = [];
  suscription !: Subscription ;

  constructor(
    private taksService : TaskService
  ){}

  ngOnInit(): void {
    this.suscription = this.taksService.tasksArray$.subscribe( tasks => {
      if(tasks){
        this.pendingTask = this.taksService.getTaskPeding();
      }
    })
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

}
