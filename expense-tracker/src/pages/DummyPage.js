import React from "react";
import { Link } from "react-router-dom";

function DummyPage() {
  return (
    <div className="text-right">
      your profile is incomplete:
      <Link to="/profile" className="text-blue-500 underline">
        Complete your profile!
      </Link>
    </div>
  );
}

export default DummyPage;
