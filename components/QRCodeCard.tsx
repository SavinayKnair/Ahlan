"use client";
import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { Download, Copy, Check, ExternalLink, QrCode as QrIcon, Camera, Link2, Sparkles, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

interface QRCodeCardProps {
  initialUrl?: string;
  showScanner?: boolean;
}

export default function QRCodeCard({ initialUrl, showScanner = true }: QRCodeCardProps) {
  const [targetType, setTargetType] = useState<"website" | "custom">("website");
  const [customUrl, setCustomUrl] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [scannerActive, setScannerActive] = useState(false);
  const [scannedResult, setScannedResult] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Determine active URL
  const defaultWebsiteUrl = typeof window !== "undefined" 
    ? `${window.location.origin}/feedback` 
    : "https://ahlanandaman.in/feedback";

  const activeUrl = targetType === "website" ? (initialUrl || defaultWebsiteUrl) : (customUrl.trim() || defaultWebsiteUrl);

  // Generate QR Code data URL
  useEffect(() => {
    let isMounted = true;
    setIsGenerating(true);
    QRCode.toDataURL(activeUrl, {
      width: 450,
      margin: 2,
      color: {
        dark: "#0F172A",
        light: "#FFFFFF"
      },
      errorCorrectionLevel: "H"
    })
      .then((url) => {
        if (isMounted) {
          setQrDataUrl(url);
          setIsGenerating(false);
        }
      })
      .catch((err) => {
        console.error("QR Code generation error:", err);
        setIsGenerating(false);
      });

    return () => {
      isMounted = false;
    };
  }, [activeUrl]);

  // Copy URL to clipboard
  const copyUrl = () => {
    navigator.clipboard.writeText(activeUrl);
    setCopied(true);
    toast.success("Feedback link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate and download high-resolution printable tent card
  const downloadPrintableCard = async () => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Card Dimensions (Standard 4x6 ratio / A5 ratio)
      const width = 1000;
      const height = 1400;
      canvas.width = width;
      canvas.height = height;

      // 1. Background Gradient (Luxury Midnight Deep Ocean)
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, "#080F1E");
      bgGrad.addColorStop(0.5, "#0F1A30");
      bgGrad.addColorStop(1, "#070D1B");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Elegant Double Border with Gold Rim
      ctx.strokeStyle = "#D4AF37";
      ctx.lineWidth = 4;
      ctx.strokeRect(40, 40, width - 80, height - 80);

      ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(52, 52, width - 104, height - 104);

      // Corner gold diamonds
      const corners = [
        [40, 40], [width - 40, 40], [40, height - 40], [width - 40, height - 40]
      ];
      ctx.fillStyle = "#D4AF37";
      corners.forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Top Star Rating Badge
      ctx.font = "bold 20px sans-serif";
      ctx.fillStyle = "#E5C07B";
      ctx.textAlign = "center";
      ctx.fillText("★  ★  ★  ★  ★", width / 2, 130);

      ctx.font = "600 16px sans-serif";
      ctx.letterSpacing = "6px";
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      ctx.fillText("GUEST EXPERIENCE & REVIEWS", width / 2, 165);

      // 4. Homestay Title
      ctx.font = "bold 56px serif";
      ctx.fillStyle = "#FFFFFF";
      ctx.letterSpacing = "2px";
      ctx.fillText("AHLAN HOMESTAYS", width / 2, 245);

      ctx.font = "500 20px sans-serif";
      ctx.letterSpacing = "4px";
      ctx.fillStyle = "#D4AF37";
      ctx.fillText("PORT BLAIR  •  ANDAMAN ISLANDS", width / 2, 285);

      // Decorative divider
      ctx.strokeStyle = "#D4AF37";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 120, 315);
      ctx.lineTo(width / 2 + 120, 315);
      ctx.stroke();

      // 5. White QR Container with Gold Accent
      const qrBoxSize = 540;
      const qrBoxX = (width - qrBoxSize) / 2;
      const qrBoxY = 360;

      // Glow behind QR box
      ctx.shadowColor = "rgba(212, 175, 55, 0.35)";
      ctx.shadowBlur = 35;
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.roundRect(qrBoxX, qrBoxY, qrBoxSize, qrBoxSize, 28);
      ctx.fill();
      ctx.shadowBlur = 0; // reset shadow

      // Border on QR box
      ctx.strokeStyle = "rgba(212, 175, 55, 0.8)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(qrBoxX, qrBoxY, qrBoxSize, qrBoxSize, 28);
      ctx.stroke();

      // 6. Draw the QR Image
      const qrImg = new window.Image();
      qrImg.crossOrigin = "anonymous";
      qrImg.src = qrDataUrl;
      await new Promise((res) => {
        qrImg.onload = res;
      });
      ctx.drawImage(qrImg, qrBoxX + 35, qrBoxY + 35, qrBoxSize - 70, qrBoxSize - 70);

      // 7. Instructions & Call to action
      ctx.font = "bold 32px sans-serif";
      ctx.fillStyle = "#FFFFFF";
      ctx.letterSpacing = "0px";
      ctx.fillText("Scan With Your Phone Camera", width / 2, 970);

      ctx.font = "400 20px sans-serif";
      ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
      ctx.fillText("Point your mobile camera at the QR code to share your", width / 2, 1015);
      ctx.fillText("experience, ratings & feedback directly with us.", width / 2, 1045);

      // Website link pill
      ctx.fillStyle = "rgba(212, 175, 55, 0.15)";
      ctx.strokeStyle = "rgba(212, 175, 55, 0.5)";
      ctx.lineWidth = 1.5;
      const pillWidth = 460;
      const pillHeight = 52;
      const pillX = (width - pillWidth) / 2;
      const pillY = 1085;
      ctx.beginPath();
      ctx.roundRect(pillX, pillY, pillWidth, pillHeight, 26);
      ctx.fill();
      ctx.stroke();

      ctx.font = "600 18px monospace";
      ctx.fillStyle = "#E5C07B";
      ctx.fillText("ahlanandaman.in/feedback", width / 2, pillY + 33);

      // 8. Footer
      ctx.font = "500 17px sans-serif";
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.fillText("Thank you for choosing Ahlan Homestays!", width / 2, 1230);

      ctx.font = "400 15px sans-serif";
      ctx.fillStyle = "#D4AF37";
      ctx.fillText("WhatsApp / Direct Support: +91 94342 81386", width / 2, 1260);

      ctx.font = "400 13px sans-serif";
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.fillText("New Pahargaon, Behind Old Sapna Theater, Sri Vijaya Puram - 744 105", width / 2, 1290);

      // 9. Download the canvas
      const link = document.createElement("a");
      link.download = "Ahlan-Homestays-Feedback-QR-Card.png";
      link.href = canvas.toDataURL("image/png");
      link.click();

      toast.success("Printable QR Card downloaded successfully!");
    } catch (err) {
      console.error("Card generation failed:", err);
      toast.error("Failed to generate printable card");
    }
  };

  // Camera Scanner toggle
  const startCamera = async () => {
    try {
      setScannerActive(true);
      setScannedResult(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error("Camera access error:", err);
      toast.error("Could not access camera. Please allow camera permissions.");
      setScannerActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setScannerActive(false);
  };

  return (
    <div className="bg-white dark:bg-[#131323] rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-white/10 shadow-luxury space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-white/5 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-champagne uppercase tracking-widest mb-1">
            <QrIcon className="w-4 h-4" /> Downloadable QR Code
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-midnight dark:text-white">
            Guest Feedback QR Standee
          </h3>
          <p className="text-xs text-warmgray dark:text-gray-400 mt-0.5">
            Print this QR card to place in rooms or scan directly with your phone.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={downloadPrintableCard}
            disabled={!qrDataUrl || isGenerating}
            className="btn-primary py-2.5 px-4 text-xs flex items-center gap-2 font-medium"
            title="Download high-resolution printable card"
          >
            <Download className="w-4 h-4" />
            Download QR Card
          </button>
        </div>
      </div>

      {/* Target Link Selector */}
      <div className="bg-pearl dark:bg-white/5 rounded-2xl p-4 space-y-3">
        <label className="block text-xs font-sans text-warmgray dark:text-gray-400 uppercase tracking-wider font-semibold">
          QR Code Destination Link
        </label>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setTargetType("website")}
            className={`p-3 rounded-xl text-left border transition-all text-xs flex items-start gap-2.5 ${
              targetType === "website"
                ? "bg-white dark:bg-[#0A0A0F] border-champagne text-midnight dark:text-white shadow-sm"
                : "border-transparent text-warmgray hover:bg-white/60 dark:hover:bg-white/5"
            }`}
          >
            <Sparkles className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold">Website Feedback Form (Default)</div>
              <div className="text-[11px] text-warmgray dark:text-gray-400 mt-0.5">
                Stored in Cloudflare DB + Email Alert
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setTargetType("custom")}
            className={`p-3 rounded-xl text-left border transition-all text-xs flex items-start gap-2.5 ${
              targetType === "custom"
                ? "bg-white dark:bg-[#0A0A0F] border-champagne text-midnight dark:text-white shadow-sm"
                : "border-transparent text-warmgray hover:bg-white/60 dark:hover:bg-white/5"
            }`}
          >
            <Link2 className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold">Google Form / Custom Link</div>
              <div className="text-[11px] text-warmgray dark:text-gray-400 mt-0.5">
                Paste your custom Google Form or Review URL
              </div>
            </div>
          </button>
        </div>

        {targetType === "custom" && (
          <div className="pt-2">
            <input
              type="url"
              placeholder="https://forms.gle/... or Google Review link"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              className="w-full bg-white dark:bg-[#0A0A0F] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs text-midnight dark:text-white focus:outline-none focus:border-champagne transition-colors"
            />
          </div>
        )}
      </div>

      {/* Main Grid: QR Preview + Details */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* QR Preview Box */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-gradient-ocean rounded-2xl border border-champagne/30 text-center relative overflow-hidden">
          <div className="text-[10px] uppercase tracking-widest text-champagne font-bold mb-2">
            Ahlan Homestays
          </div>
          <div className="text-xs text-white/90 font-serif mb-4 font-semibold">
            Scan with Mobile Camera
          </div>

          <div className="bg-white p-3.5 rounded-2xl shadow-2xl relative">
            {qrDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={qrDataUrl}
                alt="Feedback QR Code"
                className="w-48 h-48 sm:w-56 sm:h-56 object-contain"
              />
            ) : (
              <div className="w-48 h-48 flex items-center justify-center">
                <RefreshCw className="w-6 h-6 animate-spin text-champagne" />
              </div>
            )}
          </div>

          <div className="text-[11px] text-white/70 mt-4 font-mono truncate max-w-full px-2">
            {activeUrl}
          </div>
        </div>

        {/* Quick Instructions & Controls */}
        <div className="md:col-span-7 space-y-4">
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-base text-midnight dark:text-white">
              How to use this QR Code:
            </h4>
            <ul className="space-y-2 text-xs text-warmgray dark:text-gray-300 leading-relaxed font-sans">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-champagne/20 text-champagne font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
                <span>Click <strong>Download QR Card</strong> to get a print-ready, high-resolution standee card.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-champagne/20 text-champagne font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
                <span>Print and place on room bedside tables, reception, or dining areas.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-champagne/20 text-champagne font-bold flex items-center justify-center shrink-0 text-[10px]">3</span>
                <span>Guests simply open their standard phone camera, scan the code, and submit their ratings.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-champagne/20 text-champagne font-bold flex items-center justify-center shrink-0 text-[10px]">4</span>
                <span>All submissions are saved in your database and alerts are dispatched to your email!</span>
              </li>
            </ul>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            <button
              onClick={copyUrl}
              className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 text-xs font-semibold text-midnight dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors flex items-center gap-2"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5 text-warmgray" />}
              {copied ? "Copied Link!" : "Copy Link"}
            </button>

            <a
              href={activeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 text-xs font-semibold text-midnight dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors flex items-center gap-2"
            >
              <ExternalLink className="w-3.5 h-3.5 text-warmgray" />
              Open Form Directly
            </a>

            {showScanner && (
              <button
                onClick={scannerActive ? stopCamera : startCamera}
                className="px-4 py-2.5 rounded-xl bg-champagne/10 hover:bg-champagne/20 text-champagne text-xs font-semibold transition-colors flex items-center gap-2"
              >
                <Camera className="w-3.5 h-3.5" />
                {scannerActive ? "Close Camera" : "Scan with Camera"}
              </button>
            )}
          </div>

          {/* Camera Scanner Viewfinder */}
          {scannerActive && (
            <div className="mt-4 p-4 rounded-2xl bg-black border border-champagne/40 relative space-y-3">
              <div className="flex items-center justify-between text-white text-xs">
                <span className="flex items-center gap-2 text-champagne font-semibold">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  Live Camera Scanner
                </span>
                <button
                  onClick={stopCamera}
                  className="text-white/60 hover:text-white text-[11px]"
                >
                  Turn Off
                </button>
              </div>

              <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-900 flex items-center justify-center">
                <video
                  ref={videoRef}
                  playsInline
                  className="w-full h-full object-cover"
                />
                {/* Viewfinder Target */}
                <div className="absolute inset-8 sm:inset-12 border-2 border-dashed border-champagne/80 rounded-2xl pointer-events-none flex items-center justify-center">
                  <div className="text-[10px] text-white/80 bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm">
                    Center QR Code here
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-white/60 text-center">
                Point your camera at any Ahlan QR code to test or scan.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
