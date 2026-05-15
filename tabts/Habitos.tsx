import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useData } from './DataContext';

interface HabitosProps {
  onAdicionar: () => void;
}

export default function Habitos({ onAdicionar }: HabitosProps) {
  const { habitos, pontos, removerHabito } = useData();

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
        {/* Card Hábitos */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Hábitos atuais:</Text>

          {habitos.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Nenhum hábito adicionado</Text>
            </View>
          ) : (
            habitos.map((habito) => (
              <View key={habito.id} style={styles.habitoItem}>
                <Text style={styles.habitoNome}>{habito.nome}</Text>
                <View style={styles.habitoDireita}>
                  <Text style={styles.habitoHorario}>{habito.horario}</Text>
                  <TouchableOpacity
                    style={styles.btnRemover}
                    onPress={() => removerHabito(habito.id)}
                  >
                    <Text style={styles.btnRemoverText}>✕</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Botão adicionar hábito */}
        <TouchableOpacity style={styles.btnAdicionar} onPress={onAdicionar}>
          <Text style={styles.btnAdicionarText}>
            Gostaria de adicionar hábito novo?
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
    minHeight: 200,
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
  habitoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E8F1FA',
  },
  habitoNome: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1A3A6E',
    flex: 1,
  },
  habitoDireita: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  habitoHorario: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#6B9FD4',
  },
  btnRemover: {
    backgroundColor: '#FF5252',
    borderRadius: 12,
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnRemoverText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: 'bold',
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
