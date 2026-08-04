"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

const SUGGESTIONS = [
  "¿Qué áreas atiende Lexflex?",
  "Tengo un problema con una entidad pública",
  "¿Cómo agendo una consulta?",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onError: (err) => setError(err.message || "No pudimos responder en este momento."),
  });

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, status]);

  useEffect(() => {
    if (open && !busy) inputRef.current?.focus();
  }, [open, busy]);

  function submit(text: string) {
    const value = text.trim();
    if (!value || busy) return;
    setError(null);
    setInput("");
    void sendMessage({ text: value });
  }

  return (
    <>
      <button
        className={"chat-launcher " + (open ? "is-open" : "")}
        onClick={() => setOpen(!open)}
        aria-label={open ? "Cerrar asistente Lexflex" : "Abrir asistente Lexflex"}
        aria-expanded={open}
      >
        <Icon name={open ? "close" : "shield"} size={22} />
        <span>Asistente Lexflex</span>
      </button>

      <section className={"chat-panel " + (open ? "open" : "")} aria-label="Asistente virtual de Lexflex">
        <header className="chat-head">
          <div>
            <strong>Asistente Lexflex</strong>
            <span>Orientación legal preliminar · IA</span>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Cerrar asistente"><Icon name="close" size={18} /></button>
        </header>

        <div className="chat-log" ref={listRef}>
          {messages.length === 0 && (
            <div className="chat-empty">
              <p>Cuéntenos brevemente su situación. Le orientamos sobre el área y los siguientes pasos.</p>
              <div className="chat-suggestions">
                {SUGGESTIONS.map((item) => (
                  <button key={item} onClick={() => submit(item)}>{item}</button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message) => {
            const text = message.parts
              .map((part) => (part.type === "text" ? part.text : ""))
              .join("");
            if (!text) return null;
            return (
              <div key={message.id} className={"chat-msg " + message.role}>
                {text}
              </div>
            );
          })}

          {status === "submitted" && <div className="chat-msg assistant chat-typing">Escribiendo…</div>}
          {error && <p className="chat-error" role="alert">{error}</p>}
        </div>

        <form
          className="chat-form"
          onSubmit={(event) => {
            event.preventDefault();
            submit(input);
          }}
        >
          <textarea
            ref={inputRef}
            value={input}
            rows={1}
            placeholder="Escriba su consulta…"
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                submit(input);
              }
            }}
          />
          <button type="submit" disabled={busy || !input.trim()} aria-label="Enviar consulta">
            <Icon name="arrow" size={18} />
          </button>
        </form>
        <p className="chat-note">Orientación general. No sustituye asesoría legal para un caso concreto.</p>
      </section>
    </>
  );
}
