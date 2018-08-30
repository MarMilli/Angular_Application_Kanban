export class Task {
  title: string;
  content: string;
  priority = 1;

  constructor(title: string, content: string, priority: number) {
    this.title = title;
    this.content = content;
    this.priority = priority;
  }
}
