import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Reservation from "./reservation.model";

@Entity()
export default class ReservationDTO extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date' })
    check_in: Date;

    @Column({ type: 'date' })
    check_out: Date;

    @Column()
    hostal: String;

    @Column()
    room: String;

    @Column()
    hostal_name: String;
    
    @Column()
    room_name: String;

    @Column()
    nights: number;

    @Column()
    adults: number;

    @Column()
    childs: number;

    @Column()
    total: number;

    @ManyToOne(type => Reservation, reservation => reservation.reservations, {
        onDelete: 'CASCADE'
    })
    reservation: Reservation;
}