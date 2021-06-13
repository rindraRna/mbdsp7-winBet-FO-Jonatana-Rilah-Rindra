import { Match_paris } from "./match_paris.model";
import { Type } from "./type.model";

export class Pari{
    _id?: string;
    match: Match_paris;
    type: Type;
    // nom: string;
    valeur: string;
    cote: number;
    mise: number;
    gain: number;
}