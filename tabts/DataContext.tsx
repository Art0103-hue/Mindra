import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Atividade {
  id: string;
  nome: string;
  data: string;
  pontos: string;
  categoria: string;
  concluida: boolean;
}

export interface Habito {
  id: string;
  nome: string;
  horario: string;
  pontos: string;
  repeticao: string;
  dia: string;
  indefinido: boolean;
  concluidoHoje: boolean;
}

export interface Usuario {
  nome: string;
  email: string;
  logado: boolean;
  petSelecionado: boolean;
  petNome: string;
  dataNascimento: string;
}

export type PetTipo = 'cachorro' | 'gato' | 'passaro' | 'peixe';

export interface PetState {
  tipo: PetTipo | null;
  nome: string;
  afetividade: number;
  felicidade: number;
  fome: number;
  xp: number;
}

export interface ItemLoja {
  id: string;
  nome: string;
  imagem: any;
  preco: number;
}

interface DataContextType {
  atividades: Atividade[];
  habitos: Habito[];
  pontos: number;
  usuario: Usuario;
  pet: PetState;
  diasSeguindoRotina: number;
  itensComprados: string[];
  adicionarAtividade: (atividade: Omit<Atividade, 'id' | 'concluida'>) => void;
  adicionarHabito: (habito: Omit<Habito, 'id' | 'concluidoHoje'>) => void;
  concluirAtividade: (id: string) => void;
  concluirHabito: (id: string) => void;
  removerAtividade: (id: string) => void;
  removerHabito: (id: string) => void;
  login: (nome: string, email: string) => void;
  logout: () => void;
  cadastrar: (nome: string, email: string, dataNascimento: string) => void;
  selecionarPet: (tipo: PetTipo, nome: string) => void;
  alimentarPet: () => void;
  brincarPet: () => void;
  acariciarPet: () => void;
  comprarItem: (idItem: string, preco: number) => boolean;
  resetarHabitosDiarios: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [atividades, setAtividades] = useState<Atividade[]>([
    { id: 'a1', nome: 'Trabalhar no projeto', data: '10/03/2025', pontos: '30', categoria: 'trabalho', concluida: false },
    { id: 'a2', nome: 'Estudar matemática', data: '10/03/2025', pontos: '25', categoria: 'estudo', concluida: false },
    { id: 'a3', nome: 'Ler 30 páginas', data: '11/03/2025', pontos: '20', categoria: 'leitura', concluida: false },
    { id: 'a4', nome: 'Exercício físico', data: '11/03/2025', pontos: '35', categoria: 'exercício', concluida: false },
  ]);
  const [habitos, setHabitos] = useState<Habito[]>([
    { id: '1', nome: 'Alimentar Meus animais', horario: '5:30', pontos: '10', repeticao: '', dia: '', indefinido: true, concluidoHoje: false },
    { id: '2', nome: 'Meditar', horario: '6:00', pontos: '15', repeticao: '', dia: '', indefinido: true, concluidoHoje: false },
    { id: '3', nome: 'Ler 20 páginas', horario: '7:00', pontos: '20', repeticao: '', dia: '', indefinido: true, concluidoHoje: false },
    { id: '4', nome: 'Exercício físico', horario: '8:00', pontos: '25', repeticao: '', dia: '', indefinido: true, concluidoHoje: false },
  ]);
  const [pontos, setPontos] = useState(150);
  const [diasSeguindoRotina, setDiasSeguindoRotina] = useState(3);
  const [itensComprados, setItensComprados] = useState<string[]>([]);

  const [usuario, setUsuario] = useState<Usuario>({
    nome: '',
    email: '',
    logado: false,
    petSelecionado: false,
    petNome: '',
    dataNascimento: '',
  });

  const [pet, setPet] = useState<PetState>({
    tipo: null,
    nome: '',
    afetividade: 75,
    felicidade: 85,
    fome: 65,
    xp: 800,
  });

  const adicionarAtividade = (atividade: Omit<Atividade, 'id' | 'concluida'>) => {
    const novaAtividade: Atividade = {
      ...atividade,
      id: Date.now().toString(),
      concluida: false,
    };
    setAtividades(prev => [...prev, novaAtividade]);
  };

  const adicionarHabito = (habito: Omit<Habito, 'id' | 'concluidoHoje'>) => {
    const novoHabito: Habito = {
      ...habito,
      id: Date.now().toString(),
      concluidoHoje: false,
    };
    setHabitos(prev => [...prev, novoHabito]);
  };

  const concluirAtividade = (id: string) => {
    setAtividades(prev =>
      prev.map(atividade => {
        if (atividade.id === id && !atividade.concluida) {
          const pts = parseInt(atividade.pontos || '0');
          setPontos(p => p + pts);
          setPet(p => ({ ...p, xp: Math.min(p.xp + pts, 1000) }));
          return { ...atividade, concluida: true };
        }
        return atividade;
      })
    );
  };

  const concluirHabito = (id: string) => {
    setHabitos(prev =>
      prev.map(habito => {
        if (habito.id === id && !habito.concluidoHoje) {
          const pts = parseInt(habito.pontos || '0');
          setPontos(p => p + pts);
          setPet(p => ({ ...p, xp: Math.min(p.xp + Math.floor(pts / 2), 1000) }));
          return { ...habito, concluidoHoje: true };
        }
        return habito;
      })
    );
  };

  const removerAtividade = (id: string) => {
    setAtividades(prev => prev.filter(a => a.id !== id));
  };

  const removerHabito = (id: string) => {
    setHabitos(prev => prev.filter(h => h.id !== id));
  };

  const login = (nome: string, email: string) => {
    setUsuario(prev => ({
      ...prev,
      nome,
      email,
      logado: true,
    }));
  };

  const logout = () => {
    setUsuario({
      nome: '',
      email: '',
      logado: false,
      petSelecionado: false,
      petNome: '',
      dataNascimento: '',
    });
    setPet({
      tipo: null,
      nome: '',
      afetividade: 75,
      felicidade: 85,
      fome: 65,
      xp: 800,
    });
    setPontos(0);
    setAtividades([]);
    setItensComprados([]);
  };

  const cadastrar = (nome: string, email: string, dataNascimento: string) => {
    setUsuario({
      nome,
      email,
      logado: true,
      petSelecionado: false,
      petNome: '',
      dataNascimento,
    });
  };

  const selecionarPet = (tipo: PetTipo, nome: string) => {
    setPet(prev => ({
      ...prev,
      tipo,
      nome,
      afetividade: 50,
      felicidade: 60,
      fome: 50,
      xp: 0,
    }));
    setUsuario(prev => ({
      ...prev,
      petSelecionado: true,
      petNome: nome,
    }));
  };

  const alimentarPet = () => {
    setPet(prev => ({
      ...prev,
      fome: Math.min(prev.fome + 15, 100),
      afetividade: Math.min(prev.afetividade + 5, 100),
    }));
  };

  const brincarPet = () => {
    setPet(prev => ({
      ...prev,
      felicidade: Math.min(prev.felicidade + 15, 100),
      fome: Math.max(prev.fome - 5, 0),
    }));
  };

  const acariciarPet = () => {
    setPet(prev => ({
      ...prev,
      afetividade: Math.min(prev.afetividade + 15, 100),
      felicidade: Math.min(prev.felicidade + 5, 100),
    }));
  };

  const comprarItem = (idItem: string, preco: number): boolean => {
    if (pontos >= preco) {
      setPontos(p => p - preco);
      setItensComprados(prev => [...prev, idItem]);
      return true;
    }
    return false;
  };

  const resetarHabitosDiarios = () => {
    setHabitos(prev => prev.map(h => ({ ...h, concluidoHoje: false })));
  };

  return (
    <DataContext.Provider
      value={{
        atividades,
        habitos,
        pontos,
        usuario,
        pet,
        diasSeguindoRotina,
        itensComprados,
        adicionarAtividade,
        adicionarHabito,
        concluirAtividade,
        concluirHabito,
        removerAtividade,
        removerHabito,
        login,
        logout,
        cadastrar,
        selecionarPet,
        alimentarPet,
        brincarPet,
        acariciarPet,
        comprarItem,
        resetarHabitosDiarios,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData deve ser usado dentro de um DataProvider');
  }
  return context;
}
