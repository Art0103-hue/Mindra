import { StyleSheet, TextInput, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { Text, View } from '@/components/Themed';
import { auth } from '@/services/firebaseConfig';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace('/Inicio');
      }
    });

    return unsubscribe;
  }, [router]);

  function irParaCadastro() {
    router.push('/Cadastro');
  }

  async function handleLogin() {
    if (!email.trim() || !senha.trim()) {
      setErro('Preencha todos os campos');
      return;
    }

    try {
      setErro('');
      await signInWithEmailAndPassword(auth, email.trim(), senha);
      router.replace('/Inicio');
    } catch (error: any) {
      if (error.code === 'auth/invalid-credential') {
        setErro('Email ou senha incorretos');
      } else if (error.code === 'auth/invalid-email') {
        setErro('Email inválido');
      } else {
        setErro('Erro ao realizar login');
      }
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View/>

          <View style={styles.header}>
            <Image
              source={require('../../assets/images/logo-mindra.png')}
              style={styles.image}
          />

          <Text style={styles.title}>Mindra</Text>
          <Text style={styles.subtitle}>Entre para organizar sua mente</Text>
        </View>

        <View style={styles.formCard}>
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
            placeholder="Senha"
            placeholderTextColor="#8A8A8A"
            secureTextEntry
            value={senha}
            onChangeText={(text) => {
              setSenha(text);
              setErro('');
            }}
          />

          {erro !== '' && (
            <Text style={styles.erro}>{erro}</Text>
          )}

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonLogin}>Entrar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.text}>Não possui conta? </Text>

          <TouchableOpacity onPress={irParaCadastro}>
            <Text style={styles.buttonText}>Cadastre-se</Text>
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
    paddingTop: 18,
    paddingBottom: 28,
    justifyContent: 'space-between',
  },

  topHandle: {
    alignSelf: 'center',
    width: 120,
    height: 18,
    backgroundColor: '#DDE7ED',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    marginBottom: 10,
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

  buttonLogin: {
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

  text: {
    color: '#444',
    fontSize: 15,
  },

  buttonText: {
    color: '#0E88E6',
    fontWeight: '800',
    fontSize: 15,
  },
});