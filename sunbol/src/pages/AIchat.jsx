import { useEffect, useRef, useState } from "react";

const suggestions = [
  {
    icon: "🌱",
    title: "Analyze my soil",
    description: "Understand soil health and nutrient levels.",
    prompt: "How can I analyze my soil health?",
  },
  {
    icon: "💧",
    title: "Smart irrigation",
    description: "Get advice about watering your crops.",
    prompt: "How can I improve my irrigation system?",
  },
  {
    icon: "🧪",
    title: "NPK nutrients",
    description: "Learn about nitrogen, phosphorus and potassium.",
    prompt: "Explain NPK levels and how to improve them.",
  },
  {
    icon: "🌾",
    title: "Farming advice",
    description: "Get practical tips for healthier crops.",
    prompt: "Give me some tips to improve crop growth.",
  },
];

function AIChat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello! I'm SANBOL AI, your smart agricultural assistant. 🌱\n\nI can help you understand soil analysis, irrigation, fertilizers, and crop health. What would you like to know today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (customMessage) => {
    const message = (customMessage ?? input).trim();

    if (!message || loading) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: message },
      { role: "assistant", text: "" },
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = "SANBOL AI is temporarily unavailable.";

        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }

        throw new Error(errorMessage);
      }

      if (!response.body) {
        throw new Error("Streaming is not supported by this browser.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      const processLine = (line) => {
        if (!line.trim()) return;

        const data = JSON.parse(line);

        if (data.error) {
          throw new Error(data.error);
        }

        if (data.text) {
          setMessages((prev) =>
            prev.map((item, index) =>
              index === prev.length - 1
                ? { ...item, text: item.text + data.text }
                : item,
            ),
          );
        }
      };

      while (true) {
        const { value, done } = await reader.read();

        buffer += decoder.decode(value || new Uint8Array(), {
          stream: !done,
        });

        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          processLine(line);
        }

        if (done) break;
      }

      if (buffer.trim()) {
        processLine(buffer);
      }
    } catch (error) {
      console.error("Chat Error:", error);

      setMessages((prev) =>
        prev.map((item, index) =>
          index === prev.length - 1
            ? { ...item, text: `Sorry, something went wrong: ${error.message}` }
            : item,
        ),
      );
    } finally {
      setLoading(false);
      textareaRef.current?.focus();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const isWelcome = messages.length === 1;

  return (
    <div className="sanbol-ai-page">
      <header className="ai-top-header">
        <div className="ai-title-group">
          <div className="ai-main-logo">🌿</div>
          <div>
            <h1>
              SANBOL <span>AI</span>
            </h1>
            <p>Your intelligent agricultural companion</p>
          </div>
        </div>

        <div className="ai-online-status">
          <span className="online-dot"></span>
          AI Assistant
        </div>
      </header>

      <main className="ai-workspace">
        <div className="ai-chat-area">
          {isWelcome && (
            <div className="ai-welcome">
              <div className="ai-welcome-orbit">
                <div className="ai-welcome-icon">🌱</div>
                <span className="orbit orbit-one"></span>
                <span className="orbit orbit-two"></span>
              </div>

              <span className="ai-welcome-label">
                SMART AGRICULTURE ASSISTANT
              </span>

              <h2>
                Growing smarter,
                <br />
                <span>with SANBOL AI.</span>
              </h2>

              <p className="ai-welcome-description">
                Your personal AI assistant for smarter farming. Ask questions,
                understand your soil, and discover better ways to care for your
                crops.
              </p>

              <div className="ai-suggestions">
                {suggestions.map((item) => (
                  <button
                    className="ai-suggestion-card"
                    key={item.title}
                    onClick={() => sendMessage(item.prompt)}
                    disabled={loading}
                  >
                    <span className="suggestion-icon">{item.icon}</span>
                    <span className="suggestion-content">
                      <strong>{item.title}</strong>
                      <small>{item.description}</small>
                    </span>
                    <span className="suggestion-arrow">↗</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {!isWelcome && (
            <div className="ai-conversation">
              <div className="conversation-heading">
                <div>
                  <span className="conversation-label">CONVERSATION</span>
                  <h2>Let's talk agriculture.</h2>
                </div>
                <span className="conversation-count">
                  {messages.length - 1} messages
                </span>
              </div>

              {messages.slice(1).map((message, index) => (
                <div key={index} className={`ai-message-row ${message.role}`}>
                  {message.role === "assistant" && (
                    <div className="ai-avatar">🌿</div>
                  )}

                  <div className="ai-message-content">
                    <span className="ai-message-name">
                      {message.role === "user" ? "You" : "SANBOL AI"}
                    </span>

                    <div className="ai-message-bubble">
                      {message.text ? (
                        message.text
                      ) : (
                        <span className="ai-typing">
                          <i></i>
                          <i></i>
                          <i></i>
                          <small>Thinking...</small>
                        </span>
                      )}
                    </div>
                  </div>

                  {message.role === "user" && (
                    <div className="user-avatar">You</div>
                  )}
                </div>
              ))}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="ai-composer-wrapper">
          <div className="ai-composer">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask SANBOL AI anything about farming..."
              rows={2}
              disabled={loading}
            />

            <div className="ai-composer-bottom">
              <span className="ai-input-hint">
                <span>↵</span> Enter to send · Shift + Enter for new line
              </span>

              <button
                className="ai-send-button"
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                aria-label="Send message"
              >
                {loading ? (
                  <span className="send-loading">•••</span>
                ) : (
                  <>
                    Send <span>➤</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <p className="ai-disclaimer">
            SANBOL AI can make mistakes. Always verify important agricultural
            decisions.
          </p>
        </div>
      </main>
    </div>
  );
}

export default AIChat;
