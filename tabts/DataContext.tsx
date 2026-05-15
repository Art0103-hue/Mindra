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
}

interface DataContextType {
  atividades: Atividade[];
  habitos: Habito[];
  pontos: number;
  adicionarAtividade: (atividade: Omit<Atividade, 'id' | 'concluida'>) => void;
  adicionarHabito: (habito: Omit<Habito, 'id'>) => void;
  concluirAtividade: (id: string) => void;
  removerAtividade: (id: string) => void;
  removerHabito: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [habitos, setHabitos] = useState<Habito[]>([
    { id: '1', nome: 'Alimentar Meus animais', horario: '5:30', pontos: '10', repeticao: '', dia: '', indefinido: true },
    { id: '2', nome: 'Meditar', horario: '6:00', pontos: '15', repeticao: '', dia: '', indefinido: true },
    { id: '3', nome: 'Ler 20 páginas', horario: '7:00', pontos: '20', repeticao: '', dia: '', indefinido: true },
    { id: '4', nome: 'Exercício físico', horario: '8:00', pontos: '25', repeticao: '', dia: '', indefinido: true },
  ]);
  const [pontos, setPontos] = useState(0);

  const adicionarAtividade = (atividade: Omit<Atividade, 'id' | 'concluida'>) => {
    const novaAtividade: Atividade = {
      ...atividade,
      id: Date.now().toString(),
      concluida: false,
    };
    setAtividades(prev => [...prev, novaAtividade]);
  };

  const adicionarHabito = (habito: Omit<Habito, 'id'>) => {
    const novoHabito: Habito = {
      ...habito,
      id: Date.now().toString(),
    };
    setHabitos(prev => [...prev, novoHabito]);
  };

  const concluirAtividade = (id: string) => {
    setAtividades(prev =>
      prev.map(atividade => {
        if (atividade.id === id && !atividade.concluida) {
          setPontos(p => p + parseInt(atividade.pontos || '0'));
          return { ...atividade, concluida: true };
        }
        return atividade;
      })
    );
  };

  const removerAtividade = (id: string) => {
    setAtividades(prev => prev.filter(a => a.id !== id));
  };

  const removerHabito = (id: string) => {
    setHabitos(prev => prev.filter(h => h.id !== id));
  };

  return (
    <DataContext.Provider
      value={{
        atividades,
        habitos,
        pontos,
        adicionarAtividade,
        adicionarHabito,
        concluirAtividade,
        removerAtividade,
        removerHabito,
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
