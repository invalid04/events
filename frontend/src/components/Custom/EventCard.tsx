import { useState } from 'react';
import {
    Card,
    CardDescription,
    CardTitle,
} from '../ui/card'
import { Button } from '../ui/button'

export default function EventCard() {
    const [attendees, setAttendees] = useState(120); // Initial number of people going
    const [isGoing, setIsGoing] = useState(false);
  
    const handleGoingClick = () => {
      if (!isGoing) {
        setAttendees(attendees + 1);
        setIsGoing(true);
      }
    };
  
    return (
      <div className="max-w-lg"> {/* Container to center and limit width */}
        <Card className="h-full max-w-sm rounded-xl shadow-lg overflow-hidden">
          <img 
            className="w-full h-48 object-cover"
            src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
            alt="Event"
          />
          <div className="p-6 h-full flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <CardTitle>Exciting Event</CardTitle>
                <span className="text-sm">{attendees} going</span>
              </div>
              <CardDescription>
                Join us for an amazing event with lots of fun activities and great company!
              </CardDescription>
            </div>
            <Button 
              onClick={handleGoingClick}
              disabled={isGoing}
              className={`mt-4 w-full font-semibold py-2 px-4 rounded transition-colors ${isGoing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isGoing ? 'You are going' : 'I am going'}
            </Button>
          </div>
        </Card>
      </div>
    );
}