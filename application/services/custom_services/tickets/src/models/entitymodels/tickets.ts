
export interface tickets 
{
   created_date: { type: Date },
   created_by: { type: String },
   last_modified_by: { type: String },
   last_modified_date: { type: Date },
   name: { type: String },
   description: { type: String },
   types: { type: String, ref: 'types' },
   ticketstatus: { type: Ticketstatus }
}


export enum Ticketstatus {
   OPEN = 'open',
   CLOSE = 'close',
   INPROGRESS = 'inprogress'
}



