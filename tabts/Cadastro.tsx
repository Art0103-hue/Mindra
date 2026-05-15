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
          <Text style={styles.cardTitle}>Criar Conta</Text>

          <Text style={styles.label}>Nome:</Text>
          <TextInput
            style={styles.input}
            placeholder="Seu nome completo"
            placeholderTextColor="#999"
            value={nome}
            onChangeText={setNome}
          />

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

          <Text style={styles.label}>Data de nascimento:</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/AAAA"
            placeholderTextColor="#999"
            value={dataNascimento}
            onChangeText={setDataNascimento}
            keyboardType="numeric"
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

          <TouchableOpacity style={styles.btnCadastrar} onPress={handleCadastrar}>
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
    backgroundColor: '#3A7BD5',
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
    width: 70,
    height: 70,
    marginBottom: 6,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 5,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
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
    marginBottom: 18,
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
    paddingVertical: 12,
    fontSize: 14,
    color: '#424242',
    marginBottom: 12,
  },
  btnCadastrar: {
    backgroundColor: '#1A3A6E',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  btnCadastrarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
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
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
