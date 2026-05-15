import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useData, Habito } from './DataContext';

interface HabitosProps {
  onAdicionar: () => void;
}

export default function Habitos({ onAdicionar }: HabitosProps) {
  const { habitos, pontos, removerHabito } = useData();

  const renderHabito = ({ item }: { item: Habito }) => (
    <View style={styles.habitoItem}>
      <View style={styles.habitoInfo}>
        <Text style={styles.habitoNome}>{item.nome}</Text>
      </View>
      <View style={styles.habitoDireita}>
        <Text style={styles.habitoHorario}>{item.horario}</Text>
        <TouchableOpacity
          style={styles.btnRemover}
          onPress={() => removerHabito(item.id)}
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

      {/* Card Hábitos */}
      <View style={styles.cardHabitos}>
        <Text style={styles.cardTitulo}>Hábitos atuais:</Text>
        {habitos.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Nenhum hábito adicionado</Text>
          </View>
        ) : (
          <FlatList
            data={habitos}
            keyExtractor={item => item.id}
            renderItem={renderHabito}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        )}
      </View>

      {/* Botão adicionar hábito */}
      <TouchableOpacity style={styles.btnAdicionar} onPress={onAdicionar}>
        <Text style={styles.btnAdicionarText}>
          Gostaria de adicionar hábito novo?
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
  cardHabitos: {
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
  habitoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  habitoInfo: {
    flex: 1,
  },
  habitoNome: {
    fontSize: 15,
    fontWeight: '500',
    color: '#6B9FD4',
  },
  habitoDireita: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  habitoHorario: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A3A6E',
  },
  btnRemover: {
    backgroundColor: '#FF5252',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnRemoverText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#E8F1FA',
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
