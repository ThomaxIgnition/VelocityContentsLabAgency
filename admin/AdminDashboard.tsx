/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar as CalendarIcon, 
  FileText, 
  Image, 
  BarChart2, 
  Layers, 
  Key, 
  Trash2, 
  Plus, 
  Clock, 
  Check, 
  Info, 
  AlertTriangle, 
  TrendingUp, 
  Download, 
  Users, 
  LogOut, 
  Copy, 
  CalendarDays,
  CheckCircle,
  HelpCircle,
  FileSpreadsheet,
  Cpu
} from 'lucide-react';
import { INITIAL_CALENDAR, INITIAL_MEDIA, INITIAL_KEYWORDS } from './seed.ts';
import { ContentCalendarItem, MediaAsset, DMKeywordStats, LeadCapture } from '../src/types.ts';

type DashboardTab = 'calendar' | 'creation' | 'media' | 'keywords' | 'analytics';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('calendar');

  // Sign-in is handled by Cloudflare Access in front of the admin site, so the
  // dashboard itself has no login. Signing out ends the Cloudflare session.
  const handleLogout = () => {
    const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname);
    window.location.href = isLocal ? '/' : '/cdn-cgi/access/logout';
  };

  // 1. DATA STORES (Local Storage Syncing for operational feel)
  const [calendarItems, setCalendarItems] = useState<ContentCalendarItem[]>(() => {
    const local = localStorage.getItem('vcl_calendar_items');
    return local ? JSON.parse(local) : INITIAL_CALENDAR;
  });

  const [mediaItems, setMediaItems] = useState<MediaAsset[]>(() => {
    const local = localStorage.getItem('vcl_media_items');
    return local ? JSON.parse(local) : INITIAL_MEDIA;
  });

  const [keywordStats, setKeywordStats] = useState<DMKeywordStats[]>(() => {
    const local = localStorage.getItem('vcl_keyword_stats');
    return local ? JSON.parse(local) : INITIAL_KEYWORDS;
  });

  const [leads, setLeads] = useState<LeadCapture[]>(() => {
    const local = localStorage.getItem('vcl_leads');
    return local ? JSON.parse(local) : [];
  });

  const [manualBookedCalls, setManualBookedCalls] = useState(() => {
    return parseInt(localStorage.getItem('vcl_manual_booked_calls') || '14', 10);
  });

  // Sync utilities
  const saveCalendar = (items: ContentCalendarItem[]) => {
    setCalendarItems(items);
    localStorage.setItem('vcl_calendar_items', JSON.stringify(items));
  };

  const saveMedia = (items: MediaAsset[]) => {
    setMediaItems(items);
    localStorage.setItem('vcl_media_items', JSON.stringify(items));
  };

  const saveKeywords = (items: DMKeywordStats[]) => {
    setKeywordStats(items);
    localStorage.setItem('vcl_keyword_stats', JSON.stringify(items));
  };

  // Force leads reload on tab shifts to keep live interaction synchronized
  useEffect(() => {
    const loadedLeads = JSON.parse(localStorage.getItem('vcl_leads') || '[]');
    setLeads(loadedLeads);
  }, [activeTab]);

  // 14 SOCIAL CHANNELS SPECIFIED IN BRIEF
  const availablePlatforms = [
    'LinkedIn', 'LinkedIn Article', 'Twitter/X', 'Twitter/X Thread',
    'Instagram', 'Instagram Carousel', 'Instagram Threads',
    'Facebook Profile', 'Facebook Group', 'Email Newsletter',
    'YouTube Short', 'Medium', 'Hashnode', 'Blog'
  ];

  // Platform styling color schemes
  const getPlatformColors = (platform: string) => {
    const lowered = platform.toLowerCase();
    if (lowered.includes('linkedin')) return { bg: 'bg-blue-50 text-blue-700 border-blue-200', dot: 'bg-blue-600', hover: 'hover:bg-blue-100' };
    if (lowered.includes('instagram') || lowered.includes('threads')) return { bg: 'bg-pink-50 text-pink-700 border-pink-200', dot: 'bg-pink-600', hover: 'hover:bg-pink-100' };
    if (lowered.includes('twitter') || lowered.includes('x')) return { bg: 'bg-slate-50 text-slate-800 border-slate-300', dot: 'bg-slate-900', hover: 'hover:bg-slate-200' };
    if (lowered.includes('facebook')) return { bg: 'bg-indigo-50 text-indigo-700 border-indigo-200', dot: 'bg-indigo-600', hover: 'hover:bg-indigo-100' };
    if (lowered.includes('email')) return { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-600', hover: 'hover:bg-emerald-100' };
    if (lowered.includes('youtube')) return { bg: 'bg-red-50 text-red-700 border-red-200', dot: 'bg-red-600', hover: 'hover:bg-red-100' };
    if (lowered.includes('blog') || lowered.includes('medium') || lowered.includes('hashnode')) return { bg: 'bg-stone-100 text-stone-800 border-stone-300', dot: 'bg-stone-700', hover: 'hover:bg-stone-200' };
    return { bg: 'bg-slate-50 text-slate-700 border-slate-200', dot: 'bg-slate-500', hover: 'hover:bg-slate-100' };
  };

  // Auto-save feed back simulator 
  const [autoSavedTime, setAutoSavedTime] = useState<string>('');

  // 2. FEATURE 1: CREATION ENGINE STATE
  const [editorTitle, setEditorTitle] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['LinkedIn']);
  const [editorCampaign, setEditorCampaign] = useState('Evergreen');
  const [editorStatus, setEditorStatus] = useState<'Draft' | 'Scheduled'>('Scheduled');
  const [editorDate, setEditorDate] = useState('2026-06-12T09:00');
  const [editorCta, setEditorCta] = useState('https://velocitycontentlabs.com/resources');

  // Character Limit (Max 3,000 per guidelines)
  const CHAR_LIMIT = 3000;
  const charsCount = editorContent.length;

  useEffect(() => {
    // Simulate auto-saving logic
    if (editorContent || editorTitle) {
      const timer = setTimeout(() => {
        const d = new Date();
        const timestr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setAutoSavedTime(`Auto-saved at ${timestr}`);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [editorTitle, editorContent, selectedChannels, editorStatus, editorDate]);

  const toggleChannel = (channel: string) => {
    if (selectedChannels.includes(channel)) {
      setSelectedChannels(selectedChannels.filter(c => c !== channel));
    } else {
      setSelectedChannels([...selectedChannels, channel]);
    }
  };

  // Save drafts into Calendar Item (Multi-channel multiplexer!)
  const handlePublishEngineContent = () => {
    if (!editorTitle || !editorContent) return;

    const newCreatedItems: ContentCalendarItem[] = selectedChannels.map((platName, idx) => {
      // Normalize platform categorization for colors
      let fallbackPlat: ContentCalendarItem['platform'] = 'LinkedIn';
      if (platName.toLowerCase().includes('linkedin')) fallbackPlat = 'LinkedIn';
      else if (platName.toLowerCase().includes('instagram')) fallbackPlat = 'Instagram';
      else if (platName.toLowerCase().includes('thread') || platName.toLowerCase() === 'x') fallbackPlat = 'Twitter/X';
      else if (platName.toLowerCase().includes('facebook')) fallbackPlat = 'Facebook';
      else if (platName.toLowerCase().includes('email')) fallbackPlat = 'Email';
      else if (platName.toLowerCase().includes('youtube')) fallbackPlat = 'YouTube';
      else fallbackPlat = 'Blog';

      return {
        id: `cal-${Date.now()}-${idx}`,
        title: `[${platName}] ${editorTitle}`,
        content: editorContent,
        date: editorDate,
        platform: fallbackPlat,
        status: editorStatus,
        tags: [editorCampaign, 'Internal Draft'],
        ctaUrl: editorCta
      };
    });

    const updated = [...calendarItems, ...newCreatedItems];
    saveCalendar(updated);

    // Reset editor
    setEditorTitle('');
    setEditorContent('');
    setSelectedChannels(['LinkedIn']);
    alert('Congratulations! Content cloned and scheduled natively across channels successfully.');
    setActiveTab('calendar');
  };

  // 3. FEATURE 2: CONTENT CALENDAR SCHEDULER (Monthly view helper & conflict checker)
  const [schedulerModalOpen, setSchedulerModalOpen] = useState(false);
  const [calendarView, setCalendarView] = useState<'weekly' | 'monthly'>('weekly');
  const [conflictAlert, setConflictAlert] = useState<string | null>(null);

  // Simple Conflict Detector (Warning if posts within 2 hours of each other on same platform)
  const checkSchedulesConflict = (targetDate: string, excludeId?: string) => {
    const targetMs = new Date(targetDate).getTime();
    const TWO_HOURS_MS = 2 * 60 * 60 * 1000;

    const conflicts = calendarItems.filter(item => {
      if (item.id === excludeId) return false;
      const itemMs = new Date(item.date).getTime();
      const isWithinSill = Math.abs(targetMs - itemMs) < TWO_HOURS_MS;
      return isWithinSill;
    });

    if (conflicts.length > 0) {
      setConflictAlert(`Warning: ${conflicts.length} other items are scheduled within 2 hours of this slot. Overlap risk detected!`);
    } else {
      setConflictAlert(null);
    }
  };

  // Rescheduling helper to showcase drag-and-drop mechanics
  const handleShiftDate = (id: string, newDateStr: string) => {
    const updated = calendarItems.map(item => {
      if (item.id === id) {
        return { ...item, date: newDateStr };
      }
      return item;
    });
    saveCalendar(updated);
    checkSchedulesConflict(newDateStr, id);
  };

  const handleRemoveEvent = (id: string) => {
    if (confirm('Are you sure you want to delete this scheduled post?')) {
      const filtered = calendarItems.filter(item => item.id !== id);
      saveCalendar(filtered);
    }
  };

  // 4. FEATURE 3: AI SUGGESTED BEST TIME ENGINE PRESET MAPPINGS (WAT default)
  const applySuggestedTime = (timeWAT: string) => {
    const today = new Date().toISOString().split('T')[0];
    setEditorDate(`${today}T${timeWAT}`);
  };

  const aiSuggestions = [
    { type: 'High Engagement Slot', time: '08:30', isOptimal: true },
    { type: 'Balanced Audience Slot', time: '12:10', isOptimal: false },
    { type: 'Fast Publish / Late Slot', time: '17:45', isOptimal: false }
  ];

  // 5. FEATURE 4: MEDIA LIBRARY HANDLERS
  const [selectedMediaTag, setSelectedMediaTag] = useState<string>('Photos');
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const [newMediaFile, setNewMediaFile] = useState({ name: '', tag: 'Evergreen' as any });

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMediaFile.name) return;

    const asset: MediaAsset = {
      id: `img-${Date.now()}`,
      name: newMediaFile.name,
      url: `/photos/placeholder-${Date.now()}.png`,
      tag: newMediaFile.tag
    };

    const updated = [...mediaItems, asset];
    saveMedia(updated);
    setNewMediaFile({ name: '', tag: 'Evergreen' });
  };

  const handleDeleteMedia = (id: string) => {
    const filtered = mediaItems.filter(m => m.id !== id);
    saveMedia(filtered);
  };

  const triggerCopyNotice = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(url);
    setTimeout(() => setCopiedLink(null), 1500);
  };

  // Calc metric sums
  const postsThisMonth = calendarItems.filter(item => item.status === 'Published' || item.status === 'Distributed').length;
  const leadsCount = leads.length;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row" id="admin-workspace-console">
      
      {/* Sidebar navigation */}
      <aside className="w-full md:w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between shrink-0">
        <div className="flex flex-col">
          
          {/* Header logo summary */}
          <div className="p-6 border-b border-slate-800">
            <span className="font-display font-black text-sm text-white tracking-widest flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-brand-orange-warm flex items-center justify-center font-black text-[10px] text-slate-900">V</span>
              VELOCITY OPERATIONS
            </span>
            <span className="block text-[8px] font-mono text-slate-500 uppercase tracking-wider mt-1.5 pl-8">
              Lagos Executive Suite
            </span>
          </div>

          <nav className="p-4 space-y-1.5 text-left">
            <button 
              onClick={() => setActiveTab('calendar')}
              className={`w-full px-4 py-3 rounded-lg font-sans text-xs font-bold transition-all flex items-center gap-3 ${
                activeTab === 'calendar' ? 'bg-brand-orange-warm text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <CalendarIcon className="w-4.5 h-4.5" />
              <span>Content Calendar</span>
            </button>

            <button 
              onClick={() => setActiveTab('creation')}
              className={`w-full px-4 py-3 rounded-lg font-sans text-xs font-bold transition-all flex items-center gap-3 ${
                activeTab === 'creation' ? 'bg-brand-orange-warm text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <FileText className="w-4.5 h-4.5" />
              <span>Creation Engine</span>
            </button>

            <button 
              onClick={() => setActiveTab('media')}
              className={`w-full px-4 py-3 rounded-lg font-sans text-xs font-bold transition-all flex items-center gap-3 ${
                activeTab === 'media' ? 'bg-brand-orange-warm text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Image className="w-4.5 h-4.5" />
              <span>Media Library</span>
            </button>

            <button 
              onClick={() => setActiveTab('keywords')}
              className={`w-full px-4 py-3 rounded-lg font-sans text-xs font-bold transition-all flex items-center gap-3 ${
                activeTab === 'keywords' ? 'bg-brand-orange-warm text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Key className="w-4.5 h-4.5" />
              <span>DM Keyword Tracker</span>
            </button>

            <button 
              onClick={() => setActiveTab('analytics')}
              className={`w-full px-4 py-3 rounded-lg font-sans text-xs font-bold transition-all flex items-center gap-3 ${
                activeTab === 'analytics' ? 'bg-brand-orange-warm text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <BarChart2 className="w-4.5 h-4.5" />
              <span>Captures &amp; Analytics</span>
            </button>
          </nav>
        </div>

        {/* Footer info logout */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <div className="flex items-center gap-3 pl-2">
            <div className="w-7 h-7 bg-brand-orange-warm/20 text-brand-orange-warm rounded-full font-display font-medium text-xs flex items-center justify-center">
              ET
            </div>
            <div className="text-left">
              <span className="block text-[11px] font-bold text-white">Emmanuel Sunday T.</span>
              <span className="block text-[8px] font-mono text-slate-500">Founder Account</span>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full text-left font-mono text-[9px] uppercase tracking-wider font-bold text-red-500 hover:text-red-400 flex items-center gap-2 pl-3 py-1 bg-slate-900/40 rounded border border-slate-850"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout Session
          </button>
        </div>
      </aside>

      {/* Main operational view port */}
      <main className="flex-1 overflow-y-auto px-6 md:px-10 py-8 bg-slate-900 text-left">
        
        {/* Top bar status overview */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-6 mb-8">
          <div>
            <h1 className="font-display text-xl md:text-2xl font-black text-white tracking-tight capitalize">
              {activeTab} Workspace Panel
            </h1>
            <p className="text-[11px] font-mono text-slate-500 uppercase tracking-widest mt-1">
              Active Session Month: June 2026 • WAT time default
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono shrink-0">
            <div className="px-3.5 py-1.5 rounded bg-slate-950 border border-slate-800">
              <span className="block text-[9px] uppercase text-slate-500">Posts Month:</span>
              <span className="block font-bold text-brand-orange-warm text-sm">{postsThisMonth} items</span>
            </div>
            <div className="px-3.5 py-1.5 rounded bg-slate-950 border border-slate-800">
              <span className="block text-[9px] uppercase text-slate-500">Leads Captured:</span>
              <span className="block font-bold text-emerald-400 text-sm">{leadsCount} emails</span>
            </div>
          </div>
        </div>

        {/* CONDITIONAL TAB CONTENT */}

        {/* 1. CONTENT CALENDAR TAB */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4 bg-slate-950 border border-slate-850 p-4 rounded-xl">
              <div className="flex items-center gap-2 text-xs">
                <span className="inline-block px-2.5 py-1 rounded bg-slate-900 border border-slate-850 font-mono text-slate-400 font-bold uppercase">
                  Time Zone WAT (UTC+1)
                </span>
                {conflictAlert && (
                  <span className="inline-flex items-center gap-1 text-xs text-amber-500 font-semibold pl-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    {conflictAlert}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setCalendarView('weekly')}
                  className={`px-3 py-1.5 rounded font-mono text-[10px] font-bold border ${calendarView === 'weekly' ? 'bg-brand-orange-warm text-white border-brand-orange-warm' : 'bg-slate-900 text-slate-400 border-slate-800'}`}
                >
                  Weekly View
                </button>
                <button 
                  onClick={() => setCalendarView('monthly')}
                  className={`px-3 py-1.5 rounded font-mono text-[10px] font-bold border ${calendarView === 'monthly' ? 'bg-brand-orange-warm text-white border-brand-orange-warm' : 'bg-slate-900 text-slate-400 border-slate-800'}`}
                >
                  Monthly View
                </button>
              </div>
            </div>

            {/* Interactive Custom Rescheduling Slider */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 space-y-4">
                <div className="bg-slate-950 border border-slate-850 rounded-xl p-5">
                  <h3 className="font-display text-sm font-bold text-white mb-4 flex items-center gap-2">
                    <CalendarDays className="w-4.5 h-4.5 text-brand-orange-warm" />
                    Scheduled Content Queue
                  </h3>

                  <div className="space-y-3">
                    {calendarItems.map((item) => {
                      const colors = getPlatformColors(item.platform);
                      const itemDate = new Date(item.date);
                      
                      return (
                        <div key={item.id} className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-colors">
                          <div className="flex items-start gap-4 text-left">
                            <span className={`px-2.5 py-1 rounded text-[9px] uppercase font-mono font-black ${colors.bg} mt-0.5 shrink-0`}>
                              {item.platform}
                            </span>
                            <div className="space-y-1">
                              <h4 className="text-xs font-bold text-slate-100 pr-4">{item.title}</h4>
                              <p className="text-[10px] text-slate-400 font-sans line-clamp-1">{item.content}</p>
                              <div className="flex items-center gap-3.5 pt-1 text-[10px] font-mono text-slate-500">
                                <span className="flex items-center gap-1 font-bold">
                                  <Clock className="w-3.5 h-3.5" />
                                  {itemDate.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })} at {itemDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} WAT
                                </span>
                                <span className="flex items-center gap-1 uppercase font-bold text-[9px]">
                                  Status: <span className={item.status === 'Published' ? 'text-emerald-500' : 'text-amber-500'}>{item.status}</span>
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {/* Reschedule Dropdown Simulator */}
                            <select 
                              onChange={(e) => handleShiftDate(item.id, e.target.value)}
                              value={item.date.substring(0, 16)}
                              className="px-2 py-1 border border-slate-800 bg-slate-950 text-slate-400 font-mono text-[9px] rounded"
                            >
                              <option value="2026-06-08T07:00">Mon 7:00 AM</option>
                              <option value="2026-06-09T09:00">Tue 9:00 AM</option>
                              <option value="2026-06-10T07:30">Wed 7:30 AM</option>
                              <option value="2026-06-11T12:00">Thu 12:00 PM</option>
                              <option value="2026-06-12T15:00">Fri 3:00 PM</option>
                            </select>

                            <button 
                              onClick={() => handleRemoveEvent(item.id)}
                              className="p-1 px-2 rounded bg-slate-950 hover:bg-red-950 text-slate-500 hover:text-red-400 border border-slate-800 transition-colors"
                              title="Delete scheduling"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Locked Calendar Presets Column */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-slate-950 border border-slate-850 p-5 rounded-xl">
                  <h3 className="font-display text-sm font-bold text-white mb-2 uppercase tracking-wide">
                    Locked Weekly slots
                  </h3>
                  <p className="text-[10px] text-slate-500 font-sans leading-relaxed mb-4">
                    The strict clockwork weekly schedule configured for Velocity Contents Lab assets release.
                  </p>

                  <div className="space-y-2.5 text-xs text-left">
                    <div className="p-3 bg-slate-900/60 rounded-lg flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 shrink-0" />
                      <div>
                        <span className="block font-mono text-[10px] font-black font-white">Monday 7:00 AM WAT</span>
                        <p className="text-[10px] text-slate-400">LinkedIn Post • Blog Chapter • Threads</p>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-900/60 rounded-lg flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1 shrink-0" />
                      <div>
                        <span className="block font-mono text-[10px] font-black font-white">Tuesday 9:00 AM WAT</span>
                        <p className="text-[10px] text-slate-400">Instagram Carousel • Twitter Thread</p>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-900/60 rounded-lg flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1 shrink-0" />
                      <div>
                        <span className="block font-mono text-[10px] font-black font-white">Wednesday 7:30 AM WAT</span>
                        <p className="text-[10px] text-slate-400">FB Group post • Email Newsletter</p>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-900/60 rounded-lg flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1 shrink-0" />
                      <div>
                        <span className="block font-mono text-[10px] font-black font-white">Thursday WAT (Flexible)</span>
                        <p className="text-[10px] text-slate-400">YouTube Short • Medium • Hashnode</p>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-900/60 rounded-lg flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange-warm mt-1 shrink-0" />
                      <div>
                        <span className="block font-mono text-[10px] font-black font-white">Friday WAT (Flexible)</span>
                        <p className="text-[10px] text-slate-400">Premium Flyer • Framework Resource</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. CREATION ENGINE TAB (Rich text counter and 14 platform checkbox multiplexer) */}
        {activeTab === 'creation' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Form Column */}
              <div className="lg:col-span-8 bg-slate-950 border border-slate-850 rounded-xl p-5 md:p-6.5 space-y-5">
                
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="font-display text-sm font-bold text-white uppercase tracking-wide">
                    Content Matrix Composer
                  </h3>
                  <div className="flex items-center gap-2">
                    {autoSavedTime ? (
                      <span className="text-[9px] font-mono text-emerald-500 font-medium">✓ {autoSavedTime}</span>
                    ) : (
                      <span className="text-[9px] font-mono text-slate-600">Simulating auto-saving (30s)...</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase font-black">Cornerstone Title</label>
                  <input 
                    type="text" 
                    placeholder="E.g., The Fortune Is in the Follow-up"
                    value={editorTitle}
                    onChange={(e) => setEditorTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded bg-slate-900 border border-slate-800 text-white font-sans text-xs focus:outline-none focus:border-brand-orange-warm"
                  />
                </div>

                {/* Checklist platform multiplexer */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase font-black">Platforms Multiplexer Choose (14 channels available)</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                    {availablePlatforms.map((plat) => {
                      const isChecked = selectedChannels.includes(plat);
                      return (
                        <label 
                          key={plat} 
                          className={`flex items-center gap-2 px-3 py-2 rounded border text-[10px] font-sans font-bold cursor-pointer select-none transition-all ${
                            isChecked ? 'bg-orange-950/40 text-brand-orange-warm border-brand-orange-warm/50' : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white'
                          }`}
                        >
                          <input 
                            type="checkbox" 
                            checked={isChecked}
                            onChange={() => toggleChannel(plat)}
                            className="rounded bg-slate-950 border-slate-800 text-brand-orange-warm focus:ring-0 shrink-0"
                          />
                          <span>{plat}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-mono text-slate-400 uppercase font-black">Rich Text Composer Editor</label>
                    <span className={`text-[9px] font-mono ${charsCount > CHAR_LIMIT - 300 ? 'text-red-500 font-bold' : 'text-slate-500'}`}>
                      {charsCount} / {CHAR_LIMIT} chars max
                    </span>
                  </div>

                  <div className="border border-slate-850 rounded-lg overflow-hidden bg-slate-900">
                    {/* Basic editor style controls bar mock */}
                    <div className="px-3 py-2 border-b border-slate-800 text-xs text-slate-400 flex items-center gap-3 bg-slate-950 font-mono">
                      <span className="hover:text-white cursor-pointer font-bold">B</span>
                      <span className="hover:text-white cursor-pointer italic">I</span>
                      <span className="hover:text-white cursor-pointer underline">U</span>
                      <span className="hover:text-white cursor-pointer">QUOTE</span>
                      <span className="hover:text-white cursor-pointer">&lt;code&gt;</span>
                      <div className="w-[1px] h-3 bg-slate-800" />
                      <span className="hover:text-white cursor-pointer">H1</span>
                      <span className="hover:text-white cursor-pointer">H2</span>
                      <div className="w-[1px] h-3 bg-slate-800" />
                      <span className="text-[9px] text-slate-600">Thomax Signature style configured</span>
                    </div>

                    <textarea 
                      placeholder="My daughter started a lemonade stand..."
                      value={editorContent}
                      maxLength={CHAR_LIMIT}
                      onChange={(e) => setEditorContent(e.target.value)}
                      rows={10}
                      className="w-full p-4 bg-slate-900 text-white font-sans text-xs focus:outline-none min-h-[220px] font-medium leading-relaxed"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase font-black">Campaign Category</label>
                    <select 
                      value={editorCampaign}
                      onChange={(e) => setEditorCampaign(e.target.value)}
                      className="w-full px-3 py-2.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[10px]"
                    >
                      <option value="Evergreen">Evergreen Strategy</option>
                      <option value="Fortune">7-Touch Campaign</option>
                      <option value="Daughter">Lemonade Genesis</option>
                      <option value="Weekly Series">Friday Workshop</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase font-black">Release Target Date</label>
                    <input 
                      type="datetime-local" 
                      value={editorDate}
                      onChange={(e) => setEditorDate(e.target.value)}
                      className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[10px]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase font-black">Redirect CTA</label>
                    <input 
                      type="text" 
                      value={editorCta}
                      onChange={(e) => setEditorCta(e.target.value)}
                      className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-800 text-white font-sans text-xs focus:outline-none focus:border-brand-orange-warm"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-850 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer">
                      <input 
                        type="radio" 
                        name="status" 
                        checked={editorStatus === 'Draft'}
                        onChange={() => setEditorStatus('Draft')}
                        className="text-brand-orange-warm shrink-0 focus:ring-0 bg-slate-950 border-slate-800"
                      />
                      <span>Save as Draft</span>
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer">
                      <input 
                        type="radio" 
                        name="status" 
                        checked={editorStatus === 'Scheduled'}
                        onChange={() => setEditorStatus('Scheduled')}
                        className="text-brand-orange-warm shrink-0 focus:ring-0 bg-slate-950 border-slate-800"
                      />
                      <span>Schedule Active</span>
                    </label>
                  </div>

                  <button 
                    onClick={handlePublishEngineContent}
                    className="px-6 py-3 rounded-lg bg-brand-orange-warm font-sans text-xs font-bold text-white shadow-xl flex items-center gap-2 hover:bg-orange-600 transition-colors"
                  >
                    Multiplex &amp; Clone Content <Plus className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* Suggestions AI Best Time Engine Column */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-slate-950 border border-slate-850 p-5 rounded-xl space-y-4">
                  <div className="flex items-center gap-1.5 text-brand-orange-warm">
                    <Cpu className="w-5 h-5" />
                    <h3 className="font-display text-xs font-bold uppercase tracking-wider">
                      AI Suggested Best Time WAT
                    </h3>
                  </div>
                  
                  <p className="text-[10px] text-slate-500 font-sans leading-relaxed">
                    System suggests 3 optimal daily release hours based on cumulative social networks engagement logs. Apply slot instantly.
                  </p>

                  <div className="space-y-2.5">
                    {aiSuggestions.map((sug, id) => (
                      <div 
                        key={id} 
                        className="p-3 bg-slate-900 rounded-lg flex items-center justify-between border border-slate-850 group-hover:border-slate-700 transition-colors"
                      >
                        <div>
                          <span className="block text-[10px] font-bold text-slate-200">{sug.type}</span>
                          <span className="block font-mono text-[10px] text-slate-500 mt-0.5">{sug.time} WAT</span>
                        </div>
                        <button 
                          onClick={() => applySuggestedTime(sug.time)}
                          className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 hover:border-brand-orange-warm hover:text-brand-orange-warm font-mono text-[8px] uppercase font-bold text-slate-400 transition-all"
                        >
                          Apply Slot
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-orange-950/20 border-l-4 border-brand-orange-warm text-left rounded-lg">
                  <span className="text-[10px] font-mono uppercase font-black text-brand-orange-warm block mb-1">
                    Coffee Shop Check Target
                  </span>
                  <p className="text-[10px] font-sans text-slate-400 leading-normal">
                    Review rules: Is there corporate jargon inside? (Banned check: leverage, robust, seamlessly, cutting-edge). Speak simply over coffee.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 3. MEDIA LIBRARY TAB */}
        {activeTab === 'media' && (
          <div className="space-y-6 text-left">
            <div className="bg-slate-950 border border-slate-850 p-5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {['Photos', 'Frameworks', 'Evergreen', 'Photos', 'Week 17', 'Week 18'].map((tag) => (
                  <button 
                    key={tag}
                    onClick={() => setSelectedMediaTag(tag)}
                    className={`px-3 py-1.5 rounded-full font-sans text-[10px] font-bold border transition-colors ${
                      selectedMediaTag === tag 
                        ? 'bg-white text-slate-950 border-white' 
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Upload simulated form */}
              <form onSubmit={handleAddMedia} className="flex items-center gap-2">
                <input 
                  type="text" 
                  placeholder="Asset title..." 
                  required
                  value={newMediaFile.name}
                  onChange={(e) => setNewMediaFile({ ...newMediaFile, name: e.target.value })}
                  className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-white font-sans text-xs focus:outline-none focus:border-brand-orange-warm"
                />
                <select 
                  value={newMediaFile.tag}
                  onChange={(e) => setNewMediaFile({ ...newMediaFile, tag: e.target.value as any })}
                  className="px-2 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono text-[9px]"
                >
                  <option value="Photos">Photos</option>
                  <option value="Frameworks">Frameworks</option>
                  <option value="Evergreen">Evergreen</option>
                </select>
                <button 
                  type="submit" 
                  className="p-1.5 rounded bg-brand-orange-warm text-white hover:bg-orange-600 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Media Items Catalog */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {mediaItems.map((item) => {
                const isSelectedTag = item.tag === selectedMediaTag;
                if (!isSelectedTag) return null;

                return (
                  <div key={item.id} className="bg-slate-950 border border-slate-850 rounded-xl overflow-hidden group/mcard flex flex-col justify-between">
                    <div className="aspect-square bg-slate-900 flex items-center justify-center relative overflow-hidden text-slate-500 text-xs">
                      
                      {/* Hover preview display */}
                      <div className="p-4 text-center font-mono text-[9px] text-slate-400 select-none">
                        Hover Preview Frame: <br />
                        <span className="text-white text-xs block font-sans font-bold mt-2 truncate max-w-[140px]">{item.name}</span>
                        <span className="text-brand-orange-warm text-[8px] uppercase mt-1 block">{item.tag} tag</span>
                      </div>
                      
                      <div className="absolute inset-x-0 bottom-0 bg-slate-950/90 py-1.5 px-3 border-t border-slate-850 truncate text-[8px] font-mono text-slate-500">
                        {item.url}
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950 border-t border-slate-850 flex items-center justify-between gap-2">
                      <button 
                        onClick={() => triggerCopyNotice(item.url)}
                        className="flex-1 py-1.5 bg-slate-900 hover:bg-slate-800 rounded font-sans text-[10px] font-black text-slate-300 transition-colors flex items-center justify-center gap-1"
                      >
                        {copiedLink === item.url ? (
                          <><Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!</>
                        ) : (
                          <><Copy className="w-3.5 h-3.5" /> Copy URL</>
                        )}
                      </button>

                      <button 
                        onClick={() => handleDeleteMedia(item.id)}
                        className="p-1.5 bg-slate-900 border border-slate-800 text-slate-500 hover:text-red-400 hover:bg-slate-900 rounded"
                        title="Delete asset pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 4. DM KEYWORD TRACKER TAB */}
        {activeTab === 'keywords' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-850 rounded-xl overflow-hidden">
              <div className="px-6 py-4.5 border-b border-slate-850 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">Active keywords stats table</h3>
                  <p className="text-[10px] text-slate-500 font-sans mt-0.5">Metrics captured based on live visitor resource download completions.</p>
                </div>
                <div className="text-[9px] font-mono bg-brand-orange-warm/15 text-brand-orange-warm px-2.5 py-0.5 border border-brand-orange-warm/20 rounded font-black uppercase">
                  6 keywords online
                </div>
              </div>

              <div className="overflow-x-auto text-left">
                <table className="w-full text-left text-xs text-slate-300 font-sans">
                  <thead className="text-[10px] uppercase font-mono tracking-wider bg-slate-900 text-slate-500 font-bold">
                    <tr>
                      <th className="px-6 py-4">Keyword Code</th>
                      <th className="px-6 py-4">Target Resource Outline</th>
                      <th className="px-6 py-4 text-center">Completed Downloads</th>
                      <th className="px-6 py-4 text-center">Nurture Sequence Completes %</th>
                      <th className="px-6 py-4 text-center">Calls Booked Ratios</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850">
                    {keywordStats.map((stat) => (
                      <tr key={stat.keyword} className="hover:bg-slate-900/30">
                        <td className="px-6 py-4.5 font-mono font-black text-brand-orange-warm">
                          {stat.keyword}
                        </td>
                        <td className="px-6 py-4.5 font-medium text-slate-100">
                          {stat.title}
                        </td>
                        <td className="px-6 py-4.5 text-center font-mono font-bold font-white">
                          {stat.downloads} units
                        </td>
                        <td className="px-6 py-4.5 text-center font-mono text-emerald-400">
                          {stat.completionRate}
                        </td>
                        <td className="px-6 py-4.5 text-center font-mono">
                          {stat.conversionRate} stats
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 5. CAPTURES & ANALYTICS TAB */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            
            {/* Visual metrics cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-slate-950 border border-slate-850 p-5 rounded-xl flex items-center gap-4">
                <div className="w-10 h-10 bg-orange-950 text-brand-orange-warm rounded-full flex items-center justify-center shrink-0 border border-brand-orange-warm/25">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-mono font-bold">In-Engine Clones:</span>
                  <span className="block font-mono text-lg font-black text-white">{calendarItems.length} active</span>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-850 p-5 rounded-xl flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-950 text-[#10B981] rounded-full flex items-center justify-center shrink-0 border border-brand-green-emerald/25">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-mono font-bold">Emails Captured:</span>
                  <span className="block font-mono text-lg font-black text-white">{leads.length} accounts</span>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-850 p-5 rounded-xl flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-950 text-blue-400 rounded-full flex items-center justify-center shrink-0 border border-blue-500/25">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-mono font-bold">Manual Booked consultations:</span>
                  <span className="block font-mono text-lg font-black text-white">{manualBookedCalls} slot</span>
                </div>
              </div>

              {/* Incremental manually bookings selector */}
              <div className="p-3.5 bg-slate-950 border border-slate-850 rounded-xl flex flex-col justify-between">
                <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-mono font-bold mb-1.5">Consultations incrementor:</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      const updated = Math.max(0, manualBookedCalls - 1);
                      setManualBookedCalls(updated);
                      localStorage.setItem('vcl_manual_booked_calls', updated.toString());
                    }}
                    className="flex-1 py-1 rounded bg-slate-900 border border-slate-800 hover:text-white text-slate-400 font-mono font-bold text-xs"
                  >
                    - 1
                  </button>
                  <button 
                    onClick={() => {
                      const updated = manualBookedCalls + 1;
                      setManualBookedCalls(updated);
                      localStorage.setItem('vcl_manual_booked_calls', updated.toString());
                    }}
                    className="flex-1 py-1 rounded bg-brand-orange-warm font-sans font-bold text-white text-xs"
                  >
                    + 1 slot
                  </button>
                </div>
              </div>
            </div>

            {/* Leads Table */}
            <div className="bg-slate-950 border border-slate-850 rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-850 flex items-center justify-between bg-slate-950">
                <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white">
                  Real-Time Lead Captures List 
                </h3>
                <span className="text-[9px] font-mono uppercase bg-slate-900 text-slate-500 px-2.5 py-0.5 border border-slate-800 rounded">
                  Live Sync status
                </span>
              </div>

              <div className="overflow-x-auto text-left">
                {leads.length > 0 ? (
                  <table className="w-full text-left text-xs text-slate-300 font-sans">
                    <thead className="text-[10px] uppercase font-mono tracking-wider bg-slate-900 text-slate-500 font-bold">
                      <tr>
                        <th className="px-6 py-4">Submitted Name</th>
                        <th className="px-6 py-4">Business Email coordinates</th>
                        <th className="px-6 py-4">Source Origin</th>
                        <th className="px-6 py-4 text-center">Capture hour Date WAT</th>
                        <th className="px-6 py-4">Message Objectives</th>
                        <th className="px-6 py-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850">
                      {leads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-900/40">
                          <td className="px-6 py-4 font-bold text-white font-sans">
                            {lead.name}
                          </td>
                          <td className="px-6 py-4 font-mono font-bold text-slate-300">
                            {lead.email}
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-brand-orange-warm text-[10px] font-mono font-bold">
                              {lead.source}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center font-mono text-slate-500 text-[10px]">
                            {new Date(lead.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })} WAT
                          </td>
                          <td className="px-6 py-4 text-slate-400 font-medium truncate max-w-[150px]" title={lead.message}>
                            {lead.message || 'Guide Download Request Only'}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button 
                              onClick={() => {
                                if (confirm('Remove Lead from operational list?')) {
                                  const filtered = leads.filter(l => l.id !== lead.id);
                                  setLeads(filtered);
                                  localStorage.setItem('vcl_leads', JSON.stringify(filtered));
                                }
                              }}
                              className="text-red-500 hover:text-red-400 text-xs font-mono"
                            >
                              Flush
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="py-12 text-center text-slate-500 font-sans flex flex-col items-center justify-center gap-3">
                    <CheckCircle className="w-8 h-8 text-slate-700 animate-pulse" />
                    <p className="text-xs">No email captures filed yet in local storage databases. Go submit some forms inside the landing / home screens to watch them propagate here instantly!</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

      </main>

    </div>
  );
}
