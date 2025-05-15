import { ApiResponse, EventResponse } from "../components/table/apiResponse";

export const mockEvents: ApiResponse<EventResponse[]> = {
  data: [
    {
      id: "evt-001",
      event_name: "Workshop Teknologi 2023",
      contact_person_phone: "+6281234567890",
      status: "Aktif"
    },
    {
      id: "evt-002",
      event_name: "Seminar Pendidikan",
      contact_person_phone: "+6287654321098",
      status: "Selesai"
    },
    {
      id: "evt-003",
      event_name: "Konferensi Tahunan",
      contact_person_phone: "+6289876543210",
      status: "Tertunda"
    }
  ],
  code: 200,
  error: false,
  message: "Data berhasil diambil"
};