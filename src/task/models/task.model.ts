import { Column, Model, Table } from "sequelize-typescript";

@Table
export class Task extends Model{

    @Column
    title : string ;
    
    @Column
    description : string ;

    @Column
    category : string ;

    @Column
    is_completed : boolean; 

}