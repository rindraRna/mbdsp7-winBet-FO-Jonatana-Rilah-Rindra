import { Compte } from "./compte.model";

export class Panier{
    _id?: string;
    compte: Compte;
    date: Date;
    gainTotal: number;
    miseTotal: number;
    qrCode: string;
}