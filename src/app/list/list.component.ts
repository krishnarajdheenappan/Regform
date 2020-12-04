import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  fullList: any[]
  headers: any[]
  alertflag: Boolean = false
  listtodelete: any

  constructor(private route: Router) { }

  ngOnInit(): void {
    sessionStorage.clear()
    if (localStorage.length == 0) {
      this.route.navigateByUrl("/empty")
    }
    else {
      this.fullList = []
      this.headers = [
        { head: "SL. No." },
        { head: "Name" },
        { head: "Gender" },
        { head: "Email" },
        { head: "Address" },
        { head: "City" },
        { head: "State" },
        { head: "Zip" },
        { head: "Edit" },
        { head: "Delete" }
      ]

      for (let i = 0; i < localStorage.length; i++) {
        this.fullList[i] = JSON.parse(localStorage.getItem(localStorage.key(i)))
      }
    }
  }

  onDelete(list) {
    this.alertflag = true
    this.listtodelete = list
  }

  deletePermanently(list) {
    localStorage.removeItem(list.email.valueOf());
    window.location.reload();
  }

  dontdelete() {
    window.location.reload();
  }


  onEdit(list) {    
    sessionStorage.setItem(list.email.valueOf(), "true")
    this.route.navigateByUrl("/add")
  }

  onAdd() {
    this.route.navigateByUrl("/add")
  }

}
