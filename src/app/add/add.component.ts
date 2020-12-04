import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { element } from 'protractor';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {


  states: any[]
  genders: any[]
  langs: any[]
  registrationForm: any
  count: number
  updateMode: Boolean = false
  selectlanguage = []
  haveSelectedlang: Boolean
  radioselect: Boolean
  checkedlanguages: Boolean[]

  get firstname() {
    return this.registrationForm.get('fname')
  }
  get lastname() {
    return this.registrationForm.get('lname')
  }
  get gname() {
    return this.registrationForm.get('genders')
  }
  get email() {
    return this.registrationForm.get('email')
  }
  get address() {
    return this.registrationForm.get('address')
  }
  get city() {
    return this.registrationForm.get('city')
  }

  get state() {
    return this.registrationForm.get('state')
  }
  get zip() {
    return this.registrationForm.get('zip')
  }




  get langsArray() {
    return this.registrationForm.get('languages')
  }

  constructor(private fb: FormBuilder, private route: Router) {
  }


  ngOnInit(): void {

    this.haveSelectedlang = false
    this.langs = ["English", "German", "French"]

    this.states = [{ name: 'Kerala', id: 1 },
    { name: 'Arunachal Pradesh', id: 2 },
    { name: 'Asom (Assam)', id: 3 },
    { name: 'Bihar', id: 4 },
    { name: 'Karnataka', id: 5 },
    { name: 'Kerala', id: 6 },
    { name: 'Chhattisgarh', id: 7 },
    { name: 'Uttar Pradesh', id: 8 }]

    this.genders =
      [{ name: 'Male', id: 1 },
      { name: 'Female', id: 2 }]

    this.count = sessionStorage.length
    if (this.count != 0) {
      this.updateMode = true
      for (let i = 0; i < this.count; i++) {
        if (sessionStorage.getItem(sessionStorage.key(0)) == "true") {
          let update = JSON.parse(localStorage.getItem(sessionStorage.key(0)))
          this.checkedlanguages = update.languages
          this.registrationForm = this.fb.group(
            {
              fname: [update.fname],
              lname: [update.lname],
              gender: [update.gender],
              email: [update.email, [Validators.required, Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")]],
              address: [update.address, [Validators.required, Validators.pattern("^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$")]],
              city: [update.city, [Validators.required, Validators.pattern("^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$")]],
              state: [update.state, Validators.required],
              zip: [update.zip, [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern("^[0-9]*$")]],
              languages: this.addlanguages()
            }
          )
        }
      }
    }
    else {
      this.registrationForm = this.fb.group(
        {
          fname: ['', Validators.required],
          lname: ['', Validators.required],
          gender: ['', Validators.required],
          email: ['', [Validators.required, Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")]],
          address: ['', [Validators.required, Validators.pattern("^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$")]],
          city: ['', [Validators.required, Validators.pattern("^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$")]],
          state: ['', Validators.required],
          zip: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern("^[0-9]*$")]],
          languages: this.addlanguages()
        }
      )
    }
  }

  addlanguages() {
    let r = 0
    const arr = this.langs.map(element => {
      if (this.updateMode == true) {
        return this.fb.control(this.checkedlanguages[r++]);
      }
      else {
        return this.fb.control(false);
      }
    });
    return this.fb.array(arr);

  }

  checkTouch() {
    let flag = false
    this.langsArray.controls.forEach(control => {
      if (control.touched) {
        flag = true
      }
    });
    return flag;
  }

  onSubmit() {
    localStorage.setItem(this.registrationForm.value.email.toString(), JSON.stringify(this.registrationForm.value))
    sessionStorage.clear()
    this.route.navigateByUrl("/success")
  }

  onList() {
    this.route.navigateByUrl("/list")
  }


  getSelectLanguage() {
    this.selectlanguage = [];
    this.langsArray.controls.forEach((control, i) => {
      if (control.value) {
        this.selectlanguage.push(this.langs[i])
      }
    });
    if (this.selectlanguage.length == 0) {
      this.haveSelectedlang = false
    }
    else {
      this.haveSelectedlang = true
    }


  }



}
