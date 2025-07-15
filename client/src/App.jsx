import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import "./app.css"
import PageNotFound from "./pages/404/PageNotFound";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = "217276582968-2i6cv3kh9jia8msc28t1fobo5ospolcj.apps.googleusercontent.com"
function App () {
  if(!clientId) {
    console.error(`clientId is not defined`)
  }
  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId={clientId}>
        <LoginPage/>
      </GoogleOAuthProvider>
    )
  }
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<GoogleAuthWrapper />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
  )
}

export default App;