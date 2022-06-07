import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  showPopUp=false;
  datas:any=[
  {heading:"Exclude flag - History Log",collapseData:[{data:'Exclude?',flag:false},{data:'GPO Approval Date1',flag:false},{data:'GPO Approval Date',flag:false},
  {data:'GPO Approval Date2',flag:false},
  {data:'GPO Approval Date3',flag:false},
  {data:'GPO Approval Date4',flag:false}]},
  {heading:"DPC",collapseData:[{data:'Exclude?',flag:false},{data:'GPO Approval Date1',flag:false},{data:'GPO Approval Date',flag:false},
  {data:'GPO Approval Date2',flag:false},
  {data:'GPO Approval Date3',flag:false},
  {data:'GPO Approval Date4',flag:false}]},
  // {heading:"2nd Extension",collapseData:'collapsedata2',flag:false},
  // {heading:"3rd Extension",collapseData:'collapsedata3',flag:false},
  // {heading:"4th Extension",collapseData:'collapsedata',flag:false},
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
  addNewRelationship(){}
}
