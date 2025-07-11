import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Layout from "../../components/Layout";
import Helmet from "react-helmet";

export default function PhotoAlbum() {
  const location = useLocation();
  const { album } = location.state || {};
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [nextPageToken, setNextPageToken] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (album) {
      fetchAlbumPhotos(album.id);
    }
  }, [album]);

  const fetchAlbumPhotos = async (albumId) => {
    try {
      const response = await fetch(
        `https://google-photos-api-5ivj.onrender.com/photos?albumId=${albumId}&pageToken=${nextPageToken}`
      );
      const data = await response.json();

      console.log(data)

      const updatedData = data.mediaItems;

      setPhotos((prevPhotos) => [...prevPhotos, ...updatedData]);
      setNextPageToken(data.nextPageToken || "");
    } catch (error) {
      console.error("Failed to fetch album photos", error);
    }
  };

  // Manage body ARIA state based on the Lightbox status
  useEffect(() => {
    if (isOpen) {
      document.body.setAttribute("aria-hidden", "true");
    } else {
      document.body.removeAttribute("aria-hidden");
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && lightboxIndex !== null) {
      console.log(photos[lightboxIndex].id);
    }
  }, [isOpen, lightboxIndex, photos]);

  if (!album) {
    return <div>Album not found</div>;
  }

  return (
    <Layout>
      <Helmet
        title={album.name + ` | Tábor Vysočina 3. turnus`}
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
        <div className="gallery-container">
          {photos.length > 0 ? (
            <>
              <div className="grid">
                {photos.map((photo, index) => (
                  <div
                    key={photo.id || `${index}-${photo.thumbnailUrl}`}
                    className="grid-item"
                  >
                    <img
                      src={photo.thumbnailUrl}
                      alt="Album Photo"
                      width="200"
                      onClick={() => {
                        setLightboxIndex(index);
                        setIsOpen(true);
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                ))}
              </div>

              {nextPageToken && (
                <div
                  className="load-more-container"
                  style={{ textAlign: "center", margin: "2rem 0" }}
                >
                  <button
                    onClick={() => fetchAlbumPhotos(album.id)}
                    className="load-more-button"
                  >
                    Načti další
                  </button>
                </div>
              )}

              {isOpen && (
                <Lightbox
                  mainSrc={photos[lightboxIndex]?.previewUrl}
                  nextSrc={
                    photos[(lightboxIndex + 1) % photos.length]?.previewUrl
                  }
                  prevSrc={
                    photos[(lightboxIndex + photos.length - 1) % photos.length]
                      ?.previewUrl
                  }
                  onCloseRequest={() => {
                    setLightboxIndex(null);
                    setIsOpen(false);
                  }}
                  onMovePrevRequest={() => {
                    const newIndex =
                      (lightboxIndex + photos.length - 1) % photos.length;
                    setLightboxIndex(newIndex);
                  }}
                  onMoveNextRequest={() => {
                    const newIndex = (lightboxIndex + 1) % photos.length;
                    setLightboxIndex(newIndex);
                  }}
                />
              )}
            </>
          ) : (
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          )}
        </div>
      </main>
      <div className="footer-to-bottom"></div>
    </Layout>
  );
}
