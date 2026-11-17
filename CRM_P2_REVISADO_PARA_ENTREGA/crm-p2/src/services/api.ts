import type {Atendimento,Cliente,Item,Pedido,Status,Usuario} from '../types';
const BASE=(import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
export class ApiErro extends Error {constructor(public status:number,message:string){super(message)}}
let unauthorized:()=>void=()=>{};
export const onUnauthorized=(fn:()=>void)=>{unauthorized=fn};
async function request<T>(path:string,method='GET',body?:unknown):Promise<T>{
 try {
  const token=localStorage.getItem('crm_token');
  const res=await fetch(`${BASE}${path}`,{method,headers:{...(body!==undefined?{'Content-Type':'application/json'}:{}),...(token?{Authorization:`Bearer ${token}`}:{})},...(body!==undefined?{body:JSON.stringify(body)}:{})});
  if(!res.ok){if(res.status===401&&path!=='/auth/login')unauthorized();let msg='';try{const e=await res.json();msg=typeof e.message==='string'?e.message:Array.isArray(e.message)?e.message.join(', '):e.error||''}catch{};throw new ApiErro(res.status,msg||({400:'Dados inválidos. Confira os campos.',401:'Usuário, senha ou sessão inválidos.',404:'Registro não encontrado.',409:'Este e-mail já está cadastrado.',500:'Erro interno do servidor.'} as Record<number,string>)[res.status]||`Erro HTTP ${res.status}`)}
  if(res.status===204)return undefined as T;
  const txt=await res.text();return (txt?JSON.parse(txt):undefined) as T;
 }catch(e){if(e instanceof ApiErro)throw e;throw new ApiErro(0,'Não foi possível conectar ao servidor. Confira se a API está ligada.')}
}
export const api={
 login:(username:string,password:string)=>request<{accessToken:string}>('/auth/login','POST',{username,password}),
 me:()=>request<Usuario>('/auth/me'),
 clientes:(q='',limit=5,skip=0)=>request<{clientes:Cliente[];total:number}>(`/clientes?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`),
 cliente:(id:string)=>request<Cliente>(`/clientes/${id}`),
 criarCliente:(data:Partial<Cliente>)=>request<Cliente>('/clientes','POST',data),
 editarCliente:(id:string,data:Partial<Cliente>)=>request<Cliente>(`/clientes/${id}`,'PATCH',data),
 excluirCliente:(id:string)=>request<void>(`/clientes/${id}`,'DELETE'),
 pedidos:()=>request<{pedidos:Pedido[];total:number}>('/pedidos').then(r=>r.pedidos),
 pedidosCliente:(id:string)=>request<{pedidos:Pedido[];total:number}>(`/clientes/${id}/pedidos`).then(r=>r.pedidos),
 criarPedido:(id:string,itens:Item[])=>request<Pedido>(`/clientes/${id}/pedidos`,'POST',{itens}),
 editarPedido:(id:string,data:{itens?:Item[];status?:Status})=>request<Pedido>(`/pedidos/${id}`,'PATCH',data),
 excluirPedido:(id:string)=>request<void>(`/pedidos/${id}`,'DELETE'),
 atendimentos:(id:string)=>request<{atendimentos:Atendimento[];total:number}>(`/clientes/${id}/atendimentos`).then(r=>r.atendimentos),
 criarAtendimento:(id:string,data:Omit<Atendimento,'id'>)=>request<Atendimento>(`/clientes/${id}/atendimentos`,'POST',data),
 editarAtendimento:(id:string,data:Partial<Atendimento>)=>request<Atendimento>(`/atendimentos/${id}`,'PATCH',data),
 excluirAtendimento:(id:string)=>request<void>(`/atendimentos/${id}`,'DELETE')
};
