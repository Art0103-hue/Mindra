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

  // Handle login
  const handleLogin = () => {
    if (usuario.petSelecionado) {
      setCurrentScreen('main');
    } else {
      setCurrentScreen('petInicial');
    }
  };

  // Handle cadastro
  const handleCadastro = () => {
    setCurrentScreen('petInicial');
  };

  // Handle pet selection
  const handlePetSelecionado = () => {
    setCurrentScreen('main');
  };

  // Handle logout
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
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {renderMainContent()}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleTabPress('home')}
        >
          <View style={[styles.navIconWrap, activeTab === 'home' && styles.navIconWrapActive]}>
            <Text style={styles.navIcon}>🏠</Text>
          </View>
          <Text style={[styles.navLabel, activeTab === 'home' && styles.navLabelActive]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleTabPress('atividades')}
        >
          <View style={[styles.navIconWrap, activeTab === 'atividades' && styles.navIconWrapActive]}>
            <Text style={styles.navIcon}>📓</Text>
          </View>
          <Text style={[styles.navLabel, activeTab === 'atividades' && styles.navLabelActive]}>Atividades</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleTabPress('habitos')}
        >
          <View style={[styles.navIconWrap, activeTab === 'habitos' && styles.navIconWrapActive]}>
            <Text style={styles.navIcon}>📋</Text>
          </View>
          <Text style={[styles.navLabel, activeTab === 'habitos' && styles.navLabelActive]}>Hábitos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleTabPress('loja')}
        >
          <View style={[styles.navIconWrap, activeTab === 'loja' && styles.navIconWrapActive]}>
            <Text style={styles.navIcon}>🛒</Text>
          </View>
          <Text style={[styles.navLabel, activeTab === 'loja' && styles.navLabelActive]}>Loja</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleTabPress('pet')}
        >
          <View style={[styles.navIconWrap, activeTab === 'pet' && styles.navIconWrapActive]}>
            <Text style={styles.navIcon}>🐾</Text>
          </View>
          <Text style={[styles.navLabel, activeTab === 'pet' && styles.navLabelActive]}>Pet</Text>
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
    paddingVertical: 6,
    paddingBottom: 16,
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
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navIconWrapActive: {
    backgroundColor: '#E3F2FD',
  },
  navIcon: {
    fontSize: 20,
  },
  navLabel: {
    fontSize: 10,
    color: '#9E9E9E',
    marginTop: 2,
  },
  navLabelActive: {
    color: '#1A3A6E',
    fontWeight: 'bold',
  },
});
