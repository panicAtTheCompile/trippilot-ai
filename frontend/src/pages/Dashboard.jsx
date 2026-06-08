import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const res = await api.get("/trips", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "token"
          )}`,
        },
      });

      setTrips(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const uploadTrip = async () => {
    if (!file) {
      alert("Please select a PDF");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await api.post(
        "/trips/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },
        }
      );

      alert("Trip Uploaded Successfully!");

      setFile(null);

      fetchTrips();
    } catch (err) {
      console.log(err);
      alert("Upload failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const copyLink = (shareId) => {
    navigator.clipboard.writeText(
      `${window.location.origin}/share/${shareId}`
    );

    alert("Share link copied!");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e293b,#312e81)",
        color: "white",
        padding: "40px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "3rem",
                margin: 0,
              }}
            >
              ✈️ TripPilot AI
            </h1>

            <p
              style={{
                opacity: 0.8,
              }}
            >
              AI Powered Travel Planner
            </p>
          </div>

          <button
            onClick={logout}
            style={buttonStyle}
          >
            Logout
          </button>
        </div>

        <div style={cardStyle}>
          <h2>📄 Upload Travel PDF</h2>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
          />

          <button
            onClick={uploadTrip}
            style={{
              ...buttonStyle,
              marginLeft: "10px",
            }}
          >
            Upload
          </button>
        </div>

        <h2
          style={{
            marginTop: "40px",
            marginBottom: "20px",
          }}
        >
          Your Trips
        </h2>

        {trips.length === 0 ? (
          <div style={cardStyle}>
            No trips uploaded yet.
          </div>
        ) : (
          trips.map((trip) => (
            <div
              key={trip._id}
              style={cardStyle}
            >
              <h2>{trip.title}</h2>

              <p>
                <strong>Share ID:</strong>{" "}
                {trip.shareId}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "15px",
                }}
              >
                <button
                  style={buttonStyle}
                  onClick={() =>
                    copyLink(
                      trip.shareId
                    )
                  }
                >
                  🔗 Copy Link
                </button>

                <button
                  style={buttonStyle}
                  onClick={() =>
                    window.open(
                      `/share/${trip.shareId}`,
                      "_blank"
                    )
                  }
                >
                  👀 View
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const cardStyle = {
  background:
    "rgba(255,255,255,0.08)",

  backdropFilter: "blur(12px)",

  border:
    "1px solid rgba(255,255,255,0.1)",

  borderRadius: "20px",

  padding: "25px",

  marginBottom: "20px",

  boxShadow:
    "0 8px 30px rgba(0,0,0,0.2)",
};

const buttonStyle = {
  background:
    "linear-gradient(90deg,#8b5cf6,#3b82f6)",

  color: "white",

  border: "none",

  borderRadius: "10px",

  padding: "10px 18px",

  cursor: "pointer",

  fontWeight: "bold",
};