import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { PageHeader } from '@/components/ui/PageHeader';

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <PageHeader title="Profile" />

      <ScrollView className="flex-1 px-5 py-6">
        <View className="items-center justify-center py-20">
          <Ionicons name="person-outline" size={64} color="#00BFA6" />
          <Text className="text-lg font-semibold text-gray-900 mt-4">Your Profile</Text>
          <Text className="text-sm text-gray-500 mt-2 text-center">
            Manage your account settings and preferences
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
