import { type Dispatch, type SetStateAction, type FC, memo, useCallback } from "react";
import { type FoodEntry } from "~/data/data";

export interface TableProps {
  inputArray: readonly FoodEntry[];
  setItems: ((item: FoodEntry) => void) | Dispatch<SetStateAction<FoodEntry[]>>;
  setToast: (item: string) => void;
  headerText: string;
}

const Table: FC<TableProps> = memo(({
  inputArray,
  setItems,
  setToast,
  headerText,
}) => {
  const buttonClicked = useCallback((item: FoodEntry) => {
    if (typeof setItems === 'function' && setItems.length === 1) {
      // New API: function that accepts a single FoodEntry
      (setItems as (item: FoodEntry) => void)(item);
    } else {
      // Legacy API: setState function
      (setItems as Dispatch<SetStateAction<FoodEntry[]>>)((prevItems: FoodEntry[]) => {
        return [...prevItems, item];
      });
    }
    setToast(item.name);
  }, [setItems, setToast]);

  return (
    <>
      <div className="relative mx-4 flex flex-col shadow-md sm:min-w-[50%] sm:rounded-lg md:mx-auto">
        <table className="w-full text-left text-sm text-gray-500">
          <caption className="p-4 text-left text-2xl font-bold text-white md:p-6">
            {headerText}
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
                Add Item
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
                Log
              </th>
            </tr>
          </thead>
          <tbody>
            {inputArray.map((item) => (
              <tr
                key={"tr-" + item.name}
                className="border-b bg-white font-medium text-black even:bg-red-50"
              >
                <td
                  scope="row"
                  className="max-w-[170px] p-1 py-2 sm:w-fit md:px-4 md:py-4"
                >
                  {item.name}
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
                <td className="flex p-2 md:px-4 md:py-4">
                  <button
                    onClick={() => buttonClicked(item)}
                    className="mx-auto font-medium text-green-600 hover:underline"
                  >
                    <svg
                      aria-hidden="true"
                      className="h-8 w-8"
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
                    <span className="sr-only">Add to Selected</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
});

Table.displayName = 'Table';

export default Table;
