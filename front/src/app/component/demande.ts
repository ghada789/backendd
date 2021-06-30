export class Demande {
    constructor(
       public nom: string,
       public prenom: string,
       public telephone: string,
       public lieu: string,
       public service: string,
       public capacite: string,
       public date_debut:string,
       public date_fin: string,
       public heure_debut: string,
       public heure_fin: string,
       public moyen: string,
       public gouvernorat: string,
       public objet: string,
       public _id?:string){}
    
}
