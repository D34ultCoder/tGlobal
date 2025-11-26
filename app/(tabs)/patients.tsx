import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { PATIENTS } from '@/data/patients';
import { PatientFilter } from '@/types/patient';
import { TabFilter } from '@/components/ui/TabFilter';
import { PatientCard } from '@/components/PatientCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { ConsultationNotesModal } from '@/components/ConsultationNotesModal';
import { Patient } from '@/types/patient';

export default function PatientsScreen() {
  const [activeFilter, setActiveFilter] = useState<PatientFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedPatientId, setExpandedPatientId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const filteredPatients = PATIENTS.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || patient.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

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

      {/* Filter Tabs */}
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

      {/* Patient List */}
      <ScrollView className="flex-1 px-5">
        {filteredPatients.length > 0 ? (
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

      {/* Consultation Notes Modal */}
      <ConsultationNotesModal
        visible={modalVisible}
        patient={selectedPatient}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}
