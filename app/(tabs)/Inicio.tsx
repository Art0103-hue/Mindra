import { StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Text, View } from '@/components/Themed';

export default function HomeScreen() {
  const router = useRouter();
  function irParaCriar() {
    router.push('/Criar');
  }
  function irParaUsuario() {
    router.push('/Usuario');
  }
  function irParaLoja() {
    router.push('/Loja');
  }


  return (
    <View style={styles.container}>
      
      <View style={styles.topSection}>
        <Text style={styles.counterLabel}>Recorde</Text>
        <Text style={styles.counterNumber}>12</Text>
      </View>

      <View style={styles.middleSection}>
        <TouchableOpacity style={styles.rotinaBox}>
          <Text style={styles.boxText}>Rotina</Text>
        </TouchableOpacity>

        <View style={styles.rowBoxes}>
          <TouchableOpacity style={styles.smallBox}>
            <Text style={styles.boxText}>Atividades</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.smallBox}>
            <Text style={styles.boxText}>Projetos</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomTab}>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabText}>Loja</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabText}>Criar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={irParaUsuario}>
          <Text style={styles.tabText}>Usuário</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  topSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },

  counterLabel: {
    fontSize: 18,
    marginBottom: 8,
  },

  counterNumber: {
    fontSize: 36,
    fontWeight: 'bold',
  },

  middleSection: {
    flex: 1,
    justifyContent: 'center',
  },

  rotinaBox: {
    width: '100%',
    height: 120,
    backgroundColor: '#7abaff',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  rowBoxes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  smallBox: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#d9d9d9',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  boxText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    borderTopWidth: 1,
    borderColor: '#ccc',
    marginTop: 20,
  },

  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
});