import {Component, EventEmitter, OnInit, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Task} from '../models/task';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  @Output()
  create: EventEmitter<Task> = new EventEmitter<Task>();

  taskForm: FormGroup;
  priority: number [] = [1, 2, 3];
  executors: string[] = ['Петров', 'Иванов', 'Сидоров'];

  constructor() {
    this.taskForm = new FormGroup({
      taskName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      taskDescription: new FormControl('', [Validators.required, Validators.maxLength(150)]),
      taskPriority: new FormControl(1, [Validators.required]),
      executorName: new FormControl('Петров', [Validators.required]),
    });
  }
  ngOnInit() {
  }
  createTask() {
    if (this.taskForm.invalid) {
      return;
    }
    const value = this.taskForm.value;
    const task = new Task(value.taskName, value.taskDescription, value.taskPriority, value.executorName);
    this.create.emit(task);
    this.taskForm.reset({
      taskName: '',
      taskDescription: '',
      taskPriority: this.priority[1],
      executorName: this.executors[1]
    });
  }

}

