import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { useData, Atividade } from './DataContext';

interface AtividadesProps {
  onAdicionar: () => void;
}

export default function Atividades({ onAdicionar }: AtividadesProps) {
  const { atividades, pontos, concluirAtividade, removerAtividade } = useData();

  const atividadesPendentes = atividades.filter(a => !a.concluida);
  const atividadesConcluidas = atividades.filter(a => a.concluida);

  const renderAtividade = ({ item }: { item: Atividade }) => (
    <View style={styles.atividadeItem}>
      <View style={styles.atividadeInfo}>
        <Text style={[styles.atividadeNome, item.concluida && styles.atividadeConcluida]}>
          {item.nome}
        </Text>
        <View style={styles.atividadeDetalhes}>
          <Text style={styles.atividadeCategoria}>{item.categoria}</Text>
          <Text style={styles.atividadeData}>{item.data}</Text>
          <Text style={styles.atividadePontos}>{item.pontos} pts</Text>
        </View>
      </View>
      <View style={styles.atividadeAcoes}>
        {!item.concluida ? (
          <TouchableOpacity
            style={styles.btnConcluir}
            onPress={() => concluirAtividade(item.id)}
          >
            <Text style={styles.btnConcluirText}>✓</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.badgeConcluida}>
            <Text style={styles.badgeConcluidaText}>Feito</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.btnRemover}
          onPress={() => removerAtividade(item.id)}
        >
          <Text style={styles.btnRemoverText}>✕</Text>
        </TouchableOpacity>
      </View>
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

      {/* Atividades do dia */}
      <View style={styles.cardAtividades}>
        <Text style={styles.cardTitulo}>Atividades do dia</Text>
        {atividadesPendentes.length === 0 && atividadesConcluidas.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Nenhuma atividade adicionada</Text>
          </View>
        ) : (
          <FlatList
            data={[...atividadesPendentes, ...atividadesConcluidas]}
            keyExtractor={item => item.id}
            renderItem={renderAtividade}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
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
    paddingBottom: 16,
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
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  perfilIconText: {
    fontSize: 20,
  },
  cardAtividades: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#1A3A6E',
    marginHorizontal: 20,
    padding: 20,
    minHeight: 200,
  },
  cardTitulo: {
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
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
    color: '#999',
  },
  atividadeDetalhes: {
    flexDirection: 'row',
    marginTop: 4,
    gap: 8,
  },
  atividadeCategoria: {
    fontSize: 11,
    color: '#6B9FD4',
    backgroundColor: '#E8F1FA',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    overflow: 'hidden',
  },
  atividadeData: {
    fontSize: 11,
    color: '#6B9FD4',
  },
  atividadePontos: {
    fontSize: 11,
    color: '#F5A623',
    fontWeight: 'bold',
  },
  atividadeAcoes: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  btnConcluir: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnConcluirText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  badgeConcluida: {
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeConcluidaText: {
    color: '#4CAF50',
    fontSize: 11,
    fontWeight: 'bold',
  },
  btnRemover: {
    backgroundColor: '#FF5252',
    borderRadius: 12,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnRemoverText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#E8F1FA',
  },
  explicativo: {
    color: '#B8D4F0',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 16,
    marginHorizontal: 30,
  },
  btnAdicionar: {
    backgroundColor: '#1A3A6E',
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnAdicionarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
