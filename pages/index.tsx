import BroadcastMapView from '@/components/views/BroadcastMapView/BroadcastMapView';
import SplashScreenView from '@/components/views/SplashScreenView/SplashScreenView';
import { useAuthorityStore } from '@/lib/stores/authorityStore';

export default function HomePage() {
  const loggedInAuthorityId = useAuthorityStore((state) => state.loggedInAuthorityId);

  return <>{loggedInAuthorityId === null ? <SplashScreenView /> : <BroadcastMapView />}</>;
}
