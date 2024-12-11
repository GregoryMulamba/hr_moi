// To parse this data:
//
//   import { Convert, Agent } from "./file";
//
//   const agent = Convert.toAgent(json);

export interface IAgent {
    count:    number;
    next:     null;
    previous: null;
    results:  IAgentResult[];
}

export interface  IAgentResult {
    id:               number;
    contrat:          Contrat;
    employeur:        Employeur;
    direction:        Direction;
    user:             User;
    is_active:        boolean;
    created_at:       Date;
    updated_at:       Date;
    statut_contrat:   string;
    name:             string;
    postnom:          string;
    prenom:           string;
    age:              string;
    genre:            string;
    nationalite:      string;
    fonction:         string;
    grade:            null | string;
    anciennete_annee: string;
    anciennete_mois:  string;
    num_mat:          string;
    periode_essai:    boolean;
    lieu_embauche:    string;
    date_embauche:    Date;
    date_naissance:   Date;
    dure_contrat:     string;
    date_fin_contrat: Date;
    is_directeur:     boolean;
}

export interface Contrat {
    id:           number;
    type_contrat: string;
}

export interface Direction {
    name:        string;
    description: string;
}

export interface Employeur {
    type_employeur: string;
}

export interface User {
    cuid:             string;
    email:            string;
    phone:            string;
    created_at:       Date;
    updated_at:       Date;
    is_active:        boolean;
    groups:           any[];
    user_permissions: any[];
}