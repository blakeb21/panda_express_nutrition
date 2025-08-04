import { type FC, useMemo, useCallback, memo } from "react";
import { type FoodEntry, type QuantifiedFoodEntry } from "~/data/data";
import { usePostHog } from "posthog-js/react";

export interface ResultTableProps {
  readonly inputArray: readonly FoodEntry[];
  readonly quantifiedItems: readonly QuantifiedFoodEntry[];
  readonly removeItemByKey: (key: string) => void;
  readonly incrementQuantity: (key: string) => void;
  readonly decrementQuantity: (key: string) => void;
  readonly updateQuantity: (key: string, quantity: number) => void;
}

const ResultTable: FC<ResultTableProps> = memo(({ 
  inputArray, 
  quantifiedItems,
  removeItemByKey, 
  incrementQuantity, 
  decrementQuantity, 
  updateQuantity 
}) => {
  

  const posthog = usePostHog();

  const handleIncrement = useCallback((key: string) => {
    if (!key.trim()) return;
    
    const item = quantifiedItems.find((item) => item.key === key);
    incrementQuantity(key);
    posthog.capture("quantity_increment", { 
      item_key: key, 
      item_name: item?.name ?? 'Unknown Item',
      new_quantity: (item?.quantity ?? 0) + 1 
    });
  }, [incrementQuantity, quantifiedItems, posthog]);

  const handleDecrement = useCallback((key: string) => {
    if (!key.trim()) return;
    
    const item = quantifiedItems.find((item): item is QuantifiedFoodEntry => item.key === key);
    decrementQuantity(key);
    posthog.capture("quantity_decrement", { 
      item_key: key, 
      item_name: item?.name ?? 'Unknown Item',
      new_quantity: Math.max(0, (item?.quantity ?? 1) - 1) 
    });
  }, [decrementQuantity, quantifiedItems, posthog]);

  const handleRemoveAll = useCallback((key: string) => {
    if (!key.trim()) return;
    
    const item = quantifiedItems.find((item): item is QuantifiedFoodEntry => item.key === key);
    removeItemByKey(key);
    posthog.capture("remove_all_items", { 
      item_key: key, 
      item_name: item?.name ?? 'Unknown Item',
      removed_quantity: item?.quantity ?? 0
    });
  }, [removeItemByKey, quantifiedItems, posthog]);

  const handleQuantityChange = useCallback((key: string, value: string) => {
    if (!key.trim() || !value.trim()) return;
    
    const newQuantity = parseInt(value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0 && newQuantity <= 99) {
      const item = quantifiedItems.find((item): item is QuantifiedFoodEntry => item.key === key);
      updateQuantity(key, newQuantity);
      posthog.capture("quantity_manual_change", { 
        item_key: key, 
        item_name: item?.name ?? 'Unknown Item',
        old_quantity: item?.quantity ?? 0,
        new_quantity: newQuantity 
      });
    }
  }, [updateQuantity, quantifiedItems, posthog]);

  const results: FoodEntry = useMemo(() => ({
    name: "Sum",
    calories: inputArray.reduce((partialSum: number, a: FoodEntry) => partialSum + a.calories, 0),
    protein: inputArray.reduce((partialSum: number, a: FoodEntry) => partialSum + a.protein, 0),
    carbs: inputArray.reduce((partialSum: number, a: FoodEntry) => partialSum + a.carbs, 0),
    fat: inputArray.reduce((partialSum: number, a: FoodEntry) => partialSum + a.fat, 0),
  } as const), [inputArray]);

  return (
    <>
      <div id="results" className="relative mx-4 flex flex-col sm:min-w-[50%] md:mx-auto">
        {/* Header */}
        <div className="p-4 text-left text-2xl font-bold text-white md:p-6">
          Selected Items
        </div>

        {/* Mobile Card Layout */}
        <div className="block md:hidden space-y-3">
          {quantifiedItems.map((item) => (
            <div
              key={item.key}
              className="
                bg-white rounded-2xl shadow-md border border-gray-200
                p-4 transition-all duration-200 ease-in-out
              "
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-base leading-tight">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    {item.isHalfPortion && (
                      <span className="bg-orange-100 text-orange-700 rounded-full px-2 py-1 text-xs font-medium">
                        Half Portion
                      </span>
                    )}
                    <span className="bg-blue-100 text-blue-700 rounded-full px-2 py-1 text-xs font-medium">
                      Qty: {item.quantity}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="text-center p-2 bg-red-50 rounded-lg">
                  <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                    Calories
                  </div>
                  <div className="text-lg font-bold text-red-600">
                    {item.calories}
                  </div>
                </div>
                
                <div className="text-center p-2 bg-blue-50 rounded-lg">
                  <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                    Protein
                  </div>
                  <div className="text-lg font-bold text-blue-600">
                    {item.protein}g
                  </div>
                </div>
                
                <div className="text-center p-2 bg-green-50 rounded-lg">
                  <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                    Carbs
                  </div>
                  <div className="text-lg font-bold text-green-600">
                    {item.carbs}g
                  </div>
                </div>
                
                <div className="text-center p-2 bg-yellow-50 rounded-lg">
                  <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                    Fat
                  </div>
                  <div className="text-lg font-bold text-yellow-600">
                    {item.fat}g
                  </div>
                </div>
              </div>
              
              {/* Quantity Controls */}
              <div className="flex items-center justify-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                <button
                  onClick={() => handleDecrement(item.key)}
                  className="
                    min-h-[44px] min-w-[44px] p-2
                    bg-gray-200 hover:bg-gray-300 active:bg-gray-400
                    text-gray-700 font-bold rounded-lg
                    transition-all duration-200 ease-in-out
                    transform hover:scale-105 active:scale-95
                    focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50
                    flex items-center justify-center
                  "
                  aria-label={`Decrease quantity of ${item.name}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                  </svg>
                </button>
                
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">Quantity</span>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={item.quantity}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleQuantityChange(item.key, e.target.value)}
                    className="
                      w-16 h-10 text-center font-bold text-lg
                      border-2 border-gray-300 rounded-lg
                      focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                      transition-all duration-200
                    "
                    aria-label={`Quantity of ${item.name}`}
                  />
                </div>
                
                <button
                  onClick={() => handleIncrement(item.key)}
                  className="
                    min-h-[44px] min-w-[44px] p-2
                    bg-blue-200 hover:bg-blue-300 active:bg-blue-400
                    text-blue-700 font-bold rounded-lg
                    transition-all duration-200 ease-in-out
                    transform hover:scale-105 active:scale-95
                    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
                    flex items-center justify-center
                  "
                  aria-label={`Increase quantity of ${item.name}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              
              <button
                onClick={() => handleRemoveAll(item.key)}
                className="
                  w-full min-h-[44px] px-4 py-3
                  bg-gradient-to-r from-red-500 to-red-600
                  hover:from-red-600 hover:to-red-700
                  active:from-red-700 active:to-red-800
                  text-white font-bold text-base
                  rounded-xl shadow-md
                  transition-all duration-200 ease-in-out
                  transform hover:scale-[1.02] active:scale-[0.98]
                  focus:outline-none focus:ring-4 focus:ring-red-400/50
                  flex items-center justify-center gap-2
                "
                aria-label={`Remove all ${item.name} from your selection`}
              >
                <svg
                  className="w-5 h-5 rotate-45"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span>Remove All from Order</span>
              </button>
            </div>
          ))}

          {/* Mobile Totals Summary Card */}
          {quantifiedItems.length > 0 && (
            <div className="
              bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200
              rounded-2xl shadow-lg p-4 mt-4
            ">
              <h3 className="font-bold text-gray-900 text-lg mb-3 text-center">
                Order Totals
              </h3>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="text-center p-3 bg-red-100 rounded-lg border border-red-200">
                  <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                    Calories
                  </div>
                  <div className="text-2xl font-bold text-red-700">
                    {results.calories}
                  </div>
                </div>
                
                <div className="text-center p-3 bg-blue-100 rounded-lg border border-blue-200">
                  <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                    Protein
                  </div>
                  <div className="text-2xl font-bold text-blue-700">
                    {results.protein}g
                  </div>
                </div>
                
                <div className="text-center p-3 bg-green-100 rounded-lg border border-green-200">
                  <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                    Carbs
                  </div>
                  <div className="text-2xl font-bold text-green-700">
                    {results.carbs}g
                  </div>
                </div>
                
                <div className="text-center p-3 bg-yellow-100 rounded-lg border border-yellow-200">
                  <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                    Fat
                  </div>
                  <div className="text-2xl font-bold text-yellow-700">
                    {results.fat}g
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Table Layout */}
        <div className="hidden md:block shadow-md rounded-lg">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="border-b bg-red-200 text-xs uppercase text-black">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Dish
                </th>
                <th scope="col" className="max-w-min px-4 py-3 text-center">
                  Quantity
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
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {quantifiedItems.map((item) => (
                <tr
                  key={item.key}
                  className="border-b bg-white font-medium text-black even:bg-red-50"
                >
                  <td
                    scope="row"
                    className="max-w-[170px] p-1 py-2 sm:w-fit md:px-4 md:py-4"
                  >
                    <div className="flex flex-col">
                      <span>{item.name}</span>
                      {item.isHalfPortion && (
                        <span className="bg-orange-100 text-orange-700 rounded-full px-2 py-1 text-xs font-medium inline-block w-fit mt-1">
                          Half Portion
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-2 text-center md:px-4 md:py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleDecrement(item.key)}
                        className="
                          min-h-[32px] min-w-[32px] p-1
                          bg-gray-200 hover:bg-gray-300 active:bg-gray-400
                          text-gray-700 rounded transition-all duration-200
                          focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 flex items-center justify-center
                        "
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                        </svg>
                      </button>
                      
                      <input
                        type="number"
                        min="1"
                        max="99"
                        value={item.quantity}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleQuantityChange(item.key, e.target.value)}
                        className="
                          w-14 h-8 text-center font-bold text-sm
                          border border-gray-300 rounded
                          focus:border-blue-500 focus:ring-1 focus:ring-blue-200
                        "
                        aria-label={`Quantity of ${item.name}`}
                      />
                      
                      <button
                        onClick={() => handleIncrement(item.key)}
                        className="
                          min-h-[32px] min-w-[32px] p-1
                          bg-blue-200 hover:bg-blue-300 active:bg-blue-400
                          text-blue-700 rounded transition-all duration-200
                          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 flex items-center justify-center
                        "
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
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
                      onClick={() => handleRemoveAll(item.key)}
                      className="
                        min-h-[44px] px-3 py-2
                        font-medium text-red-600 hover:text-red-700 
                        hover:bg-red-50 active:bg-red-100
                        rounded-lg transition-all duration-200 ease-in-out
                        transform hover:scale-105 active:scale-95
                        focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50
                        flex items-center justify-center gap-1
                      "
                      aria-label={`Remove all ${item.name} from your selection`}
                    >
                      <svg
                        aria-hidden="true"
                        className="h-4 w-4 rotate-45"
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
                      <span className="text-xs">Remove All</span>
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
                <td className="p-2 text-center md:px-4 md:py-4 font-bold">
                  {quantifiedItems.reduce((sum, item) => sum + item.quantity, 0)} items
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
      </div>
    </>
  );
});

ResultTable.displayName = 'ResultTable';

export default ResultTable;
