import { PageTitle } from "@/components/shared/page-title";

import { ChatPanel } from "@/components/chat/chat-panel";

export default function ChatPage() {
  return (
    <div className="space-y-6 page-enter">
      <PageTitle
        title="AI Chat + RAG"
        subtitle="Static retrieval output, fixed synthesis, and deterministic knowledge memory updates"
      />
      <ChatPanel />
    </div>
  );
}
