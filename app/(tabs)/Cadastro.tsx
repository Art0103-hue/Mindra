import { useState } from 'react';
import { Alert, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
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
  const [recorde, setRecorde] = useState(0);
  
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
      });

      setErro('');
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
      setRecorde(0);
      set
      irParaLogin();
    } catch (error: any) {
      console.log('Código do erro:', error.code);
      console.log('Mensagem do erro:', error.message);
      setErro('Erro ao cadastrar usuário');
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo-mindra.png')}
        style={styles.image}
      />

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={(text) => {
          setNome(text);
          setErro('');
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
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
        value={dataNascimento}
        onChangeText={(text) => {
          setDataNascimento(text);
          setErro('');
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
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
  );
}

const styles = StyleSheet.create({
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
  erro: {
    color: 'red',
    fontSize: 14,
    alignSelf: 'flex-start',
    marginBottom: 10,
    justifyContent: 'center',
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
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});