import { StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Text, View } from '@/components/Themed';

export default function TabOneScreen() {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  function handleLogin() {
    console.log('Email:', email);
    console.log('Senha:', senha);
  }
  function irParaCadastro() {
    router.push('/Cadastro');
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/favicon.png')}
        style={{ width: 100, height: 100, marginBottom: 20 }}
      />
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
