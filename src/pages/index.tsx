import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Header from "~/components/header";
import Footer from "~/components/footer";
import ResultTable from "~/components/resultTable";
import Table from "~/components/table";
import Toast from "~/components/toast";

import { type FoodEntry, sides, chicken, chickenBreast, beef, seafood, appetizers } from "../data/data";

const Home: NextPage = () => {
  const [selectedItems, setSelectedItems] = useState<FoodEntry[]>([])
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
      </Head>
      <Header buttonClick={resetArray}/>
      <main className="flex flex-col relative overflow-auto bg-gradient-to-b from-[#2e026d] to-[#15162c]">

        {/* <p className="text-white text-center pt-4 md:pt-6">Click on the &quot;+&quot; to add an item to your list. List and total macros found at bottom of page.</p>
        <p className="text-white text-center pb-4 md:pb-6">You can reset the selected items but click on the &quot;Reset Selected&quot; button in the header.</p> */}

        <Table inputArray={sides} setItems={setSelectedItems} setToast={setToast} headerText="Sides"/>
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
      </main>
      <Footer />
    </>
  );
};

export default Home;
