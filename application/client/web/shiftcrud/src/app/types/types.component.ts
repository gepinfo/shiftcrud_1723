import { Component, OnInit, ViewChild } from '@angular/core';
import { TypesService } from './types.service';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { NzSelectSizeType } from 'ng-zorro-antd/select';


interface DataItem {
  name: String;
  description: String;
  accessProfile: String;
  status: String;
}

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss'],
})

export class TypesComponent implements OnInit {
public searchtickets:any;
    public types:any = {
        created_date: '',
        created_by: '',
        last_modified_by: '',
        last_modified_date: '',
        name: '',
        description: '',
    }

    isVisibleCreate = false;
    isVisibleUpdate = false;
    size: NzSelectSizeType = 'default';




    constructor (
        private nzMessageService: NzMessageService,
        private typesService: TypesService,
    ) { }

    ngOnInit() {
        this.GpGetAllValues();
        this.types.created_by = sessionStorage.getItem('email') || ''; 
        


    
    }

   showModal(): void {
    this.isVisibleCreate = true;
   }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisibleCreate = false;
    this.isVisibleUpdate = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisibleCreate = false;
    this.isVisibleUpdate = false;
  }




     GpCreate() {
      this.isVisibleCreate = false;
        this.typesService.PostAlltypesValues(this.types).subscribe((data:any) => {
            this.types.name = '',
            this.types.description = '',
            this.GpGetAllValues();
        },
        (error:Error) => {
            console.log('Error', error);
        });
    }

    filterStatus = [
      { text: 'Active', value: 'ACTIVE' },
      { text: 'In-Active', value: 'INACTIVE' }
    ];
  
    filterAccessProfile = [
      { text: 'Receptionist', value: 'Receptionist' },
      { text: 'Health Care Provide', value: 'Health Care Provide' }
    ]
  
    
  
    listOfData: DataItem[] = [];

    GpUpdate() {
      this.typesService.Updatetypes(this.types).subscribe((data:any) => {
          this.types.name = '';
          this.types.description = '';
          this.GpGetAllValues();
          this.isVisibleUpdate = false;
      },
      (error:Error) => {
          console.log('Error', error);
      });
  }
  GpDelete(deleteid:any) {
      this.typesService.DeletetypesValues(deleteid).subscribe((data:any) => {
          this.GpGetAllValues();
      },
      (error:Error) => {
          console.log('Error', error);
      });
  }

  GpGetAllValues() {
    this.typesService.GetAlltypesValues().subscribe((data: any) => {
        this.listOfData = data;
        console.log(data);
    },
    (error: Error) => {
        console.log('Error', error);
    });
  }

  
  search(search:any){
    if(search.length >= 2){
      const targetValue: any[] = [];
      this.listOfData.forEach((value: any) => {
        let keys = Object.keys(value);
        for (let i = 0; i < keys.length; i++) {
          if (value[keys[i]] && value[keys[i]].toString().toLocaleLowerCase().includes(search)) {
            targetValue.push(value);
            break;
          }
        }
      });
      this.listOfData = targetValue;
    } else {
      this.GpGetAllValues();
    }
  }


  cancel(): void {
    this.nzMessageService.info('click cancel');
  }

  confirmDelete(data:any): void {
    this.nzMessageService.info('click confirm');
    this.GpDelete(data.id);
  }

  getUpdateById(data:any){
    this.isVisibleUpdate = true;
    this.types = data;

  }
}

  