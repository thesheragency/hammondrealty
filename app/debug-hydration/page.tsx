"use client";

import { useState } from "react";

export default function DebugHydration() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Hydration Debug Page</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}
