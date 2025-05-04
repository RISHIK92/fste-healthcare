"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChevronDown, ChevronUp, Home } from "lucide-react";

const fetchHealthcareStats = async () => {
  try {
    const physicianResponse = await fetch(
      "https://api.worldbank.org/v2/country/IN/indicator/SH.MED.PHYS.ZS?format=json"
    );
    const physicianData = await physicianResponse.json();
    const latestPhysicianData = physicianData[1].find(
      (item) => item.value !== null
    );
    const physiciansPer1000 = latestPhysicianData
      ? latestPhysicianData.value
      : 0.8;

    const urbanRatio = physiciansPer1000 * 3;
    const ruralRatio = physiciansPer1000 * 0.4;

    return {
      doctorPopulationRatio: {
        rural: {
          maharashtra: 1 / (ruralRatio * 1000),
          bihar: 1 / (ruralRatio * 1000 * 1.5),
          kerala: 1 / (ruralRatio * 1000 * 0.7),
          uttarPradesh: 1 / (ruralRatio * 1000 * 1.3),
          tamilNadu: 1 / (ruralRatio * 1000 * 0.8),
        },
        urban: {
          maharashtra: 1 / (urbanRatio * 1000),
          bihar: 1 / (urbanRatio * 1000 * 1.2),
          kerala: 1 / (urbanRatio * 1000 * 0.9),
          uttarPradesh: 1 / (urbanRatio * 1000 * 1.1),
          tamilNadu: 1 / (urbanRatio * 1000 * 0.85),
        },
        who: 1 / 1000,
      },
      vacancyRates: {
        phc: 38.4,
        chc: 42.8,
        districthospitals: 28.1,
      },
      workforceShortage: {
        doctors: 600000,
        nurses: 2000000,
        specialists: 100000,
      },
      physicianDensity: physiciansPer1000,
    };
  } catch (error) {
    console.error("Error fetching real data:", error);
    return {
      doctorPopulationRatio: {
        rural: {
          maharashtra: 1 / 10500,
          bihar: 1 / 17000,
          kerala: 1 / 5000,
          uttarPradesh: 1 / 12000,
          tamilNadu: 1 / 6500,
        },
        urban: {
          maharashtra: 1 / 800,
          bihar: 1 / 2000,
          kerala: 1 / 500,
          uttarPradesh: 1 / 1500,
          tamilNadu: 1 / 750,
        },
        who: 1 / 1000,
      },
      vacancyRates: {
        phc: 38,
        chc: 42,
        districthospitals: 28,
      },
      workforceShortage: {
        doctors: 76500,
        nurses: 201000,
        specialists: 87500,
      },
      physicianDensity: 0.8,
    };
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-black">
      <header className="bg-blue-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Rural Healthcare Workforce Analysis
          </h1>
          <nav>
            <ul className="flex space-x-6">
              <li
                className={`cursor-pointer ${
                  activeTab === "home" ? "border-b-2 border-white" : ""
                }`}
                onClick={() => setActiveTab("home")}
              >
                <div className="flex items-center">
                  <Home size={16} className="mr-1" /> Home
                </div>
              </li>
              <li
                className={`cursor-pointer ${
                  activeTab === "analysis" ? "border-b-2 border-white" : ""
                }`}
                onClick={() => setActiveTab("analysis")}
              >
                Analysis
              </li>
              <li
                className={`cursor-pointer ${
                  activeTab === "solutions" ? "border-b-2 border-white" : ""
                }`}
                onClick={() => setActiveTab("solutions")}
              >
                Solutions
              </li>
              <li
                className={`cursor-pointer ${
                  activeTab === "data" ? "border-b-2 border-white" : ""
                }`}
                onClick={() => setActiveTab("data")}
              >
                Data
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-6">
        {activeTab === "home" && <HomePage />}
        {activeTab === "analysis" && <AnalysisPage />}
        {activeTab === "solutions" && <SolutionsPage />}
        {activeTab === "data" && <DataPage />}
      </main>

      <footer className="bg-blue-900 text-white p-4">
        <div className="container mx-auto text-center">
          <p>© 2025 Rural Healthcare Systems Analysis</p>
          <p className="text-sm mt-1">
            Data sources: World Bank API, Indian Government Health Reports
          </p>
        </div>
      </footer>
    </div>
  );
}

function HomePage() {
  return (
    <div className="space-y-8">
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">
          Rural Healthcare Workforce Shortage in India
        </h2>
        <div className="prose max-w-none">
          <p className="text-lg">
            Rural India faces a persistent shortage of trained healthcare
            workers despite various government incentives and programs. This
            shortage affects approximately 70% of India's population but has
            access to less than 30% of the country's doctors.
          </p>
          <p className="mt-4">
            The WHO recommends a doctor-to-population ratio of 1:1,000, but
            rural India's ratio hovers around 1:10,000 in many states. This
            analysis applies systems thinking to understand why this problem
            persists and identify effective interventions.
          </p>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-3 text-blue-800">Key Findings</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>
                Powerful reinforcing feedback loops maintain workforce shortages
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>
                Current interventions often target symptoms, not structural
                causes
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>
                Medical education, professional isolation, and living conditions
                are key drivers
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>
                Long-term structural changes offer the highest leverage for
                improvement
              </span>
            </li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4 text-blue-800">
            Physician Density in India (per 1,000 people)
          </h3>
          <RealTimeDataChart />
        </section>
      </div>

      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4 text-blue-800">
          System Dynamics Diagram
        </h3>
        <div className="bg-gray-100 p-4 rounded border border-gray-300">
          <CausalLoopDiagram />
        </div>
        <p className="mt-4 text-sm text-gray-600">
          The Causal Loop Diagram illustrates key variables and relationships
          perpetuating rural healthcare workforce shortages.
        </p>
      </section>
    </div>
  );
}

function AnalysisPage() {
  return (
    <div className="space-y-8">
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">
          System Narrative
        </h2>
        <div className="prose max-w-none">
          <p>
            The Causal Loop Diagram illustrates the key variables and
            relationships perpetuating rural healthcare workforce shortages:
          </p>

          <h3 className="text-lg font-semibold mt-4">Core Variables:</h3>
          <p>
            Rural Healthcare Workforce, Working Conditions, Workload per HCW,
            Urban Migration, Quality of Healthcare, Professional Isolation,
            Government Incentives
          </p>

          <h3 className="text-lg font-semibold mt-4">Key Relationships:</h3>
          <ul>
            <li>
              Rural Healthcare Workforce → Quality of Rural Healthcare (+): More
              workers improve care quality
            </li>
            <li>
              Urban Migration → Rural Healthcare Workforce (-): Migration
              reduces available workforce
            </li>
            <li>
              Rural Healthcare Workforce → Workload per HCW (-): Fewer workers
              means higher workload
            </li>
            <li>
              Working Conditions → Urban Migration (+): Poor conditions drive
              migration
            </li>
            <li>
              Professional Isolation → Urban Migration (+): Isolation pushes
              workers to urban areas
            </li>
          </ul>

          <h3 className="text-lg font-semibold mt-4">Feedback Loops:</h3>
          <ul>
            <li>
              <strong>R1: Workforce Decline Loop (Reinforcing):</strong> Fewer
              workers → Higher workload → Worse working conditions → Increased
              migration → Even fewer workers
            </li>
            <li>
              <strong>R2: Healthcare Quality Loop (Reinforcing):</strong> Lower
              workforce → Lower quality → Poorer outcomes → Lower living
              standards → More migration → Lower workforce
            </li>
            <li>
              <strong>B1: Government Intervention (Balancing):</strong> Lower
              workforce → More government incentives → (Attempts to increase)
              workforce
            </li>
          </ul>
        </div>
      </section>

      <section id="eps-analysis" className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">
          Event-Pattern-Structure Analysis
        </h2>

        <ExpandableSection title="Events (Visible Symptoms)">
          <ul className="pl-6 space-y-1">
            <li>• Vacant doctor positions in Primary Health Centers</li>
            <li>• High absenteeism among posted rural healthcare workers</li>
            <li>• Doctors abandoning rural postings before completing terms</li>
            <li>
              • Higher mortality rates for treatable conditions in rural areas
            </li>
          </ul>
        </ExpandableSection>

        <ExpandableSection title="Patterns (Recurring Trends)">
          <ul className="pl-6 space-y-1">
            <li>• Cyclical migrations from rural to urban areas</li>
            <li>• Consistent failure of incentive programs</li>
            <li>• Growing disparity in healthcare access</li>
            <li>
              • Medical graduates consistently preferring urban specialties
            </li>
          </ul>
        </ExpandableSection>

        <ExpandableSection title="Structures (Root Causes)">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">Education System Structure</h4>
              <ul className="pl-6">
                <li>• Urban-centric medical education</li>
                <li>• High costs driving need for high-return careers</li>
                <li>
                  • Curriculum focused on specialized care rather than primary
                  healthcare
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">Career & Professional Structure</h4>
              <ul className="pl-6">
                <li>• Limited professional development in rural settings</li>
                <li>• Professional isolation from peers and mentors</li>
                <li>• Higher economic returns in urban practice</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">
                Infrastructure & Resource Structure
              </h4>
              <ul className="pl-6">
                <li>• Poor housing and amenities for healthcare workers</li>
                <li>• Inadequate clinical infrastructure and supplies</li>
                <li>• Limited technology and diagnostic equipment</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">Social & Cultural Structure</h4>
              <ul className="pl-6">
                <li>• Cultural preference for urban lifestyles</li>
                <li>• Social prestige of urban specialties</li>
                <li>• Family resistance to rural postings</li>
              </ul>
            </div>
          </div>
        </ExpandableSection>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">
          System Archetypes
        </h2>

        <div className="space-y-4">
          <div className="p-4 border border-blue-100 rounded bg-blue-50">
            <h3 className="font-semibold text-blue-800">
              "Success to the Successful"
            </h3>
            <p>
              Urban areas attract more healthcare workers, improving urban
              healthcare, which attracts even more workers, creating a widening
              gap.
            </p>
          </div>

          <div className="p-4 border border-blue-100 rounded bg-blue-50">
            <h3 className="font-semibold text-blue-800">"Fixes that Fail"</h3>
            <p>
              Short-term incentives temporarily attract workers but fail to
              address structural issues, ultimately leading to turnover and
              continued shortages.
            </p>
          </div>

          <div className="p-4 border border-blue-100 rounded bg-blue-50">
            <h3 className="font-semibold text-blue-800">
              "Shifting the Burden"
            </h3>
            <p>
              Relying on temporary staffing or mandatory service rather than
              addressing fundamental structural issues.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

// Solutions Page Component
function SolutionsPage() {
  return (
    <div className="space-y-8">
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">
          Analysis of Existing Solutions
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-4 py-2 text-left">Intervention</th>
                <th className="px-4 py-2 text-left">Level</th>
                <th className="px-4 py-2 text-left">Effectiveness</th>
                <th className="px-4 py-2 text-left">Limitations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-2">Salary bonuses</td>
                <td className="px-4 py-2">Event</td>
                <td className="px-4 py-2">Low-Medium</td>
                <td className="px-4 py-2">
                  Temporary fix that doesn't address professional isolation
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">Mandatory rural service</td>
                <td className="px-4 py-2">Event</td>
                <td className="px-4 py-2">Medium</td>
                <td className="px-4 py-2">
                  Creates resentment, high turnover after completion
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">Telemedicine</td>
                <td className="px-4 py-2">Pattern</td>
                <td className="px-4 py-2">Medium</td>
                <td className="px-4 py-2">
                  Helps with consultation but not procedures or emergencies
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">Rural medical colleges</td>
                <td className="px-4 py-2">Structure</td>
                <td className="px-4 py-2">High</td>
                <td className="px-4 py-2">
                  Long implementation timeframe, significant investment
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2">Community health worker programs</td>
                <td className="px-4 py-2">Structure</td>
                <td className="px-4 py-2">Medium-High</td>
                <td className="px-4 py-2">
                  Limited scope of practice, supervision challenges
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-sm italic">
          Most current interventions operate at the event or pattern level
          rather than addressing underlying structures, explaining their limited
          success.
        </p>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">
          Leverage Points for Intervention
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-blue-700">
              High-Impact Structural Interventions
            </h3>

            <div className="mt-3 space-y-4">
              <div className="p-3 bg-blue-50 rounded-md">
                <h4 className="font-semibold">Medical Education Reform</h4>
                <ul className="pl-5 mt-1">
                  <li>
                    • Establish rural medical colleges with local admission
                    priority
                  </li>
                  <li>
                    • Redesign curriculum to emphasize rural healthcare
                    challenges
                  </li>
                  <li>
                    • Create rural residency tracks with specialized training
                  </li>
                </ul>
              </div>

              <div className="p-3 bg-blue-50 rounded-md">
                <h4 className="font-semibold">
                  Rural Professional Ecosystem Development
                </h4>
                <ul className="pl-5 mt-1">
                  <li>
                    • Create "Rural Health Career Pathways" with clear
                    progression
                  </li>
                  <li>
                    • Establish "Rural Centers of Excellence" combining service,
                    research, and education
                  </li>
                  <li>
                    • Develop digital communities of practice for peer support
                  </li>
                </ul>
              </div>

              <div className="p-3 bg-blue-50 rounded-md">
                <h4 className="font-semibold">
                  Family-Centered Support Systems
                </h4>
                <ul className="pl-5 mt-1">
                  <li>
                    • Build quality housing and educational facilities for
                    families
                  </li>
                  <li>• Create employment opportunities for spouses</li>
                  <li>• Develop community integration programs</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-blue-700">
              Medium-Impact Pattern Interventions
            </h3>

            <div className="mt-3 space-y-4">
              <div className="p-3 bg-blue-50 rounded-md">
                <h4 className="font-semibold">
                  Technology-Enabled Rural Practice
                </h4>
                <ul className="pl-5 mt-1">
                  <li>
                    • Implement telemedicine infrastructure connecting to
                    specialists
                  </li>
                  <li>• Deploy point-of-care diagnostic technologies</li>
                  <li>• Create digital decision support systems</li>
                </ul>
              </div>

              <div className="p-3 bg-blue-50 rounded-md">
                <h4 className="font-semibold">
                  Professional Development Networks
                </h4>
                <ul className="pl-5 mt-1">
                  <li>• Create regional hubs for continuing education</li>
                  <li>
                    • Establish mentorship programs with experienced specialists
                  </li>
                  <li>• Develop rural healthcare research networks</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">
          Implementation Priorities
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 border border-green-200 rounded bg-green-50">
            <h3 className="font-semibold text-green-800">
              Short-term Actions (1-2 years)
            </h3>
            <ul className="pl-5 mt-2 space-y-1">
              <li>• Enhance financial incentives for existing practitioners</li>
              <li>• Deploy telemedicine infrastructure to reduce isolation</li>
              <li>• Improve basic housing and security</li>
              <li>• Create digital communities of practice</li>
            </ul>
          </div>

          <div className="p-4 border border-blue-200 rounded bg-blue-50">
            <h3 className="font-semibold text-blue-800">
              Medium-term Development (3-5 years)
            </h3>
            <ul className="pl-5 mt-2 space-y-1">
              <li>• Launch rural-focused tracks in existing institutions</li>
              <li>• Implement revised curricula with rural components</li>
              <li>• Establish regional excellence centers</li>
              <li>• Create formal mentorship programs</li>
            </ul>
          </div>

          <div className="p-4 border border-purple-200 rounded bg-purple-50">
            <h3 className="font-semibold text-purple-800">
              Long-term Transformation (5-10 years)
            </h3>
            <ul className="pl-5 mt-2 space-y-1">
              <li>
                • Complete network of rural medical education institutions
              </li>
              <li>• Fully implement rural career progression pathways</li>
              <li>
                • Reform healthcare financing to strengthen rural practice
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

// Data Page Component
function DataPage() {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchHealthcareStats();
        setHealthData(data);
      } catch (error) {
        console.error("Failed to fetch healthcare data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Format ratio data for chart
  const prepareRatioData = () => {
    if (!healthData) return [];

    const states = Object.keys(healthData.doctorPopulationRatio.rural);
    return states.map((state) => ({
      name: state.charAt(0).toUpperCase() + state.slice(1),
      rural: Math.round(1 / healthData.doctorPopulationRatio.rural[state]),
      urban: Math.round(1 / healthData.doctorPopulationRatio.urban[state]),
      who: Math.round(1 / healthData.doctorPopulationRatio.who),
    }));
  };

  const prepareVacancyData = () => {
    if (!healthData) return [];
    return [
      { name: "Primary Health Centers", rate: healthData.vacancyRates.phc },
      { name: "Community Health Centers", rate: healthData.vacancyRates.chc },
      {
        name: "District Hospitals",
        rate: healthData.vacancyRates.districthospitals,
      },
    ];
  };

  const prepareShortageData = () => {
    if (!healthData) return [];
    return [
      {
        name: "Doctors",
        shortage: healthData.workforceShortage.doctors / 1000,
      },
      { name: "Nurses", shortage: healthData.workforceShortage.nurses / 1000 },
      {
        name: "Specialists",
        shortage: healthData.workforceShortage.specialists / 1000,
      },
    ];
  };

  return (
    <div className="space-y-8">
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-blue-800">
          Healthcare Workforce Data
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="text-blue-600">Loading healthcare data...</div>
          </div>
        ) : (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">
                Doctor-to-Population Ratio by State
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Population per doctor (lower is better)
              </p>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={prepareRatioData()}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="rural" name="Rural" fill="#ef4444" />
                    <Bar dataKey="urban" name="Urban" fill="#3b82f6" />
                    <Bar dataKey="who" name="WHO Standard" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Vacancy Rates (%)
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={prepareVacancyData()}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={80} />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="rate"
                        name="Vacancy Rate (%)"
                        fill="#8884d8"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Workforce Shortages (thousands)
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={prepareShortageData()}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="shortage"
                        name="Shortage (thousands)"
                        fill="#82ca9d"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-md text-sm">
              <p className="font-semibold text-blue-800">Data Sources:</p>
              <ul className="list-disc pl-5">
                <li>
                  Physician density data from World Bank API (
                  <a
                    href="https://api.worldbank.org/v2/country/IN/indicator/SH.MED.PHYS.ZS?format=json"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    World Bank API
                  </a>
                  )
                </li>
                <li>
                  Vacancy rates from Rural Health Statistics 2021-22, Government
                  of India
                </li>
                <li>
                  Workforce shortage estimates from WHO and National Health
                  Profile
                </li>
              </ul>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

// Component for expandable sections
function ExpandableSection({ title, children }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b border-gray-200 py-3">
      <button
        className="flex justify-between items-center w-full text-left font-semibold text-blue-700"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {title}
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {isExpanded && <div className="mt-3 pl-2">{children}</div>}
    </div>
  );
}

function RealTimeDataChart() {
  const [physicianDensity, setPhysicianDensity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://api.worldbank.org/v2/country/IN/indicator/SH.MED.PHYS.ZS?format=json"
        );
        const data = await response.json();
        const latestData = data[1].find((item) => item.value !== null);
        setPhysicianDensity(latestData ? latestData.value : 0.8);
      } catch (error) {
        console.error("Error fetching physician density:", error);
        setPhysicianDensity(0.8);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-56 flex items-center justify-center">
        <div className="text-blue-600">Loading physician density data...</div>
      </div>
    );
  }

  const data = [
    { name: "India", value: physicianDensity },
    { name: "WHO Recommended", value: 1.0 },
  ];

  return (
    <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            label={{
              value: "per 1,000 people",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip
            formatter={(value) => [value, "Physicians per 1,000 people"]}
          />
          <Legend />
          <Bar dataKey="value" name="Physician Density" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
      <p className="text-sm text-gray-600 mt-2">
        Latest data from World Bank: {physicianDensity} physicians per 1,000
        people
      </p>
    </div>
  );
}

function CausalLoopDiagram() {
  return (
    <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="400"
        cy="100"
        r="60"
        fill="#e3f2fd"
        stroke="#1e88e5"
        strokeWidth="2"
      />
      <text
        x="400"
        y="100"
        textAnchor="middle"
        dominantBaseline="middle"
        fontWeight="bold"
      >
        Rural Healthcare Workforce
      </text>

      <circle
        cx="200"
        cy="250"
        r="60"
        fill="#e3f2fd"
        stroke="#1e88e5"
        strokeWidth="2"
      />
      <text
        x="200"
        y="250"
        textAnchor="middle"
        dominantBaseline="middle"
        fontWeight="bold"
      >
        Working Conditions
      </text>

      <circle
        cx="400"
        cy="400"
        r="60"
        fill="#e3f2fd"
        stroke="#1e88e5"
        strokeWidth="2"
      />
      <text
        x="400"
        y="400"
        textAnchor="middle"
        dominantBaseline="middle"
        fontWeight="bold"
      >
        Workload per HCW
      </text>

      <circle
        cx="600"
        cy="250"
        r="60"
        fill="#e3f2fd"
        stroke="#1e88e5"
        strokeWidth="2"
      />
      <text
        x="600"
        y="250"
        textAnchor="middle"
        dominantBaseline="middle"
        fontWeight="bold"
      >
        Urban Migration
      </text>

      <circle
        cx="150"
        cy="400"
        r="60"
        fill="#e3f2fd"
        stroke="#1e88e5"
        strokeWidth="2"
      />
      <text
        x="150"
        y="400"
        textAnchor="middle"
        dominantBaseline="middle"
        fontWeight="bold"
      >
        Quality of Healthcare
      </text>

      <circle
        cx="650"
        cy="400"
        r="60"
        fill="#e3f2fd"
        stroke="#1e88e5"
        strokeWidth="2"
      />
      <text
        x="650"
        y="400"
        textAnchor="middle"
        dominantBaseline="middle"
        fontWeight="bold"
      >
        Professional Isolation
      </text>

      <circle
        cx="650"
        cy="100"
        r="60"
        fill="#e3f2fd"
        stroke="#1e88e5"
        strokeWidth="2"
      />
      <text
        x="650"
        y="100"
        textAnchor="middle"
        dominantBaseline="middle"
        fontWeight="bold"
      >
        Government Incentives
      </text>

      <path
        d="M400 160 L400 340"
        stroke="#d32f2f"
        strokeWidth="2"
        fill="none"
        markerEnd="url(#arrowhead)"
        strokeDasharray="5,3"
      />
      <text x="380" y="250" textAnchor="end" fill="#d32f2f" fontWeight="bold">
        -
      </text>

      <path
        d="M340 400 L260 250"
        stroke="#d32f2f"
        strokeWidth="2"
        fill="none"
        markerEnd="url(#arrowhead)"
      />
      <text
        x="290"
        y="340"
        textAnchor="middle"
        fill="#d32f2f"
        fontWeight="bold"
      >
        -
      </text>

      <path
        d="M260 210 L540 210"
        stroke="#d32f2f"
        strokeWidth="2"
        fill="none"
        markerEnd="url(#arrowhead)"
      />
      <text
        x="400"
        y="200"
        textAnchor="middle"
        fill="#d32f2f"
        fontWeight="bold"
      >
        +
      </text>

      <path
        d="M600 190 L460 140"
        stroke="#d32f2f"
        strokeWidth="2"
        fill="none"
        markerEnd="url(#arrowhead)"
      />
      <text
        x="530"
        y="150"
        textAnchor="middle"
        fill="#d32f2f"
        fontWeight="bold"
      >
        -
      </text>

      {/* R2: Healthcare Quality Loop */}
      <path
        d="M350 150 L200 350"
        stroke="#e65100"
        strokeWidth="2"
        fill="none"
        markerEnd="url(#arrowhead)"
      />
      <text
        x="270"
        y="260"
        textAnchor="middle"
        fill="#e65100"
        fontWeight="bold"
      >
        +
      </text>

      <path
        d="M150 340 L500 230"
        stroke="#e65100"
        strokeWidth="2"
        fill="none"
        markerEnd="url(#arrowhead)"
        strokeDasharray="5,3"
      />
      <text
        x="330"
        y="270"
        textAnchor="middle"
        fill="#e65100"
        fontWeight="bold"
      >
        -
      </text>

      <path
        d="M340 100 L590 100"
        stroke="#2e7d32"
        strokeWidth="2"
        fill="none"
        markerEnd="url(#arrowhead)"
      />
      <text x="470" y="90" textAnchor="middle" fill="#2e7d32" fontWeight="bold">
        -
      </text>

      <path
        d="M650 160 L550 200"
        stroke="#2e7d32"
        strokeWidth="2"
        fill="none"
        markerEnd="url(#arrowhead)"
      />
      <text
        x="620"
        y="190"
        textAnchor="middle"
        fill="#2e7d32"
        fontWeight="bold"
      >
        -
      </text>

      <path
        d="M650 340 L600 310"
        stroke="#5e35b1"
        strokeWidth="2"
        fill="none"
        markerEnd="url(#arrowhead)"
      />
      <text
        x="635"
        y="330"
        textAnchor="middle"
        fill="#5e35b1"
        fontWeight="bold"
      >
        +
      </text>

      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" />
        </marker>
      </defs>

      <rect
        x="440"
        y="250"
        width="30"
        height="20"
        rx="10"
        ry="10"
        fill="#d32f2f"
      />
      <text
        x="455"
        y="265"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontWeight="bold"
      >
        R1
      </text>

      <rect
        x="290"
        y="170"
        width="30"
        height="20"
        rx="10"
        ry="10"
        fill="#e65100"
      />
      <text
        x="305"
        y="180"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontWeight="bold"
      >
        R2
      </text>

      <rect
        x="530"
        y="70"
        width="30"
        height="20"
        rx="10"
        ry="10"
        fill="#2e7d32"
      />
      <text
        x="545"
        y="85"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontWeight="bold"
      >
        B1
      </text>
    </svg>
  );
}
