import { Panier } from "./panier.model";
import { Pari } from "./pari.model";

export class PariPanier{
    _id?: string;
    pari: Pari;
    panier: Panier;
}