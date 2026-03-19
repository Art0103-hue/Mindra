import { StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { auth, realtimeDb } from '@/services/firebaseConfig';

export default function HomeScreen() {
  const router = useRouter();

  const [dadosUsuario, setDadosUsuario] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);

  function irParaCriar() {
    router.push('/Criar');
  }

  function irParaUsuario() {
    router.push('/Usuario');
  }

  function irParaLoja() {
    router.push('/Loja');
  }

  function estaVazio(obj: any) {
    return !obj || Object.keys(obj).length === 0;
  }

  useEffect(() => {
    async function buscarDados() {
      const user = auth.currentUser;

      if (!user) {
        setCarregando(false);
        return;
      }

      try {
        const snapshot = await get(ref(realtimeDb, `Usuarios/${user.uid}`));

        if (snapshot.exists()) {
          setDadosUsuario(snapshot.val());
        } else {
          setDadosUsuario(null);
        }
      } catch (error) {
        console.log('Erro ao buscar dados:', error);
      } finally {
        setCarregando(false);
      }
    }

    buscarDados();
  }, []);

  if (carregando) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  const rotinasVazias = estaVazio(dadosUsuario?.rotinas);
  const atividadesVazias = estaVazio(dadosUsuario?.atividades);
  const projetosVazios = estaVazio(dadosUsuario?.projetos);

  const tudoVazio = rotinasVazias && atividadesVazias && projetosVazios;

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.counterLabel}>Recorde</Text>
        <Text style={styles.counterNumber}>12</Text>
      </View>

      <View style={styles.middleSection}>
        {tudoVazio ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Nenhum conteúdo encontrado.
              {'\n'}
              Deseja criar algo novo?
            </Text>

            <TouchableOpacity style={styles.createButton} onPress={irParaCriar}>
              <Text style={styles.createButtonText}>Criar agora</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
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
          </>
        )}
      </View>

      <View style={styles.bottomTab}>
        <TouchableOpacity style={styles.tabButton} onPress={irParaLoja}>
          <Text style={styles.tabText}>Loja</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabButton} onPress={irParaCriar}>
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

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
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

  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
    fontWeight: '600',
  },

  rotinaBox: {
    width: '100%',
    height: 120,
    backgroundColor: '#7abaff',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
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
    paddingHorizontal: 10,
  },

  boxText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  boxSubText: {
    fontSize: 13,
    marginTop: 8,
    textAlign: 'center',
    color: '#444',
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
  
  emptyContainer: {
  alignItems: 'center',
  justifyContent: 'center',
  },

  createButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});