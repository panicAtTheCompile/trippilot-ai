export const generateItinerary = (
  data
) => {
  return `
Travel Itinerary

Traveler: ${data.travelerName}

Flight:
${data.flightNumber}

Route:
${data.departure} → ${data.arrival}

Hotel:
${data.hotel}

Day 1
Arrival and hotel check-in

Day 2
Local sightseeing

Day 3
Return journey
`;
};