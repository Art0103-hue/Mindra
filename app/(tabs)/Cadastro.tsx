import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { Text, View } from '@/components/Themed';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { useRouter } from 'expo-router';
import { auth, realtimeDb } from '@/services/firebaseConfig';

export default function CadastroScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const router = useRouter();

  function irParaLogin() {
    router.replace('/Login');
  }

  function validarSenha(senha: string) {
    const temMaiuscula = /[A-Z]/.test(senha);
    const temNumero = /[0-9]/.test(senha);
    const temEspecial = /[!@#$%^&*]/.test(senha);
    const tamanhoMinimo = senha.length >= 8;

    if (!tamanhoMinimo) return 'A senha precisa ter pelo menos 8 caracteres';
    if (!temMaiuscula) return 'A senha precisa ter uma letra maiúscula';
    if (!temNumero) return 'A senha precisa ter um número';
    if (!temEspecial) return 'A senha precisa ter um caractere especial';

    return 'ok';
  }

  async function handleCadastro() {
    setErro('');

    if (!nome.trim() || !email.trim() || !dataNascimento.trim() || !senha.trim()) {
      setErro('Preencha todos os campos');
      return;
    }

    const resultado = validarSenha(senha);

    if (resultado !== 'ok') {
      setErro(resultado);
      return;
    }

    try {
      const emailLimpo = email.trim();

      const credencial = await createUserWithEmailAndPassword(auth, emailLimpo, senha);
      const uid = credencial.user.uid;

      await set(ref(realtimeDb, `Usuarios/${uid}`), {
        nome: nome.trim(),
        email: emailLimpo,
        dataNascimento: dataNascimento.trim(),
        rotinas: {},
        atividades: {},
        projetos: {},
        recorde: 0,
      });

      setErro('');
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
      irParaLogin();
    } catch (error: any) {
      console.log('Código do erro:', error.code);
      console.log('Mensagem do erro:', error.message);

      if (error.code === 'auth/email-already-in-use') {
        setErro('Este email já está cadastrado');
      } else if (error.code === 'auth/invalid-email') {
        setErro('Email inválido');
      } else if (error.code === 'auth/weak-password') {
        setErro('Senha fraca demais');
      } else {
        setErro('Erro ao cadastrar usuário');
      }
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/images/logo-mindra.png')}
            style={styles.image}
          />

          <Text style={styles.title}>Criar conta</Text>
          <Text style={styles.subtitle}>Comece a organizar sua mente</Text>
        </View>

        <View style={styles.formCard}>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            placeholderTextColor="#8A8A8A"
            value={nome}
            onChangeText={(text) => {
              setNome(text);
              setErro('');
            }}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#8A8A8A"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setErro('');
            }}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Data de nascimento"
            placeholderTextColor="#8A8A8A"
            value={dataNascimento}
            onChangeText={(text) => {
              setDataNascimento(text);
              setErro('');
            }}
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#8A8A8A"
            secureTextEntry
            value={senha}
            onChangeText={(text) => {
              setSenha(text);
              setErro('');
            }}
          />

          {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

          <TouchableOpacity style={styles.button} onPress={handleCadastro}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Já possui uma conta? </Text>

          <TouchableOpacity onPress={irParaLogin}>
            <Text style={styles.footerLink}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EDF7FB',
  },

  container: {
    flex: 1,
    backgroundColor: '#EDF7FB',
    paddingHorizontal: 28,
    paddingTop: 28,
    paddingBottom: 28,
    justifyContent: 'space-between',
  },

  header: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 12,
  },

  image: {
    width: 110,
    height: 110,
    borderRadius: 28,
    marginBottom: 18,
    resizeMode: 'contain',
  },

  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111',
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 16,
    color: '#444',
    fontWeight: '500',
  },

  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 22,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  input: {
    width: '100%',
    height: 52,
    borderWidth: 1,
    borderColor: '#D8E0E6',
    borderRadius: 14,
    marginBottom: 14,
    paddingHorizontal: 14,
    backgroundColor: '#FDFDFD',
    fontSize: 15,
    color: '#111',
  },

  erro: {
    color: '#D93025',
    marginBottom: 12,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },

  button: {
    width: '100%',
    height: 58,
    backgroundColor: '#0E88E6',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 18,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 18,
  },

  footerText: {
    color: '#444',
    fontSize: 15,
  },

  footerLink: {
    color: '#0E88E6',
    fontWeight: '800',
    fontSize: 15,
  },
});