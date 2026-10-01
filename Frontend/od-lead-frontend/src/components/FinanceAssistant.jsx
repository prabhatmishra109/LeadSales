import { useState } from "react";
import axios from "axios";

export default function FinanceAssistant() {

  const [isOpen, setIsOpen] = useState(false);

  const [question, setQuestion] = useState("");

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "assistant",
      text: "Hello! 👋 Main Finance Assistant hoon. Aap OD ya Personal Loan ke baare mein koi bhi question pooch sakte hain."
    }
  ]);

  const sendMessage = async () => {

    if (!question.trim() || loading) {
      return;
    }

    const userQuestion = question.trim();

    setMessages((previous) => [
      ...previous,
      {
        sender: "user",
        text: userQuestion
      }
    ]);

    setQuestion("");
    setLoading(true);

    try {

      const response = await axios.post(
        "http://localhost:8080/api/assistant/ask",
        {
          question: userQuestion
        }
      );

      setMessages((previous) => [
        ...previous,
        {
          sender: "assistant",
          text: response.data.answer
        }
      ]);

    } catch (error) {

      console.error(error);

      setMessages((previous) => [
        ...previous,
        {
          sender: "assistant",
          text: "Sorry, abhi assistant se connection nahi ho pa raha. Please try again."
        }
      ]);

    } finally {

      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {

    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}

      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          right: "25px",
          bottom: "25px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          border: "none",
          background: "#2563eb",
          color: "white",
          fontSize: "25px",
          cursor: "pointer",
          zIndex: 9999
        }}
      >
        💬
      </button>

      {/* Chat Box */}

      {isOpen && (

        <div
          style={{
            position: "fixed",
            right: "25px",
            bottom: "95px",
            width: "360px",
            maxWidth: "calc(100vw - 40px)",
            height: "500px",
            background: "white",
            borderRadius: "15px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 9998
          }}
        >

          {/* Header */}

          <div
            style={{
              background: "#2563eb",
              color: "white",
              padding: "15px"
            }}
          >
            <strong>
              Finance Assistant
            </strong>

            <div
              style={{
                fontSize: "12px",
                marginTop: "4px"
              }}
            >
              OD & Personal Loan Support
            </div>
          </div>

          {/* Messages */}

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "15px",
              background: "#f8fafc"
            }}
          >

            {messages.map((message, index) => (

              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent:
                    message.sender === "user"
                      ? "flex-end"
                      : "flex-start",
                  marginBottom: "10px"
                }}
              >

                <div
                  style={{
                    maxWidth: "80%",
                    padding: "10px 12px",
                    borderRadius: "12px",
                    background:
                      message.sender === "user"
                        ? "#2563eb"
                        : "white",
                    color:
                      message.sender === "user"
                        ? "white"
                        : "#111827",
                    fontSize: "14px",
                    lineHeight: "1.5"
                  }}
                >
                  {message.text}
                </div>

              </div>

            ))}

            {loading && (
              <div
                style={{
                  fontSize: "13px",
                  color: "#6b7280"
                }}
              >
                Assistant is typing...
              </div>
            )}

          </div>

          {/* Input */}

          <div
            style={{
              display: "flex",
              gap: "8px",
              padding: "10px",
              borderTop: "1px solid #e5e7eb"
            }}
          >

            <input
              type="text"
              placeholder="Ask about OD or Personal Loan..."
              value={question}
              onChange={(event) =>
                setQuestion(event.target.value)
              }
              onKeyDown={handleKeyDown}
              style={{
                flex: 1,
                padding: "10px",
                border: "1px solid #d1d5db",
                borderRadius: "8px"
              }}
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              style={{
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "10px 14px",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              Send
            </button>

          </div>

        </div>
      )}
    </>
  );
}