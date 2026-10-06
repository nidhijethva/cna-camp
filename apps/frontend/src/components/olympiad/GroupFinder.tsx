"use client";

import { useState } from "react";
import { Select } from "@/components/ui/Select";

type Group = "A" | "B" | "C";

const ages: Record<Group, string> = { A: "14+ to 16 years", B: "16+ to 18 years", C: "18 to 25 years" };

const groupFor = (std: string): Group => (std === "8" || std === "9" ? "A" : std === "10" || std === "11" ? "B" : "C");

/** Helper only: the organisers make the final eligibility check. */
export function GroupFinder() {
  const [role, setRole] = useState("student");
  const [std, setStd] = useState("");
  const [govt, setGovt] = useState("no");

  const teacher = role === "teacher";
  const group = std ? groupFor(std) : null;
  const scholarship =
    group && group !== "C" && govt === "yes"
      ? { text: "Scholarship 1 · K.S. Sir Lavkumar Khachar:", pct: "100%", fee: "₹90" }
      : group === "C" && govt === "yes"
        ? { text: "Scholarship 2 · Sir Dr. Ketankumar Trivedi:", pct: "up to 70%", note: " (if you now study in a govt. or grant-aided college)", fee: "₹108" }
        : { text: "Scholarship 2 · Sir Dr. Ketankumar Trivedi:", pct: "up to 60%", fee: "₹108" };

  return (
    <div id="finder" className="mt-8 grid scroll-mt-32 gap-6 rounded-card bg-dark p-6 text-light sm:p-8 lg:grid-cols-[1fr_1.1fr]">
      <div>
        <p className="font-mono text-[11.5px] uppercase tracking-[.12em] text-secondary">Not sure?</p>
        <h2 className="display h-sub mt-2 [zoom:1]">Which group am I?</h2>
        <p className="mt-2 text-light/70">Answer 3 quick questions. We show your group, fee and scholarship.</p>
        <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
          <label className="block sm:col-span-2">
            <span className="eyebrow text-light/60!">I am a</span>
            <Select
              name="role"
              options={[
                { value: "student", label: "Student" },
                { value: "teacher", label: "Teacher / sports person" },
              ]}
              value={role}
              onValueChange={setRole}
              className="mt-2 text-dark"
            />
          </label>
          {!teacher && (
            <>
              <label className="block">
                <span className="eyebrow text-light/60!">Studying in (2025-26)</span>
                <Select
                  name="std"
                  emptyLabel="Choose"
                  options={[
                    ...["8", "9", "10", "11", "12"].map((s) => ({ value: s, label: `Std ${s}` })),
                    { value: "col", label: "College / university" },
                  ]}
                  value={std}
                  onValueChange={setStd}
                  className="mt-2 text-dark"
                />
              </label>
              <label className="block">
                <span className="eyebrow text-light/60!">Passed Std 8 from a govt. school (or RTE)?</span>
                <Select
                  name="govt"
                  options={[
                    { value: "no", label: "No" },
                    { value: "yes", label: "Yes" },
                  ]}
                  value={govt}
                  onValueChange={setGovt}
                  className="mt-2 text-dark"
                />
              </label>
            </>
          )}
        </form>
      </div>
      <div className="rounded-card bg-light/5 p-6" aria-live="polite">
        {teacher ? (
          <>
            <p className="font-mono text-[11.5px] uppercase tracking-[.1em] text-secondary">Your group</p>
            <p className="display mt-1 text-[56px] leading-none">D</p>
            <p className="mt-3 font-bold">Teachers &amp; sports persons (25+)</p>
            <p className="mt-1 text-light/70">Join as a volunteer. No quiz needed.</p>
            <p className="mt-4 text-[22px] font-bold text-secondary">Fee ₹504</p>
          </>
        ) : group ? (
          <>
            <p className="font-mono text-[11.5px] uppercase tracking-[.1em] text-secondary">Your group</p>
            <p className="display mt-1 text-[56px] leading-none">{group}</p>
            <p className="mt-3 font-bold">Age {ages[group]}</p>
            <p className="mt-3 text-light/80">
              {scholarship.text} <strong>{scholarship.pct}</strong>
              {scholarship.note}
            </p>
            <p className="mt-4 text-[22px] font-bold text-secondary">Fee {scholarship.fee}</p>
            <p className="mt-4 text-[13px] text-light/50">
              Apply for only one scholarship. Your age must match the group. Organisers make the final check.
            </p>
          </>
        ) : (
          <p className="text-light/60">Choose your class to see your group.</p>
        )}
      </div>
    </div>
  );
}
