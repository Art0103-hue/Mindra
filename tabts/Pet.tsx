import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useData, PetTipo } from './DataContext';

const petImages: Record<PetTipo, any> = {
  cachorro: require('../assets/Assets MINDRA/Cachorro.png'),
  gato: require('../assets/Assets MINDRA/gato.jpeg'),
  passaro: require('../assets/Assets MINDRA/passaro.jpeg'),
  peixe: require('../assets/Assets MINDRA/peixe.jpeg'),
};

const petMensagens: Record<PetTipo, string> = {
  cachorro: 'Obrigado por voltar mestre, é muito bom ver você aqui... {nome}!',
  gato: 'Miau... você voltou. {nome} está feliz!',
  passaro: 'Piu piu! {nome} está tão feliz que você veio brincar!',
  peixe: 'Glub glub... {nome} está nadando de alegria com sua presença!',
};

export default function Pet() {
  const { pet, pontos, alimentarPet, brincarPet, acariciarPet } = useData();

  if (!pet.tipo) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Home do animal</Text>
          <View style={styles.pontosBadge}>
            <Text style={styles.pontosText}>{pontos} Pontos</Text>
          </View>
        </View>
        <View style={styles.contentCenter}>
          <Text style={styles.noPetText}>Nenhum pet selecionado</Text>
        </View>
      </View>
    );
  }

  const petImage = petImages[pet.tipo];
  const mensagem = petMensagens[pet.tipo].replace('{nome}', pet.nome);
  const xpProgress = Math.min(pet.xp / 1000, 1);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Home do animal</Text>
          <View style={styles.pontosBadge}>
            <Text style={styles.pontosText}>{pontos} Pontos</Text>
          </View>
        </View>

        {/* XP Progress */}
        <View style={styles.xpContainer}>
          <Text style={styles.xpText}>{pet.xp}/1000 xp</Text>
          <View style={styles.xpBarBg}>
            <View style={[styles.xpBarFill, { width: `${xpProgress * 100}%` }]} />
          </View>
        </View>

        {/* Pet Avatar */}
        <View style={styles.petAvatarContainer}>
          <View style={styles.petAvatarCircle}>
            <Image
              source={petImage}
              style={styles.petAvatarImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Speech Bubble */}
        <View style={styles.speechBubble}>
          <Text style={styles.speechText}>{mensagem}</Text>
        </View>

        {/* Stats Card */}
        <View style={styles.statsCard}>
          {/* Afetividade */}
          <View style={styles.statRow}>
            <View style={[styles.statIconCircle, { backgroundColor: '#FFE4E1' }]}>
              <Ionicons name="heart" size={16} color="#CD5C5C" />
            </View>
            <Text style={[styles.statLabel, { color: '#CD5C5C' }]}>Afetividade</Text>
            <View style={styles.statBarBg}>
              <View style={[styles.statBarFill, { width: `${pet.afetividade}%`, backgroundColor: '#CD5C5C' }]} />
            </View>
            <Text style={[styles.statValue, { color: '#CD5C5C' }]}>{pet.afetividade}%</Text>
          </View>

          {/* Felicidade */}
          <View style={styles.statRow}>
            <View style={[styles.statIconCircle, { backgroundColor: '#FFF9C4' }]}>
              <MaterialCommunityIcons name="emoticon-happy" size={16} color="#FFD700" />
            </View>
            <Text style={[styles.statLabel, { color: '#FFD700' }]}>Felicidade</Text>
            <View style={styles.statBarBg}>
              <View style={[styles.statBarFill, { width: `${pet.felicidade}%`, backgroundColor: '#FFD700' }]} />
            </View>
            <Text style={[styles.statValue, { color: '#FFD700' }]}>{pet.felicidade}%</Text>
          </View>

          {/* Fome */}
          <View style={styles.statRow}>
            <View style={[styles.statIconCircle, { backgroundColor: '#FFE0B2' }]}>
              <MaterialCommunityIcons name="food" size={16} color="#FF8C00" />
            </View>
            <Text style={[styles.statLabel, { color: '#FF8C00' }]}>Fome</Text>
            <View style={styles.statBarBg}>
              <View style={[styles.statBarFill, { width: `${pet.fome}%`, backgroundColor: '#FF8C00' }]} />
            </View>
            <Text style={[styles.statValue, { color: '#FF8C00' }]}>{pet.fome}%</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionBtn} onPress={brincarPet} activeOpacity={0.7}>
            <View style={styles.actionIconSquare}>
              <MaterialCommunityIcons name="gamepad-variant" size={24} color="#000000" />
            </View>
            <Text style={styles.actionLabel}>Brincar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn} onPress={alimentarPet} activeOpacity={0.7}>
            <View style={styles.actionIconSquare}>
              <MaterialCommunityIcons name="food" size={24} color="#000000" />
            </View>
            <Text style={styles.actionLabel}>Alimentar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn} onPress={acariciarPet} activeOpacity={0.7}>
            <View style={styles.actionIconSquare}>
              <Ionicons name="heart" size={24} color="#000000" />
            </View>
            <Text style={styles.actionLabel}>Acariciar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#008060',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  pontosBadge: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  pontosText: {
    color: '#4169E1',
    fontSize: 13,
    fontWeight: 'bold',
  },
  xpContainer: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  xpText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  xpBarBg: {
    height: 12,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 6,
    overflow: 'hidden',
  },
  xpBarFill: {
    height: '100%',
    backgroundColor: '#2E7D32',
    borderRadius: 6,
  },
  petAvatarContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  petAvatarCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#FFFFFF',
    borderWidth: 4,
    borderColor: '#1A3A6E',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  petAvatarImage: {
    width: 110,
    height: 110,
  },
  speechBubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 24,
    padding: 14,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#1A3A6E',
  },
  speechText: {
    fontSize: 13,
    color: '#1A3A6E',
    textAlign: 'center',
    lineHeight: 18,
    fontStyle: 'italic',
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#1A3A6E',
    marginHorizontal: 20,
    padding: 18,
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  statLabel: {
    width: 85,
    fontSize: 13,
    fontWeight: '600',
  },
  statBarBg: {
    flex: 1,
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
    marginHorizontal: 8,
  },
  statBarFill: {
    height: '100%',
    borderRadius: 5,
  },
  statValue: {
    width: 40,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 30,
    marginBottom: 10,
  },
  actionBtn: {
    alignItems: 'center',
  },
  actionIconSquare: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#1A3A6E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  actionLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  contentCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPetText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
