import {Task} from './task';

export class Stage {
  id: number;
  name: string;
  description: string;
  boardId: number;
  tasks: Task[] = [];

  constructor(name: string) {
    this.name = name;
  }
}
// export const Stages: Stage[] = [new Stage('Анализ и проектирование', 0), new Stage('Разработка', 1),
//   new Stage('Тестирование', 2), new Stage('Готово', 3)];
