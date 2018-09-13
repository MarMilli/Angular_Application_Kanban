import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Stage} from '../models/stage';
import {Task} from '../models/task';
import {BackendService} from '../backend.service';
import {Subject, Subscription} from 'rxjs';
import {repeatWhen} from 'rxjs/operators';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit, OnDestroy {

  @Input()
  stage: Stage;
  @Input()
  task: Task;
  @Input()
  moveEnabled: boolean;
  @Input()
  backEnabled: boolean;

  @Output()
  moveTask: EventEmitter<Task> = new EventEmitter<Task>();
  @Output()
  backTask: EventEmitter<Task> = new EventEmitter<Task>();
  @Output()
  updateTask: EventEmitter<Task> = new EventEmitter<Task>();
  @Output()
  refreshStates: EventEmitter<null> = new EventEmitter<null>();

  toggle = true; // переключатель
  getTasksByStageSubscription: Subscription;
  refreshStage = new Subject();
  stages: Stage[];
  isEdit = false;
  stageName: string;

  constructor(private service: BackendService) {
  }

  ngOnInit() {
    this.getTasksByStageSubscription = this.service
      .getTasksByStage(this.stage.id)
      .pipe(repeatWhen(() => this.refreshStage))
      .subscribe((tasks: Task[]) => this.stage.tasks = tasks);

  }

  createTask(task: Task, addTaskForm, iconAddTaskForm, shadowTaskContent) {
    task.stageId = this.stage.id;
    const newTaskSubscription = this.service
      .createNewTask(task)
      .subscribe(() => {
        this.refreshStage.next();
        // this.refreshStates.emit();
        newTaskSubscription.unsubscribe();
      });
    // закрываем окно добавления новой задачи
    addTaskForm = document.getElementsByClassName(addTaskForm); // возвращает набор элемментов с данным классом
    iconAddTaskForm = document.getElementsByClassName(iconAddTaskForm);
    shadowTaskContent = document.getElementsByClassName(shadowTaskContent);
    console.log(shadowTaskContent);
    const j = this.stage.id - 1;
    addTaskForm[j].style.display = 'none';
    iconAddTaskForm[j].classList.remove('closeForm');
    console.log(shadowTaskContent[j]);
    shadowTaskContent[j].classList.remove('taskBlockContent_active');
    console.log(shadowTaskContent[j]);
    this.toggle = true;
  }


  onTaskMoved($event: Task) {
    this.stage.tasks = this.stage.tasks.filter(value => value !== $event);
    this.moveTask.emit($event);
  }

  inTaskMoved($event: Task) {
    this.stage.tasks = this.stage.tasks.filter(value => value !== $event);
    this.backTask.emit($event);
  }

  ngOnDestroy(): void {
    this.getTasksByStageSubscription.unsubscribe();
  }

  onEditStart() {
    this.isEdit = true;
    this.stageName = this.stage.name;
  }

  onEditFinish() {
    this.isEdit = false;
    this.stage.name = this.stageName;
    const updateStageSubscription = this.service
      .updateStage(this.stage)
      .subscribe(() => updateStageSubscription.unsubscribe());
  }

  onEditCancel() {
    this.isEdit = false;
  }

  windowAddTask(state, addTaskForm, iconAddTaskForm, shadowTaskContent) {
    addTaskForm = document.getElementsByClassName(addTaskForm); // возвращает набор элемментов с данным классом
    iconAddTaskForm = document.getElementsByClassName(iconAddTaskForm);
    shadowTaskContent = document.getElementsByClassName(shadowTaskContent);
    const i = this.stage.id - 1;
    if (this.toggle) {
      addTaskForm[i].style.display = state; // если toggle = true показывает форму добавления новой задачи
      iconAddTaskForm[i].classList.add('closeForm'); // и меняет иконку с плюса на крестик
      shadowTaskContent[i].classList.add('taskBlockContent_active'); // затемняет область задач
      this.toggle = false;
    } else {
      addTaskForm[i].style.display = 'none';
      iconAddTaskForm[i].classList.remove('closeForm');
      shadowTaskContent[i].classList.remove('taskBlockContent_active');
      this.toggle = true;
    }
  }
}
