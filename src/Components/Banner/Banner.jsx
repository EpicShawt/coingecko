
import bannerimg from "../../assets/bannerimg.jpg";
function Banner()
{
    return(<>
    <div className=" w-full h-[20rem] relative " >
<img src={bannerimg} alt="banner image" className=" h-full w-full" /> 
<div className=" absolute top-20 left-0 right-0 mx-auto w-[20rem] ">
    <div className=" flex flex-col gap-4">
        <div className=" font-semibold text-5xl text-white ">
Crypto Tracker
        </div>
 <div className="  font-semibold text-amber-50 text-center">
    Get all your crypto updates here
    </div> 
</div>
    </div>       
    </div>
    </>)
}
export default Banner;