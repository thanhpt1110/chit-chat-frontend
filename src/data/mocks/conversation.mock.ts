import { useAppSelector } from "../../hooks/reduxHooks";
import { ConversationDTO } from "../../types/data.type";
import { GlobalState } from "../global/global.slice";

function generateRealisticMessage(length: number): string {
  const words = [
    "hello",
    "hi",
    "how",
    "are",
    "you",
    "what",
    "is",
    "your",
    "name",
    "I'm",
    "good",
    "thanks",
    "and",
    "you?",
    "see",
    "you",
    "later",
    "yes",
    "no",
    "maybe",
    "sure",
    "why",
    "not",
    "that's",
    "great",
    "okay",
    "fine",
    "let's",
    "do",
    "it",
    "tomorrow",
    "today",
    "morning",
    "afternoon",
    "night",
    "goodbye",
    "please",
    "thank",
    "welcome",
    "sorry",
  ];
  return Array.from(
    { length },
    () => words[Math.floor(Math.random() * words.length)]
  ).join(" ");
}

export function generateConversationDataRealistic(
  numMessages: number
): ConversationDTO[] {
  const { userInfo }: GlobalState = useAppSelector((state) => state.global);
  const conversationData: ConversationDTO[] = [];
  const senderIds = [userInfo.userId, "2"]; // Mock sender IDs
  const baseTime = Date.now();

  for (let i = 0; i < numMessages; i++) {
    const senderId = senderIds[Math.floor(Math.random() * senderIds.length)];
    const messageLength = Math.floor(Math.random() * 18) + 3; // Length between 3 and 20
    const content = generateRealisticMessage(messageLength);
    const time = baseTime + i * Math.floor(Math.random() * 5000 + 10000); // Random 10-15 seconds gap

    conversationData.push({
      senderId: senderId,
      message: {
        messageId: (i + 1).toString(),
        content: content,
        time: time,
      },
    });
  }

  return conversationData;
}
