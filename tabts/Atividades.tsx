import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useData, Atividade } from './DataContext';

interface AtividadesProps {
  onAdicionar: () => void;
}

const getCategoryIcon = (categoria: string): React.ReactNode => {
  const cat = categoria?.toLowerCase() || '';
  if (cat.includes('trabalho')) {
    return <MaterialCommunityIcons name="monitor" size={22} color="#FFFFFF" />;
  }
  if (cat.includes('estudo')) {
    return <MaterialCommunityIcons name="chart-bar" size={22} color="#FFFFFF" />;
  }
  if (cat.includes('leitura')) {
    return <MaterialCommunityIcons name="book-open-variant" size={22} color="#FFFFFF" />;
  }
  if (cat.includes('exercício') || cat.includes('exercicio')) {
    return <MaterialCommunityIcons name="dumbbell" size={22} color="#FFFFFF" />;
  }
  if (cat.includes('saúde') || cat.includes('saude')) {
    return <MaterialCommunityIcons name="heart-pulse" size={22} color="#FFFFFF" />;
  }
  return <MaterialCommunityIcons name="chart-bar" size={22} color="#FFFFFF" />;
};

export default function Atividades({ onAdicionar }: AtividadesProps) {
  const { atividades, pontos, concluirAtividade } = useData();

  const atividadesPendentes = atividades.filter(a => !a.concluida);
  const atividadesConcluidas = atividades.filter(a => a.concluida);

  const renderAtividade = (item: Atividade) => (
    <View key={item.id} style={styles.atividadeItem}>
      <View style={styles.atividadeIconSquare}>
        {getCategoryIcon(item.categoria)}
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
          <Ionicons name="checkmark" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      ) : (
        <View style={styles.badgeConcluida}>
          <Ionicons name="checkmark" size={18} color="#FFFFFF" />
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
          <Ionicons name="person-circle" size={28} color="#4169E1" />
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
        <TouchableOpacity style={styles.btnAdicionar} onPress={onAdicionar} activeOpacity={0.7}>
          <Image
            source={require('../assets/Assets MINDRA/Cerebro.png')}
            style={styles.btnPattern}
            resizeMode="repeat"
          />
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
    backgroundColor: '#4169E1',
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
    color: '#4169E1',
    fontSize: 14,
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
  badgeConcluida: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
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
    overflow: 'hidden',
    position: 'relative',
  },
  btnPattern: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.1,
    tintColor: '#FFFFFF',
  },
  btnAdicionarText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    zIndex: 1,
  },
});
