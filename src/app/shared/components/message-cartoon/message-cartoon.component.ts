import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-cartoon',
  templateUrl: './message-cartoon.component.html',
  styleUrls: ['./message-cartoon.component.scss'],
})
export class MessageCartoonComponent implements OnInit {

  @Input("Message") message : string = '';
  constructor() { }

  ngOnInit() {}

}
