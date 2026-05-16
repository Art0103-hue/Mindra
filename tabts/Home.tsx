import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useData } from './DataContext';

const getCategoryIcon = (categoria: string): React.ReactNode => {
  const cat = categoria?.toLowerCase() || '';
  if (cat.includes('trabalho')) {
    return <MaterialCommunityIcons name="monitor" size={20} color="#FFFFFF" />;
  }
  if (cat.includes('estudo')) {
    return <MaterialCommunityIcons name="chart-line" size={20} color="#FFFFFF" />;
  }
  if (cat.includes('leitura')) {
    return <MaterialCommunityIcons name="book-open-variant" size={20} color="#FFFFFF" />;
  }
  if (cat.includes('exercício') || cat.includes('exercicio')) {
    return <MaterialCommunityIcons name="dumbbell" size={20} color="#FFFFFF" />;
  }
  if (cat.includes('saúde') || cat.includes('saude')) {
    return <MaterialCommunityIcons name="heart-pulse" size={20} color="#FFFFFF" />;
  }
  return <MaterialCommunityIcons name="chart-line" size={20} color="#FFFFFF" />;
};

export default function Home() {
  const { pontos, usuario, atividades, habitos, diasSeguindoRotina, concluirHabito } = useData();

  const atividadesPendentes = atividades.filter(a => !a.concluida);
  const habitosConcluidos = habitos.filter(h => h.concluidoHoje);
  const totalRotina = habitos.length;
  const concluidosRotina = habitosConcluidos.length;
  const progressoRotina = totalRotina > 0 ? concluidosRotina / totalRotina : 0;

  const nomeUsuario = usuario.nome || 'Usuário';

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.saudacaoText}>Olá {nomeUsuario}</Text>
          <View style={styles.pontosBadge}>
            <Text style={styles.pontosText}>{pontos} pontos acumulados</Text>
          </View>
        </View>
        <View style={styles.perfilIcon}>
          <Ionicons name="person-circle" size={28} color="#4169E1" />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Card: Rotina Progresso */}
        <View style={styles.card}>
          <Text style={styles.cardTexto}>
            {diasSeguindoRotina} dias seguindo a rotina, Muito bom!
          </Text>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${Math.max(progressoRotina * 100, 0)}%` }]} />
          </View>
          <Text style={styles.progressLabel}>
            {concluidosRotina} de atividade de rotina realizadas
          </Text>
        </View>

        {/* Card: Atividades do dia */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Atividades do dia</Text>
          {atividadesPendentes.length === 0 ? (
            <Text style={styles.emptyText}>Nenhuma atividade pendente</Text>
          ) : (
            <View style={styles.atividadesGrid}>
              {atividadesPendentes.slice(0, 4).map((atividade) => (
                <View key={atividade.id} style={styles.atividadeMiniCard}>
                  <View style={styles.atividadeIcon}>
                    {getCategoryIcon(atividade.categoria)}
                  </View>
                  <Text style={styles.atividadeNome} numberOfLines={1}>
                    {atividade.nome}
                  </Text>
                  <Text style={styles.atividadePontos}>
                    +{atividade.pontos} pontos após a realização
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Card: Hábitos de rotina */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Habitos de rotina</Text>
          {habitos.length === 0 ? (
            <Text style={styles.emptyText}>Nenhum hábito cadastrado</Text>
          ) : (
            habitos.map((habito) => (
              <View key={habito.id} style={styles.habitoItem}>
                <TouchableOpacity
                  style={[
                    styles.habitoCheckIcon,
                    habito.concluidoHoje && styles.habitoCheckDone,
                  ]}
                  onPress={() => {
                    if (!habito.concluidoHoje) {
                      concluirHabito(habito.id);
                    }
                  }}
                >
                  <Ionicons
                    name={habito.concluidoHoje ? 'checkmark' : 'checkmark-outline'}
                    size={14}
                    color={habito.concluidoHoje ? '#FFFFFF' : '#1A3A6E'}
                  />
                </TouchableOpacity>
                <Text style={[styles.habitoNome, habito.concluidoHoje && styles.habitoConcluido]}>
                  {habito.nome}
                </Text>
                <Text style={styles.habitoHorario}>{habito.horario}</Text>
                <Text style={styles.habitoPontos}>+{habito.pontos} pontos</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Dot pattern overlay */}
      <View style={styles.dotPattern} pointerEvents="none" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4169E1',
  },
  dotPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.04,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 12,
  },
  saudacaoText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  pontosBadge: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 14,
    alignSelf: 'flex-start',
  },
  pontosText: {
    color: '#4169E1',
    fontSize: 12,
    fontWeight: 'bold',
  },
  perfilIcon: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#1A3A6E',
    padding: 18,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A3A6E',
    textAlign: 'center',
    marginBottom: 12,
  },
  cardTexto: {
    fontSize: 16,
    color: '#1A3A6E',
    fontWeight: '600',
    marginBottom: 10,
  },
  progressBarBg: {
    height: 16,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#1A3A6E',
    borderRadius: 8,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  progressLabel: {
    fontSize: 12,
    color: '#1A3A6E',
    fontWeight: '500',
  },
  emptyText: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 12,
  },
  atividadesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  atividadeMiniCard: {
    width: '47%',
    backgroundColor: '#F5F9FF',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D0E3F5',
  },
  atividadeIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#1A3A6E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  atividadeNome: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A3A6E',
    textAlign: 'center',
    marginBottom: 2,
  },
  atividadePontos: {
    fontSize: 9,
    color: '#6B9FD4',
    textAlign: 'center',
  },
  habitoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E8F1FA',
  },
  habitoCheckIcon: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#1A3A6E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  habitoCheckDone: {
    backgroundColor: '#1A3A6E',
    borderColor: '#1A3A6E',
  },
  habitoNome: {
    flex: 1,
    fontSize: 14,
    color: '#1A3A6E',
    fontWeight: '500',
  },
  habitoConcluido: {
    textDecorationLine: 'line-through',
    color: '#9E9E9E',
  },
  habitoHorario: {
    fontSize: 13,
    color: '#1A3A6E',
    marginRight: 8,
    fontWeight: '500',
  },
  habitoPontos: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});
