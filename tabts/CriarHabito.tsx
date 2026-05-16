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
import { Ionicons } from '@expo/vector-icons';
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
      {/* Back arrow */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onVoltar} style={styles.btnVoltar}>
          <Ionicons name="arrow-back" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* Card Formulário */}
        <View style={styles.card}>
          <Text style={styles.titulo}>Novo hábito?</Text>

          {/* Campo: O que você está pensando? */}
          <TextInput
            style={styles.input}
            placeholder="O que você está pensando?"
            placeholderTextColor="#666666"
            value={nome}
            onChangeText={setNome}
          />

          {/* Linha: Horário e Pontos */}
          <View style={styles.rowInputs}>
            <TextInput
              style={[styles.input, styles.inputHalf]}
              placeholder="Em que horário?"
              placeholderTextColor="#666666"
              value={horario}
              onChangeText={setHorario}
            />
            <TextInput
              style={[styles.input, styles.inputHalf, styles.inputDark]}
              placeholder="Nº de pontos"
              placeholderTextColor="#FFFFFF"
              value={pontos}
              onChangeText={setPontos}
              keyboardType="numeric"
            />
          </View>

          {/* Campo: Repetição */}
          <TextInput
            style={styles.input}
            placeholder="Deseja repetir esse hábito por quanto tempo?"
            placeholderTextColor="#666666"
            value={repeticao}
            onChangeText={setRepeticao}
            editable={!indefinido}
          />

          {/* Linha: Dia e Indefinido */}
          <View style={styles.rowInputs}>
            <TextInput
              style={[styles.input, styles.inputHalf]}
              placeholder="definir dia:"
              placeholderTextColor="#666666"
              value={dia}
              onChangeText={setDia}
              editable={!indefinido}
            />
            <TouchableOpacity
              style={[
                styles.inputHalf,
                styles.inputDark,
                indefinido && styles.inputActive,
                styles.indefinidoBtn,
              ]}
              onPress={() => setIndefinido(!indefinido)}
              activeOpacity={0.7}
            >
              <Text style={[styles.indefinidoText, indefinido && styles.indefinidoTextActive]}>
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
    backgroundColor: '#4169E1',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 8,
  },
  btnVoltar: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 4,
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
  input: {
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: '#333333',
    marginBottom: 12,
  },
  inputHalf: {
    flex: 1,
    marginBottom: 0,
  },
  inputDark: {
    backgroundColor: '#A0A0A0',
    justifyContent: 'center',
  },
  inputActive: {
    backgroundColor: '#1A3A6E',
  },
  indefinidoBtn: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indefinidoText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  indefinidoTextActive: {
    fontWeight: 'bold',
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
