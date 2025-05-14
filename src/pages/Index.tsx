
import { Navigate } from 'react-router-dom';

export default function Index() {
  // In a real application, you would fetch the user's default or last visited workspace
  // and redirect them to that workspace instead of a hardcoded path
  return <Navigate to="/dashboard" replace />;
}
