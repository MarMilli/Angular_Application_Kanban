export class Task {
  id: number;
  name: string;
  description: string;
  priority: number|string;
  executor: string;
  stageId: number;

  constructor( title: string, description: string, priority: number, executor: string ) {
    this.name = title;
    this.description = description;
    this.priority = priority;
    this.executor = executor;
  }
}

