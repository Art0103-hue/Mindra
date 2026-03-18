import { StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
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

    } 
    catch (error: any) {
      if (error.code === 'auth/invalid-credential') {
        setErro('Email ou senha incorretos');
      } 
      else if (error.code === 'auth/invalid-email') {
        setErro('Email inválido');
      }
      else {
        setErro('Erro ao realizar login');
      }
    }
  }


  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo-mindra.png')}
        style={styles.image}
      />

      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonLogin}>Entrar</Text>
      </TouchableOpacity>

      {erro !== '' && (
        <Text style={styles.erro}>{erro}</Text>
      )}

      <View style={styles.row}>
        <Text style={styles.text}>Não possui conta?</Text>

        <TouchableOpacity onPress={irParaCadastro}>
          <Text style={styles.buttonText}> Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  erro: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  input: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },

  button: {
    width: '100%',
    height: 45,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  buttonLogin: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  buttonText: {
    color: '#007AFF',
    fontWeight: 'bold',
    marginTop: 15,
    fontSize: 16,
  },

  text: {
    color: '#000',
    fontWeight: 'bold',
    marginTop: 15,
    fontSize: 16,
  },

  row: {
    flexDirection: 'row',
    marginTop: 15,
  },
});