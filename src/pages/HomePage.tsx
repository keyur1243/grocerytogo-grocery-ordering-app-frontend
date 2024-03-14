import landingImage from "../assets/landing.jpg";
import appDownloadImage from "../assets/appDownload.png";
const HomePage  = () => {
    return(
        <div  className="flex flex-col gap-12">
            <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
                <h1 className="text-5xl font-bold taccking-tight text-orange-600"> Online Grocery Shopping</h1>
                <span className="text-xl">Grocery is just a click away!</span>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
                <img src={landingImage}/>
                <div className="flex flex-col item-center justify-center gap-4 text-center">
                    <span className="font-bold text-3xl tracking-tighter"> Order online even faster!</span>
                    <span>Download the GroceryToGo App for faster ordering and personalised recommendation</span>
                    <img src={appDownloadImage}/>
                </div>
            </div>
        </div>
    )
}
export default HomePage;