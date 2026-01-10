import React from "react";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const [month, day, year] = dateString.split("/").map(Number);

  const suffix = (d) =>
    d > 3 && d < 21 ? "th" : ["th", "st", "nd", "rd"][d % 10] || "th";

  return (
    <>
      {day}
      <sup className="text-xs">{suffix(day)}</sup>{" "}
      {new Date(year, month - 1).toLocaleString("default", { month: "long" })}{" "}
      {year}
    </>
  );
};

const jobs = [
  {
    title: "Nursing Officer",
    closingDate: "12/30/2026",
  },
  {
    title: "Medical Laboratory Technologist",
    closingDate: "01/15/2027",
  },
];

const CareersPage = () => {
  return (
    <div className="max-w-5xl mx-auto pt-36 px-4 pb-20">

      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-semibold text-gray-900 mb-3">
          Careers at Ultracare Hospital
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Our people are our greatest strength. Explore current opportunities and
          join a team committed to delivering exceptional patient care.
        </p>
      </div>

      {/* Scam Alert */}
      <div className="mb-10 rounded-xl border border-amber-200 bg-amber-50 p-6">
        <h2 className="font-semibold text-amber-900 mb-2">
          ⚠️ Recruitment Scam Alert
        </h2>
        <ul className="list-disc pl-5 text-sm text-amber-800 space-y-1">
          <li>No recruitment fees are charged.</li>
          <li>Official communication uses verified hospital emails.</li>
          <li>No offers are made without interviews.</li>
          <li>Contracts are signed at the HR office only.</li>
        </ul>
      </div>

      {/* Vacancies */}
      <div className="space-y-4">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition"
          >
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {job.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Closing Date: {formatDate(job.closingDate)}
              </p>
            </div>

            <div className="text-sm text-gray-400">
              Coming soon
            </div>
          </div>
        ))}
      </div>

      {/* Empty state (future-ready) */}
      {jobs.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No vacancies available at the moment.
        </div>
      )}
    </div>
  );
};

export default CareersPage;
