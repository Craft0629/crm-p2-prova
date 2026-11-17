import {createContext,useContext,useEffect,useState,type ReactNode} from 'react';
import {useNavigate} from 'react-router-dom';
import {api,onUnauthorized} from '../services/api';
import type {Usuario} from '../types';
type AuthType={usuario:Usuario|null;loading:boolean;entrar:(u:string,p:string)=>Promise<void>;sair:()=>void};
const AuthContext=createContext<AuthType>(null!);
export function AuthProvider({children}:{children:ReactNode}){
 const [usuario,setUsuario]=useState<Usuario|null>(null);const [loading,setLoading]=useState(true);const navigate=useNavigate();
 const sair=()=>{localStorage.removeItem('crm_token');setUsuario(null);navigate('/login',{replace:true})};
 useEffect(()=>{onUnauthorized(sair);const init=async()=>{try{if(localStorage.getItem('crm_token'))setUsuario(await api.me())}catch{localStorage.removeItem('crm_token')}finally{setLoading(false)}};void init()},[]);
 const entrar=async(u:string,p:string)=>{const r=await api.login(u,p);localStorage.setItem('crm_token',r.accessToken);try{setUsuario(await api.me())}catch(e){localStorage.removeItem('crm_token');throw e}};
 return <AuthContext.Provider value={{usuario,loading,entrar,sair}}>{children}</AuthContext.Provider>
}
export const useAuth=()=>useContext(AuthContext);
