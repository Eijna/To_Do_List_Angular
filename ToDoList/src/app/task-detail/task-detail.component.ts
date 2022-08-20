import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})

export class TaskDetailComponent implements OnInit {

  //ancien code
  //@Input() task?: Task;

  task: Task | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: TaskService,
    private location: Location) { }

  ngOnInit(): void {
    this.getTask();
  }

  getTask(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getTask(id).subscribe(task => this.task = task);
  }

  onUpdate(task: Task): void {

  }


  goBack(): void {
    this.location.back();
  }

}
