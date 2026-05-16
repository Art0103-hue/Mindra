import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { DataProvider, useData } from './DataContext';
import Atividades from './Atividades';
import CriarAtividade from './CriarAtividade';
import Habitos from './Habitos';
import CriarHabito from './CriarHabito';
import Home from './Home';
import Loja from './Loja';
import Pet from './Pet';
import Login from './Login';
import Cadastro from './Cadastro';
import PetInicial from './PetInicial';

type TabName = 'home' | 'atividades' | 'habitos' | 'loja' | 'pet';
type AtividadesView = 'list' | 'create';
type HabitosView = 'list' | 'create';
type AppScreen = 'login' | 'cadastro' | 'petInicial' | 'main';

function AppContent() {
  const { usuario, logout } = useData();
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('login');
  const [activeTab, setActiveTab] = useState<TabName>('home');
  const [atividadesView, setAtividadesView] = useState<AtividadesView>('list');
  const [habitosView, setHabitosView] = useState<HabitosView>('list');

  const handleLogin = () => {
    if (usuario.petSelecionado) {
      setCurrentScreen('main');
    } else {
      setCurrentScreen('petInicial');
    }
  };

  const handleCadastro = () => {
    setCurrentScreen('petInicial');
  };

  const handlePetSelecionado = () => {
    setCurrentScreen('main');
  };

  const handleLogout = () => {
    logout();
    setCurrentScreen('login');
    setActiveTab('home');
  };

  const handleTabPress = (tab: TabName) => {
    setActiveTab(tab);
    if (tab === 'atividades') setAtividadesView('list');
    if (tab === 'habitos') setHabitosView('list');
  };

  const renderMainContent = () => {
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

  const renderTabIcon = (tab: TabName, isActive: boolean) => {
    if (isActive) {
      // Active: white icon on blue circle
      switch (tab) {
        case 'home':
          return <MaterialCommunityIcons name="home" size={22} color="#FFFFFF" />;
        case 'atividades':
          return <MaterialCommunityIcons name="notebook" size={22} color="#FFFFFF" />;
        case 'habitos':
          return <MaterialCommunityIcons name="clipboard-list-outline" size={22} color="#FFFFFF" />;
        case 'loja':
          return <MaterialCommunityIcons name="cart" size={22} color="#FFFFFF" />;
        case 'pet':
          return <MaterialCommunityIcons name="paw" size={22} color="#FFFFFF" />;
      }
    } else {
      // Inactive: blue icon on white
      switch (tab) {
        case 'home':
          return <MaterialCommunityIcons name="home" size={24} color="#4169E1" />;
        case 'atividades':
          return <MaterialCommunityIcons name="notebook" size={24} color="#4169E1" />;
        case 'habitos':
          return <MaterialCommunityIcons name="clipboard-list-outline" size={24} color="#4169E1" />;
        case 'loja':
          return <MaterialCommunityIcons name="cart" size={24} color="#4169E1" />;
        case 'pet':
          return <MaterialCommunityIcons name="paw" size={24} color="#4169E1" />;
      }
    }
  };

  const getTabLabel = (tab: TabName): string => {
    switch (tab) {
      case 'home': return 'Home';
      case 'atividades': return 'Atividades';
      case 'habitos': return 'Hábitos';
      case 'loja': return 'Loja';
      case 'pet': return 'Pet';
    }
  };

  // Login / Cadastro / Pet Inicial screens (no bottom nav)
  if (currentScreen === 'login') {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <Login
          onLogin={handleLogin}
          onIrCadastro={() => setCurrentScreen('cadastro')}
        />
      </View>
    );
  }

  if (currentScreen === 'cadastro') {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <Cadastro
          onCadastrar={handleCadastro}
          onIrLogin={() => setCurrentScreen('login')}
        />
      </View>
    );
  }

  if (currentScreen === 'petInicial') {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <PetInicial onSelecionar={handlePetSelecionado} />
      </View>
    );
  }

  // Main app with bottom navigation
  const tabs: TabName[] = ['home', 'atividades', 'habitos', 'loja', 'pet'];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {renderMainContent()}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={styles.navItem}
              onPress={() => handleTabPress(tab)}
            >
              <View style={[styles.navIconWrap, isActive && styles.navIconWrapActive]}>
                {renderTabIcon(tab, isActive)}
              </View>
              <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
                {getTabLabel(tab)}
              </Text>
            </TouchableOpacity>
          );
        })}
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
    backgroundColor: '#4169E1',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
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
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navIconWrapActive: {
    backgroundColor: '#4169E1',
  },
  navLabel: {
    fontSize: 10,
    color: '#9E9E9E',
    marginTop: 2,
  },
  navLabelActive: {
    color: '#4169E1',
    fontWeight: 'bold',
  },
});
