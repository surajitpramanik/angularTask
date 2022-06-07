import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  showPopUp=false;
  datas:any=[
  {heading:"1st Extension",collapseData:'collapsedata1',flag:false},
  {heading:"2nd Extension",collapseData:'collapsedata2',flag:false},
  {heading:"3rd Extension",collapseData:'collapsedata3',flag:false},
  {heading:"4th Extension",collapseData:'collapsedata',flag:false},
];
selectedData:any = [];
totalData=0;
  constructor() { }

  ngOnInit(): void {
  }
  popup(){
    this.showPopUp=true;
    console.log('showpopUp = ',this.showPopUp);
  }
  closepopup(){
    this.showPopUp=false;
  }
  addData(data:any){
    this.datas.forEach((value:any,index:any) => {
      if(value==data){
        this.datas[index].flag = true;
      }
    });
    this.selectedData.push(data);
    console.log('selected data = ',this.selectedData);
    this.totalData=this.selectedData.length;
  }
  deleteData(data:any){
    console.log('data = ',data);
    this.datas.forEach((value:any,index:any) => {
      if(value==data){
        this.datas[index].flag = false;
      }
    });
    this.selectedData.forEach((value:any,index:any) => {
      if(value==data){
        this.selectedData.splice(index,1)
      }
    });
    this.totalData=this.selectedData.length;
    console.log('data after delete = ',this.selectedData);
  }
}
