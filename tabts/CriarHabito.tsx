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

    if (!indefinido && !repeticao.trim() && !dia.trim()) {
      Alert.alert('Atenção', 'Defina a repetição do hábito ou marque como indefinido');
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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Card Formulário */}
        <View style={styles.card}>
          <Text style={styles.titulo}>Novo hábito?</Text>

          {/* Campo: O que você está pensando? */}
          <TextInput
            style={styles.input}
            placeholder="O que você está pensando?"
            placeholderTextColor="#999"
            value={nome}
            onChangeText={setNome}
          />

          {/* Linha: Horário e Pontos */}
          <View style={styles.rowInputs}>
            <TextInput
              style={[styles.input, styles.inputHalf]}
              placeholder="Em que horário?"
              placeholderTextColor="#999"
              value={horario}
              onChangeText={setHorario}
            />
            <TextInput
              style={[styles.input, styles.inputHalf, styles.inputDark]}
              placeholder="Nº de pontos"
              placeholderTextColor="#FFF"
              value={pontos}
              onChangeText={setPontos}
              keyboardType="numeric"
            />
          </View>

          {/* Campo: Repetição */}
          <TextInput
            style={styles.input}
            placeholder="Deseja repetir esse hábito por quanto tempo?"
            placeholderTextColor="#999"
            value={repeticao}
            onChangeText={setRepeticao}
            editable={!indefinido}
          />

          {/* Linha: Dia e Indefinido */}
          <View style={styles.rowInputs}>
            <TextInput
              style={[styles.input, styles.inputHalf]}
              placeholder="definir dia:"
              placeholderTextColor="#999"
              value={dia}
              onChangeText={setDia}
              editable={!indefinido}
            />
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
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#1A3A6E',
    padding: 24,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A3A6E',
    textAlign: 'center',
    marginBottom: 20,
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
    flex: 1,
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
  inputLarge: {
    minHeight: 64,
    textAlignVertical: 'top',
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 8,
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
