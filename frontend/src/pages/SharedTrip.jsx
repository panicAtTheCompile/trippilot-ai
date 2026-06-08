import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function SharedTrip() {
  const { shareId } = useParams();

  const [trip, setTrip] = useState(null);

  useEffect(() => {
    fetchTrip();
  }, []);

  const fetchTrip = async () => {
    try {
      const res = await api.get(
        `/trips/share/${shareId}`
      );

      setTrip(res.data);
    } catch (error) {
      console.log(error);

      alert(
        "Trip not found"
      );
    }
  };

  if (!trip) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{trip.title}</h1>

      <h2>Traveler Details</h2>

      <p>
        <strong>Name:</strong>{" "}
        {trip.extractedData?.travelerName}
      </p>

      <p>
        <strong>Flight:</strong>{" "}
        {trip.extractedData?.flightNumber}
      </p>

      <p>
        <strong>Route:</strong>{" "}
        {trip.extractedData?.departure}
        {" → "}
        {trip.extractedData?.arrival}
      </p>

      <p>
        <strong>Date:</strong>{" "}
        {trip.extractedData?.date}
      </p>

      <p>
        <strong>Hotel:</strong>{" "}
        {trip.extractedData?.hotel}
      </p>

      <hr />

      <h2>Generated Itinerary</h2>

      <pre
        style={{
          whiteSpace: "pre-wrap",
          background: "#f4f4f4",
          padding: "15px",
          borderRadius: "8px",
        }}
      >
        {trip.itinerary}
      </pre>
    </div>
  );
}