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

interface CriarAtividadeProps {
  onVoltar: () => void;
}

export default function CriarAtividade({ onVoltar }: CriarAtividadeProps) {
  const { adicionarAtividade } = useData();
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [pontos, setPontos] = useState('');
  const [categoria, setCategoria] = useState('');

  const handleCriar = () => {
    if (!nome.trim()) {
      Alert.alert('Atenção', 'Preencha o nome da atividade');
      return;
    }
    if (!data.trim()) {
      Alert.alert('Atenção', 'Preencha a data');
      return;
    }
    if (!pontos.trim()) {
      Alert.alert('Atenção', 'Preencha o número de pontos');
      return;
    }
    if (!categoria.trim()) {
      Alert.alert('Atenção', 'Preencha a categoria');
      return;
    }

    adicionarAtividade({
      nome: nome.trim(),
      data: data.trim(),
      pontos: pontos.trim(),
      categoria: categoria.trim(),
    });

    Alert.alert('Sucesso', 'Atividade criada com sucesso!');
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
          <Text style={styles.titulo}>Nova atividade?</Text>

          {/* Campo: O que você está pensando? - placeholder only, no label */}
          <TextInput
            style={styles.input}
            placeholder="O que você está pensando?"
            placeholderTextColor="#666666"
            value={nome}
            onChangeText={setNome}
          />

          {/* Linha: Data e Pontos */}
          <View style={styles.rowInputs}>
            <TextInput
              style={[styles.input, styles.inputHalf]}
              placeholder="Para que dia?"
              placeholderTextColor="#666666"
              value={data}
              onChangeText={setData}
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

          {/* Campo: Categoria */}
          <TextInput
            style={[styles.input, styles.inputLarge]}
            placeholder="Em qual categoria se encontra sua atividade? Trabalho, estudo..."
            placeholderTextColor="#666666"
            value={categoria}
            onChangeText={setCategoria}
            multiline
          />
        </View>

        {/* Botão Criar Tarefa */}
        <TouchableOpacity style={styles.btnCriar} onPress={handleCriar}>
          <Text style={styles.btnCriarText}>Criar tarefa</Text>
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
    color: '#FFFFFF',
  },
  inputLarge: {
    minHeight: 64,
    textAlignVertical: 'top',
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
