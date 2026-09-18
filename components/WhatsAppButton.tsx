import { whatsappLink } from "@/lib/site";
import { ChatIcon } from "./icons";

export default function WhatsAppButton({
  message,
  label = "Chat on WhatsApp",
  className = "",
}: {
  message?: string;
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-oak px-6 py-3 font-medium text-white transition-colors hover:bg-oak-deep ${className}`}
    >
      <ChatIcon />
      {label}
    </a>
  );
}

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-4 bottom-4 z-50 flex size-14 items-center justify-center rounded-full bg-oak text-white shadow-lg transition-colors hover:bg-oak-deep md:right-6 md:bottom-6"
    >
      <ChatIcon className="size-6" />
    </a>
  );
}
