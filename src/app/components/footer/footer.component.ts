import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit, OnDestroy {

  showFooter: boolean = false;
  taskCounter: number = 0;
  suscription !: Subscription ;
  showButton: number = 0;

  constructor(
    private taskService: TaskService
  ){
    this.showFooter = this.taskService.isEmpty();
  }


  ngOnInit(): void {
   this.suscription = this.taskService.tasksArray$.subscribe( task => {
    if(task) {
      this.showFooter = this.taskService.isEmpty();
      this.taskCounter = this.taskService.getTaskPedingLength();
      this.showButton = this.taskService.getTaskCompletedLength();
    }
   })
  }

  clearTask(){
    this.taskService.clearCompletedTasks()
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe()
  }


}


