import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ArrowUp, ChevronDown, ChevronUp, MessageCircle, Plus, X } from 'lucide-react';
import './CalWidget.css';

const N8N_ENDPOINT = 'https://markdan.app.n8n.cloud/webhook/4928ed2a-47d2-4a2a-9e25-9fa6497869ed/chat';

const INITIAL_MESSAGE = `I'm Cal — the customer-care representative at Velocity Contents Lab.

I'm here to help with questions about our three service lines (content strategy, AI automation, and software engineering), our pricing and process, or to connect you with Thomax for a deeper conversation.

What can I help you with today?`;

const SUGGESTED_PROMPTS = [
  "What services do you offer?",
  "How much does an AI customer care agent cost?",
  "Can you automate WhatsApp replies for my business?",
  "Can I start with a small pilot project?",
  "How does your process work?",
  "Can I speak with Thomax?"
];

function generateSessionId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `cal-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function extractMessage(data: unknown): string {
  if (typeof data === 'string') return data.trim();
  if (!data || typeof data !== 'object') return '';
  const obj = data as Record<string, unknown>;
  const keys = ['output', 'text', 'response', 'message', 'answer', 'content'];
  for (const key of keys) {
    const val = obj[key];
    if (typeof val === 'string' && val.trim()) return val.trim();
  }
  for (const val of Object.values(obj)) {
    if (typeof val === 'string' && val.trim()) return val.trim();
    if (val && typeof val === 'object') {
      const nested = extractMessage(val);
      if (nested) return nested;
    }
  }
  return '';
}

interface Message {
  id: string;
  role: 'cal' | 'visitor' | 'system';
  text: string;
  createdAt: number;
}

interface CalWidgetProps {
  endpoint?: string;
  brandName?: string;
  initialMessage?: string;
  embedded?: boolean;
}

export function VMark({ small = false }: { small?: boolean }) {
  return (
    <span className={`v-mark ${small ? 'v-mark--small' : ''}`} aria-hidden="true">
      <img
        src="/favicon.svg"
        alt=""
        onError={(e) => {
          (e.currentTarget as HTMLElement).style.display = 'none';
        }}
      />
      <span className="v-mark-fallback">V</span>
    </span>
  );
}

export default function CalAssistant({
  endpoint = N8N_ENDPOINT,
  brandName = 'Velocity Contents Lab',
  initialMessage = INITIAL_MESSAGE,
  embedded = false
}: CalWidgetProps) {
  const [isOpen, setIsOpen] = useState(embedded);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [sessionId, setSessionId] = useState<string>(() => generateSessionId());
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: 'welcome',
      role: 'cal',
      text: initialMessage,
      createdAt: Date.now()
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const canSend = input.trim().length > 0 && !isThinking;
  const conversationCount = useMemo(
    () => messages.filter((m) => m.role === 'visitor').length,
    [messages]
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isThinking]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      const timer = window.setTimeout(() => inputRef.current?.focus(), 160);
      return () => window.clearTimeout(timer);
    }
  }, [isOpen, isMinimized]);

  // Global event listener to allow buttons to trigger the Magnus Cal widget
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setIsMinimized(false);
    };
    window.addEventListener('velocity-open-cal', handleOpen);
    return () => window.removeEventListener('velocity-open-cal', handleOpen);
  }, []);

  const openChat = () => {
    setIsOpen(true);
    setIsMinimized(false);
  };

  const closeChat = () => {
    if (!embedded) {
      setIsOpen(false);
    }
    setIsMinimized(false);
  };

  const startNewConversation = () => {
    if (isThinking) return;
    setSessionId(generateSessionId());
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'cal',
        text: INITIAL_MESSAGE,
        createdAt: Date.now()
      }
    ]);
    setInput('');
  };

  async function sendMessage(textOverride?: string) {
    const textToSend = (textOverride ?? input).trim();
    if (!textToSend || isThinking) return;

    setInput('');
    setMessages((prev) => [
      ...prev,
      {
        id: `visitor-${Date.now()}`,
        role: 'visitor',
        text: textToSend,
        createdAt: Date.now()
      }
    ]);
    setIsThinking(true);

    try {
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), 35000);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json, text/plain, */*'
        },
        body: JSON.stringify({
          action: 'sendMessage',
          chatInput: textToSend,
          sessionId: sessionId
        }),
        signal: controller.signal
      });

      window.clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`n8n responded with ${response.status}`);
      }

      const rawData = (response.headers.get('content-type') ?? '').includes('application/json')
        ? await response.json()
        : await response.text();

      const replyText = extractMessage(rawData);
      if (!replyText) {
        throw new Error('The response contained no message');
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `cal-${Date.now()}`,
          role: 'cal',
          text: replyText,
          createdAt: Date.now()
        }
      ]);
    } catch (err) {
      console.error('Cal chat request failed', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: 'system',
          text: 'Cal is temporarily unavailable. Please try again in a moment.',
          createdAt: Date.now()
        }
      ]);
    } finally {
      setIsThinking(false);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      className={embedded ? 'cal-widget-embedded' : 'cal-widget'}
      data-conversation-count={conversationCount}
    >
      {isOpen && !isMinimized && (
        <section
          className="cal-panel"
          aria-label="Cal customer care chat"
          role="dialog"
          aria-modal="false"
          style={
            embedded
              ? { width: '100%', maxWidth: '640px', margin: '0 auto', height: '580px' }
              : undefined
          }
        >
          <header className="cal-header">
            <div className="cal-header-brand">
              <VMark />
              <div>
                <div className="cal-name-row">
                  <span className="cal-name">CAL</span>
                  <span className="cal-status-dot" aria-label="Cal is online" />
                </div>
                <p>Customer Care · {brandName}</p>
              </div>
            </div>

            <div className="cal-header-actions">
              {!embedded && (
                <button
                  className="icon-button"
                  onClick={() => setIsMinimized(true)}
                  aria-label="Minimize Cal chat"
                  title="Minimize"
                >
                  <ChevronDown size={16} />
                </button>
              )}
              {!embedded && (
                <button
                  className="icon-button"
                  onClick={closeChat}
                  aria-label="Close Cal chat"
                  title="Close"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </header>

          <div className="cal-rule" />

          <div
            className="cal-conversation"
            aria-live="polite"
            aria-label="Conversation with Cal"
          >
            <div className="cal-intro-note">
              <span>VELOCITY CONTENTS LAB</span>
              <span>WHERE STRATEGY MEETS SOUL</span>
            </div>

            {messages.map((msg) => (
              <article
                key={msg.id}
                className={`cal-message cal-message--${msg.role}`}
              >
                {msg.role === 'cal' && (
                  <div className="message-mark">
                    <VMark small />
                  </div>
                )}
                <div className="message-body">
                  {msg.text.split('\n').map((line, idx, arr) => (
                    <span key={`${msg.id}-${idx}`}>
                      {line}
                      {idx < arr.length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </article>
            ))}

            {messages.length === 1 && !isThinking && (
              <div className="prompt-stack" aria-label="Suggested questions">
                <p className="prompt-label">START WITH A QUESTION</p>
                {SUGGESTED_PROMPTS.map((prompt, idx) => (
                  <button
                    key={prompt}
                    className="prompt-chip"
                    style={{ '--delay': `${idx * 35}ms` } as React.CSSProperties}
                    onClick={() => void sendMessage(prompt)}
                  >
                    <span>{prompt}</span>
                    <ArrowUp size={13} />
                  </button>
                ))}
              </div>
            )}

            {isThinking && (
              <div className="cal-message cal-message--cal cal-typing">
                <div className="message-mark">
                  <VMark small />
                </div>
                <div className="message-body">
                  <span>Cal is thinking</span>
                  <span className="typing-dots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="cal-composer-wrap">
            <form className="cal-composer" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="cal-message-input">
                Ask Cal anything
              </label>
              <input
                ref={inputRef}
                id="cal-message-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Cal anything..."
                disabled={isThinking}
                autoComplete="off"
              />
              <button
                className="send-button"
                type="submit"
                disabled={!canSend}
                aria-label="Send message"
              >
                <ArrowUp size={17} />
              </button>
            </form>
            <div className="composer-footer">
              <span>Cal is connected to the Velocity team.</span>
              <button
                type="button"
                onClick={startNewConversation}
                disabled={isThinking}
              >
                <Plus size={12} />
                <span>New conversation</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {isOpen && isMinimized && (
        <button
          className="minimized-bar"
          onClick={() => setIsMinimized(false)}
          aria-label="Reopen Cal chat"
        >
          <VMark small />
          <span>CAL</span>
          <ChevronUp size={15} />
        </button>
      )}

      {!isOpen && (
        <button
          className="cal-launcher"
          onClick={openChat}
          aria-label="Open Cal customer care chat"
        >
          <span className="launcher-mark">
            <VMark small />
          </span>
          <span className="launcher-copy">
            <strong>Ask Cal</strong>
            <small>Velocity Contents Lab</small>
          </span>
          <MessageCircle size={17} />
        </button>
      )}
    </div>
  );
}
