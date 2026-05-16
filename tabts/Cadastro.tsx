import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useData } from './DataContext';

interface CadastroProps {
  onCadastrar: () => void;
  onIrLogin: () => void;
}

export default function Cadastro({ onCadastrar, onIrLogin }: CadastroProps) {
  const { cadastrar } = useData();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastrar = () => {
    if (!nome.trim()) {
      Alert.alert('Atenção', 'Preencha o nome');
      return;
    }
    if (!email.trim()) {
      Alert.alert('Atenção', 'Preencha o email');
      return;
    }
    if (!dataNascimento.trim()) {
      Alert.alert('Atenção', 'Preencha a data de nascimento');
      return;
    }
    if (!senha.trim()) {
      Alert.alert('Atenção', 'Preencha a senha');
      return;
    }

    cadastrar(nome.trim(), email.trim(), dataNascimento.trim());
    onCadastrar();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/Assets MINDRA/Cerebro.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.logoText}>MINDRA</Text>
        </View>

        {/* Card de Cadastro */}
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Nome:"
            placeholderTextColor="#666666"
            value={nome}
            onChangeText={setNome}
          />

          <TextInput
            style={styles.input}
            placeholder="Email:"
            placeholderTextColor="#666666"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Data de nascimento:"
            placeholderTextColor="#666666"
            value={dataNascimento}
            onChangeText={setDataNascimento}
            keyboardType="numeric"
          />

          <TextInput
            style={styles.input}
            placeholder="Senha:"
            placeholderTextColor="#666666"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          <TouchableOpacity style={styles.btnCadastrar} onPress={handleCadastrar} activeOpacity={0.7}>
            <Image
              source={require('../assets/Assets MINDRA/Cerebro.png')}
              style={styles.btnPattern}
              resizeMode="repeat"
            />
            <Text style={styles.btnCadastrarText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>

        {/* Link para Login */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Já possui uma conta? </Text>
          <TouchableOpacity onPress={onIrLogin}>
            <Text style={styles.loginLink}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4169E1',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoImage: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 6,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#1A3A6E',
    padding: 24,
    width: '100%',
    maxWidth: 380,
  },
  input: {
    backgroundColor: '#D3D3D3',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    fontSize: 14,
    color: '#333333',
    marginBottom: 12,
  },
  btnCadastrar: {
    backgroundColor: '#1A3A6E',
    borderRadius: 16,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
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
  btnCadastrarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    zIndex: 1,
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 16,
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  loginLink: {
    color: '#90CAF9',
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
