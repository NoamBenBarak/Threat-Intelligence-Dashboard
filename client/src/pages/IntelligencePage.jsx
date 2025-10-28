import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputField } from "../components/InputField";
import { Button } from "../components/Button";
import { ResultCard } from "../components/ResultCard";
import { Loader } from "../components/Loader";
import { fetchIntelligence } from "../redux/slices/intelligenceSlice";
import HistoryPanel from "../components/HistoryPanel";

export const IntelligencePage = () => {
  const dispatch = useDispatch();
  const [ip, setIp] = useState("");

  const handleCheck = () => {
    if (ip) {
      console.info(`User clicked check button for IP: ${ip}`);
      dispatch(fetchIntelligence(ip));
    } else {
      console.warn(`User attempted to check empty IP address`);
    }
  };

  const { data, loading, error } = useSelector((state) => state.intelligence);

  return (
    <div className="intelligence-page">
      <div className="input-section">
        <div className="input-group">
          <InputField setIp={setIp} handleCheck={handleCheck} />
          <Button handleCheck={handleCheck} disabled={loading} />
        </div>
      </div>

      {loading && <Loader />}

      {error && <div className="error">{error}</div>}

      {data && <ResultCard data={data} />}
      <HistoryPanel />
    </div>
  );
};
