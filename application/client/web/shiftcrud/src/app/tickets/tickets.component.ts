import { Component, OnInit, ViewChild } from '@angular/core';
import { TicketsService } from './tickets.service';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { NzSelectSizeType } from 'ng-zorro-antd/select';

    export enum ticketstatus {
        OPEN = 'open',
        CLOSE = 'close',
        INPROGRESS = 'inprogress',
    }

interface DataItem {
  name: String;
  description: String;
  types: String;
  ticketstatus: ticketstatus;
  accessProfile: String;
  status: String;
}

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})

export class TicketsComponent implements OnInit {
public searchtickets:any;
public typesitemArray:any[] = [];
    public tickets:any = {
        created_date: '',
        created_by: '',
        last_modified_by: '',
        last_modified_date: '',
        name: '',
        description: '',
        types: '',
        ticketstatus: '',
    }

    isVisibleCreate = false;
    isVisibleUpdate = false;
    size: NzSelectSizeType = 'default';




    constructor (
        private nzMessageService: NzMessageService,
        private ticketsService: TicketsService,
    ) { }

    ngOnInit() {
        this.GpGetAllValues();
        this.typesGetAllValues();
        this.tickets.created_by = sessionStorage.getItem('email') || ''; 
        


    
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
        this.ticketsService.PostAllticketsValues(this.tickets).subscribe((data:any) => {
            this.tickets.name = '',
            this.tickets.description = '',
            this.tickets.types = '',
            this.tickets.ticketstatus = '',
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
      this.ticketsService.Updatetickets(this.tickets).subscribe((data:any) => {
          this.tickets.name = '';
          this.tickets.description = '';
          this.tickets.types = '';
          this.tickets.ticketstatus = '';
          this.GpGetAllValues();
          this.isVisibleUpdate = false;
      },
      (error:Error) => {
          console.log('Error', error);
      });
  }
  GpDelete(deleteid:any) {
      this.ticketsService.DeleteticketsValues(deleteid).subscribe((data:any) => {
          this.GpGetAllValues();
      },
      (error:Error) => {
          console.log('Error', error);
      });
  }

  GpGetAllValues() {
    this.ticketsService.GetAllticketsValues().subscribe((data: any) => {
        this.listOfData = data;
        console.log(data);
    },
    (error: Error) => {
        console.log('Error', error);
    });
  }
  typesGetAllValues() {
    this.ticketsService.GetAlltypesValues().subscribe((data: any) => {
        this.typesitemArray = data;
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
    this.tickets = data;

  }
}

  