import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Task} from '../task';

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
  executors: string[] = ['Петров А.', 'Павлов М.'];

  constructor() {
    this.taskForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      priority: new FormControl(1, [Validators.required]),
      executor: new FormControl('Петров А.', [Validators.required]),
    });
  }
  ngOnInit() {
  }
  createTask() {
    if (this.taskForm.valid) {
      const value: {
        name: string,
        description: string,
        priority: number,
        executor: string
      } = this.taskForm.value;
      const task = new Task(value.name, value.description, value.priority, value.executor);
      this.taskForm.reset({
        name: '',
        description: '',
        priority: 1,
        executor: 'Павлов М.'
      });
      this.create.emit(task);
    }
  }
}
