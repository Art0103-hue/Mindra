import { StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';

import { Text, View } from '@/components/Themed';

export default function EntradaScreen() {
  const router = useRouter();

  function irParaCadastro() {
    router.push('/Cadastro');
  }

  function irParaLogin() {
    router.push('/Login');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topHandle} />

        <View style={styles.header}>
          <Image
            source={require('../../assets/images/logo-mindraf.jpeg')}
            style={styles.logo}
          />

          <Text style={styles.title}>Mindra</Text>
          <Text style={styles.subtitle}>Organize sua mente</Text>
        </View>

        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <View style={styles.iconCircle}>
              <Ionicons name="checkmark-circle-outline" size={30} color="#1E88E5" />
            </View>

            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Organize suas tarefas</Text>
              <Text style={styles.cardDescription}>
                Crie e gerencie suas{'\n'}atividades diárias
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.iconCircle}>
              <Feather name="gift" size={28} color="#1E88E5" />
            </View>

            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Ganhe recompensas</Text>
              <Text style={styles.cardDescription}>
                Complete tarefas e ganhe{'\n'}moedas virtuais
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.iconCircle}>
              <Feather name="heart" size={28} color="#1E88E5" />
            </View>

            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Cuide do seu pet</Text>
              <Text style={styles.cardDescription}>
                Use suas moedas para cuidar{'\n'}do seu companheiro
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.mainButton} onPress={irParaCadastro}>
          <Text style={styles.mainButtonText}>Começar agora</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Ja tem uma conta? </Text>
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
    marginTop: 8,
  },

  logo: {
    width: 110,
    height: 110,
    borderRadius: 28,
    marginBottom: 18,
    resizeMode: 'cover',
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

  cardsContainer: {
    backgroundColor: 'transparent',
    gap: 18,
    marginTop: 20,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 22,
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  iconCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#EAF4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
  },

  cardTextContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
    marginBottom: 6,
  },

  cardDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },

  mainButton: {
    backgroundColor: '#0E88E6',
    height: 68,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 26,
  },

  mainButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
    backgroundColor: 'transparent',
  },

  footerText: {
    fontSize: 15,
    color: '#444',
  },

  footerLink: {
    fontSize: 15,
    color: '#0E88E6',
    fontWeight: '800',
  },
});