import { Component, OnInit,EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
@Output() OnStart=new EventEmitter<void>()
  constructor() { }

  ngOnInit(): void {
  }
  onStartTraining(){
   this.OnStart.emit()
  }
}
