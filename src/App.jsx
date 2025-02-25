import React, { lazy, Suspense } from "react";
const QuotesPage = lazy(() => import("./components/Quotes"))
import { Typography } from "@mui/material";
function App() {

  return (
    <>
      <Suspense fallback={<Typography variant="h5" sx={{ color: 'text.main', textAlign: 'center' }}>Loading...</Typography>}>
        <QuotesPage />
      </Suspense>
    </>
  )
}

export default App
