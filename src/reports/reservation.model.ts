import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import ReservationDTO from "./reservationDTO.model";

@Entity()
export default class Reservation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    payment_type: String;

    @Column()
    payment_details: String;

    @CreateDateColumn()
    created_at: Date;

    @Column()
    client: String

    @Column()
    total: number;

    @Column({ type: 'enum',
        enum: ['CHECK-IN', 'CHECK-OUT', 'PENDING-CONFIRMATION', 'CONFIRM'],
        default: 'PENDING-CONFIRMATION'})
    status: string;

    @OneToMany(type => ReservationDTO, reservations => reservations.reservation, 
        { cascade: ['insert', 'update']})
    @JoinColumn({name: 'reservationId'})
    reservations: ReservationDTO[];

}