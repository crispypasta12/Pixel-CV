import type { ResearchSimulation } from "@/types/game";

export const researchSimulations: ResearchSimulation[] = [
  {
    id: "firmware-malware",
    title: "Firmware Malware Detection",
    explanation:
      "A simulated explanation of firmware feature extraction, byte-pattern analysis, and ML-inspired classification. It is not a live detector.",
  },
  {
    id: "power-cybersecurity",
    title: "Power System Cybersecurity",
    explanation:
      "Research focused on cybersecurity, ML-based detection, and cyber-physical power system resilience.",
  },
];

export const firmwareAnalysisResults = {
  fileName: "smart_inverter_fw_sample.bin",
  classification: "Suspicious",
  confidence: 87,
  features: [
    42, 66, 81, 38, 92, 58, 74, 21, 63, 88, 34, 76, 54, 69, 97, 31,
    45, 79, 84, 27, 62, 91, 57, 36, 72, 86, 48, 65, 90, 29, 52, 78,
  ],
};
