import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

fullList:any[]
headers:any[]
  constructor(private route:Router) { }


  ngOnInit(): void {

    if(localStorage.length==0)
    {
      this.route.navigateByUrl("/empty")
      
    }
    else{

    
  this.fullList=[]

  this.headers=[{
    head:"SL. No."},{
    head:"Name"},   
    {head:"Gender"},
    {head:"Email"},
    {head:"State"},
    {head:"Edit"},
    {head:"Delete"}
  ]
   
  
   for(let i=0;i<localStorage.length;i++)
   {
   
    this.fullList[i]=JSON.parse(localStorage.getItem( localStorage.key(i)))
  } 
  }
}
  onDelete(list)
  {
// alert("The Data will be permanently deleted")
localStorage.removeItem(list.email.valueOf());
window.location.reload();




  }

  onEdit(list){
    // console.log(typeof(list.email.valueOf()));
    
    sessionStorage.setItem(list.email.valueOf(),"true")
    this.route.navigateByUrl("/add")
    

  }
  

}
