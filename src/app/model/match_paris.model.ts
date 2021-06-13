import { Championnat } from "./championnat.model";
import { Equipe } from "./equipe.model";

export class Match_paris{
    _id?: string;
    equipe1: Equipe;
    equipe2: Equipe;
    etat: number;
    date: Date;
    stade: string;
    endroit: string;
    championnat: Championnat;
    statut: string;
}