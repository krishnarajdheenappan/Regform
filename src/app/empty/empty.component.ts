import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.css']
})
export class EmptyComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  onAdd()
  {
this.route.navigateByUrl("/add")
  }
}
