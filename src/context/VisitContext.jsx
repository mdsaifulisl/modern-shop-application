import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const VisitContext = createContext();

export const VisitProvider = ({ children }) => {
  const [visits, setVisits] = useState(0);

  // Fetch total visits from backend
  const fetchVisits = async () => {
    try {
      const res = await api.get("/visits");
      setVisits(res.data.count);
    } catch (err) {
      console.error("Failed to fetch visits:", err);
    }
  };

  // Add visit only ONCE per user per browser session
  const addVisitOnce = async () => {
    try {
      // Check sessionStorage first (cleared on browser close)
      const hasVisited = sessionStorage.getItem("hasVisited");

      if (!hasVisited) {
        // Increment visit on server
        await api.post("/visits");
        // Mark as visited for this session
        sessionStorage.setItem("hasVisited", "true");
      }

      // Update local visits count
      fetchVisits();
    } catch (err) {
      console.error("Failed to add visit:", err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    addVisitOnce();
  }, []);

  return (
    <VisitContext.Provider value={{ visits }}>
      {children}
    </VisitContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useVisit = () => useContext(VisitContext);
