import { useEffect, useState } from "react";
import { fetchCoinData } from "../../services/fetchCoinData";
import { useQuery } from "react-query";

function CoinTable() {
  const [page, setPage] = useState(1);

  // Fetch coin data using react-query
  const { data, isLoading, isError, error } = useQuery(
    ['coins', page],
    () => fetchCoinData(page, 'usd'), // Ensure fetchCoinData returns data
    {
      retry: 2,
      retryDelay: 1000,
      cacheTime: 1000 * 60 * 2,
    }
  );

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="my-5 flex flex-col items-center justify-center gap-5 w-[100vw] mx-auto">
        <div className="w-[100%] bg-yellow-600 flex py-4 text-black justify-evenly px-2 items-center">
          <div className="basis-[35%] flex justify-center items-center">Coin</div>
          <div className="basis-[25%]">Price</div>
          <div className="basis-[20%]">24h change</div>
          <div className="basis-[20%]">Market Cap</div>
        </div>
        <div className="flex flex-col w-[100vw] mx-auto">
          {/* Make sure `data` is defined before iterating */}
          { data.map((coin) => {
            return (
              <div key={coin.id} className="w-full bg-transparent text-white flex items-center justify-center py-4 px-2">
                <div className="flex items-center justify-center gap-3 basis-[35%]">
                  <div className="h-[5rem] w-[5rem]  flex items-center justify-center">
                    {/* Correct image source */}
                    <img src={coin.image} alt={coin.name} className="w-[5rem] h-[5rem] " />
                  </div>
                  <div className=" text-black flex items-center justify-center text-xl ">{coin.symbol}</div>
                </div>
                <div className="basis-[25%] text-black border-l">${coin.current_price}</div>
                <div className="basis-[20%] text-black">{coin.price_change_percentage_24h}%</div>
                <div className="basis-[20%] text-black">${coin.market_cap}</div>
               
              </div>
            );
          })}
           <div className=" flex justify-center items-center">
    
                    <button onClick={()=>{
                        setPage((page)=>page+1);
                    }}  className="  bg-yellow-600 font-extralight p-4 round drawer-button">
                        Next PAGE {page}
                    </button>
                </div>
        </div>
      </div>
    </>
  );
}

export default CoinTable;
