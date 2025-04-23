
import { Suspense, lazy } from 'react';
import { Loader2 } from 'lucide-react';

// Lazy load dashboard components
const OverviewSection = lazy(() => import('./sections/OverviewSection'));
const CommitteeSection = lazy(() => import('./sections/CommitteeSection'));
const EventsSection = lazy(() => import('./sections/EventsSection'));
const GallerySection = lazy(() => import('./sections/GallerySection'));
const MembersSection = lazy(() => import('./sections/MembersSection'));
const ArticlesSection = lazy(() => import('./sections/ArticlesSection'));
const MessagesSection = lazy(() => import('./sections/MessagesSection'));
const DonationsSection = lazy(() => import('./sections/DonationsSection'));
const ProfileSection = lazy(() => import('./sections/ProfileSection'));

interface DashboardContentProps {
  activeSection: string;
}

const LoadingFallback = () => (
  <div className="h-full w-full flex items-center justify-center">
    <Loader2 className="h-6 w-6 animate-spin text-primary" />
    <span className="ml-2">Memuat konten...</span>
  </div>
);

export default function DashboardContent({ activeSection }: DashboardContentProps) {
  return (
    <div className="flex-1 overflow-auto p-6">
      <Suspense fallback={<LoadingFallback />}>
        {activeSection === 'overview' && <OverviewSection />}
        {activeSection === 'committee' && <CommitteeSection />}
        {activeSection === 'events' && <EventsSection />}
        {activeSection === 'gallery' && <GallerySection />}
        {activeSection === 'members' && <MembersSection />}
        {activeSection === 'articles' && <ArticlesSection />}
        {activeSection === 'messages' && <MessagesSection />}
        {activeSection === 'donations' && <DonationsSection />}
        {activeSection === 'profile' && <ProfileSection />}
      </Suspense>
    </div>
  );
}
