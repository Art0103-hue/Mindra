import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ref, get } from 'firebase/database';
import { auth, realtimeDb } from '@/services/firebaseConfig';
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from '@expo/vector-icons';

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

  function irParaTarefas() {
    router.push('/Tarefas');
  }

  function irParaRotina() {
    router.push('/Rotina');
  }

  function irParaPet() {
    router.push('/Pets');
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

  const nomeUsuario = dadosUsuario?.nome || 'Usuário';
  const inicialUsuario = nomeUsuario?.charAt(0)?.toUpperCase() || 'U';
  const moedas = 250;
  const recorde = typeof dadosUsuario?.recorde === 'number' ? dadosUsuario.recorde : 7;

  const tarefasHoje = [
    {
      id: '1',
      titulo: 'Meditar por 10 minutos',
      horario: '08:00',
      recompensa: 15,
      concluida: true,
    },
    {
      id: '2',
      titulo: 'Revisar anotações da aula',
      horario: '10:00',
      recompensa: 20,
      concluida: false,
    },
    {
      id: '3',
      titulo: 'Fazer exercícios de matemática',
      horario: '14:00',
      recompensa: 10,
      concluida: false,
    },
  ];

  if (carregando) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Olá,</Text>
              <Text style={styles.userName}>{nomeUsuario}</Text>
            </View>

            <View style={styles.headerRight}>
              <View style={styles.coinBox}>
                <MaterialCommunityIcons
                  name="cash-multiple"
                  size={20}
                  color="#25A55F"
                />
                <Text style={styles.coinText}>{moedas}</Text>
              </View>

              <TouchableOpacity style={styles.avatarButton} onPress={irParaUsuario}>
                <Text style={styles.avatarText}>{inicialUsuario}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.streakCard}>
            <View style={styles.streakHeader}>
              <View style={styles.streakTitleRow}>
                <Feather name="droplet" size={22} color="#FFFFFF" />
                <Text style={styles.streakTitle}>Sequência de {recorde} dias</Text>
              </View>

              <Text style={styles.streakTasks}>5/8 tarefas</Text>
            </View>

            <View style={styles.progressBarBackground}>
              <View style={styles.progressBarFill} />
            </View>

            <Text style={styles.streakDescription}>
              Continue assim! Você está indo muito bem.
            </Text>
          </View>

          <TouchableOpacity style={styles.petCard} onPress={irParaPet}>
            <View style={styles.petLeft}>
              <View style={styles.petIconBox}>
                <Text style={styles.petEmoji}>🐱</Text>
              </View>

              <View>
                <Text style={styles.petName}>Luna</Text>
                <Text style={styles.petStatus}>Nível 5 - Feliz</Text>

                <View style={styles.petEnergyRow}>
                  <View style={styles.energyDot} />
                  <Text style={styles.petEnergy}>Energia 85%</Text>
                </View>
              </View>
            </View>

            <Feather name="chevron-right" size={28} color="#646B73" />
          </TouchableOpacity>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tarefas de Hoje</Text>

            <TouchableOpacity onPress={irParaTarefas}>
              <Text style={styles.seeAllText}>Ver todas</Text>
            </TouchableOpacity>
          </View>

          {tarefasHoje.map((tarefa) => (
            <TouchableOpacity
              key={tarefa.id}
              style={[
                styles.taskCard,
                tarefa.concluida && styles.taskCardCompleted,
              ]}
            >
              <View style={styles.taskLeft}>
                <View
                  style={[
                    styles.taskCheck,
                    tarefa.concluida && styles.taskCheckCompleted,
                  ]}
                >
                  {tarefa.concluida && (
                    <AntDesign name="check" size={18} color="#FFFFFF" />
                  )}
                </View>

                <View style={styles.taskTextBox}>
                  <Text
                    style={[
                      styles.taskTitle,
                      tarefa.concluida && styles.taskTitleCompleted,
                    ]}
                  >
                    {tarefa.titulo}
                  </Text>
                  <Text style={styles.taskTime}>{tarefa.horario}</Text>
                </View>
              </View>

              <View style={styles.rewardBox}>
                <MaterialCommunityIcons
                  name="cash-multiple"
                  size={18}
                  color="#31B56A"
                />
                <Text style={styles.rewardText}>+{tarefa.recompensa}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.floatingButton} onPress={irParaCriar}>
          <Ionicons name="add" size={38} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <Feather name="home" size={26} color="#1187E3" />
            <Text style={[styles.navText, styles.navTextActive]}>Início</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={irParaTarefas}>
            <Feather name="list" size={26} color="#565D66" />
            <Text style={styles.navText}>Tarefas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={irParaRotina}>
            <MaterialCommunityIcons
              name="swap-horizontal"
              size={28}
              color="#565D66"
            />
            <Text style={styles.navText}>Hábitos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={irParaLoja}>
            <Feather name="gift" size={26} color="#565D66" />
            <Text style={styles.navText}>Loja</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={irParaPet}>
            <Ionicons name="sparkles-outline" size={26} color="#565D66" />
            <Text style={styles.navText}>Pet</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F7FB',
  },

  screen: {
    flex: 1,
    backgroundColor: '#F4F7FB',
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 130,
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: '#F4F7FB',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },

  greeting: {
    fontSize: 18,
    color: '#4F4F4F',
    marginBottom: 4,
  },

  userName: {
    fontSize: 30,
    fontWeight: '800',
    color: '#111111',
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  coinBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DDF4E7',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 22,
    gap: 8,
  },

  coinText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#25A55F',
  },

  avatarButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#08B6A5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
  },

  streakCard: {
    backgroundColor: '#1290EB',
    borderRadius: 28,
    padding: 22,
    marginBottom: 18,
  },

  streakHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  streakTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  streakTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    marginLeft: 10,
  },

  streakTasks: {
    color: '#E8F2FF',
    fontSize: 15,
    fontWeight: '600',
  },

  progressBarBackground: {
    width: '100%',
    height: 14,
    backgroundColor: '#60B3F2',
    borderRadius: 999,
    marginTop: 22,
    overflow: 'hidden',
  },

  progressBarFill: {
    width: '62%',
    height: '100%',
    backgroundColor: '#0F7ED1',
    borderRadius: 999,
  },

  streakDescription: {
    color: '#EAF5FF',
    fontSize: 15,
    lineHeight: 24,
    marginTop: 18,
  },

  petCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 26,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },

  petLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  petIconBox: {
    width: 104,
    height: 104,
    borderRadius: 24,
    backgroundColor: '#E3F4EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },

  petEmoji: {
    fontSize: 42,
  },

  petName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111111',
    marginBottom: 4,
  },

  petStatus: {
    fontSize: 16,
    color: '#4E5661',
    marginBottom: 12,
  },

  petEnergyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  energyDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#2FC26B',
    marginRight: 8,
  },

  petEnergy: {
    fontSize: 16,
    color: '#4E5661',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111111',
  },

  seeAllText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1187E3',
  },

  taskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#ECECEC',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  taskCardCompleted: {
    backgroundColor: '#E1F3EA',
    borderColor: '#BFE6D2',
  },

  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },

  taskCheck: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: '#CFCFCF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    backgroundColor: '#FFFFFF',
  },

  taskCheckCompleted: {
    backgroundColor: '#2FC26B',
    borderColor: '#2FC26B',
  },

  taskTextBox: {
    flex: 1,
  },

  taskTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#151515',
    marginBottom: 6,
  },

  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#535353',
  },

  taskTime: {
    fontSize: 16,
    color: '#5E6670',
  },

  rewardBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  rewardText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#31B56A',
  },

  floatingButton: {
    position: 'absolute',
    right: 22,
    bottom: 98,
    width: 86,
    height: 86,
    borderRadius: 24,
    backgroundColor: '#1187E3',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.16,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },

  bottomNav: {
    height: 92,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E7E7E7',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 8,
  },

  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  navText: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '500',
    color: '#565D66',
  },

  navTextActive: {
    color: '#1187E3',
    fontWeight: '700',
  },
});