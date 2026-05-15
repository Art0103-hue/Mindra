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
    // Simula login — aceita qualquer credencial
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

        {/* Card de Login */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Entrar</Text>

          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="seu@email.com"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Senha:</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#999"
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
    backgroundColor: '#3A7BD5',
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
    letterSpacing: 6,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 28,
    width: '100%',
    maxWidth: 380,
    borderWidth: 2,
    borderColor: '#1A3A6E',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A3A6E',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A3A6E',
    marginBottom: 4,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#424242',
    marginBottom: 16,
  },
  btnEntrar: {
    backgroundColor: '#1A3A6E',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
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
