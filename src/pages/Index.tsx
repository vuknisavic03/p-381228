
import { Navigate } from 'react-router-dom';

export default function Index() {
  // Redirect to the workspace picker so the user can select a workspace
  return <Navigate to="/" replace />;
}
