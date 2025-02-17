import React, { lazy, Suspense } from "react";
const Books = lazy(() => import("./components/Books"))
import { Typography } from "@mui/material";
function App() {

  return (
    <>
      <Suspense fallback={<Typography variant="h5" sx={{ color: 'text.main', textAlign: 'center' }}>Loading...</Typography>}>
        <Books />
      </Suspense>
    </>
  )
}

export default App
