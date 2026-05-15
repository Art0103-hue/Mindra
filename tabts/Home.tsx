import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';
import { useData } from './DataContext';

export default function Home() {
  const { pontos, usuario, atividades, habitos, diasSeguindoRotina } = useData();

  const atividadesPendentes = atividades.filter(a => !a.concluida);
  const atividadesConcluidas = atividades.filter(a => a.concluida);
  const habitosConcluidos = habitos.filter(h => h.concluidoHoje);
  const totalRotina = habitos.length;
  const concluidosRotina = habitosConcluidos.length;
  const progressoRotina = totalRotina > 0 ? concluidosRotina / totalRotina : 0;

  const nomeUsuario = usuario.nome || 'Usuário';

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.pontosBadge}>
          <Text style={styles.pontosText}>{pontos} Pontos</Text>
        </View>
        <View style={styles.perfilIcon}>
          <Text style={styles.perfilIconText}>👤</Text>
        </View>
      </View>

      {/* Saudação */}
      <View style={styles.saudacaoContainer}>
        <Text style={styles.saudacaoText}>Olá {nomeUsuario}</Text>
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
            <View style={[styles.progressBarFill, { width: `${progressoRotina * 100}%` }]} />
          </View>
          <Text style={styles.progressLabel}>
            {concluidosRotina} de {totalRotina} atividades de rotina realizadas
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
                    <Text style={styles.atividadeIconText}>
                      {atividade.categoria?.toLowerCase().includes('trabalho') ? '💻' : '📊'}
                    </Text>
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
          <Text style={styles.cardTitle}>Hábitos de rotina</Text>
          {habitos.length === 0 ? (
            <Text style={styles.emptyText}>Nenhum hábito cadastrado</Text>
          ) : (
            habitos.map((habito) => (
              <View key={habito.id} style={styles.habitoItem}>
                <View style={styles.habitoCheckIcon}>
                  <Text style={styles.habitoCheckText}>
                    {habito.concluidoHoje ? '✓' : '○'}
                  </Text>
                </View>
                <Text style={[styles.habitoNome, habito.concluidoHoje && styles.habitoConcluido]}>
                  {habito.nome}
                </Text>
                <Text style={styles.habitoHorario}>{habito.horario}</Text>
                <Text style={styles.habitoPontos}>+{habito.pontos}pts</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3A7BD5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 8,
  },
  pontosBadge: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  pontosText: {
    color: '#3A7BD5',
    fontSize: 14,
    fontWeight: 'bold',
  },
  perfilIcon: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  perfilIconText: {
    fontSize: 20,
  },
  saudacaoContainer: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  saudacaoText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
    marginBottom: 12,
  },
  cardTexto: {
    fontSize: 16,
    color: '#1A3A6E',
    fontWeight: '600',
    marginBottom: 10,
  },
  progressBarBg: {
    height: 14,
    backgroundColor: '#E0E0E0',
    borderRadius: 7,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#1A3A6E',
    borderRadius: 7,
  },
  progressLabel: {
    fontSize: 12,
    color: '#6B9FD4',
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
  atividadeIconText: {
    fontSize: 18,
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
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#1A3A6E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: '#F5F9FF',
  },
  habitoCheckText: {
    fontSize: 12,
    color: '#1A3A6E',
    fontWeight: 'bold',
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
    color: '#6B9FD4',
    marginRight: 8,
  },
  habitoPontos: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});
