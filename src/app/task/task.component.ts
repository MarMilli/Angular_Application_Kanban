import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '../models/task';
import {BackendService} from '../backend.service';
import {Stage} from '../models/stage';
// import {Subject, Subscription} from 'rxjs';
// import {repeatWhen} from 'rxjs/operators';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input()
  task: Task;
  @Input()
  stage: Stage;
  @Input()
  addClassPriority: string;
  @Input()
  moveEnabled: boolean;
  @Input()
  backEnabled: boolean;

  @Output()
  moveTask: EventEmitter<Task> = new EventEmitter<Task>();
  @Output()
  backTask: EventEmitter<Task> = new EventEmitter<Task>();

  isOpen = false;
  isEdit = false;
  taskName: string;
  taskDescription: string;
  executorName: string;
  executors: string[] = ['Петров', 'Иванов', 'Сидоров'];
  taskPriority: number;
  priority: number [] = [1, 2, 3];

  constructor(private service: BackendService) {
  }

  ngOnInit() {
  }

  moveAhead() {
    this.moveTask.emit(this.task);
  }

  backAhead() {
    this.backTask.emit(this.task);
  }

  onDelete() {
    const deleteTaskSubscription = this.service
      .deleteTask(this.task)
      .subscribe(() => {
        deleteTaskSubscription.unsubscribe();
      });
  }

  onEditStart() {
    this.isEdit = true;
    this.taskName = this.task.name;
    this.taskDescription = this.task.description;
    this.executorName = this.task.executor;
    this.taskPriority = this.task.priority;
  }

  onEditFinish() {
    this.isEdit = false;
    this.task.name = this.taskName;
    this.task.description = this.taskDescription;
    this.task.executor = this.executorName;
    this.task.priority = this.taskPriority;
    const updateTaskSubscription = this.service
      .updateTask(this.task)
      .subscribe(() => updateTaskSubscription.unsubscribe());
  }

  onEditCancel() {
    this.isEdit = false;
  }

  dropdownMenu() {
    this.isOpen = !this.isOpen;
  }

}
