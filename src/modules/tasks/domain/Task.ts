import { Entity, UniqueId } from '@aptana/multichannel-common';

export interface TaskProps {
  userID: string;
  title: string;
  city?: string;
  weatherInfo?: any;
  isDone?: boolean;
}

export class Task extends Entity<TaskProps> {
  get id() {
    return this._id;
  }

  get userID(): string {
    return this.props.userID;
  }

  get title(): string {
    return this.props.title;
  }

  get city(): string | undefined {
    return this.props.city;
  }

  get weatherInfo(): any {
    return this.props.weatherInfo;
  }

  get isDone(): boolean | undefined {
    return this.props.isDone;
  }

  private constructor(props: TaskProps, id?: UniqueId) {
    super(props, id);
  }

  public static create(props: TaskProps, id?: UniqueId): Task {
    return new Task(props, id);
  }
}
