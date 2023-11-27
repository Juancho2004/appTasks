import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Taks } from 'src/app/models/task';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
})
export class CompletedComponent implements OnInit, OnDestroy {
  completedTask : Taks[] = [];
  suscription !: Subscription ;

  constructor(
    private taskService: TaskService
  ){}

  ngOnInit(): void {
    this.suscription = this.taskService.tasksArray$.subscribe( tasks => {
      if (tasks) {
        this.completedTask = this.taskService.getTaskCompleted();
      }
    })
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe()
  }
}
