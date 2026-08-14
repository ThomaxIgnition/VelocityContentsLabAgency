/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  ArrowUpRight, 
  Calendar, 
  HelpCircle, 
  Minimize2, 
  Maximize2,
  RefreshCw,
  Clock,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ChatMessage } from '../../types.ts';
import { SERVICES, FRAMEWORKS, ORIGIN_STORY_TEXT } from '../../data.ts';

const N8N_WEBHOOK_URL = 'https://thomax4chelsea.app.n8n.cloud/webhook/4928ed2a-47d2-4a2a-9e25-9fa6497869ed/chat';

interface CalAssistantProps {
  embedded?: boolean;
  isOpenExternal?: boolean;
  onCloseExternal?: () => void;
}

const INITIAL_SUGGESTIONS = [
  'What is The Velocity Method?',
  'How does the 65-minute workflow work?',
  'What are your retainer prices?',
  'Tell me the Lemonade Stand story',
  'How do I book a 15-minute diagnostic call?'
];

// Fallback intelligence engine with knowledge of Velocity Contents Lab
function generateLocalCalResponse(query: string): { text: string; actions?: ChatMessage['suggestedActions'] } {
  const q = query.toLowerCase();

  if (q.includes('price') || q.includes('cost') || q.includes('retainer') || q.includes('package') || q.includes('how much')) {
    return {
      text: `We offer 4 clear service tiers designed for compounding organic authority:

1. **The Velocity Engine ($3,500/mo)**: Full content ecosystem with 4 cornerstone pieces (2,000+ words), 40+ derivative assets across 10 channels, and weekly strategy with Thomax.
2. **The Authority Accelerator ($2,500/mo)**: Founder/executive thought leadership, 8 long-form pieces monthly, LinkedIn & X growth, and bi-weekly 1-on-1 strategy calls.
3. **The Launch System ($5,000 one-time)**: 4-week build & 4-week execution suite with 12+ tailored launch assets and PR distribution.
4. **The Strategic Sprint ($1,500 one-time)**: 2-week turnaround content audit, competitor positioning gap analysis, and 90-day execution roadmap.

Would you like to review all deliverables or book a diagnostic call with Thomax?`,
      actions: [
        { label: 'View All Services', action: 'link', payload: '/services' },
        { label: 'Book Diagnostic Call', action: 'call', payload: '/contact' }
      ]
    };
  }

  if (q.includes('lemonade') || q.includes('daughter') || q.includes('origin') || q.includes('story') || q.includes('born')) {
    return {
      text: `Here is the story that started it all:

When Thomax's 7-year-old daughter ran a neighborhood lemonade stand, she made incredible lemonade—yet had zero customers in the first hour. She thought: *"Daddy, my lemonade is not good enough."*

Thomax diagnosed the real problem: her distribution was broken. They posted in the neighborhood WhatsApp group, placed signs where pedestrians walked, and personally invited friends. Twenty minutes later: 15 customers, $43 earned, sold out!

She looked at him and said:
*"Daddy, it doesn't matter how good it is if nobody knows where to find it."*

That one insight became the foundation of Velocity Contents Lab.`,
      actions: [
        { label: 'Read Origin Story', action: 'link', payload: '/about' },
        { label: 'Explore The Method', action: 'link', payload: '/method' }
      ]
    };
  }

  if (q.includes('65') || q.includes('workflow') || q.includes('hybrid') || q.includes('ai') || q.includes('robot')) {
    return {
      text: `The **AI-Human Hybrid Content System™** is our 65-minute weekly creation workflow that scales content without sounding like an AI robot:

• **00–20m (AI)**: Semantic structure mapping, competitor whitespace research, and outline drafting.
• **20–30m (Human)**: Thomax stitches your authentic, unreplicable personal stories, war stories, and proprietary data.
• **30–45m (AI)**: Generation of draft derivatives adapted across formatting constraints.
• **45–60m (Human)**: Soul-layer editing, nuance polish, and emotional cadence checks.
• **60–65m (Automation)**: Automated multi-channel scheduling across 10 platforms.

The result: 10 platforms covered in 65 minutes of executive time, with 100% human soul.`,
      actions: [
        { label: 'See Method Details', action: 'link', payload: '/method' },
        { label: 'Book Strategy Call', action: 'call', payload: '/contact' }
      ]
    };
  }

  if (q.includes('book') || q.includes('call') || q.includes('diagnostic') || q.includes('schedule') || q.includes('meeting') || q.includes('zoom')) {
    return {
      text: `You can schedule a complimentary **15-Minute Content Diagnostic Call** directly with Thomax (Founder & Chief Content Architect).

During the call:
• Live audit of your current organic footprint and distribution bottlenecks
• Identification of high-intent content opportunities
• A clear 90-day momentum roadmap—with zero high-pressure sales pitches.

We respond to all requests within 4 business hours.`,
      actions: [
        { label: 'Book 15-Min Call', action: 'call', payload: '/contact' }
      ]
    };
  }

  if (q.includes('method') || q.includes('framework') || q.includes('engine') || q.includes('fortune') || q.includes('trust')) {
    return {
      text: `The **Velocity Method** is structured across 4 synchronized phases:

1. **Deep Listening**: Extracting customer objections, sales logs, and proprietary data.
2. **Strategic Creation**: Crafting cornerstone intellectual property with human depth.
3. **Velocity Distribution Engine**: Multiplying 1 master asset into bespoke native content for 10 distinct channels.
4. **Human Engagement & The 7-Touch Fortune Framework**: Converting organic reach into qualified enterprise deals.

Which framework would you like to explore deeper?`,
      actions: [
        { label: 'The 7-Touch Framework', action: 'prompt', payload: 'Explain the 7-Touch Fortune Framework' },
        { label: 'Founder Trust System', action: 'prompt', payload: 'What is the Founder Trust Framework?' },
        { label: 'Explore Frameworks Hub', action: 'link', payload: '/method' }
      ]
    };
  }

  if (q.includes('lagos') || q.includes('global') || q.includes('thomax') || q.includes('founder') || q.includes('who are you')) {
    return {
      text: `Velocity Contents Lab was founded in Lagos, Nigeria by **Thomax (Emmanuel Sunday Thomas)**. 

We operate from Lagos with a global footprint, serving B2B software firms, high-ticket agencies, executive founders, and advisory leaders across 5 continents (US, UK, Europe, Africa, Asia). 

Our guiding doctrine: *"Where Strategy Meets Soul"*—combining world-class automation speed with genuine human narrative.`,
      actions: [
        { label: 'Meet the Founder', action: 'link', payload: '/about' },
        { label: 'Client Case Studies', action: 'link', payload: '/work' }
      ]
    };
  }

  // Default helpful overview
  return {
    text: `Hello! I'm **Cal**, the AI Care Representative for **Velocity Contents Lab**. 

I can assist you with:
• **Our 4 Retainer & Project Tiers** (from $1,500 to $3,500/mo)
• **The 65-Minute AI-Human Hybrid Workflow**
• **The Lemonade Stand origin story** and our Lagos → Global philosophy
• **Booking a 15-minute diagnostic call** with Thomax

How can I best support your content & distribution goals today?`,
    actions: [
      { label: 'View Pricing & Services', action: 'link', payload: '/services' },
      { label: 'How The 65-Min Workflow Works', action: 'prompt', payload: 'How does the 65-minute workflow work?' },
      { label: 'Book Diagnostic Call', action: 'call', payload: '/contact' }
    ]
  };
}

export default function CalAssistant({ embedded = false, isOpenExternal, onCloseExternal }: CalAssistantProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize or restore session
  useEffect(() => {
    let savedId = localStorage.getItem('vcl_cal_session_id');
    if (!savedId) {
      savedId = `cal-session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('vcl_cal_session_id', savedId);
    }
    setSessionId(savedId);

    // Initial greeting
    const initialGreeting: ChatMessage = {
      id: 'msg-welcome',
      sender: 'cal',
      text: `Welcome to **Velocity Contents Lab**! I'm **Cal**, your AI Customer Care strategist.\n\nWhether you're looking to transform 1 piece of thought leadership into 10 distribution channels, review our retainer packages, or explore our Lagos → Global frameworks, I'm here to guide you.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedActions: [
        { label: 'What is The Velocity Method?', action: 'prompt', payload: 'What is The Velocity Method?' },
        { label: 'Our 4 Service Tiers', action: 'link', payload: '/services' },
        { label: 'Book 15-Min Diagnostic', action: 'call', payload: '/contact' }
      ]
    };
    setMessages([initialGreeting]);
  }, []);

  // Sync with external open state if provided
  useEffect(() => {
    if (isOpenExternal !== undefined) {
      setIsOpen(isOpenExternal);
    }
  }, [isOpenExternal]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (isOpen || embedded) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, embedded]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputValue.trim();
    if (!query || isLoading) return;

    const userMsgId = `user-${Date.now()}`;
    const userMessage: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInputValue('');
    setIsLoading(true);

    try {
      // Attempt call to n8n webhook with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 9000);

      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*'
        },
        body: JSON.stringify({
          chatInput: query,
          message: query,
          sessionId: sessionId || 'vcl-default-session',
          timestamp: new Date().toISOString(),
          metadata: {
            agency: 'Velocity Contents Lab',
            url: window.location.href
          }
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      let botText = '';
      if (response.ok) {
        const rawData = await response.text();
        try {
          const parsed = JSON.parse(rawData);
          botText = parsed.output || parsed.response || parsed.text || parsed.message || parsed.reply || (typeof parsed === 'string' ? parsed : JSON.stringify(parsed));
        } catch {
          botText = rawData;
        }
      }

      if (!botText || botText.trim().length === 0) {
        throw new Error('Empty response from webhook');
      }

      const botMessage: ChatMessage = {
        id: `cal-${Date.now()}`,
        sender: 'cal',
        text: botText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: [
          { label: 'Explore Services', action: 'link', payload: '/services' },
          { label: 'Book Diagnostic Call', action: 'call', payload: '/contact' }
        ]
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      // Graceful fallback to verified local intelligence
      const fallback = generateLocalCalResponse(query);
      const botMessage: ChatMessage = {
        id: `cal-fallback-${Date.now()}`,
        sender: 'cal',
        text: fallback.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: fallback.actions
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
      // Focus input again
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleActionClick = (action: NonNullable<ChatMessage['suggestedActions']>[0]) => {
    if (action.action === 'prompt' && action.payload) {
      handleSendMessage(action.payload);
    } else if (action.action === 'link' && action.payload) {
      if (!embedded) setIsOpen(false);
      navigate(action.payload);
    } else if (action.action === 'call') {
      if (!embedded) setIsOpen(false);
      navigate(action.payload || '/contact');
    }
  };

  const handleResetChat = () => {
    const newSessionId = `cal-session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem('vcl_cal_session_id', newSessionId);
    setSessionId(newSessionId);
    setMessages([
      {
        id: 'msg-welcome-reset',
        sender: 'cal',
        text: `Session reset! I'm Cal, ready to help you with strategy, services, frameworks, or booking a direct diagnostic with Thomax.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: [
          { label: 'Services & Retainers', action: 'link', payload: '/services' },
          { label: 'The 65-Min Workflow', action: 'prompt', payload: 'How does the 65-minute workflow work?' },
          { label: 'Book Diagnostic Call', action: 'call', payload: '/contact' }
        ]
      }
    ]);
  };

  // If embedded in a section:
  if (embedded) {
    return (
      <div className="w-full max-w-3xl mx-auto bg-editorial-cream border border-[#1A1A1A]/10 shadow-xl overflow-hidden rounded-2xl flex flex-col h-[560px]">
        {/* Header */}
        <div className="bg-[#121212] text-white px-6 py-4 flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-orange-warm to-amber-600 flex items-center justify-center text-white font-bold font-mono text-sm shadow-md">
                <Bot className="w-5 h-5" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#121212]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display italic text-base font-bold text-white leading-none">Cal</h3>
                <span className="text-[9px] font-mono uppercase bg-brand-orange-warm/20 text-brand-orange-warm px-2 py-0.5 rounded border border-brand-orange-warm/30 font-semibold">
                  AI Care Specialist
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 font-mono mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live • Where Strategy Meets Soul
              </p>
            </div>
          </div>

          <button
            onClick={handleResetChat}
            className="text-neutral-400 hover:text-white text-xs font-mono flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 transition-colors"
            title="Start fresh conversation"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

        {/* Message feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#FAF9F6]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#1A1A1A] text-white rounded-br-none shadow-sm'
                    : 'bg-white border border-[#1A1A1A]/10 text-neutral-800 rounded-bl-none shadow-sm'
                }`}
              >
                <div className="whitespace-pre-line prose prose-sm max-w-none text-inherit">
                  {msg.text}
                </div>

                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-black/5 flex flex-wrap gap-2">
                    {msg.suggestedActions.map((act, i) => (
                      <button
                        key={i}
                        onClick={() => handleActionClick(act)}
                        className="text-xs font-mono font-semibold px-3 py-1.5 rounded-full bg-editorial-pale hover:bg-brand-orange-warm hover:text-white text-[#1A1A1A] border border-black/10 transition-all flex items-center gap-1"
                      >
                        {act.label}
                        {act.action === 'link' || act.action === 'call' ? (
                          <ArrowUpRight className="w-3 h-3" />
                        ) : (
                          <ChevronRight className="w-3 h-3" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <span className="text-[10px] font-mono text-neutral-400 mt-1 px-1">
                {msg.sender === 'user' ? 'You' : 'Cal'} • {msg.timestamp}
              </span>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-neutral-500 text-xs font-mono bg-white border border-black/5 rounded-2xl p-3 w-fit">
              <div className="flex gap-1 items-center">
                <span className="w-2 h-2 bg-brand-orange-warm rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 bg-brand-orange-warm rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 bg-brand-orange-warm rounded-full animate-bounce" />
              </div>
              <span>Cal is drafting a thoughtful response…</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick prompt pills */}
        <div className="px-4 py-2 bg-white border-t border-black/5 overflow-x-auto flex gap-2 no-scrollbar">
          {INITIAL_SUGGESTIONS.slice(0, 3).map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              disabled={isLoading}
              className="text-[11px] font-sans font-medium px-3 py-1 rounded-full bg-editorial-pale hover:bg-editorial-beige text-neutral-700 whitespace-nowrap transition-colors border border-black/5"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input area */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-4 bg-white border-t border-black/10 flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask Cal anything about services, frameworks, or Thomax…"
            className="flex-1 px-4 py-3 bg-[#FAF9F6] border border-black/10 rounded-full text-sm focus:outline-none focus:border-brand-orange-warm transition-colors"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="w-11 h-11 rounded-full bg-brand-orange-warm hover:bg-orange-600 disabled:opacity-40 text-white flex items-center justify-center shrink-0 transition-colors shadow-md"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    );
  }

  // Floating trigger button & drawer
  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur border border-[#1A1A1A]/10 shadow-lg px-4 py-2 rounded-full cursor-pointer hover:border-brand-orange-warm transition-all group"
              onClick={() => setIsOpen(true)}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <p className="text-xs font-sans text-neutral-800 font-medium">
                Ask <strong className="text-brand-orange-warm font-semibold">Cal</strong> anything
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => {
            if (onCloseExternal && isOpen) onCloseExternal();
            setIsOpen(!isOpen);
            setIsMinimized(false);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 rounded-full bg-[#121212] hover:bg-black text-white shadow-2xl flex items-center justify-center border-2 border-brand-orange-warm/40 group"
          id="floating-cal-button"
          aria-label="Open Cal AI Customer Care"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-200" />
          ) : (
            <>
              <div className="relative">
                <Bot className="w-6 h-6 text-white" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#121212]" />
              </div>
            </>
          )}
        </motion.button>
      </div>

      {/* Floating Chat Drawer Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : '620px'
            }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.25, type: 'spring', damping: 20 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[440px] max-w-[440px] bg-editorial-cream border border-[#1A1A1A]/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            id="cal-chat-drawer"
          >
            {/* Drawer Header */}
            <div className="bg-[#121212] text-white px-5 py-3.5 flex items-center justify-between border-b border-neutral-800 select-none">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-orange-warm to-amber-600 flex items-center justify-center text-white font-bold font-mono text-xs shadow-inner">
                    <Bot className="w-4.5 h-4.5" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#121212]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display italic text-sm font-bold text-white leading-none">Cal</h3>
                    <span className="text-[8px] font-mono uppercase bg-brand-orange-warm/20 text-brand-orange-warm px-1.5 py-0.5 rounded border border-brand-orange-warm/30 font-bold">
                      Customer Care
                    </span>
                  </div>
                  <p className="text-[10px] text-neutral-400 font-mono mt-0.5">
                    Velocity Contents Lab • Lagos to Global
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-neutral-400">
                <button
                  onClick={handleResetChat}
                  className="p-1.5 hover:text-white rounded hover:bg-neutral-800 transition-colors"
                  title="Reset conversation"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 hover:text-white rounded hover:bg-neutral-800 transition-colors"
                  title={isMinimized ? "Expand" : "Minimize"}
                >
                  {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    if (onCloseExternal) onCloseExternal();
                  }}
                  className="p-1.5 hover:text-white rounded hover:bg-neutral-800 transition-colors"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Message Body */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FAF9F6] text-xs">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[88%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-[#1A1A1A] text-white rounded-br-none shadow-sm'
                            : 'bg-white border border-[#1A1A1A]/10 text-neutral-800 rounded-bl-none shadow-sm'
                        }`}
                      >
                        <div className="whitespace-pre-line prose prose-xs max-w-none text-inherit font-sans">
                          {msg.text}
                        </div>

                        {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                          <div className="mt-2.5 pt-2.5 border-t border-black/5 flex flex-wrap gap-1.5">
                            {msg.suggestedActions.map((act, i) => (
                              <button
                                key={i}
                                onClick={() => handleActionClick(act)}
                                className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-editorial-pale hover:bg-brand-orange-warm hover:text-white text-[#1A1A1A] border border-black/10 transition-all flex items-center gap-1 text-left"
                              >
                                <span>{act.label}</span>
                                {act.action === 'link' || act.action === 'call' ? (
                                  <ArrowUpRight className="w-2.5 h-2.5 shrink-0" />
                                ) : (
                                  <ChevronRight className="w-2.5 h-2.5 shrink-0" />
                                )}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <span className="text-[9px] font-mono text-neutral-400 mt-1 px-1">
                        {msg.sender === 'user' ? 'You' : 'Cal'} • {msg.timestamp}
                      </span>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex items-center gap-2 text-neutral-500 text-[11px] font-mono bg-white border border-black/5 rounded-2xl p-2.5 w-fit">
                      <div className="flex gap-1 items-center">
                        <span className="w-1.5 h-1.5 bg-brand-orange-warm rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 bg-brand-orange-warm rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 bg-brand-orange-warm rounded-full animate-bounce" />
                      </div>
                      <span>Cal is typing…</span>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Suggestions Carousel */}
                <div className="px-3 py-2 bg-white border-t border-black/5 overflow-x-auto flex gap-1.5 no-scrollbar">
                  {INITIAL_SUGGESTIONS.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(prompt)}
                      disabled={isLoading}
                      className="text-[10px] font-sans font-medium px-2.5 py-1 rounded-full bg-editorial-pale hover:bg-editorial-beige text-neutral-700 whitespace-nowrap transition-colors border border-black/5 shrink-0"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>

                {/* Input Bar */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="p-3 bg-white border-t border-black/10 flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your question for Cal…"
                    className="flex-1 px-3.5 py-2.5 bg-[#FAF9F6] border border-black/10 rounded-full text-xs focus:outline-none focus:border-brand-orange-warm transition-colors font-sans"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !inputValue.trim()}
                    className="w-9 h-9 rounded-full bg-brand-orange-warm hover:bg-orange-600 disabled:opacity-40 text-white flex items-center justify-center shrink-0 transition-colors shadow-sm"
                    aria-label="Send message to Cal"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
