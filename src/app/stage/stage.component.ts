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
  backTask:  EventEmitter<Task> = new EventEmitter<Task>();

  stages: Stage[] = Stages;
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
  windowAddTask(state, d) {
    d = document.getElementsByClassName(d);
    // this.stage.indexOf();
    let m = this.stage[i]; // определить какая статдия,indexOf
    for ( let i = 0;  i < d.length; i++ ) {
      if ( this.stages[i] ) { d[i].style.display = state;
        console.log(this.stage[i]); }}
    // document.getElementById('wrap').style.display = state;

  }
}
