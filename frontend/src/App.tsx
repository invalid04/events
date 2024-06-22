import EventCard from "./components/Custom/EventCard";
import TotalEvents from "./components/Custom/TotalEvents";


function App() {
  return (
    <div className='flex justify-center flex-col items-center'>
      <EventCard />
      <TotalEvents />
    </div>
  )
};

export default App;


