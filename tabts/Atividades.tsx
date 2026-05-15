import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useData, Atividade } from './DataContext';

interface AtividadesProps {
  onAdicionar: () => void;
}

export default function Atividades({ onAdicionar }: AtividadesProps) {
  const { atividades, pontos, concluirAtividade, removerAtividade } = useData();

  const atividadesPendentes = atividades.filter(a => !a.concluida);
  const atividadesConcluidas = atividades.filter(a => a.concluida);

  const getCategoriaIcon = (categoria: string) => {
    const cat = categoria?.toLowerCase() || '';
    if (cat.includes('trabalho')) return '💻';
    if (cat.includes('estudo')) return '📚';
    if (cat.includes('saúde') || cat.includes('saude')) return '💪';
    if (cat.includes('casa') || cat.includes('lar')) return '🏠';
    if (cat.includes('exercício') || cat.includes('exercicio')) return '🏋️';
    return '📊';
  };

  const renderAtividade = (item: Atividade) => (
    <View key={item.id} style={styles.atividadeItem}>
      <View style={styles.atividadeIconSquare}>
        <Text style={styles.atividadeIconText}>
          {getCategoriaIcon(item.categoria)}
        </Text>
      </View>
      <View style={styles.atividadeInfo}>
        <Text style={[styles.atividadeNome, item.concluida && styles.atividadeConcluida]}>
          {item.nome}
        </Text>
        <Text style={styles.atividadePontosTexto}>
          +{item.pontos} pontos após a realização
        </Text>
      </View>
      {!item.concluida ? (
        <TouchableOpacity
          style={styles.btnCheck}
          onPress={() => concluirAtividade(item.id)}
        >
          <Text style={styles.btnCheckText}>✓</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.badgeConcluida}>
          <Text style={styles.badgeConcluidaText}>✓</Text>
        </View>
      )}
    </View>
  );

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

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Card Atividades */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Atividades do dia</Text>

          {atividadesPendentes.length === 0 && atividadesConcluidas.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Nenhuma atividade adicionada</Text>
            </View>
          ) : (
            <>
              {atividadesPendentes.map(renderAtividade)}
              {atividadesConcluidas.map(renderAtividade)}
            </>
          )}
        </View>

        {/* Texto explicativo */}
        <Text style={styles.explicativo}>
          atividades realizadas antes do dia do prazo dão pontos bônus
        </Text>

        {/* Botão adicionar */}
        <TouchableOpacity style={styles.btnAdicionar} onPress={onAdicionar}>
          <Text style={styles.btnAdicionarText}>
            Gostaria de adicionar uma atividade a lista
          </Text>
        </TouchableOpacity>
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
    paddingBottom: 12,
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#1A3A6E',
    padding: 20,
    minHeight: 160,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A3A6E',
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyText: {
    color: '#999',
    fontSize: 14,
  },
  atividadeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E8F1FA',
  },
  atividadeIconSquare: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#1A3A6E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  atividadeIconText: {
    fontSize: 20,
  },
  atividadeInfo: {
    flex: 1,
  },
  atividadeNome: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A3A6E',
  },
  atividadeConcluida: {
    textDecorationLine: 'line-through',
    color: '#9E9E9E',
  },
  atividadePontosTexto: {
    fontSize: 11,
    color: '#6B9FD4',
    marginTop: 2,
  },
  btnCheck: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#1A3A6E',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  btnCheckText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  badgeConcluida: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  badgeConcluidaText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  explicativo: {
    color: '#B8D4F0',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 14,
    marginHorizontal: 10,
  },
  btnAdicionar: {
    backgroundColor: '#1A3A6E',
    borderRadius: 16,
    marginHorizontal: 10,
    marginTop: 18,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnAdicionarText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
