import React from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Patient } from '@/types/patient';
import { Button } from './ui/Button';

interface ConsultationNotesModalProps {
  visible: boolean;
  patient: Patient | null;
  onClose: () => void;
}

export function ConsultationNotesModal({ visible, patient, onClose }: ConsultationNotesModalProps) {
  if (!patient) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white rounded-t-[20px] max-h-[80%]">
          {/* Header */}
          <View className="px-5 py-4 border-b border-gray-100">
            <Text className="text-lg font-semibold text-gray-900 text-center">
              Consultation notes
            </Text>
            <TouchableOpacity
              onPress={onClose}
              className="absolute right-5 top-4"
            >
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Notes List */}
          <ScrollView className="px-5 py-4">
            {patient.consultationNotes.map((note) => (
              <View key={note.id} className="mb-4 pb-4 border-b border-gray-100">
                <Text className="text-base font-semibold text-gray-900 mb-2">
                  {note.title}
                </Text>
                <Text className="text-sm text-gray-600 leading-5 mb-3">
                  {note.description}
                </Text>
                <View className="flex-row items-center mb-3">
                  <Ionicons name="calendar-outline" size={16} color="#00BFA6" />
                  <Text className="text-xs text-gray-500 ml-1">{note.date}</Text>
                </View>
                <Button
                  title="View Full Note"
                  variant="outline"
                  onPress={() => { }}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
