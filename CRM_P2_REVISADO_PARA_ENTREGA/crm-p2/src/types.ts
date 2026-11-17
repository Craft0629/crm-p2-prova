export type Status='aberto'|'pago'|'cancelado';
export type Canal='telefone'|'email'|'whatsapp'|'presencial';
export interface Cliente {id:number|string;nome:string;email:string;telefone?:string;empresa?:string;cidade?:string;[key:string]:unknown}
export interface Item {titulo:string;preco:number;quantidade:number}
export interface Pedido {id:number|string;clienteId?:number|string;cliente_id?:number|string;cliente?:Cliente;itens:Item[];status:Status;createdAt?:string;data?:string;[key:string]:unknown}
export interface Atendimento {id:number|string;titulo:string;texto:string;canal:Canal;createdAt?:string;data?:string;[key:string]:unknown}
export interface Usuario {id?:number|string;username?:string;firstName?:string;lastName?:string;nome?:string;[key:string]:unknown}
