export interface Invitado {
  email: string;
  nombre: string;
  maxInvitados: number;
  confirmados: number;
  confirmacion: boolean;
  rol: 'invitado';
}

export interface Admin {
  email: string;
  rol: 'admin';
}

export type Usuario = Invitado | Admin;

export interface AuthContextType {
  user: any | null;
  usuario: Usuario | null;
  loading: boolean;
  isAdmin: boolean;
  isAuthorized: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}