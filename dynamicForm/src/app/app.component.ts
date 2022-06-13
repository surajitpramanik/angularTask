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
 //New task

 //showPopUp=false;
  datas:any=[
  {heading:"Exclude flag - History Log",collapseData:[{data:'Exclude?',flag:false},{data:'GPO Approval Date1',flag:false},{data:'GPO Approval Date',flag:false},
  {data:'GPO Approval Date2',flag:false},
  {data:'GPO Approval Date3',flag:false},
  {data:'GPO Approval Date4',flag:false}],headFlag:false},
  {heading:"DPC",collapseData:[{data:'Exclude?',flag:false},{data:'GPO Approval Date1',flag:false},{data:'GPO Approval Date',flag:false},
  {data:'GPO Approval Date2',flag:false},
  {data:'GPO Approval Date3',flag:false},
  {data:'GPO Approval Date4',flag:false}],headFlag:false},
  // {heading:"2nd Extension",collapseData:'collapsedata2',flag:false},
  // {heading:"3rd Extension",collapseData:'collapsedata3',flag:false},
  // {heading:"4th Extension",collapseData:'collapsedata',flag:false},
];
selectedData:any = [];
totalData=0;
  popup(){
    this.showPopUp=true;
    console.log('showpopUp = ',this.showPopUp);
  }
  closepopup(){
    this.showPopUp=false;
  }
  addData(data:any,collapseData:any){
    console.log('selected data = ',this.selectedData);
    let headIndex:any = null;
    let collapseIndex:any = null;
    let collData=null;
    let collflag=null;
    let selectdata:any = {};
    let selectedcollData :any = null;
    console.log('data = ',data)
    console.log('collapseData = ',collapseData)
    this.datas.forEach((value:any,index:any) => {
      if(value==data){
        headIndex=index;
        this.datas[index].collapseData.forEach((val:any,ind:any) => {
          if(val.data==collapseData.data){
            this.datas[index].collapseData[ind].flag=true;
            collData=this.datas[index].collapseData[ind].data;
            collflag=this.datas[index].collapseData[ind].flag;
            collapseIndex = ind;
          }
        });
      }
    });
    selectdata={
      heading: data.heading,
      collapseData:[{data:collData,flag:true}]
    }
    // selectedcollData=
    console.log('selectdata = ',selectdata);
    
    if(this.selectedData.length!=0){
      let matched = 0;
      this.selectedData.forEach((value:any,index:any) => {
      if(value.heading == selectdata.heading){
        console.log('matched')
        console.log('selectedData[index].collapseData = ',this.selectedData[index].collapseData);
        this.selectedData[index].collapseData.push(selectdata.collapseData[0]);
        matched++;
      }
    });
    if(matched==0){
      console.log('unmatched')
      this.selectedData.push(selectdata);
    }
    }
    else{
      this.selectedData.push(selectdata);
    }
    
    console.log('selected data1 = ',this.selectedData);
    this.totalData=this.selectedData.length;
  }
  deleteData(data:any,collapseData:any){
    console.log('data = ',data);
    console.log('collapseData = ',collapseData);
    this.datas.forEach((value:any,index:any) => {
      
      if(value.heading==data.heading){
        this.datas[index].collapseData.forEach((val:any,ind:any) => {
          if(val.data==collapseData.data){
            console.log('this.datas[index].collapseData[ind].flag',this.datas[index].collapseData[ind].flag)
            this.datas[index].collapseData[ind].flag=false;
            // collData=this.datas[index].collapseData[ind].data;
            // collflag=this.datas[index].collapseData[ind].flag;
            // collapseIndex = ind;
            console.log('this.datas[index].collapseData[ind].flag',this.datas[index].collapseData[ind].flag)
          }
        });
        //this.datas[index].flag = false;
      }
    });
    // this.selectedData.forEach((value:any,index:any) => {
    //   if(value==data){
    //     this.selectedData.splice(index,1)
    //   }
    // });
    if (this.selectedData.length != 0) {
      this.selectedData.forEach((value: any, index: any) => {
        if (value.heading == data.heading) {
          this.selectedData[index].collapseData.forEach((val: any, ind: any) => {
            if (val.data == collapseData.data) {
              this.selectedData[index].collapseData.splice(ind, 1);
              if(this.selectedData[index].collapseData.length == 0){
                this.selectedData.splice(index,1);
              }
            }
          });
        }
        // else{
        //   this.selectedData.splice(index,1);
        // }
      });
    }
    this.totalData=this.selectedData.length;
    console.log('selectedData after delete = ',this.selectedData);
    console.log('data after delete = ',this.datas);
  }
  expand(data:any){
    this.datas.forEach((ele:any,index:any) => {
      console.log(data)
      if(ele.heading==data.heading){
        this.datas[index].headFlag=!this.datas[index].headFlag;
        console.log(this.datas[index].headFlag)
      }
    });
  }
  shrink(data:any){
    this.datas.forEach((ele:any,index:any) => {
      console.log(data)
      if(ele.headFlag==data.headFlag){
        this.datas.headFlag=!this.datas.headFlag;
        console.log(this.datas.headFlag)
      }
    });
  }


}