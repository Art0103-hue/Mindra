import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { useData, PetTipo } from './DataContext';

interface PetInicialProps {
  onSelecionar: () => void;
}

interface PetOption {
  tipo: PetTipo;
  imagem: any;
  nome: string;
  descricao: string;
}

const petOptions: PetOption[] = [
  {
    tipo: 'cachorro',
    imagem: require('../assets/Assets MINDRA/Cachorro.png'),
    nome: 'Cachorro',
    descricao: 'alegre, brincalhão, leal, companheiro, comilão',
  },
  {
    tipo: 'gato',
    imagem: require('../assets/Assets MINDRA/gato.jpeg'),
    nome: 'Gato',
    descricao: 'dengoso, curioso, exigente, introvertido, calmo',
  },
  {
    tipo: 'passaro',
    imagem: require('../assets/Assets MINDRA/passaro.jpeg'),
    nome: 'Pássaro',
    descricao: 'Inteligente, extrovertido, social, organizado',
  },
  {
    tipo: 'peixe',
    imagem: require('../assets/Assets MINDRA/peixe.jpeg'),
    nome: 'Peixe',
    descricao: 'sentimental, boa memória, mentalidade própria',
  },
];

export default function PetInicial({ onSelecionar }: PetInicialProps) {
  const { selecionarPet } = useData();
  const [petSelecionado, setPetSelecionado] = useState<PetTipo | null>(null);
  const [petNome, setPetNome] = useState('');
  const [mostrarNomeInput, setMostrarNomeInput] = useState(false);

  const handleSelecionarPet = (tipo: PetTipo) => {
    setPetSelecionado(tipo);
    setMostrarNomeInput(true);
  };

  const handleConfirmar = () => {
    if (!petSelecionado) {
      Alert.alert('Atenção', 'Selecione um pet primeiro');
      return;
    }
    if (!petNome.trim()) {
      Alert.alert('Atenção', 'Dê um nome ao seu pet');
      return;
    }
    selecionarPet(petSelecionado, petNome.trim());
    onSelecionar();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Card principal */}
        <View style={styles.card}>
          <Text style={styles.headerText}>
            Notei que você não tem um pet ainda.
          </Text>

          {/* Grid de pets 2x2 */}
          <View style={styles.petGrid}>
            {petOptions.map((option) => {
              const isSelected = petSelecionado === option.tipo;
              return (
                <TouchableOpacity
                  key={option.tipo}
                  style={[
                    styles.petCard,
                    isSelected && styles.petCardSelected,
                  ]}
                  onPress={() => handleSelecionarPet(option.tipo)}
                  activeOpacity={0.7}
                >
                  <View style={styles.petImageContainer}>
                    <Image
                      source={option.imagem}
                      style={styles.petImage}
                      resizeMode="contain"
                    />
                  </View>
                  <Text style={styles.petNome}>{option.nome}</Text>
                  <Text style={styles.petDescricao}>{option.descricao}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Nome input section */}
          {mostrarNomeInput && (
            <View style={styles.nomeContainer}>
              <View style={styles.btnNomeGreen}>
                <Text style={styles.btnNomeGreenText}>Dê um nome a ele/ela</Text>
              </View>
              <TextInput
                style={styles.nomeInput}
                placeholder="Nome do pet..."
                placeholderTextColor="#666666"
                value={petNome}
                onChangeText={setPetNome}
              />
            </View>
          )}

          {/* Botão Selecionar */}
          <TouchableOpacity
            style={[
              styles.btnSelecionar,
              (!petSelecionado || !petNome.trim()) && styles.btnSelecionarDisabled,
            ]}
            onPress={handleConfirmar}
            disabled={!petSelecionado || !petNome.trim()}
            activeOpacity={0.7}
          >
            <Image
              source={require('../assets/Assets MINDRA/Cerebro.png')}
              style={styles.btnPattern}
              resizeMode="repeat"
            />
            <Text style={styles.btnSelecionarText}>Selecionar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#008060',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#1A3A6E',
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A3A6E',
    textAlign: 'center',
    marginBottom: 16,
  },
  petGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  petCard: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#1A3A6E',
    padding: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  petCardSelected: {
    borderColor: '#4CAF50',
    borderWidth: 3,
    backgroundColor: '#E8F5E9',
  },
  petImageContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  petImage: {
    width: 70,
    height: 70,
  },
  petNome: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A3A6E',
    marginBottom: 2,
  },
  petDescricao: {
    fontSize: 10,
    color: '#6B9FD4',
    textAlign: 'center',
    lineHeight: 14,
  },
  nomeContainer: {
    marginTop: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  btnNomeGreen: {
    backgroundColor: '#00BFA5',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  btnNomeGreenText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  nomeInput: {
    backgroundColor: '#D3D3D3',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#333333',
    textAlign: 'center',
    width: '100%',
  },
  btnSelecionar: {
    backgroundColor: '#1A3A6E',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  btnSelecionarDisabled: {
    backgroundColor: '#9E9E9E',
  },
  btnPattern: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.1,
    tintColor: '#FFFFFF',
  },
  btnSelecionarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    zIndex: 1,
  },
});
