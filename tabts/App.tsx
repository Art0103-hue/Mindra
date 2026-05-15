import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { DataProvider, useData } from './DataContext';
import Atividades from './Atividades';
import CriarAtividade from './CriarAtividade';
import Habitos from './Habitos';
import CriarHabito from './CriarHabito';
import Home from './Home';
import Loja from './Loja';
import Pet from './Pet';

type TabName = 'home' | 'atividades' | 'habitos' | 'loja' | 'pet';
type AtividadesView = 'list' | 'create';
type HabitosView = 'list' | 'create';

function AppContent() {
  const [activeTab, setActiveTab] = useState<TabName>('home');
  const [atividadesView, setAtividadesView] = useState<AtividadesView>('list');
  const [habitosView, setHabitosView] = useState<HabitosView>('list');
  const { pontos } = useData();

  const handleTabPress = (tab: TabName) => {
    setActiveTab(tab);
    if (tab === 'atividades') setAtividadesView('list');
    if (tab === 'habitos') setHabitosView('list');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'atividades':
        if (atividadesView === 'create') {
          return <CriarAtividade onVoltar={() => setAtividadesView('list')} />;
        }
        return <Atividades onAdicionar={() => setAtividadesView('create')} />;
      case 'habitos':
        if (habitosView === 'create') {
          return <CriarHabito onVoltar={() => setHabitosView('list')} />;
        }
        return <Habitos onAdicionar={() => setHabitosView('create')} />;
      case 'loja':
        return <Loja />;
      case 'pet':
        return <Pet />;
      default:
        return <Home />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {renderContent()}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleTabPress('home')}
        >
          <View style={[styles.navIconWrap, activeTab === 'home' && styles.navIconWrapActive]}>
            <Text style={styles.navIcon}>🏠</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleTabPress('atividades')}
        >
          <View style={[styles.navIconWrap, activeTab === 'atividades' && styles.navIconWrapActive]}>
            <Text style={styles.navIcon}>📓</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleTabPress('habitos')}
        >
          <View style={[styles.navIconWrap, activeTab === 'habitos' && styles.navIconWrapActive]}>
            <Text style={styles.navIcon}>📋</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleTabPress('loja')}
        >
          <View style={[styles.navIconWrap, activeTab === 'loja' && styles.navIconWrapActive]}>
            <Text style={styles.navIcon}>🛒</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleTabPress('pet')}
        >
          <View style={[styles.navIconWrap, activeTab === 'pet' && styles.navIconWrapActive]}>
            <Text style={styles.navIcon}>🐾</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3A7BD5',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navIconWrapActive: {
    backgroundColor: '#E3F2FD',
  },
  navIcon: {
    fontSize: 22,
  },
});
