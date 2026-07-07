"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { GlassCard } from "@/components/GlassCard";
import { TricolorSeparator } from "@/components/TricolorSeparator";
import { ComplaintAnalysisCard } from "@/components/ComplaintAnalysisCard";
import { TrackingSuccessCard } from "@/components/TrackingSuccessCard";
import { useLanguage } from "@/lib/i18n";
import { Upload, X, MapPin, Loader2, Sparkles, Image as ImageIcon, AlertTriangle } from "lucide-react";

export default function ReportPage() {
  const { t, language } = useLanguage();
  
  const [stage, setStage] = useState<"upload" | "analyzing" | "analyzed" | "success">("upload");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Analysis result states
  const [analysis, setAnalysis] = useState<any>(null);
  const [trackingId, setTrackingId] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerAnalysis = async () => {
    if (!selectedImage) return;

    setStage("analyzing");
    setAnalyzing(true);

    try {
      const res = await fetch("/api/analyze-complaint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: selectedImage,
          description: description
        })
      });

      if (!res.ok) {
        throw new Error("Complaint analysis failed");
      }

      const data = await res.json();
      setAnalysis(data.analysis);
      setTrackingId(data.trackingId);
      setStage("analyzed");
    } catch (err) {
      console.error(err);
      alert("AI Vision analysis failed. Please verify your GEMINI_API_KEY and try again.");
      setStage("upload");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleFinalSubmit = async (finalText: string) => {
    setSubmitting(true);
    // Mimic official filing action (metadata is already logged to Firestore in API route, 
    // but we update the text if they edited it)
    try {
      // In a real application, you'd send an API trigger to update the text.
      // Here, we just complete the flow in the UI after a brief delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStage("success");
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
  };

  const mockNearbyReports = [
    {
      type: "Road Defect (Pothole)",
      location: "Nehru Place, Delhi",
      depth: "12.4 cm detected",
      time: "2 hours ago",
      status: "Amber"
    },
    {
      type: "Water Leakage (Pipe Burst)",
      location: "Sector 12, Dwarka",
      time: "5 hours ago",
      status: "Red"
    },
    {
      type: "Streetlight Failure",
      location: "Lane 4, Connaught Place",
      time: "1 day ago",
      status: "Pending"
    }
  ];

  return (
    <div className={`min-h-[calc(100vh-64px)] flex bg-slate-50 dark:bg-slate-950 lang-${language}`}>
      <Sidebar />

      {/* Main Container Area */}
      <div className="flex-1 md:pl-64 flex flex-col h-[calc(100vh-64px)] overflow-hidden">
        <TricolorSeparator />

        <div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 overflow-hidden h-full">
          {/* Left Primary Interaction Column */}
          <main className="lg:col-span-8 overflow-y-auto p-6 md:p-8 h-full">
            <div aria-live="polite" aria-atomic="true" className="sr-only">
              {stage === "analyzing" ? "Saarthi is analyzing your uploaded photo..." : stage === "analyzed" ? "Vision report analysis completed." : stage === "success" ? "Complaint filed successfully." : ""}
            </div>
            {stage === "upload" && (
              <div className="max-w-2xl mx-auto space-y-6">
                <div>
                  <h1 className="text-2xl md:text-3.5xl font-extrabold text-[#0B1F3A] dark:text-white leading-tight">
                    {t("incidentReportTitle")}
                  </h1>
                  <p className="text-sm text-slate-500 mt-1.5">
                    File a report by snapping a photo of local municipal failures. Saarthi AI will categorize, tag, and draft your petition automatically.
                  </p>
                </div>

                <GlassCard className="p-6 md:p-8 space-y-6">
                  {/* Photo Upload Box */}
                  {!selectedImage ? (
                    <label
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          document.getElementById("civic-photo-upload")?.click();
                        }
                      }}
                      aria-label="Upload photo of civic issue"
                      className="flex flex-col items-center justify-center border-2 border-dashed border-slate-350 dark:border-slate-800 rounded-2xl h-64 hover:border-[#fe9832] transition-colors cursor-pointer group bg-slate-50/50 dark:bg-slate-900/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fe9832]"
                    >
                      <div className="flex flex-col items-center gap-3 text-center px-4">
                        <div className="h-12 w-12 rounded-xl bg-amber-50 dark:bg-amber-950/20 text-[#fe9832] flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Upload className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                            Upload a Photo
                          </p>
                          <p className="text-xs text-slate-450 dark:text-slate-500 mt-1 max-w-sm leading-normal">
                            {t("uploadDesc")}
                          </p>
                        </div>
                      </div>
                      <input
                        id="civic-photo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 h-64 bg-slate-900 flex items-center justify-center">
                      <img
                        src={selectedImage}
                        alt="Selected Civic Issue Preview"
                        className="max-h-full max-w-full object-contain"
                      />
                      <button
                        onClick={clearImage}
                        aria-label="Clear selected image"
                        className="absolute top-4 right-4 p-2 bg-slate-950/70 hover:bg-slate-950 text-white rounded-full shadow transition-all hover:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fe9832]"
                      >
                        <X className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  )}

                  {/* Optional Description */}
                  <div className="space-y-1.5">
                    <label htmlFor="incident-description" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                      {t("optionalDescriptionLabel")}
                    </label>
                    <textarea
                      id="incident-description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="e.g. Broken streetlight causing visibility issues at night..."
                      rows={3}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 p-4 text-sm focus:border-[#fe9832] focus:outline-none focus:ring-1 focus:ring-[#fe9832] focus-visible:ring-2 focus-visible:ring-[#fe9832] focus-visible:border-transparent dark:bg-slate-950/50 dark:text-white"
                    />
                  </div>

                  {/* Analyze Trigger Button */}
                  <button
                    onClick={triggerAnalysis}
                    disabled={!selectedImage || analyzing}
                    className="w-full saffron-gradient text-white font-bold py-4 rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fe9832] focus-visible:ring-offset-2"
                  >
                    {analyzing ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Sparkles className="h-5 w-5" />
                    )}
                    {analyzing ? "Analyzing..." : t("submitComplaintBtn")}
                  </button>
                </GlassCard>
              </div>
            )}

            {/* Analyzing Stage Loading screen */}
            {stage === "analyzing" && (
              <div className="flex flex-col items-center justify-center h-full max-w-md mx-auto text-center space-y-6">
                <Loader2 className="h-12 w-12 text-[#fe9832] animate-spin stroke-[2.5]" />
                <div className="space-y-1.5">
                  <h3 className="font-sans text-xl font-bold text-[#0B1F3A] dark:text-white">
                    Processing Image
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-normal">
                    {t("analyzingLabel")}
                  </p>
                </div>
              </div>
            )}

            {/* Result Stage */}
            {stage === "analyzed" && analysis && (
              <div className="max-w-3xl mx-auto">
                <ComplaintAnalysisCard
                  issueType={analysis.issueType}
                  severity={analysis.severity}
                  department={analysis.department}
                  estimatedResolution={analysis.estimatedResolution}
                  draftComplaint={analysis.draftComplaint}
                  confidenceScore={analysis.confidenceScore}
                  onSubmit={handleFinalSubmit}
                  submitting={submitting}
                />
              </div>
            )}

            {/* Success Stage */}
            {stage === "success" && analysis && (
              <div className="max-w-2xl mx-auto">
                <TrackingSuccessCard
                  trackingId={trackingId}
                  issueType={analysis.issueType}
                  department={analysis.department}
                  severity={analysis.severity}
                  estimatedResolution={analysis.estimatedResolution}
                />
              </div>
            )}
          </main>

          {/* Right Map/Nearby Reports Sidebar Panel */}
          <aside className="hidden lg:flex lg:col-span-4 flex-col h-full bg-slate-50 dark:bg-slate-950 overflow-y-auto p-6 space-y-6 border-l border-slate-200 dark:border-slate-800">
            {/* Map Placeholder */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <MapPin className="h-4 w-4 text-[#fe9832]" />
                Nearby Activity Radar
              </h3>
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 h-48 flex flex-col items-center justify-center p-4 text-center">
                {/* Visual grid pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#fe9832_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none"></div>
                <ImageIcon className="h-8 w-8 text-slate-450 mb-2" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-350">
                  Radar Area: Nehru Place, New Delhi
                </span>
                <span className="text-[10px] text-slate-450 mt-0.5">
                  Scanning 2km radius for community alerts
                </span>
              </div>
            </div>

            {/* Mock Reports List */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Nearby Active Reports
              </h3>

              <div className="space-y-3">
                {mockNearbyReports.map((report, idx) => (
                  <GlassCard key={idx} className="p-4 border-l-2 border-l-[#fe9832] dark:border-l-slate-700">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {report.type}
                      </h4>
                      {report.status && (
                        <span className="text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400">
                          {report.status}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-slate-400" />
                      {report.location}
                    </p>
                    {report.depth && (
                      <p className="text-[9px] font-semibold text-[#fe9832] mt-0.5">
                        {report.depth}
                      </p>
                    )}
                    <span className="text-[9px] text-slate-400 block mt-2 text-right">
                      {report.time}
                    </span>
                  </GlassCard>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
