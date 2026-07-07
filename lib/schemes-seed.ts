export interface Scheme {
  id?: string;
  name: string;
  description: string;
  eligibilityCriteria: string[];
  requiredDocuments: string[];
  sourceUrl: string;
}

export const seedSchemes: Scheme[] = [
  {
    name: "Pradhan Mantri Kisan Samman Nidhi (PM-Kisan)",
    description: "An initiative by the Government of India that provides up to ₹6,000 per year in three equal installments to all small and marginal landholding farmer families.",
    eligibilityCriteria: [
      "Small and marginal farmer families",
      "Must own cultivable landholdings in their name",
      "Excludes institutional landholders, tax payers, and high-income professionals"
    ],
    requiredDocuments: [
      "Aadhaar Card",
      "Land Ownership Documents (Khatauni/Patta)",
      "Bank Account Details",
      "Mobile Number linked with Aadhaar"
    ],
    sourceUrl: "https://pmkisan.gov.in"
  },
  {
    name: "Ayushman Bharat (PM-JAY)",
    description: "The largest health assurance scheme in the world, providing a health cover of ₹5 Lakhs per family per year for secondary and tertiary care hospitalization.",
    eligibilityCriteria: [
      "Identified households based on SECC (Socio-Economic Caste Census) 2011 data",
      "Families living in one-room rental houses, landless households, or active manual scavengers",
      "No limit on family size or age"
    ],
    requiredDocuments: [
      "Aadhaar Card or Ration Card",
      "PMJAY Letter or Gold Card",
      "Active Mobile Number"
    ],
    sourceUrl: "https://pmjay.gov.in"
  },
  {
    name: "Pradhan Mantri Awas Yojana - Urban (PMAY-U)",
    description: "Provides central assistance to implementing agencies and urban local bodies for providing all-weather pucca houses to all eligible urban households.",
    eligibilityCriteria: [
      "Beneficiary family should not own a pucca house anywhere in India",
      "Economically Weaker Section (EWS) annual income up to ₹3 Lakhs",
      "Low Income Group (LIG) annual income between ₹3 Lakhs and ₹6 Lakhs"
    ],
    requiredDocuments: [
      "Aadhaar Card",
      "Income Certificate",
      "Address Proof",
      "Affidavit stating non-ownership of pucca house"
    ],
    sourceUrl: "https://pmay-urban.gov.in"
  },
  {
    name: "Atal Pension Yojana (APY)",
    description: "A pension scheme focused on the unorganized sector workers, guaranteeing a minimum monthly pension of ₹1,000 to ₹5,000 after the age of 60.",
    eligibilityCriteria: [
      "All Indian citizens between 18 and 40 years of age",
      "Must have a savings bank account",
      "Must not be a beneficiary of any social security scheme or a tax payer"
    ],
    requiredDocuments: [
      "Aadhaar Card",
      "Active Mobile Number",
      "Bank Account details with Auto-debit authorization"
    ],
    sourceUrl: "https://www.npscra.nsdl.co.in"
  },
  {
    name: "Pradhan Mantri Mudra Yojana (PMMY)",
    description: "Provides loans up to ₹10 Lakhs to non-corporate, non-farm small/micro enterprises. Divided into Shishu (up to ₹50,000), Kishor (up to ₹5 Lakhs), and Tarun (up to ₹10 Lakhs).",
    eligibilityCriteria: [
      "Non-corporate, non-farm small business owners",
      "Micro-enterprises engaged in manufacturing, trading, or service sectors",
      "Proprietorship/Partnership firms"
    ],
    requiredDocuments: [
      "Proof of Identity (Aadhaar/Voter ID)",
      "Proof of Address",
      "Business License/Registration certificate",
      "Quotations for machinery/assets to be purchased"
    ],
    sourceUrl: "https://www.mudra.org.in"
  },
  {
    name: "Sukanya Samriddhi Yojana (SSY)",
    description: "A small deposit scheme for a girl child launched as a part of 'Beti Bachao Beti Padhao' campaign. Offers high interest rates and tax savings.",
    eligibilityCriteria: [
      "Account opened by parent or legal guardian for girl child below 10 years of age",
      "Maximum of two accounts per family (three in case of twins/triplets)",
      "Minimum deposit of ₹250 and maximum ₹1.5 Lakhs per fiscal year"
    ],
    requiredDocuments: [
      "Birth Certificate of the girl child",
      "Aadhaar Card/PAN of the parent/guardian",
      "Address Proof (Utility Bill/Ration Card)"
    ],
    sourceUrl: "https://www.indiapost.gov.in"
  },
  {
    name: "Pradhan Mantri Jan Dhan Yojana (PMJDY)",
    description: "National Mission for Financial Inclusion to ensure access to financial services like banking savings & deposit accounts, remittance, credit, insurance, and pension.",
    eligibilityCriteria: [
      "Any Indian citizen aged 10 years or above",
      "Do not have a bank account already"
    ],
    requiredDocuments: [
      "Aadhaar Card (if address is updated)",
      "Voter ID / Driving License / Passport (if Aadhaar not available)"
    ],
    sourceUrl: "https://www.pmjdy.gov.in"
  },
  {
    name: "Pradhan Mantri Garib Kalyan Anna Yojana (PMGKAY)",
    description: "A food security welfare scheme providing 5 kg of free foodgrains per month to all beneficiaries covered under the National Food Security Act (NFSA).",
    eligibilityCriteria: [
      "Antyodaya Anna Yojana (AAY) households",
      "Priority Households (PHH) cardholders",
      "Covered under the NFSA"
    ],
    requiredDocuments: [
      "Ration Card",
      "Aadhaar Card linked to Ration Card",
      "Voter ID Card"
    ],
    sourceUrl: "https://nfsa.gov.in"
  },
  {
    name: "Pradhan Mantri Swanidhi Scheme (PM SVANidhi)",
    description: "A special micro-credit facility scheme for street vendors to access affordable working capital loans to resume their livelihoods post-pandemic.",
    eligibilityCriteria: [
      "Street vendors vending in urban areas on or before March 24, 2020",
      "Possess Certificate of Vending or Identity Card issued by Urban Local Bodies (ULBs)"
    ],
    requiredDocuments: [
      "Aadhaar Card / Voter ID Card",
      "Certificate of Vending (CoV) / Letter of Recommendation (LoR)",
      "Bank Account Passbook"
    ],
    sourceUrl: "https://pmsvanidhi.mohua.gov.in"
  },
  {
    name: "Pradhan Mantri Ujjwala Yojana (PMUY)",
    description: "A scheme targeting clean cooking fuel (LPG) access to women from BPL (Below Poverty Line) households, replacing unhealthy wood and coal stoves.",
    eligibilityCriteria: [
      "Adult woman belonging to a poor household (SC, ST, Most Backward Classes, or BPL)",
      "No other LPG connection exists in the same household"
    ],
    requiredDocuments: [
      "Aadhaar Card of applicant and adult family members",
      "Ration Card issued by State Govt",
      "BPL Certificate / Caste Certificate",
      "Bank Account details"
    ],
    sourceUrl: "https://www.pmuy.gov.in"
  },
  {
    name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    description: "Crop insurance scheme offering financial support to farmers suffering crop loss/damage arising out of unforeseen natural calamities.",
    eligibilityCriteria: [
      "All farmers growing notified crops in notified areas",
      "Includes tenant farmers and sharecroppers"
    ],
    requiredDocuments: [
      "Land Possession Certificate / Land record copy",
      "Sowing Certificate issued by Patwari/Gram Panchayat",
      "Bank Passbook copy",
      "Aadhaar Card"
    ],
    sourceUrl: "https://pmfby.gov.in"
  },
  {
    name: "Pradhan Mantri Kaushal Vikas Yojana (PMKVY)",
    description: "Flagship skill certification scheme aiming to enable a large number of Indian youth to take up industry-relevant skill training to secure a better livelihood.",
    eligibilityCriteria: [
      "Unemployed youth or school/college dropouts",
      "Possess a verifiable identity proof (Aadhaar/Voter ID)",
      "Age between 15 and 45 years"
    ],
    requiredDocuments: [
      "Aadhaar Card",
      "Educational qualification certificates",
      "Bank Passbook copy",
      "Recent passport size photographs"
    ],
    sourceUrl: "https://www.pmkvayofficial.org"
  },
  {
    name: "Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)",
    description: "A one-year life insurance scheme renewable from year to year, offering a life cover of ₹2 Lakhs in case of death due to any reason.",
    eligibilityCriteria: [
      "All individual bank account holders in the age group of 18 to 50 years",
      "Give consent to join and enable auto-debit of premium"
    ],
    requiredDocuments: [
      "Aadhaar Card",
      "Bank Account details",
      "Nominee Details and Declaration form"
    ],
    sourceUrl: "https://www.jansuraksha.gov.in"
  },
  {
    name: "Stand-Up India Scheme",
    description: "Promotes entrepreneurship among women and SC/ST communities by providing bank loans between ₹10 Lakhs and ₹1 Crore for starting a greenfield enterprise.",
    eligibilityCriteria: [
      "SC/ST and/or women entrepreneurs above 18 years of age",
      "Loans available only for greenfield enterprises (first-time venture)",
      "If non-individual, 51% shareholding must be held by SC/ST or woman"
    ],
    requiredDocuments: [
      "Aadhaar Card / Business PAN",
      "Caste Certificate (if SC/ST)",
      "Project Report & Certificate of Incorporation",
      "Bank statement for last 6 months"
    ],
    sourceUrl: "https://www.standupmitra.in"
  },
  {
    name: "National Social Assistance Programme (NSAP)",
    description: "Comprises pension schemes for elderly, widows, and disabled citizens from BPL households, providing monthly financial support.",
    eligibilityCriteria: [
      "Citizen belonging to a BPL household",
      "For Indira Gandhi National Old Age Pension: Age 60+",
      "For Indira Gandhi National Widow Pension: Age 40-79 and widow",
      "For Indira Gandhi National Disability Pension: Age 18-79 and 80%+ severe disability"
    ],
    requiredDocuments: [
      "Aadhaar Card",
      "BPL Ration Card / BPL Certificate",
      "Age proof",
      "Disability Certificate (for disability pension)",
      "Death Certificate of spouse (for widow pension)"
    ],
    sourceUrl: "https://nsap.nic.in"
  }
];
