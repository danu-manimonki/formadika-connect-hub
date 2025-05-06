
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useEventDetail } from "@/components/events/useEventDetail";
import { EventDetailContainer } from "@/components/events/EventDetailContainer";

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const { event, eventLoading, isRegistered, currentUser, refetchRegistration } = useEventDetail(id);

  if (eventLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-center">
            <div className="text-xl">Memuat informasi event...</div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!event) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Event tidak ditemukan</h1>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <EventDetailContainer
        event={event}
        isRegistered={!!isRegistered}
        user={currentUser}
        refetchRegistration={refetchRegistration}
      />
    </Layout>
  );
}
