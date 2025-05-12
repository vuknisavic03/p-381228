
import { useNavigate } from 'react-router-dom';
import { Overview } from '@/components/dashboard/Overview';

export default function Index() {
  const navigate = useNavigate();
  return <Overview />;
}
