import type {Cliente,Pedido,Status} from '../types';
export const totalPedido=(p:Pedido)=> (p.itens||[]).reduce((s,i)=>s+Number(i.preco)*Number(i.quantidade),0);
export const validos=(pedidos:Pedido[])=>pedidos.filter(p=>p.status!=='cancelado');
export const totalComprado=(pedidos:Pedido[])=>validos(pedidos).reduce((s,p)=>s+totalPedido(p),0);
export const selo=(pedidos:Pedido[])=>{const total=totalComprado(pedidos);return total>=2000?'VIP':validos(pedidos).length===0?'Sem compras':'Regular'};
export const dinheiro=(n:number)=>n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
export const clienteDoPedido=(p:Pedido)=>String(p.clienteId??p.cliente_id??p.cliente?.id??'');
export const pedidosCliente=(pedidos:Pedido[],id:string|number)=>pedidos.filter(p=>clienteDoPedido(p)===String(id));
export const topTres=(clientes:Cliente[],pedidos:Pedido[])=>clientes.map(c=>({cliente:c,total:totalComprado(pedidosCliente(pedidos,c.id))})).sort((a,b)=>b.total-a.total).slice(0,3);
export const porStatus=(pedidos:Pedido[],status:Status)=>{const ps=pedidos.filter(p=>p.status===status);return {quantidade:ps.length,total:ps.reduce((s,p)=>s+totalPedido(p),0)}};
// Datas YYYY-MM-DD são datas civis: não aplicar timezone para evitar o dia anterior.
export const dataFormatada=(s?:string)=>{
 if(!s)return '—';
 const match=/^(\d{4})-(\d{2})-(\d{2})(?:$|T)/.exec(s);
 if(match)return `${match[3]}/${match[2]}/${match[1]}`;
 const data=new Date(s);
 return Number.isNaN(data.getTime())?'—':data.toLocaleDateString('pt-BR');
};
