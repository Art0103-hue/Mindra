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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Card Formulário */}
        <View style={styles.card}>
          <Text style={styles.titulo}>Nova atividade?</Text>

          {/* Campo: O que você está pensando? */}
          <TextInput
            style={styles.input}
            placeholder="O que você está pensando?"
            placeholderTextColor="#999"
            value={nome}
            onChangeText={setNome}
          />

          {/* Linha: Data e Pontos */}
          <View style={styles.rowInputs}>
            <TextInput
              style={[styles.input, styles.inputHalf]}
              placeholder="Para que dia?"
              placeholderTextColor="#999"
              value={data}
              onChangeText={setData}
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

          {/* Campo: Categoria */}
          <TextInput
            style={[styles.input, styles.inputLarge]}
            placeholder="Em qual categoria se encontra sua atividade? Trabalho, estudo..."
            placeholderTextColor="#999"
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
    color: '#FFFFFF',
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
