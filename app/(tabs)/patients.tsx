import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { PatientFilter, Patient } from '@/types/patient';
import { TabFilter } from '@/components/ui/TabFilter';
import { PatientCard } from '@/components/PatientCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { ConsultationNotesModal } from '@/components/ConsultationNotesModal';
import { useGetPatientsQuery } from '@/store/services/patient.service';

export default function PatientsScreen() {
  const [activeFilter, setActiveFilter] = useState<PatientFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedPatientId, setExpandedPatientId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);


  const { data: patients = [], isLoading, error } = useGetPatientsQuery(activeFilter);



  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const togglePatientExpansion = (patientId: string) => {
    setExpandedPatientId(expandedPatientId === patientId ? null : patientId);
  };

  const handleConsultationNotesPress = (patient: Patient) => {
    setSelectedPatient(patient);
    setModalVisible(true);
  };

  const filterTabs = [
    { id: 'all', label: 'All patients' },
    { id: 'active', label: 'Active' },
    { id: 'pending', label: 'Pending' },
    { id: 'past', label: 'Past' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <PageHeader title="Patients" />

      <TabFilter
        tabs={filterTabs}
        activeTab={activeFilter}
        onTabChange={(id) => setActiveFilter(id as PatientFilter)}
        className="px-5 py-4"
      />

      {/* Search Bar */}
      <View className="px-5 py-4">
        <View className="flex-row border border-[#CBD5E1] items-center bg-[#FFFFFF] rounded-[8px] py-0.5 px-3">
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            className="flex-1 ml-2 text-base text-gray-900"
            placeholder="Search by patient"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView className="flex-1 px-5">
        {isLoading ? (
          <View className="flex-1 items-center justify-center py-20">
            <ActivityIndicator size="large" color="#00BFA6" />
            <Text className="text-gray-500 mt-4">Loading patients...</Text>
          </View>
        ) : error ? (
          <EmptyState
            title="Error loading patients"
            description="Unable to fetch patients. Please check your connection and try again."
            icon="alert-circle-outline"
          />
        ) : filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              isExpanded={expandedPatientId === patient.id}
              onToggle={() => togglePatientExpansion(patient.id)}
              onConsultationNotesPress={() => handleConsultationNotesPress(patient)}
            />
          ))
        ) : (
          <EmptyState
            title="No patients found"
            description={
              searchQuery
                ? `No patients matching "${searchQuery}"`
                : "There are no patients in this category yet."
            }
            icon="people-outline"
          />
        )}
      </ScrollView>

      <ConsultationNotesModal
        visible={modalVisible}
        patient={selectedPatient}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}
