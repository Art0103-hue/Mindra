import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function Pet() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.pontosBadge}>
          <Text style={styles.pontosText}>0 Pontos</Text>
        </View>
        <View style={styles.perfilIcon}>
          <Text style={styles.perfilIconText}>👤</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.pageTitle}>Seu Pet</Text>
        <Image
          source={require('../assets/Assets MINDRA/Cachorro.png')}
          style={styles.petImage}
          resizeMode="contain"
        />
        <Text style={styles.subtitle}>Cuide do seu pet completando atividades!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3A7BD5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
  },
  pontosBadge: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  pontosText: {
    color: '#3A7BD5',
    fontSize: 14,
    fontWeight: 'bold',
  },
  perfilIcon: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  perfilIconText: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  petImage: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#B8D4F0',
    textAlign: 'center',
  },
});
