import { Patient } from "@/types/patient";
import { baseService } from "./base.service";

export const patientService = baseService.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getPatients: builder.query<Patient[], string | void>({
      query: (status) => ({
        url: "/patients",
        method: "GET",
        params: status && status !== "all" ? { status } : undefined,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Patients" as const, id })),
              { type: "Patients", id: "LIST" },
            ]
          : [{ type: "Patients", id: "LIST" }],
    }),

    getPatientById: builder.query<Patient, string>({
      query: (id) => ({
        url: `/patients/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Patients", id }],
    }),

    createPatient: builder.mutation<
      Patient,
      Omit<Patient, "id" | "consultationNotes">
    >({
      query: (body) => ({
        url: "/patients",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Patients", id: "LIST" }],
    }),

    updatePatient: builder.mutation<
      Patient,
      { id: string; data: Partial<Omit<Patient, "id" | "consultationNotes">> }
    >({
      query: ({ id, data }) => ({
        url: `/patients/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Patients", id },
        { type: "Patients", id: "LIST" },
      ],
    }),

    deletePatient: builder.mutation<void, string>({
      query: (id) => ({
        url: `/patients/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Patients", id: "LIST" }],
    }),
  }),
});

export const {
  useGetPatientsQuery,
  useGetPatientByIdQuery,
  useCreatePatientMutation,
  useUpdatePatientMutation,
  useDeletePatientMutation,
} = patientService;
