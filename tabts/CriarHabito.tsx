import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useData } from './DataContext';

interface CriarHabitoProps {
  onVoltar: () => void;
}

export default function CriarHabito({ onVoltar }: CriarHabitoProps) {
  const { adicionarHabito } = useData();
  const [nome, setNome] = useState('');
  const [horario, setHorario] = useState('');
  const [pontos, setPontos] = useState('');
  const [repeticao, setRepeticao] = useState('');
  const [dia, setDia] = useState('');
  const [indefinido, setIndefinido] = useState(false);

  const handleCriar = () => {
    if (!nome.trim()) {
      Alert.alert('Atenção', 'Preencha o nome do hábito');
      return;
    }
    if (!horario.trim()) {
      Alert.alert('Atenção', 'Preencha o horário');
      return;
    }
    if (!pontos.trim()) {
      Alert.alert('Atenção', 'Preencha o número de pontos');
      return;
    }

    adicionarHabito({
      nome: nome.trim(),
      horario: horario.trim(),
      pontos: pontos.trim(),
      repeticao: repeticao.trim(),
      dia: dia.trim(),
      indefinido,
    });

    Alert.alert('Sucesso', 'Hábito criado com sucesso!');
    onVoltar();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onVoltar} style={styles.btnVoltar}>
          <Text style={styles.btnVoltarText}>← </Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Novo Hábito</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* Card Formulário */}
        <View style={styles.card}>
          <Text style={styles.titulo}>Novo hábito?</Text>

          {/* Campo: O que você está pensando? */}
          <Text style={styles.label}>O que você está pensando?</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do hábito..."
            placeholderTextColor="#999"
            value={nome}
            onChangeText={setNome}
          />

          {/* Linha: Horário e Pontos */}
          <View style={styles.rowInputs}>
            <View style={styles.inputHalfContainer}>
              <Text style={styles.label}>Em que horário?</Text>
              <TextInput
                style={[styles.input, styles.inputHalf]}
                placeholder="HH:MM"
                placeholderTextColor="#999"
                value={horario}
                onChangeText={setHorario}
              />
            </View>
            <View style={styles.inputHalfContainer}>
              <Text style={styles.label}>Nº de pontos</Text>
              <TextInput
                style={[styles.input, styles.inputHalf, styles.inputDark]}
                placeholder="0"
                placeholderTextColor="#DDD"
                value={pontos}
                onChangeText={setPontos}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Campo: Repetição */}
          <Text style={styles.label}>Deseja repetir esse hábito por quanto tempo?</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 30 dias, 1 mês..."
            placeholderTextColor="#999"
            value={repeticao}
            onChangeText={setRepeticao}
            editable={!indefinido}
          />

          {/* Linha: Dia e Indefinido */}
          <View style={styles.rowInputs}>
            <View style={styles.inputHalfContainer}>
              <Text style={styles.label}>definir dia:</Text>
              <TextInput
                style={[styles.input, styles.inputHalf]}
                placeholder="Seg, Ter..."
                placeholderTextColor="#999"
                value={dia}
                onChangeText={setDia}
                editable={!indefinido}
              />
            </View>
            <View style={styles.inputHalfContainer}>
              <Text style={styles.label}> </Text>
              <TouchableOpacity
                style={[
                  styles.input,
                  styles.inputHalf,
                  styles.inputDark,
                  indefinido && styles.inputActive,
                ]}
                onPress={() => setIndefinido(!indefinido)}
              >
                <Text style={[styles.inputDarkText, indefinido && styles.inputActiveText]}>
                  indefinido
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Botão Criar Hábito */}
        <TouchableOpacity style={styles.btnCriar} onPress={handleCriar}>
          <Text style={styles.btnCriarText}>Criar hábito</Text>
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
  btnVoltar: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnVoltarText: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#1A3A6E',
    padding: 22,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A3A6E',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A3A6E',
    marginBottom: 4,
    marginLeft: 2,
  },
  input: {
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: '#424242',
    marginBottom: 12,
  },
  inputHalf: {
    marginBottom: 0,
  },
  inputDark: {
    backgroundColor: '#9E9E9E',
    justifyContent: 'center',
  },
  inputDarkText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  inputActive: {
    backgroundColor: '#1A3A6E',
  },
  inputActiveText: {
    fontWeight: 'bold',
  },
  inputHalfContainer: {
    flex: 1,
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  btnCriar: {
    backgroundColor: '#1A3A6E',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 24,
    marginHorizontal: 10,
  },
  btnCriarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
