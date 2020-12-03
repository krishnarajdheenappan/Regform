import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
 

  states: any[]
  genders: any[]
  languages: any[]
  registrationForm: any
  count:number
  updateMode:Boolean=false

  get firstname()
  {
    return this.registrationForm.get('fname')
  }
  get lastname()
  {
    return this.registrationForm.get('lname')
  }
  get gender()
  {
    return this.registrationForm.get('genders')
  }
  get email()
  {
    return this.registrationForm.get('email')
  }
  get address()
  {
    return this.registrationForm.get('address')
  }
  get city()
  {
    return this.registrationForm.get('city')
  }
  
  get state()
  {
    return this.registrationForm.get('state')
  }
  get zip()
  {
    return this.registrationForm.get('zip')
  }
  
  constructor(private fb:FormBuilder,private route:Router) { 

    
  }


  ngOnInit(): void {
  
    this.states = [{ name: 'Andhra Pradesh', id: 1 },
    { name: 'Arunachal Pradesh', id: 2 },
    { name: 'Asom (Assam)', id: 3 },
    { name: 'Bihar', id: 4 },
    { name: 'Karnataka', id: 5 },
    { name: 'Kerala', id: 6 },
    { name: 'Chhattisgarh', id: 7 },
    { name: 'Uttar Pradesh', id: 8 }]

    this.genders = [
      { name: 'Male', id: 1 },
      { name: 'Female', id: 2 }
    ]

    this.languages = [{ name: 'English', id: 1 },
    { name: 'German', id: 2 },
    { name: 'French', id: 3 }]


    this.count=sessionStorage.length
    if(this.count!=0)
    {
      this.updateMode=true
      for(let i=0;i<this.count;i++)
      {
       if(sessionStorage.getItem(sessionStorage.key(0))=="true")  
       {

        console.log(localStorage.getItem(sessionStorage.key(0)))
        let update =JSON.parse(localStorage.getItem(sessionStorage.key(0)))
        // console.log(t.fname);
        
          this.registrationForm=this.fb.group(
          {
            fname:[update.fname],
            lname:[update.lname],
            gender:[update.gender],
            email:[update.email],
            address:[update.address],
            city:[update.city],
            state:[update.state],
            zip:[update.zip],
            languages:[update.languages]
          }
        )
       }
      }
    }
    else{
      
    this.registrationForm=this.fb.group(
      {
        fname:['',Validators.required],
        lname:['',Validators.required],
        gender:['',Validators.required],
        email:['',Validators.required],
        address:['',Validators.required],
        city:['',Validators.required],
        state:['',Validators.required],
        zip:['',[Validators.required,Validators.maxLength(6)]],
        languages:['',Validators.required]
      }
    )
    }
  


  }

  onSubmit()
  {

    console.log(this.registrationForm.value.email);

  localStorage.setItem(this.registrationForm.value.email.toString(),JSON.stringify(this.registrationForm.value))
 
  this.route.navigateByUrl("/success")
  
    
  }

  onList()
  {
    this.route.navigateByUrl("/list")
  }


}
