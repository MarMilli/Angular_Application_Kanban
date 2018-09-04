import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Stage, Stages} from '../stage';
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
  backEnabled: boolean;

  @Output()
  moveTask: EventEmitter<Task> = new EventEmitter<Task>();
  @Output()
  backTask: EventEmitter<Task> = new EventEmitter<Task>();


  n = true;

  constructor() {

  }

  ngOnInit() {
  }

  createTask(task: Task) {
    this.stage.tasks.push(task);
  }

  onTaskMoved($event: Task) {
    this.stage.tasks = this.stage.tasks.filter(value => value !== $event);
    this.moveTask.emit($event);
  }

  inTaskMoved($event: Task) {
    this.stage.tasks = this.stage.tasks.filter(value => value !== $event);
    this.backTask.emit($event);
  }

  windowAddTask(state, d, m) {
    d = document.getElementsByClassName(d);
    m = document.getElementsByClassName(m);
    const i = this.stage.id;
    if (this.n) {
      d[i].style.display = state;
      m[i].classList.add('closeForm');
      this.n = false;
    } else {
      d[i].style.display = 'none';
      m[i].classList.remove('closeForm');
      this.n = true;
    }
  }
   // console.log(this.stage);
  // let m = this.stage; console.log(this.stage.id);
  // this.stage.indexOf(); this.stage
  }

