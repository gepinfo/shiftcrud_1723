import * as mongoose from 'mongoose';
import { ticketsSchema } from './models/daomodels/tickets';
import * as mongoose from 'mongoose';
import { typesSchema } from './models/daomodels/types';

const typesModel = mongoose.model('types', typesSchema);

export class Seed {

    constructor() {

    }

    

}
