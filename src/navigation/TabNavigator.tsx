import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, PiggyBank, Calculator, Stethoscope, User } from 'lucide-react-native';
import DashboardScreen from '../screens/DashboardScreen';
import PigsScreen from '../screens/PigsScreen';
import PoultryScreen from '../screens/PoultryScreen';
import CattleScreen from '../screens/CattleScreen';
import VetScreen from '../screens/VetScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FeedCalculatorScreen from '../screens/FeedCalculatorScreen';
import { colors } from '../theme';

const Tab = createBottomTabNavigator();
const AnimalStack = createNativeStackNavigator();

function AnimalsStackNavigator() {
  return (
    <AnimalStack.Navigator screenOptions={{ headerShown: false }}>
      <AnimalStack.Screen name="Pigs" component={PigsScreen} />
      <AnimalStack.Screen name="Poultry" component={PoultryScreen} />
      <AnimalStack.Screen name="Cattle" component={CattleScreen} />
    </AnimalStack.Navigator>
  );
}

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.backgroundCard,
          borderTopColor: colors.borderSubtle,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} strokeWidth={2} />,
        }}
      />
      <Tab.Screen
        name="Animals"
        component={AnimalsStackNavigator}
        options={{
          tabBarLabel: 'Élevage',
          tabBarIcon: ({ color, size }) => <PiggyBank size={size} color={color} strokeWidth={2} />,
        }}
      />
      <Tab.Screen
        name="Calculator"
        component={FeedCalculatorScreen}
        options={{
          tabBarLabel: 'Aliments',
          tabBarIcon: ({ color, size }) => <Calculator size={size} color={color} strokeWidth={2} />,
        }}
      />
      <Tab.Screen
        name="Vet"
        component={VetScreen}
        options={{
          tabBarLabel: 'Véto IA',
          tabBarIcon: ({ color, size }) => <Stethoscope size={size} color={color} strokeWidth={2} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} strokeWidth={2} />,
        }}
      />
    </Tab.Navigator>
  );
}
