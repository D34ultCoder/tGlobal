import React from 'react';
import { View, Text, TouchableOpacity, Image, Linking, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Patient } from '@/types/patient';
import { Button } from './ui/Button';

interface PatientCardProps {
  patient: Patient;
  isExpanded: boolean;
  onToggle: () => void;
  onConsultationNotesPress: () => void;
}

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export function PatientCard({ patient, isExpanded, onToggle, onConsultationNotesPress }: PatientCardProps) {
  const handleToggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onToggle();
  };

  return (
    <View className="border-b border-gray-100">
      {/* Patient Header */}
      <TouchableOpacity
        onPress={handleToggle}
        className="flex-row items-center py-4"
      >
        <Image
          source={{ uri: patient.avatar }}
          className="w-12 h-12 rounded-full"
        />
        <View className="flex-1 ml-4">
          <Text className="text-base font-semibold text-gray-900">
            {patient.name}
          </Text>
          <Text className="text-sm text-gray-500 mt-0.5">
            {patient.gender} • Age-{patient.age}
          </Text>
        </View>
        <Ionicons
          name={isExpanded ? "chevron-up" : "chevron-forward"}
          size={20}
          color="#9CA3AF"
        />
      </TouchableOpacity>

      {/* Expanded Patient Details */}
      {isExpanded && (
        <View className="pb-4 px-2">
          {/* Appointments */}
          <View className="flex-row gap-2 mb-4">
            <View className="flex-1 p-2 rounded-[8px] bg-[#F2F5F8]">
              <View className="flex-row items-center mb-1">
                <Ionicons name="calendar-outline" size={16} color="#00BFA6" />
                <Text className="text-xs text-gray-600 ml-1">Last appointment</Text>
              </View>
              <Text className="text-sm font-medium text-gray-900">
                {patient.lastAppointment}
              </Text>
            </View>
            <View className="flex-1 p-2 rounded-[8px] bg-[#F2F5F8]">
              <View className="flex-row items-center mb-1">
                <Ionicons name="time-outline" size={16} color="#00BFA6" />
                <Text className="text-xs text-gray-600 ml-1">Upcoming</Text>
              </View>
              <Text className="text-sm font-medium text-gray-900">
                {patient.upcomingAppointment}
              </Text>
            </View>
          </View>

          {/* Contact Information */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-900 mb-2">
              Contact Information
            </Text>
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${patient.phone}`)}
              className="flex-row items-center mb-2"
            >
              <Ionicons name="call-outline" size={18} color="#6B7280" />
              <Text className="text-sm text-gray-700 ml-2">{patient.phone}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL(`mailto:${patient.email}`)}
              className="flex-row items-center"
            >
              <Ionicons name="mail-outline" size={18} color="#6B7280" />
              <Text className="text-sm text-gray-700 ml-2">{patient.email}</Text>
            </TouchableOpacity>
          </View>

          {/* Action Buttons */}
          <View className="flex-row">
            <Button
              title="View profile"
              variant="outline"
              className="flex-1 mr-2"
              onPress={() => { }}
            />
            <Button
              title="Consultation Notes"
              variant="primary"
              className="flex-1 ml-2"
              onPress={onConsultationNotesPress}
            />
          </View>
        </View>
      )}
    </View>
  );
}
