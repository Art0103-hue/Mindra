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

interface LoginProps {
  onLogin: () => void;
  onIrCadastro: () => void;
}

export default function Login({ onLogin, onIrCadastro }: LoginProps) {
  const { login } = useData();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleEntrar = () => {
    if (!email.trim()) {
      Alert.alert('Atenção', 'Preencha o email');
      return;
    }
    if (!senha.trim()) {
      Alert.alert('Atenção', 'Preencha a senha');
      return;
    }
    login(email.split('@')[0] || 'Usuário', email.trim());
    onLogin();
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

        {/* Card de Login - NO border */}
        <View style={styles.card}>
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
            placeholder="Senha:"
            placeholderTextColor="#666666"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          <TouchableOpacity style={styles.btnEntrar} onPress={handleEntrar}>
            <Text style={styles.btnEntrarText}>Entrar</Text>
          </TouchableOpacity>
        </View>

        {/* Link para Cadastro */}
        <View style={styles.cadastroContainer}>
          <Text style={styles.cadastroText}>Não possui uma conta? </Text>
          <TouchableOpacity onPress={onIrCadastro}>
            <Text style={styles.cadastroLink}>Cadastrar</Text>
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
    paddingVertical: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoImage: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 5,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 380,
  },
  input: {
    backgroundColor: '#D3D3D3',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    fontSize: 15,
    color: '#333333',
    marginBottom: 16,
  },
  btnEntrar: {
    backgroundColor: '#4169E1',
    borderRadius: 16,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  btnEntrarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cadastroContainer: {
    flexDirection: 'row',
    marginTop: 24,
    marginBottom: 20,
  },
  cadastroText: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  cadastroLink: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
