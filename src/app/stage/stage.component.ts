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
  backEnabled: boolean;

  @Output()
  moveTask: EventEmitter<Task> = new EventEmitter<Task>();
  @Output()
  backTask: EventEmitter<Task> = new EventEmitter<Task>();

  toggle = true; // переключатель


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

  windowAddTask(state, addTaskForm, iconAddTaskForm, shadowTaskContent) {
    addTaskForm = document.getElementsByClassName(addTaskForm); // возвращает набор элемментов с данным классом
    iconAddTaskForm = document.getElementsByClassName(iconAddTaskForm);
    shadowTaskContent = document.getElementsByClassName(shadowTaskContent);
    const i = this.stage.id;
    if (this.toggle) {
      addTaskForm[i].style.display = state; // если toggle = true показывает форму добавления новой задачи
      iconAddTaskForm[i].classList.add('closeForm'); // и меняет иконку с плюса на крестик
      shadowTaskContent[i].classList.add('test_active'); // затемняет область задач
      this.toggle = false;
    } else {
      addTaskForm[i].style.display = 'none';
      iconAddTaskForm[i].classList.remove('closeForm');
      shadowTaskContent[i].classList.remove('test_active');
      this.toggle = true;
    }
  }
}

// const p = document.getElementById('task');
// // console.log('priority ' + task.priority);
// // p.className += <string>task.priority;
// p.classList.add('priority ' + this.task.priority);
