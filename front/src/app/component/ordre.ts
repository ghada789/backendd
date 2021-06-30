export class Ordre {
    constructor(
        public nom: string,
        public lieu: string,
        public date_debut:string,
       
        public heure_debut: string,
       
        public moyen: string,
        public nature: string,
        public objet: string,
        public _id?:string){}
}
