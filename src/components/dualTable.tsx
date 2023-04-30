import { type Dispatch, type SetStateAction, type FC } from 'react'
import { type FoodEntry } from '~/data/data'

export interface TableProps {
    inputArray: FoodEntry[],
    setItems: Dispatch<SetStateAction<FoodEntry[]>>,
    setToast: (item: string) => void,
    headerText: string,
}

const Table:FC<TableProps> = ({inputArray, setItems, setToast, headerText}) => {


    function buttonClicked(item: FoodEntry) {
        setItems(prevItems => {return [...prevItems, item]})
        setToast(item.name)
        return undefined
    }

  return (
    <>
    <div className="flex flex-col relative mx-auto md:min-w-[50%] relative overflow-x-auto shadow-md sm:rounded-lg">
        <h1 className='text-white text-2xl p-4 md:p-6'>{headerText}</h1>
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
                        Add Item
                    </th>
                </tr>
            </thead>
            <tbody>
                {inputArray.map((item) => (
                    <tr key={"tr-" + item.name} className="bg-white text-black font-medium even:bg-red-50 border-b">
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
                            <button onClick={() => buttonClicked(item)} className="font-medium text-green-600 hover:underline">
                                <svg aria-hidden="true" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                <span className="sr-only">Add to Selected</span>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    </>

  )
}

export default Table