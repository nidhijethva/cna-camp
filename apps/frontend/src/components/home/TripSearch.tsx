import Form from "next/form";
import { Select } from "@/components/ui/Select";
import { regionOrder, regions } from "@/content/site";

const regionOptions = regionOrder.map((r) => ({ value: r, label: regions[r].label }));

const typeOptions = [
  { value: "trek", label: "Trek" },
  { value: "camp", label: "Camp" },
  { value: "nature-trail", label: "Nature Trail" },
];

const monthOptions = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(
  (m) => ({ value: m.slice(0, 3).toLowerCase(), label: m }),
);

export function TripSearch() {
  return (
    <div className="wrap relative z-10 -mt-20">
      <Form
        action="/trips"
        role="search"
        aria-label="Find a trip"
        className="grid gap-3 rounded-card bg-light p-4 shadow-panel sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:p-5"
      >
        <label className="block">
          <span className="eyebrow">Where</span>
          <Select name="region" emptyLabel="Anywhere" options={regionOptions} className="mt-2" />
        </label>
        <label className="block">
          <span className="eyebrow">What</span>
          <Select name="type" emptyLabel="Treks, camps & trails" options={typeOptions} className="mt-2" />
        </label>
        <label className="block">
          <span className="eyebrow">When</span>
          <Select name="month" emptyLabel="Any month" options={monthOptions} className="mt-2" />
        </label>
        <button type="submit" className="btn btn-dark self-end">
          Find trips →
        </button>
      </Form>
    </div>
  );
}
