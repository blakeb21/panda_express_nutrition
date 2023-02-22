import { type Dispatch, type SetStateAction, type FC } from 'react'
import { type FoodEntry } from '~/data/data'

export interface TableProps {
    inputArray: FoodEntry[],
    setItems: Dispatch<SetStateAction<FoodEntry[]>>,
}

const ResultTable:FC<TableProps> = ({inputArray, setItems,}) => {
    function buttonClicked(item: number) {
        setItems(prevActions => (
            // Filter out the item with the matching index
            prevActions.filter((value, idx) => idx !== item)
          ))
        return undefined
    }

    const results: FoodEntry = {
        name: "Sum",
        calories: inputArray.reduce((partialSum, a) => partialSum + a.calories, 0),
        protein: inputArray.reduce((partialSum, a) => partialSum + a.protein, 0),
        carbs: inputArray.reduce((partialSum, a) => partialSum + a.carbs, 0),
        fat: inputArray.reduce((partialSum, a) => partialSum + a.fat, 0),
    }
    


  return (
    <>
    <div className="flex flex-col mx-auto md:min-w-[50%] overflow-x-auto shadow-md sm:rounded-lg pb-4">
        <h1 className='text-white text-2xl p-4 md:p-6 pt-6 md:pt-20'>Selected Items</h1>
        <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-black uppercase bg-red-200 border-b">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Dish
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Calories
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Proten
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Carbs
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Fat
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Remove Item
                    </th>
                </tr>
            </thead>
            <tbody>
                {inputArray.map((item, idx) => (
                    <tr key={idx} className="bg-white even:bg-red-50 font-medium text-black border-b">
                        <th scope="row" className="px-6 py-4 whitespace-nowrap">
                            {item.name}
                        </th>
                        <td className="px-6 py-4">
                            {item.calories}
                        </td>
                        <td className="px-6 py-4">
                            {item.protein}
                        </td>
                        <td className="px-6 py-4">
                            {item.carbs}
                        </td>
                        <td className="px-6 py-4">
                            {item.fat}
                        </td>
                        <td className="px-6 py-4">
                            <button onClick={() => buttonClicked(idx)} className="font-medium text-red-700 hover:underline">
                                <svg aria-hidden="true" className="w-8 h-8 rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                <span className="sr-only">Remove from Selected</span>
                            </button>
                        </td>
                    </tr>
                ))}
                <tr key={"tr-" + results.name} className="bg-red-200 text-black font-medium border-b">
                        <th scope="row" className="px-6 py-4 whitespace-nowrap">
                            {results.name}
                        </th>
                        <td className="px-6 py-4">
                            {results.calories}
                        </td>
                        <td className="px-6 py-4">
                            {results.protein}
                        </td>
                        <td className="px-6 py-4">
                            {results.carbs}
                        </td>
                        <td className="px-6 py-4">
                            {results.fat}
                        </td>
                        <td className="px-6 py-4">
                            
                        </td>
                    </tr>
            </tbody>
        </table>
    </div>
    </>

  )
}

export default ResultTable