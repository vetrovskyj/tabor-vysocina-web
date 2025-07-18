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

      console.log(data);

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

  function groupPhotosByDate(photos) {
    console.log("Grouping photos, input array:", photos);

    const grouped = {};
    photos.forEach((photo) => {
      // Defensive: log the individual photo object to catch missing fields
      console.log("Processing photo:", photo);

      const date = photo.createdTime ? new Date(photo.createdTime) : null;
      if (!date) {
        console.warn("Photo missing createdTime:", photo);
        return;
      }
      const dateKey = `${date.getDate()}.${
        date.getMonth() + 1
      }.${date.getFullYear()}`;
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(photo);
    });

    const groupedArr = Object.entries(grouped).sort(
      (a, b) => new Date(b[1][0].createdTime) - new Date(a[1][0].createdTime)
    );

    console.log("Grouped photos by date:", groupedArr);

    return groupedArr;
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
              {groupPhotosByDate(photos).map(([date, group]) => (
                <div key={date} style={{ marginBottom: "2rem" }}>
                  <p className="date-photos">{"Nahráno " + date}</p>
                  <div className="grid">
                    {group.map((photo, index) => {
                      // Get the photo's absolute index in the photos array
                      const globalIndex = photos.findIndex(
                        (p) => p.id === photo.id
                      );
                      return (
                        <div
                          key={
                            photo.id || `${globalIndex}-${photo.thumbnailUrl}`
                          }
                          className="grid-item"
                        >
                          <img
                            className="album-photo"
                            src={photo.thumbnailUrl}
                            loading="lazy"
                            alt="Album Photo"
                            width="200"
                            onClick={() => {
                              setLightboxIndex(globalIndex);
                              setIsOpen(true);
                            }}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

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
