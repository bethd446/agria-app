import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/DashboardScreen';
import PigsScreen from '../screens/PigsScreen';
import FichesScreen from '../screens/FichesScreen';
import VetScreen from '../screens/VetScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { colors } from '../theme';

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.cardBackground,
          borderTopColor: colors.border.default,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color }) => <span style={{ fontSize: 20 }}>🏠</span>,
        }}
      />
      <Tab.Screen
        name="Pigs"
        component={PigsScreen}
        options={{
          tabBarLabel: 'Porcs',
          tabBarIcon: ({ color }) => <span style={{ fontSize: 20 }}>🐷</span>,
        }}
      />
      <Tab.Screen
        name="Fiches"
        component={FichesScreen}
        options={{
          tabBarLabel: 'Fiches',
          tabBarIcon: ({ color }) => <span style={{ fontSize: 20 }}>📋</span>,
        }}
      />
      <Tab.Screen
        name="Vet"
        component={VetScreen}
        options={{
          tabBarLabel: 'Vétérinaire',
          tabBarIcon: ({ color }) => <span style={{ fontSize: 20 }}>🩺</span>,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color }) => <span style={{ fontSize: 20 }}>👤</span>,
        }}
      />
    </Tab.Navigator>
  );
}
