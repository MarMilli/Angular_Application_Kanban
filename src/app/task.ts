export class Task {
  title: string;
  description: string;
  priority: number;
  executor: string;

  constructor(title: string, description: string, priority: number, executor: string ) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.executor = executor;
  }
}

