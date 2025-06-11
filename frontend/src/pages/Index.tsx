
import { WorkspaceList } from "@/components/workspace/WorkspaceList";

function Index() {
  return (
    <div className="min-h-screen bg-white flex">
      <WorkspaceList />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Welcome to Square Accounting</h1>
          <p className="text-lg text-gray-600">Choose a workspace to get started</p>
        </div>
      </div>
    </div>
  );
}

export default Index;
