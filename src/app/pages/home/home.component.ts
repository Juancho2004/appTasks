import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Taks } from 'src/app/models/task';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  allTask : Taks[] = [];
  suscription !: Subscription


  constructor( private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getLocalstorage()
    this.suscription = this.taskService.tasksArray$.subscribe(task => {
      if (task) {
        this.allTask = task;
      }
    })
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe()
  }

}
