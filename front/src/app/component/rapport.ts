export class Rapport {
    constructor(
        public ordre: string,
        public date: string,
        public lieu: string,
        public personnel : string,
        public dureedu: string,
        public dureea: string,
        public duree_transdu: string,
        public duree_transa:string,
        public  donnees: string,
        public moyens: string,
        public observations: string,
        public _id?:string){}
}
