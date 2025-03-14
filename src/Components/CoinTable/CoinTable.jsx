import { useEffect, useState } from "react";
import { fetchCoinData } from "../../services/fetchCoinData";
import { useQuery } from "react-query";
import Loader from "../Loader/Loader";

function CoinTable({currency}) {
  const [page, setPage] = useState(1);


  
  const { data, isLoading, isError, error } = useQuery(
    ['coins', page , currency],
    () => fetchCoinData(page, currency), // Ensure fetchCoinData returns data
    {
      retry: 2,
      retryDelay: 1000,
      cacheTime: 1000 * 60 * 2,
      staleTime: 1000* 60*2,
    }
  );
  ()=>{
    if(currency==='inr')
    {
      setSymbol('Rs');
    }
  }

  // Handle loading state
  if (isLoading) {
    return <div className=" flex font-extrabold size-56 items-center justify-center">Loading... <Loader/></div>;
  }

  // Handle error state
  if (isError) {
    return <div className=" flex justify-center items-center size-67">Error: {error.message}</div>;
  }
  const currencySymbol = currency === 'inr' ? '₹' : '$';
  return (
    <>
      <div className="my-5 flex flex-col items-center justify-center gap-5 w-[100vw] mx-auto">
        <div className="w-[100%] bg-yellow-600 flex py-4 text-black justify-evenly px-2 items-center">
          <div className="basis-[35%] flex justify-center items-center">Coin</div>
          <div className="basis-[25%]">Price</div>
          <div className="basis-[20%]">24h change</div>
          <div className="basis-[20%]">Market Cap</div>
        </div>
        <div className="flex flex-col w-[100vw] mx-auto bg-slate-600">
        
          { data && data.map((coin) => {
            return (
              <div key={coin.id} className="w-full bg-transparent text-white flex items-center justify-center py-4 px-2">
                <div className="flex items-center justify-center gap-3 basis-[35%]">
                  <div className="h-[5rem] w-[5rem]  flex items-center justify-center">
                    {/* Correct image source */}
                    <img src={coin.image} alt={coin.name} className="w-[5rem] h-[5rem] " />
                  </div>
                  <div className=" flex flex-col  ">
                   <div className=" text-3xl ">
                    {coin.symbol.toUpperCase()}
                   </div>
                   <div className=" text-xl text-white">
                    {coin.name}

                   </div>
                    </div>
                </div>
                <div className="basis-[25%] text-white">{currencySymbol}{coin.current_price}</div>
                <div className="basis-[20%] text-white">{coin.price_change_percentage_24h}%</div>
                <div className="basis-[20%] text-white">{coin.market_cap}</div>
               
              </div>
            );
          })}

           <div className=" flex justify-center items-center">
          
    
                    <button 
                    disabled={page===1}
                    onClick={()=>{
                        setPage((page)=>page-1);
                    }}  className=" btn btn-primary btn-wide text-white text-2xl rounded-3xl">
                        Previous PAGE {page}
                    </button>
                    <button 
                    onClick={()=>{
                        setPage((page)=>page+1);
                    }}  className="btn btn-primary btn-wide text-white text-2xl rounded-3xl">
                        Next PAGE {page}
                    </button>
                </div>
        </div>
      </div>
    </>
  );
}

export default CoinTable;
