import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GalleryAuth() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://google-photos-api-5ivj.onrender.com/api/validate-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("galleryAccess", "granted");
        navigate("/galerie");
      } else {
        setError("Nesprávné heslo");
      }
    } catch (error) {
      setError("Chyba při ověření. Zkuste to prosím později.");
    }
  };

  return (
    <form className="password" onSubmit={handleSubmit}>
      <h1>
        K zobrazení fotek zadejte <br></br>prosím <strong>heslo</strong>
      </h1>
      <input
        type="password"
        className="password-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Zadejte heslo"
      ></input>
      <button className="password-button" type="submit">
        Potvrdit
      </button>
      {error && <p className="wrong-password">{error}</p>}
    </form>
  );
}
