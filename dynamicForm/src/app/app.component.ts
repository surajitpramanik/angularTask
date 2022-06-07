import { PopupComponent } from './popup/popup.component';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  @ViewChild('attachpopup')
  attachpopup!: PopupComponent;
  title = 'dynamicForm';
  field ={}
  profileForm:any = this.fb.group({});
  key:any=[];
  keyvalue:any=[];
  messageshow:boolean=false;
  isSubmit:boolean = true;
  showPopUp:boolean = false;
//   profileForm:FormGroup = new FormGroup({});

   constructor(private fb: FormBuilder){
    
   };
   ngOnInit(): void {
    this.profileForm = this.fb.group({
            addform:this.fb.array([this.initiateRows()
            ])
          })
          if(this.profileForm!=null){
            this.isSubmit=false;
          }
        }
        initiateRows(){
          return this.fb.group({
            fieldtoEvaluate:['',[Validators.required,Validators.pattern('^[A-Za-z0-9]+$')]],
            Operator:['',[Validators.required,Validators.pattern('^[0-9]{1,4}(?:[.][0-9]{1,8})?$')]],
            Grouping:['',[Validators.required,Validators.pattern('^[A-Za-z0-9@#%&]+$')]]
          })
        }
//   ngOnInit(): void {
//     this.profileForm = this.fb.group({
//       addform:this.fb.array([this.fb.control('')
//       ])
//     })
//   }

  cancel(i:number){
    if(i!=0){
      this.addform.removeAt(i);
    }
    
  }
get f(){
  return this.profileForm.controls;
}
 get addform(){
  return this.profileForm.get('addform') as FormArray;
 }

 AddNew(){
   this.addform.push(this.initiateRows());
   
 }
 onSubmit(){
  //  console.log('formValue = ',this.profileForm.value);
  //  console.log('formValue1 = ',this.addform.value); 
  if(this.profileForm!= null){
   this.getData();
   this.messageshow=true;
   this.isSubmit=false;
   this.profileForm.reset();
  }
 }
 getData(){
  this.addform.value.forEach((element:any) => {
    this.key=Object.keys(element);
    this.keyvalue.push(Object.values(element));
  });
 }
 deleteMessage(){
this.messageshow=false;
 }
 showpopup(){
  this.attachpopup.popup();
 }

}