import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Taks } from 'src/app/models/task';
import { TaskService } from 'src/app/service/task.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  // styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  newTask: FormControl

  constructor(
    private tasksService: TaskService
  ){
    this.newTask = new FormControl(null);
  }

  ngOnInit(): void {
    // this.addTaks
  }

  addTaks(event: KeyboardEvent){
    if (event.key == 'Enter') {
      let title : string = this.newTask.value;
      if (title && title.trim() != '') {
        this.tasksService.createTaks(title.trim());
        this.newTask.reset();
      } else {
        console.log('DATA NO EXISTE')
      }
    }
  }

}
