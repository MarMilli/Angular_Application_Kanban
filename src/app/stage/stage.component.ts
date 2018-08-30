import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Stage} from '../stage';
import {Task} from '../task';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit {

  @Input()
  stage: Stage;
  @Input()
  moveEnabled: boolean;
  @Input()
  backwardEnabled: boolean;

  taskName: string;
  taskContent: string;
  taskPriority: number;

  @Output()
  moveTask: EventEmitter<Task> = new EventEmitter<Task>();
  @Output()
  backwardTask: EventEmitter<Task> = new EventEmitter<Task>();

  constructor() {

  }

  ngOnInit() {
  }

  createTask() {
    this.stage.tasks.push(new Task(this.taskName, this.taskContent, this.taskPriority ));
    this.taskName = '';
    this.taskContent = '';
    this.taskPriority = 0;
  }

  onTaskMoved($event: Task) {
    this.stage.tasks = this.stage.tasks.filter(value => value !== $event);
    this.moveTask.emit($event);
  }

//   onTaskbackward ($event: Task) {
//   this.stage.tasks = this.stage.tasks.filter(value => value !== $event);
//   this.backwardTask.emit($event);
// }
}
