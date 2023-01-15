import React, { useState } from "react";
import Header from "./Header";
const Index = () => {
  const [loading, setLoading] = useState(false);
  return <>{true && <Header />}</>;
};

export default Index;
