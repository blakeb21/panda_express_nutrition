import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Header from "~/components/header";
import Footer from "~/components/footer";
import ResultTable from "~/components/resultTable";
import Table from "~/components/table";
import Toast from "~/components/toast";

import { type FoodEntry, halfSides, sides, chicken, chickenBreast, beef, seafood, appetizers } from "../data/data";

const Home: NextPage = () => {
  const [selectedItems, setSelectedItems] = useState<FoodEntry[]>([])
  const [halfSidesBool, setHalfSides] = useState<boolean>(false)
  const [showToast, setShowToast] = useState(false)
  const [toastText, setToastText] = useState('')

  function resetArray() {
    setSelectedItems([])
  }

  function setToast(item: string) {
    setToastText(item)

    setShowToast(true)
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }

  return (
    <>
      <Head>
        <title>Panda Express Nutrition Calculator</title>
        <meta name="description" content="A quick and easy way to calculate Panda Express macros" />
        <link rel="icon" href="/panda_logo_vector.svg" />

        <meta property="og:url"                content="https://panda-express-nutrition.vercel.app" />
        <meta property="og:type"               content="website" />
        <meta property="og:title"              content="Panda Express Nutrition Calculator" />
        <meta property="og:description"        content="A quick and easy way to calculate Panda Express macros" />
        <meta property="og:image"              content="http://panda-express-nutrition.vercel.app/panda_logo_vector.png" />
        <meta property="og:image:width"        content="1080" />
        <meta property="og:image:height"       content="1080" />

      </Head>
      <Header buttonClick={resetArray}/>
      <main className="flex flex-col relative overflow-auto bg-gradient-to-r from-[#9d0208] to-[#370617]">

        <p className="text-white text-center pt-4 md:pt-6">Click on the &quot;+&quot; to add an item to your list. List and total macros found at bottom of page.</p>
        <p className="text-white text-center pb-4 md:pb-6">You can reset the selected items but click on the &quot;Reset Selected&quot; button in the header.</p>
        

        {/* <div className="flex-row flex" style={{"maxWidth": "65ch"}}>
          <span className="mr-3 text-sm font-medium text-gray-900 dark:text-gray-300">Full Sides</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value={halfSidesBool} onClick={() => setHalfSides(!halfSidesBool)} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Half Sides</span>
          </label>
        </div> */}
        

        {halfSidesBool === false ? (
          <Table inputArray={sides} setItems={setSelectedItems} setToast={setToast} headerText="Sides"/>
        ) : (
          <Table inputArray={halfSides} setItems={setSelectedItems} setToast={setToast} headerText="Sides"/>
        )}
        <Table inputArray={chicken} setItems={setSelectedItems} setToast={setToast} headerText="Chicken"/>
        <Table inputArray={chickenBreast} setItems={setSelectedItems} setToast={setToast} headerText="Chicken Breast"/>
        <Table inputArray={beef} setItems={setSelectedItems} setToast={setToast} headerText="Beef"/>
        <Table inputArray={seafood} setItems={setSelectedItems} setToast={setToast} headerText="Seafood"/>
        <Table inputArray={appetizers} setItems={setSelectedItems} setToast={setToast} headerText="Appetizers"/>
        
        <ResultTable setItems={setSelectedItems} inputArray={selectedItems} />

        {showToast &&
        <div className='fixed left-[50%] translate-x-[-50%] bottom-[20px]'>
          <Toast itemName={toastText} setShowToast={setShowToast} />
        </div>}

        <p className="text-white text-center pt-4 md:pt-6">All information from Panda Express at <a className="text-yellow-500" href="https://www.pandaexpress.com/nutritioninformation">https://www.pandaexpress.com/nutritioninformation</a></p>
      </main>
      <Footer />
    </>
  );
};

export default Home;
