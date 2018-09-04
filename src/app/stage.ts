import {Task} from './task';

export class Stage {
  name: string;
  tasks: Task[] = [];
  id: number;

  constructor(name: string, id: number ) {
    this.name = name;
    this.id = id;
  }
}

export const Stages: Stage[] = [new Stage('Анализ и проектирование', 0), new Stage('Разработка', 1),
  new Stage('Тестирование', 2), new Stage('Готово', 3)];
