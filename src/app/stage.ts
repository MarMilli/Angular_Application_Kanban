import {Task} from './task';

export class Stage {
  name: string;
  tasks: Task[] = [];

  constructor(name: string) {
    this.name = name;
  }
}

export const Stages: Stage[] = [new Stage('Анализ и проектирование'), new Stage('Разработка'),
  new Stage('Тестирование'), new Stage('Готово')];
