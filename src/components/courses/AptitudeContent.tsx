"use client";

import { useState } from "react";

interface TopicContent {
  title: string;
  content: React.ReactNode;
}

const aptitudeTopics: Record<string, TopicContent[]> = {
  "Analogy Reasoning": [
    {
      title: "What Is Analogy Reasoning?",
      content: (
        <div className="space-y-3">
          <p>Analogy means "resemblance of one object to another in certain respects." In reasoning tests, an analogy question gives you a pair of items that share a specific relationship, and asks you to identify or complete a second pair that shares the same relationship.</p>
          <p className="font-semibold">The skill being tested is:</p>
          <ol className="list-decimal list-inside space-y-1 ml-4">
            <li>Detect the exact logical link between the first pair</li>
            <li>Transfer that same link to find/verify the second pair</li>
          </ol>
          <div className="bg-[#FF6B1A]/10 p-3 rounded-lg mt-3">
            <p className="font-semibold text-[#FF6B1A]">Notation:</p>
            <ul className="list-disc list-inside ml-2 text-sm">
              <li><code className="bg-white px-1 rounded">:</code> means "is related to"</li>
              <li><code className="bg-white px-1 rounded">::</code> means "in the same way as"</li>
              <li>Example: A : B :: C : ?</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "The Two-Step Method (Master Key)",
      content: (
        <div className="space-y-3">
          <p className="font-semibold">This method applies to EVERY analogy question:</p>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-[#FFC83D]/20 p-3 rounded-lg border-l-4 border-[#FFC83D]">
              <p className="font-bold">Step 1</p>
              <p className="text-sm">Identify the precise relationship between the first pair. Be specific — not just "these are related" but HOW: synonym? tool-user? part-whole?</p>
            </div>
            <div className="bg-[#FF6B1A]/20 p-3 rounded-lg border-l-4 border-[#FF6B1A]">
              <p className="font-bold">Step 2</p>
              <p className="text-sm">Apply that same relationship to the third item to find the fourth, OR test each answer option against that relationship.</p>
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg border">
            <p className="font-semibold mb-2">Two Structural Patterns:</p>
            <ul className="text-sm space-y-2">
              <li><strong>Basic relation (1:2 :: 3:4):</strong> Doctor : Hospital :: Teacher : School</li>
              <li><strong>Advanced/cross relation (1:3 :: 2:4):</strong> Doctor : Teacher :: Hospital : School</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "33 Relationship Types Bank",
      content: (
        <div className="space-y-2">
          <p className="text-sm mb-3">Master these relationship categories for verbal/GK-based analogies:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
            {[
              { type: "Synonym", example: "Abandon : Leave" },
              { type: "Antonym", example: "Kind : Cruel" },
              { type: "Individual & Group", example: "Cattle : Herd" },
              { type: "Intensity", example: "Quarrel : War" },
              { type: "Worker & Product", example: "Author : Book" },
              { type: "Worker & Tool", example: "Surgeon : Scalpel" },
              { type: "Product & Raw Material", example: "Furniture : Wood" },
              { type: "Part & Whole", example: "Computer : Hard Disk" },
              { type: "Worker & Workplace", example: "Doctor : Hospital" },
              { type: "Tool & Action", example: "Knife : Cut" },
              { type: "Genuine Pair", example: "Lock : Key" },
              { type: "Study & Topic", example: "Pathology : Diseases" },
              { type: "Animal & Movement", example: "Horse : Gallop" },
              { type: "Animal & Sound", example: "Lion : Roar" },
              { type: "Individual & Class", example: "Lizard : Reptile" },
              { type: "Individual & Dwelling", example: "Bird : Nest" },
              { type: "Game & Playing Place", example: "Cricket : Pitch" },
              { type: "Male & Female", example: "Man : Woman" },
              { type: "Animal & Young One", example: "Frog : Tadpole" },
              { type: "Quantity & Unit", example: "Force : Newton" },
              { type: "Instrument & Measurement", example: "Thermometer : Temperature" },
              { type: "Country & Capital", example: "India : Delhi" },
              { type: "Country & Currency", example: "India : Rupee" },
              { type: "Country & Continent", example: "India : Asia" },
            ].map((item, i) => (
              <div key={i} className="bg-[#FFF6EC] p-2 rounded border">
                <p className="font-semibold text-[#140D08]">{item.type}</p>
                <p className="text-[#6B5847]">{item.example}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ],
  "Blood Relations": [
    {
      title: "Core Relationship Glossary",
      content: (
        <div className="space-y-3">
          <p>Master these relationships before solving any chain problems:</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { relation: "Mother's/Father's son", term: "Brother" },
              { relation: "Mother's/Father's daughter", term: "Sister" },
              { relation: "Mother's brother", term: "Maternal Uncle" },
              { relation: "Father's brother", term: "Paternal Uncle" },
              { relation: "Mother's/Father's sister", term: "Aunt" },
              { relation: "Mother's/Father's father", term: "Grandfather" },
              { relation: "Mother's/Father's mother", term: "Grandmother" },
              { relation: "Son's wife", term: "Daughter-in-law" },
              { relation: "Daughter's husband", term: "Son-in-law" },
              { relation: "Husband's/Wife's father", term: "Father-in-law" },
              { relation: "Husband's/Wife's mother", term: "Mother-in-law" },
              { relation: "Brother's/Sister's son", term: "Nephew" },
              { relation: "Brother's/Sister's daughter", term: "Niece" },
            ].map((item, i) => (
              <div key={i} className="bg-white p-2 rounded border flex justify-between">
                <span className="text-[#6B5847]">{item.relation}</span>
                <span className="font-semibold text-[#FF6B1A]">{item.term}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "The Family-Tree Method",
      content: (
        <div className="space-y-3">
          <p className="font-semibold">Train yourself to draw, every time, using this notation:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-sm">
            <div className="bg-white p-2 rounded border"><span className="text-xl">⊕</span><br/>Male</div>
            <div className="bg-white p-2 rounded border"><span className="text-xl">⊝</span><br/>Female</div>
            <div className="bg-white p-2 rounded border"><span className="text-xl">—</span><br/>Marriage/Couple</div>
            <div className="bg-white p-2 rounded border"><span className="text-xl">│</span><br/>Parent-Child</div>
          </div>
          <div className="bg-[#FF6B1A]/10 p-3 rounded-lg">
            <p className="font-bold mb-2">The 4-Step Process:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>List every named person as you read</li>
              <li>Mark gender the moment it's revealed by pronoun/relationship word</li>
              <li>Draw the tree step by step, one relationship at a time</li>
              <li>Read off the relationship between the two target people</li>
            </ol>
          </div>
        </div>
      ),
    },
  ],
  "Directional Sense": [
    {
      title: "Cardinal & Intermediate Directions",
      content: (
        <div className="space-y-3">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded-lg border">
              <p className="font-bold mb-2">4 Cardinal Directions</p>
              <p className="text-sm">North, East, South, West (N, E, S, W)</p>
              <p className="text-xs text-[#6B5847] mt-1">East is 90° clockwise from North</p>
            </div>
            <div className="bg-white p-3 rounded-lg border">
              <p className="font-bold mb-2">4 Intermediate Directions</p>
              <p className="text-sm">North-West, North-East, South-West, South-East</p>
            </div>
          </div>
          <div className="bg-[#FFC83D]/20 p-3 rounded-lg border-l-4 border-[#FFC83D]">
            <p className="font-bold">The One Rule That Governs Everything:</p>
            <p className="text-sm">Unless specified otherwise, the direction a person is initially facing, or the top of the page/map, is always taken as <strong>North</strong>.</p>
          </div>
        </div>
      ),
    },
    {
      title: "Right/Left Turn Logic",
      content: (
        <div className="space-y-3">
          <div className="bg-[#FF6B1A]/10 p-3 rounded-lg">
            <p className="font-bold">Critical Rule:</p>
            <p className="text-sm">Right and left are always with reference to the person/object moving — never with reference to you reading the question!</p>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-white p-3 rounded-lg border">
              <p className="font-bold text-[#FF6B1A]">Right Turn (Clockwise)</p>
              <p className="text-sm font-mono">N → E → S → W → N</p>
            </div>
            <div className="bg-white p-3 rounded-lg border">
              <p className="font-bold text-[#FFC83D]">Left Turn (Counter-clockwise)</p>
              <p className="text-sm font-mono">N → W → S → E → N</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Sun Rays & Shadow",
      content: (
        <div className="space-y-3">
          <div className="bg-white p-3 rounded-lg border">
            <p className="font-bold mb-2">Core Facts:</p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Sun rises in the <strong>East</strong>, sets in the <strong>West</strong></li>
              <li>Morning shadows fall towards <strong>West</strong></li>
              <li>Evening shadows fall towards <strong>East</strong></li>
            </ul>
          </div>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#140D08] text-white">
                <th className="p-2 border">Facing</th>
                <th className="p-2 border">Morning Shadow</th>
                <th className="p-2 border">Evening Shadow</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="p-2 border text-center">North</td><td className="p-2 border text-center">Left</td><td className="p-2 border text-center">Right</td></tr>
              <tr><td className="p-2 border text-center">South</td><td className="p-2 border text-center">Right</td><td className="p-2 border text-center">Left</td></tr>
            </tbody>
          </table>
        </div>
      ),
    },
  ],
  "Number Series": [
    {
      title: "The Differences-Row Technique",
      content: (
        <div className="space-y-3">
          <p>The single most powerful technique for number series:</p>
          <div className="bg-[#FF6B1A]/10 p-3 rounded-lg">
            <p className="font-bold">Method:</p>
            <p className="text-sm">Write the gaps between consecutive numbers as their own row underneath. If the gaps form a clean pattern, you've found the rule!</p>
          </div>
          <div className="bg-white p-3 rounded-lg border">
            <p className="font-semibold mb-2">Example: 8, 15, ?, 50, 78, 113</p>
            <p className="text-sm">Gaps: 7, ?, 22, 28, 35</p>
            <p className="text-sm">Gap of gaps: increases by 6, 7, 8... → missing gap is 15</p>
            <p className="text-sm text-[#FF6B1A] font-semibold">Answer: 15 + 15 = 30</p>
          </div>
        </div>
      ),
    },
    {
      title: "Pattern Checklist",
      content: (
        <div className="space-y-2">
          <p className="text-sm mb-2">When approaching any new series, check in this order:</p>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Is it going up or down overall?</li>
            <li>Check plain addition/subtraction — constant gap?</li>
            <li>Check multiplication/division — constant ratio?</li>
            <li>Write the gaps row — do gaps form a pattern?</li>
            <li>Check squares (1², 2², 3²...) and cubes (1³, 2³, 3³...)</li>
            <li>Check for alternating patterns (+, -, +, -)</li>
            <li>Check if it's primes</li>
            <li>Check combined operations (multiply-then-add)</li>
          </ol>
        </div>
      ),
    },
  ],
  "Letter Series": [
    {
      title: "EJOTY & VQLGB Shortcuts",
      content: (
        <div className="space-y-3">
          <p className="text-sm">These shortcuts let you find any letter's position instantly:</p>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-[#FF6B1A]/10 p-3 rounded-lg">
              <p className="font-bold text-[#FF6B1A]">EJOTY (Left to Right)</p>
              <div className="flex justify-between text-sm mt-2 font-mono">
                <span>E=5</span><span>J=10</span><span>O=15</span><span>T=20</span><span>Y=25</span>
              </div>
            </div>
            <div className="bg-[#FFC83D]/10 p-3 rounded-lg">
              <p className="font-bold text-[#FFC83D]">VQLGB (Right to Left)</p>
              <div className="flex justify-between text-sm mt-2 font-mono">
                <span>V=5</span><span>Q=10</span><span>L=15</span><span>G=20</span><span>B=25</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-[#6B5847]">Any letter is close to one of these 10 anchors — count 1-4 steps from the nearest anchor instead of counting from A or Z!</p>
        </div>
      ),
    },
    {
      title: "Wraparound Rule",
      content: (
        <div className="space-y-3">
          <div className="bg-[#FF6B1A]/10 p-3 rounded-lg border-l-4 border-[#FF6B1A]">
            <p className="font-bold">Important!</p>
            <p className="text-sm">When calculation lands on 0 or above 26:</p>
            <ul className="list-disc list-inside text-sm mt-2">
              <li>0 becomes 26 (Z)</li>
              <li>27 becomes 1 (A)</li>
            </ul>
          </div>
          <div className="bg-white p-3 rounded-lg border">
            <p className="font-semibold">Example: L, I, F, C, ?</p>
            <p className="text-sm">L=12, I=9, F=6, C=3 → Gap: -3 each time</p>
            <p className="text-sm">3 - 3 = 0 → 0 becomes 26 → <strong>Z</strong></p>
          </div>
        </div>
      ),
    },
  ],
  "Coding & Decoding": [
    {
      title: "Structure of Code Trick",
      content: (
        <div className="space-y-3">
          <p className="text-sm">When a code is built from the word's own properties:</p>
          <div className="bg-white p-3 rounded-lg border">
            <p className="font-semibold mb-2">Example Pattern:</p>
            <p className="text-sm">"plan" → "&N4"</p>
            <ul className="list-disc list-inside text-sm mt-2">
              <li>Symbol (&) = first letter code</li>
              <li>Letter (N) = last letter of word</li>
              <li>Number (4) = letter count</li>
            </ul>
          </div>
          <div className="bg-[#FFC83D]/20 p-3 rounded-lg">
            <p className="font-bold">Rule: [symbol for first letter] + [last letter] + [letter count]</p>
          </div>
        </div>
      ),
    },
    {
      title: "Cross-Reference Method",
      content: (
        <div className="space-y-3">
          <p className="text-sm">For sentence-based coding puzzles:</p>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li><strong>Find repeated words</strong> across sentences — and codes that also repeat</li>
            <li><strong>Confirm the pairing</strong> — that word = that code</li>
            <li><strong>Cross off</strong> matched words and codes</li>
            <li><strong>Repeat</strong> — fewer possibilities make next match obvious</li>
          </ol>
        </div>
      ),
    },
  ],
};

export function AptitudeContent({ moduleTitle }: { moduleTitle: string }) {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(0);
  const topics = aptitudeTopics[moduleTitle] || [];

  if (topics.length === 0) {
    return (
      <div className="text-center py-8 text-[#6B5847]">
        <p>Content coming soon for this module!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {topics.map((topic, index) => (
        <div key={index} className="border border-[#E3CDB4] rounded-lg overflow-hidden">
          <button
            onClick={() => setExpandedTopic(expandedTopic === index ? null : index)}
            className="w-full flex items-center justify-between p-3 bg-white hover:bg-[#FFF6EC] transition-colors text-left"
          >
            <span className="font-semibold text-[#140D08] text-sm">{topic.title}</span>
            <svg
              className={`w-5 h-5 text-[#FF6B1A] transition-transform ${expandedTopic === index ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedTopic === index && (
            <div className="p-4 bg-[#FEFCFA] border-t border-[#E3CDB4] text-sm text-[#4A3626]">
              {topic.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
