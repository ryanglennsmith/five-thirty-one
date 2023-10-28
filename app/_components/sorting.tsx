"use client";
import { useState } from "react";
import RecordsTable from "./recordsTable";
import { IRecord } from "@/types/IRecord";
type Props = {
  records: IRecord[];
};
const Sorting = ({ records }: Props) => {
  const [showSort, setShowSort] = useState(false);
  const [filters, setFilters] = useState({
    startDate: "01-01-2021",
    endDate: "12-31-2999",
    cycleWeeks: [1, 2, 3, 4],
    lifts: ["dl", "sq", "bp", "ohp"],
    comments: false,
  });
  return (
    <div className="font-mono text-lime-500 relative min-h-full h-full pb-6 flex flex-col items-center justify-center">
      <div className="text-2xl mt-2" onClick={() => setShowSort(!showSort)}>
        sort
      </div>
      {showSort && (
        <>
          <div className="flex flex-row">
            <div className="flex flex-col mx-1">
              <label htmlFor="startDate" className="text-xl text-center">
                start date:
              </label>
              <input
                className=" bg-slate-950 mt-2 w-24 p-1 text-center"
                type="date"
                name="startDate"
                id="startDate"
                onChange={(e) => {
                  setFilters({ ...filters, startDate: e.target.value });
                }}
              />
            </div>
            <div className="flex flex-col mx-1">
              <label htmlFor="endDate" className="text-xl text-center">
                end date:
              </label>
              <input
                className=" bg-slate-950 mt-2 w-24 p-1 text-center"
                type="date"
                name="endDate"
                id="endDate"
                onChange={(e) => {
                  setFilters({ ...filters, endDate: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="flex flex-row">
            <fieldset className="flex flex-row px-1">
              <legend className="text-xl text-center">cycle weeks</legend>
              <div className="flex flex-col p-2">
                <input
                  type="checkbox"
                  name="week1"
                  id="week1"
                  checked={filters.cycleWeeks.includes(1)}
                  onChange={() => {
                    filters.cycleWeeks.includes(1)
                      ? setFilters({
                          ...filters,
                          cycleWeeks: filters.cycleWeeks.filter(
                            (week) => week !== 1
                          ),
                        })
                      : setFilters({
                          ...filters,
                          cycleWeeks: [...filters.cycleWeeks, 1],
                        });
                  }}
                />
                <label htmlFor="week1">1</label>
              </div>
              <div className="flex flex-col p-2">
                <input
                  type="checkbox"
                  name="week2"
                  id="week2"
                  checked={filters.cycleWeeks.includes(2)}
                  onChange={() => {
                    filters.cycleWeeks.includes(2)
                      ? setFilters({
                          ...filters,
                          cycleWeeks: filters.cycleWeeks.filter(
                            (week) => week !== 2
                          ),
                        })
                      : setFilters({
                          ...filters,
                          cycleWeeks: [...filters.cycleWeeks, 2],
                        });
                  }}
                />
                <label htmlFor="week2">2</label>
              </div>
              <div className="flex flex-col p-2">
                <input
                  type="checkbox"
                  name="week3"
                  id="week3"
                  checked={filters.cycleWeeks.includes(3)}
                  onChange={() => {
                    filters.cycleWeeks.includes(3)
                      ? setFilters({
                          ...filters,
                          cycleWeeks: filters.cycleWeeks.filter(
                            (week) => week !== 3
                          ),
                        })
                      : setFilters({
                          ...filters,
                          cycleWeeks: [...filters.cycleWeeks, 3],
                        });
                  }}
                />
                <label htmlFor="week3 p-2">3</label>
              </div>
              <div className="flex flex-col p-2">
                <input
                  type="checkbox"
                  name="week4"
                  id="week4"
                  checked={filters.cycleWeeks.includes(4)}
                  onChange={() => {
                    filters.cycleWeeks.includes(4)
                      ? setFilters({
                          ...filters,
                          cycleWeeks: filters.cycleWeeks.filter(
                            (week) => week !== 4
                          ),
                        })
                      : setFilters({
                          ...filters,
                          cycleWeeks: [...filters.cycleWeeks, 4],
                        });
                  }}
                />
                <label htmlFor="week4">4</label>
              </div>
            </fieldset>
          </div>
          <div className="flex flex-row">
            <fieldset className="flex flex-row px-1">
              <legend className="text-xl text-center">lifts</legend>
              <div className="flex flex-col p-2">
                <input
                  type="checkbox"
                  name="dl"
                  id="dl"
                  checked={filters.lifts.includes("dl")}
                  onChange={() => {
                    filters.lifts.includes("dl")
                      ? setFilters({
                          ...filters,
                          lifts: filters.lifts.filter((lift) => lift !== "dl"),
                        })
                      : setFilters({
                          ...filters,
                          lifts: [...filters.lifts, "dl"],
                        });
                  }}
                />
                <label htmlFor="dl">dl</label>
              </div>
              <div className="flex flex-col p-2">
                <input
                  type="checkbox"
                  name="sq"
                  id="sq"
                  checked={filters.lifts.includes("sq")}
                  onChange={() => {
                    filters.lifts.includes("sq")
                      ? setFilters({
                          ...filters,
                          lifts: filters.lifts.filter((lift) => lift !== "sq"),
                        })
                      : setFilters({
                          ...filters,
                          lifts: [...filters.lifts, "sq"],
                        });
                  }}
                />
                <label htmlFor="sq">sq</label>
              </div>
              <div className="flex flex-col p-2">
                <input
                  type="checkbox"
                  name="bp"
                  id="bp"
                  checked={filters.lifts.includes("bp")}
                  onChange={() => {
                    filters.lifts.includes("bp")
                      ? setFilters({
                          ...filters,
                          lifts: filters.lifts.filter((lift) => lift !== "bp"),
                        })
                      : setFilters({
                          ...filters,
                          lifts: [...filters.lifts, "bp"],
                        });
                  }}
                />
                <label htmlFor="bp">bp</label>
              </div>
              <div className="flex flex-col p-2">
                <input
                  type="checkbox"
                  name="ohp"
                  id="ohp"
                  checked={filters.lifts.includes("ohp")}
                  onChange={() => {
                    filters.lifts.includes("ohp")
                      ? setFilters({
                          ...filters,
                          lifts: filters.lifts.filter((lift) => lift !== "ohp"),
                        })
                      : setFilters({
                          ...filters,
                          lifts: [...filters.lifts, "ohp"],
                        });
                  }}
                />
                <label htmlFor="ohp">ohp</label>
              </div>
            </fieldset>
          </div>
          <fieldset className="flex flex-row px-1">
            <div className="flex flex-row px-2">
              <input
                type="radio"
                name="comments"
                id="commentsOnly"
                checked={filters.comments}
                onChange={() =>
                  setFilters({ ...filters, comments: !filters.comments })
                }
              />
              <label className="px-2" htmlFor="commentsOnly">
                commented only
              </label>
              <input
                type="radio"
                name="comments"
                id="all"
                checked={!filters.comments}
                onChange={() =>
                  setFilters({ ...filters, comments: !filters.comments })
                }
              />
              <label className="px-2" htmlFor="all">
                all
              </label>
            </div>
          </fieldset>
        </>
      )}

      <RecordsTable history={records} filters={filters} />
    </div>
  );
};

export default Sorting;
