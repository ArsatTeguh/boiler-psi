import EventsTable from "@/components/table/tableWithAction";
import { mockEvents } from "@/mocks/events-mock";

export default function SettingPage() {
    return <EventsTable events={mockEvents} />
}
