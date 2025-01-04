import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo, TodoStatusType } from './@models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '安聯AMG-法國巴黎'; 
  public amount: number = 0;  
  public calculatedAmount: number | null = null;
  // 計算 1.6% 的金額
  calculateAmount() {
    this.calculatedAmount = this.amount * 0.016;
  }

  // title = 'OneTodo';
  placeholder = 'What needs to be done????'
  toggleAllBtn = false;
  nowTodoStatusType = TodoStatusType.All;
  TodoStatusType = TodoStatusType;


  todoDataList: Todo[] = [
    {
      Status: true,
      Thing: '第一件事情',
      Editing: false
    }, {
      Status: false,
      Thing: '第二件事情',
      Editing: false
    }, {
      Status: false,
      Thing: '第三件事情',
      Editing: false
    }
  ];

  toggleAll() {
    this.toggleAllBtn = !this.toggleAllBtn;
    this.todoDataList.forEach(data => {
      data.Status = this.toggleAllBtn;
    });
  }

  clickCheck(item: Todo) {
    item.Status = !item.Status;
    if (this.todoCompleted.length === this.todoDataList.length) {
      this.toggleAllBtn = true;
    } else {
      this.toggleAllBtn = false;
    }
  }

  delete(todo: Todo) {
    this.todoDataList = this.todoDataList.filter(data => data !== todo);
  }

  add(value: string) {
    const todo: Todo = {
      Status: false,
      Thing: value,
      Editing: false
    }
    this.todoDataList.push(todo);
  }

  edit(item: Todo) {
    item.Editing = true;
  }

  update(item: Todo, value: string) {
    item.Thing = value;
    item.Editing = false;
  }

  setTodoStatusType(type: number) {
    this.nowTodoStatusType = type;
  }

  get nowTodoList() {
    let list: Todo[] = [];

    switch (this.nowTodoStatusType) {
      case TodoStatusType.Active:
        list = this.todoActive;
        break;
      case TodoStatusType.Completed:
        list = this.todoCompleted;
        break;
      default:
        list = this.todoDataList;
        break;
    }

    return list;
  }


  get todoActive(): Todo[] {
    return this.todoDataList.filter(data => !data.Status);
  }

  get todoCompleted(): Todo[] {
    return this.todoDataList.filter(data => data.Status);
  }

  clearCompleted() {
    this.todoDataList = this.todoActive;
  }


}


