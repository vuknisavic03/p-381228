
import { useNavigate } from 'react-router-dom';
import WorkspacePicker from "@/pages/workspace/WorkspacePicker";

export default function Index() {
  const navigate = useNavigate();
  return <WorkspacePicker />;
}
