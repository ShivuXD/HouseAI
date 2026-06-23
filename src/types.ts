export type Sender = "user" | "house";

export interface ChatMessage {
  id: string;
  sender: Sender;
  text: string;
  timestamp: number;
}

export interface CaseNote {
  id: string;
  label: string;
  detail: string;
  severity: "low" | "moderate" | "high";
}
