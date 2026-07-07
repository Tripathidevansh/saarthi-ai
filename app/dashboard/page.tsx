"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { GlassCard } from "@/components/GlassCard";
import { Sidebar } from "@/components/Sidebar";
import { TricolorSeparator } from "@/components/TricolorSeparator";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs, limit } from "firebase/firestore";
import {
  MessageSquare,
  Camera,
  Search,
  FileCheck,
  AlertTriangle,
  Flame,
  Zap,
  CheckCircle,
  HelpCircle,
  Clock,
  Landmark,
  UserCheck
} from "lucide-react";

interface Complaint {
  id: string;
  issueType: string;
  severity: string;
  department: string;
  estimatedResolution: string;
  complaintText: string;
  status: string;
  timestamp: any;
}

export default function Dashboard() {
  const { t, language } = useLanguage();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch submitted complaints from Firestore
  useEffect(() => {
    async function fetchComplaints() {
      try {
        const q = query(collection(db, "complaints"), orderBy("timestamp", "desc"), limit(5));
        const querySnapshot = await getDocs(q);
        const fetched: Complaint[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetched.push({
            id: doc.id,
            issueType: data.issueType || "Unknown",
            severity: data.severity || "Medium",
            department: data.department || "General",
            estimatedResolution: data.estimatedResolution || "3 Days",
            complaintText: data.complaintText || "",
            status: data.status || "Pending",
            timestamp: data.timestamp
          });
        });
        setComplaints(fetched);
      } catch (err) {
        console.error("Error fetching complaints:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchComplaints();
  }, []);

  const faqList = [
    { text: "Am I eligible for PM Kisan?", href: "/assistant?q=Am I eligible for PM Kisan?" },
    { text: "How do I apply for a Passport?", href: "/assistant?q=How do I apply for a Passport?" },
    { text: "Explain Ayushman Bharat simply", href: "/assistant?q=Explain Ayushman Bharat simply" },
    { text: "Nearest Aadhaar Kendra", href: "/assistant?q=Nearest Aadhaar Kendra" }
  ];

  return (
    <div className={`min-h-screen flex bg-slate-50 dark:bg-slate-950 lang-${language} pb-20 md:pb-0`}>
      <Sidebar />

      {/* Main Container Area */}
      <div className="flex-1 md:pl-64 flex flex-col">
        <TricolorSeparator />

        <div className="p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
          {/* Left Main column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Greeting Header Banner */}
            <section className="relative overflow-hidden rounded-2xl p-6 md:p-8 bg-[#0B1F3A] text-white min-h-[160px] flex flex-col justify-end shadow-md">
              <div className="absolute inset-0 opacity-40 hero-mesh z-0 pointer-events-none"></div>
              <div className="relative z-10 space-y-1">
                <h1 className="text-2xl md:text-3.5xl font-extrabold tracking-tight">
                  {t("goodMorning")}, Demo User 👋
                </h1>
                <p className="text-sm md:text-base text-slate-300">
                  How can Saarthi assist you in your civic duties today?
                </p>
              </div>
              <div className="absolute top-4 right-6 w-20 h-20 opacity-15">
                <SparklesIcon className="w-full h-full text-white" />
              </div>
            </section>

            {/* Quick Action Tiles */}
            <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link
                href="/assistant"
                className="glass-card p-5 flex flex-col items-center gap-3 text-center transition-all hover:scale-[1.03] hover:shadow-md group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0B1F3A] dark:bg-slate-850 flex items-center justify-center text-white shadow-sm">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  {t("speak")}
                </span>
              </Link>

              <Link
                href="/report"
                className="glass-card p-5 flex flex-col items-center gap-3 text-center transition-all hover:scale-[1.03] hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-xl bg-[#fe9832] flex items-center justify-center text-white shadow-sm">
                  <Camera className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  {t("uploadPhoto")}
                </span>
              </Link>

              <Link
                href="/assistant?q=Show me schemes relevant to me"
                className="glass-card p-5 flex flex-col items-center gap-3 text-center transition-all hover:scale-[1.03] hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-sm">
                  <Search className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  {t("discoverSchemesTitle")}
                </span>
              </Link>

              <Link
                href="/assistant?q=What documents do I need for Aadhaar card update?"
                className="glass-card p-5 flex flex-col items-center gap-3 text-center transition-all hover:scale-[1.03] hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center text-white shadow-sm">
                  <FileCheck className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  {t("checkDocsTitle")}
                </span>
              </Link>
            </section>

            {/* Dynamic Registered Complaints Status Feed */}
            <section className="space-y-4">
              <h2 className="text-lg font-bold text-[#0B1F3A] dark:text-white flex items-center gap-2">
                <Clock className="h-4.5 w-4.5 text-[#fe9832]" />
                Recent Reported Incidents
              </h2>
              {loading ? (
                <div className="text-center py-6 text-xs text-slate-450">Loading complaints...</div>
              ) : complaints.length === 0 ? (
                <GlassCard className="p-6 text-center text-slate-500 text-xs">
                  No incidents reported yet. Snap a picture of a pothole or garbage pile to begin.
                </GlassCard>
              ) : (
                <div className="space-y-3">
                  {complaints.map((c) => (
                    <GlassCard key={c.id} className="p-4 flex items-center justify-between gap-4 border-l-4 border-l-emerald-500">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] font-bold text-[#0B1F3A] dark:text-white uppercase tracking-wider bg-slate-100 dark:bg-slate-900 px-1.5 py-0.5 rounded border dark:border-slate-800">
                            {c.id}
                          </span>
                          <span className="text-xs font-bold capitalize text-slate-850 dark:text-slate-200">
                            {c.issueType.replace("_", " ")}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1 max-w-[400px]">
                          {c.complaintText}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 text-right">
                        <div className="hidden sm:block">
                          <span className="text-[9px] text-slate-400 block">Department</span>
                          <span className="text-[10px] font-bold text-slate-700 dark:text-slate-350">{c.department}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-400 block">Status</span>
                          <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400">
                            {c.status}
                          </span>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              )}
            </section>

            {/* Suggestions Carousel */}
            <section className="space-y-3">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-[#0B1F3A] dark:text-white">
                  {t("suggestionsTitle")}
                </h2>
                <button className="text-xs font-bold text-[#fe9832] hover:underline">
                  View Calendar
                </button>
              </div>

              <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
                {/* Scholarship Suggestion */}
                <div className="glass-card p-4 min-w-[270px] snap-start border-l-4 border-l-[#fe9832] flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400 text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded">
                      Urgent
                    </span>
                    <Flame className="h-4 w-4 text-[#fe9832]" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    Scholarship Application
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Central Sector Scheme for College Students ends in 2 days.
                  </p>
                </div>

                {/* Passport Suggestion */}
                <div className="glass-card p-4 min-w-[270px] snap-start border-l-4 border-l-blue-500 flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-400 text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded">
                      Reminder
                    </span>
                    <Clock className="h-4 w-4 text-blue-500" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    Passport Renewal
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Your passport expires in 6 months. It's time to renew!
                  </p>
                </div>

                {/* Electricity Bill */}
                <div className="glass-card p-4 min-w-[270px] snap-start border-l-4 border-l-emerald-500 flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded">
                      Payment
                    </span>
                    <Zap className="h-4 w-4 text-emerald-500" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    Electricity Bill
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Bill amount ₹1,240 due by June 25th.
                  </p>
                </div>
              </div>
            </section>

            {/* Suggested Chips */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#0B1F3A] dark:text-white">
                {t("frequentlyAsked")}
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {faqList.map((faq, index) => (
                  <Link
                    key={index}
                    href={faq.href}
                    className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-350 hover:bg-[#0B1F3A] dark:hover:bg-white hover:text-white dark:hover:text-slate-900 hover:border-transparent transition-all shadow-sm"
                  >
                    {faq.text}
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Right Aside Info block */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Profile Summary Card */}
            <div className="glass-card p-6 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full border-4 border-white dark:border-slate-800 shadow-md mb-3.5 overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1IOtQmvbMOiAvdqULIpB-mkhV2vAbUgM5FHvTxVb_x0hrDwfyiVXYIGLL37YReNxJvYQDKJnfsku4JoPUsm5LHPlAU6ODWEcYrMADj9hRmWJCRZ7AfSO-sAAsrvsWfs9H7yBtYgzK0NH-QiA6Fx4qBwpPLEYSekhnlSV7BnM9pktmNkVlxOp_IB5au3NS2WDS8pCG3KHDv7fJDxpqkYlifRRdmgcFYvFzDtyXu84tba7Q5LLI1K8QNSEurck43K6LyoA8J7tdiQw8"
                  alt="Demo User Profile"
                />
              </div>
              <h3 className="font-sans text-lg font-bold text-[#0B1F3A] dark:text-white">
                Demo User
              </h3>
              <p className="text-[10px] font-bold text-slate-450 uppercase tracking-widest mb-5">
                {t("verifiedCitizenBadge")} | New Delhi
              </p>

              {/* Grid counters */}
              <div className="grid grid-cols-3 gap-2 w-full border-y border-slate-100 dark:border-slate-800 py-3.5 mb-5 text-center">
                <div>
                  <p className="font-sans text-base font-extrabold text-[#0B1F3A] dark:text-white">12</p>
                  <p className="text-[9px] uppercase font-bold text-slate-400">Docs</p>
                </div>
                <div className="border-x border-slate-100 dark:border-slate-800">
                  <p className="font-sans text-base font-extrabold text-[#0B1F3A] dark:text-white">
                    {loading ? "..." : complaints.length < 10 ? `0${complaints.length}` : complaints.length}
                  </p>
                  <p className="text-[9px] uppercase font-bold text-slate-400">Reports</p>
                </div>
                <div>
                  <p className="font-sans text-base font-extrabold text-[#0B1F3A] dark:text-white">05</p>
                  <p className="text-[9px] uppercase font-bold text-slate-400">Schemes</p>
                </div>
              </div>

              {/* Verified Account Badge */}
              <div className="flex items-center gap-1.5 px-4 py-2 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-450 rounded-full font-bold text-[10px] uppercase tracking-wider border border-emerald-500/10">
                <UserCheck className="h-3.5 w-3.5" />
                {t("trustedAccountBadge")}
              </div>
            </div>

            {/* Civic Alerts widget */}
            <div className="glass-card p-6 space-y-4">
              <h3 className="text-base font-extrabold text-[#0B1F3A] dark:text-white flex items-center gap-2">
                <AlertTriangle className="h-4.5 w-4.5 text-[#fe9832]" />
                {t("civicAlertsTitle")}
              </h3>

              <div className="space-y-3.5">
                {/* Alert 1 */}
                <div className="p-3 bg-amber-50 dark:bg-amber-950/10 rounded-xl border border-amber-500/10 flex gap-3 text-xs leading-normal">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 animate-pulse flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">Road Damage Alert</h4>
                    <p className="text-slate-550 dark:text-slate-400 text-[11px] mt-0.5">
                      Ongoing repairs on M.G. Road. Expected clearance by 4 PM.
                    </p>
                    <span className="text-[9px] font-bold text-[#fe9832] uppercase tracking-wider block mt-1.5">
                      Status: Amber
                    </span>
                  </div>
                </div>

                {/* Alert 2 */}
                <div className="p-3 bg-rose-50 dark:bg-rose-950/10 rounded-xl border border-rose-500/10 flex gap-3 text-xs leading-normal">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 animate-pulse flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">Water Leakage Notice</h4>
                    <p className="text-slate-550 dark:text-slate-400 text-[11px] mt-0.5">
                      Main pipe burst in Sector 12. Supply might be affected for 12 hours.
                    </p>
                    <span className="text-[9px] font-bold text-rose-500 uppercase tracking-wider block mt-1.5">
                      Status: Red
                    </span>
                  </div>
                </div>

                {/* Alert 3 */}
                <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex gap-3 text-xs leading-normal">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-450 mt-1.5 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">Street Light Repair</h4>
                    <p className="text-slate-550 dark:text-slate-400 text-[11px] mt-0.5">
                      Reported failure at Lane 4, Sector 7. Technical team assigned.
                    </p>
                    <span className="text-[9px] font-bold text-slate-450 uppercase tracking-wider block mt-1.5">
                      Status: Pending
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

// Sparkles inline component for header
function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5 5 3Z" />
      <path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5Z" />
    </svg>
  );
}
