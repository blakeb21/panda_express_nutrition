import { type FC, useMemo, useCallback, memo } from "react";
import { type FoodEntry } from "~/data/data";

export interface ResultTableProps {
  readonly inputArray: readonly FoodEntry[];
  readonly removeItem: (index: number) => void;
}

const ResultTable: FC<ResultTableProps> = memo(({ inputArray, removeItem }) => {
  const buttonClicked = useCallback((index: number) => {
    removeItem(index);
  }, [removeItem]);

  const results: FoodEntry = useMemo(() => ({
    name: "Sum",
    calories: inputArray.reduce((partialSum, a) => partialSum + a.calories, 0),
    protein: inputArray.reduce((partialSum, a) => partialSum + a.protein, 0),
    carbs: inputArray.reduce((partialSum, a) => partialSum + a.carbs, 0),
    fat: inputArray.reduce((partialSum, a) => partialSum + a.fat, 0),
  }), [inputArray]);

  return (
    <>
      <div id="results" className="relative mx-4 flex flex-col shadow-md sm:min-w-[50%] sm:rounded-lg md:mx-auto">
        <table className="w-full text-left text-sm text-gray-500">
          <caption className="p-4 text-left text-2xl font-bold text-white md:p-6">
            Selected Items
          </caption>
          <thead className="hidden border-b bg-red-200 text-xs uppercase text-black md:table-header-group">
            <tr>
              <th scope="col" className="px-4 py-3">
                Dish
              </th>
              <th scope="col" className="max-w-min px-4 py-3 text-center">
                Calories
              </th>
              <th scope="col" className="max-w-min px-4 py-3 text-center">
                Protein
              </th>
              <th scope="col" className="max-w-min px-4 py-3 text-center">
                Carbs
              </th>
              <th scope="col" className="max-w-min px-4 py-3 text-center">
                Fat
              </th>
              <th scope="col" className="max-w-min px-4 py-3 text-center">
                Remove
              </th>
            </tr>
          </thead>
          <thead className="table-header-group border-b bg-red-200 text-xs uppercase text-black md:hidden">
            <tr>
              <th scope="col" className="p-2">
                Dish
              </th>
              <th scope="col" className="p-2 text-center ">
                Cal
              </th>
              <th scope="col" className="p-2 text-center ">
                P
              </th>
              <th scope="col" className="p-2 text-center ">
                C
              </th>
              <th scope="col" className="p-2 text-center ">
                F
              </th>
              <th scope="col" className="p-2 text-center ">
                Remove
              </th>
            </tr>
          </thead>
          <tbody>
            {inputArray.map((item, idx) => (
              <tr
                key={idx}
                className="border-b bg-white font-medium text-black even:bg-red-50"
              >
                <td
                  scope="row"
                  className="max-w-[170px] p-1 py-2 sm:w-fit md:px-4 md:py-4"
                >
                  <div className="flex flex-col">
                    <span>{item.name}</span>
                    {item.isHalfPortion && (
                      <span className="text-xs text-orange-600 font-medium">
                        Half Portion
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-2 text-center md:px-4 md:py-4">
                  {item.calories}
                </td>
                <td className="p-2 text-center md:px-4 md:py-4">
                  {item.protein}
                </td>
                <td className="p-2 text-center md:px-4 md:py-4">
                  {item.carbs}
                </td>
                <td className="p-2 text-center md:px-4 md:py-4">{item.fat}</td>
                <td className="p-2 text-center md:px-4 md:py-4">
                  <button
                    onClick={() => buttonClicked(idx)}
                    className="font-medium text-red-700 hover:underline"
                  >
                    <svg
                      aria-hidden="true"
                      className="h-8 w-8 rotate-45"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      ></path>
                    </svg>
                    <span className="sr-only">Remove from Selected</span>
                  </button>
                </td>
              </tr>
            ))}
            <tr
              key={"tr-" + results.name}
              className="border-b bg-red-200 font-medium text-black"
            >
              <td
                scope="row"
                className="max-w-[170px] p-1 py-2 sm:w-fit md:px-4 md:py-4"
              >
                {results.name}
              </td>
              <td className="p-2 text-center md:px-4 md:py-4">
                {results.calories}
              </td>
              <td className="p-2 text-center md:px-4 md:py-4">
                {results.protein}
              </td>
              <td className="p-2 text-center md:px-4 md:py-4">
                {results.carbs}
              </td>
              <td className="p-2 text-center md:px-4 md:py-4">{results.fat}</td>
              <td className="px-6 py-4"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
});

ResultTable.displayName = 'ResultTable';

export default ResultTable;
