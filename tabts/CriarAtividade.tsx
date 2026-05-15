import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onVoltar} style={styles.btnVoltar}>
          <Text style={styles.btnVoltarText}>← </Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nova Atividade</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* Card Formulário */}
        <View style={styles.card}>
          <Text style={styles.titulo}>Nova atividade?</Text>

          {/* Campo: O que você está pensando? */}
          <Text style={styles.label}>O que você está pensando?</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome da atividade..."
            placeholderTextColor="#999"
            value={nome}
            onChangeText={setNome}
          />

          {/* Linha: Data e Pontos */}
          <View style={styles.rowInputs}>
            <View style={styles.inputHalfContainer}>
              <Text style={styles.label}>Para que dia?</Text>
              <TextInput
                style={[styles.input, styles.inputHalf]}
                placeholder="DD/MM/AAAA"
                placeholderTextColor="#999"
                value={data}
                onChangeText={setData}
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

          {/* Campo: Categoria */}
          <Text style={styles.label}>Em qual categoria se encontra sua atividade?</Text>
          <TextInput
            style={[styles.input, styles.inputLarge]}
            placeholder="Trabalho, estudo..."
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
    color: '#FFFFFF',
  },
  inputLarge: {
    minHeight: 64,
    textAlignVertical: 'top',
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
