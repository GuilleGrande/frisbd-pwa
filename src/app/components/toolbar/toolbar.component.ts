import { Component, OnInit, Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  title: string = 'Frisbd';

  @Input()
  color: ThemePalette

  constructor() { }

  ngOnInit() {
  }

}
