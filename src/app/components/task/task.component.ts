import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TaskService } from 'src/app/service/task.service';
import { FormControl } from '@angular/forms';
import { Taks } from 'src/app/models/task';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
})
export class TaskComponent implements OnInit{

  inputTask: FormControl = new FormControl(null)
  editing: boolean = false;

  @Input() task! : Taks;
  @ViewChild('editInput') editInput !: ElementRef<HTMLInputElement>

  constructor(
    private taskService: TaskService,
    private cdRef : ChangeDetectorRef
    ){}

  ngOnInit(): void {
    if (this.task) {
      this.inputTask.setValue(this.task.task)
    }
  }

  delete(task:Taks){
    this.taskService.deleteTaks(task)
  }

  saveTask(event: KeyboardEvent){
    if (event.key == 'Enter') {
      let title: string = this.inputTask.value;
      if (title && title.trim() != '') {
        let newTask: Taks = {
          id: this.task.id,
          completed: this.task.completed,
          task: title.trim()
        }
        this.taskService.update(newTask)
      }
      this.editing = false;
    }
  }

  editTask(){
    this.editing = !this.editing;
    this.cdRef.detectChanges();
    this.editInput.nativeElement.focus();
  }

  toggle(){
    this.taskService.toggle(this.task.id)
  }



}
