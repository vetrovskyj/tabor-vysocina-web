import React from "react";

import Layout from "../../components/Layout";
import Helmet from "react-helmet";
import GallerySlider from "../../components/GallerySlider";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Galerie() {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const accessGranted = localStorage.getItem("galleryAccess") === "granted";
    if (!accessGranted) {
      navigate("/galerie/auth"); // Redirect to password page if not authorized
    } else {
      setIsAuthorized(true);
    }
  }, [navigate]);

  if (!isAuthorized) return null; // Prevent rendering until authorization is checked

  return (
    <Layout>
      <Helmet
        title={`Galerie | Tábor Vysočina 3. turnus`}
        meta={[
          {
            name: `description`,
            content:
              "Galerie fotek a videí z tábora Vysočina 3. turnus v Novém Městě na Moravě",
          },
          {
            name: "keywords",
            content:
              "Tábor, Vysočina, PČR, Policie, Dětský tábor, Nové Město na Moravě, 3. turnus, Foto, Videa, Fotky, Fotogalerie",
          },
        ]}
      />
      <main>
        <GallerySlider />
      </main>
      <div className="footer-to-bottom"></div>
    </Layout>
  );
}
