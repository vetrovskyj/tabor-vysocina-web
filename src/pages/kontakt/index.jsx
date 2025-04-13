import React, { useState, useCallback } from 'react';
import Layout from '../../components/Layout';
import Helmet from "react-helmet";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import persona from "../../img/man-in-suit-and-tie.svg"
import telefon from "../../img/cell-phone.svg"
import info from "../../img/information-button.svg"

const containerStyle = {
  width: '100%',
  height: '450px',
};

const center = {
  lat: 49.5748611,
  lng: 16.0644292,
};

const Kontakt = () => {
  function sendEmail(e) {
    e.preventDefault();

    const nameAlert = document.querySelector('.alert-name');
    const emailAlert = document.querySelector('.alert-email');
    const success = document.querySelector('.alert-success');

    function validateName() {
      const nameInput = document.querySelector('.name-input');
      const name = nameInput.value;

      if (!name.match(/^\W*([A-ZĚŠČŘŽÝÁÍÉa-zěščřžýáíé]+(\W+|$)){1,4}$/)) {
        nameAlert.classList.add('alert-name');
        nameAlert.innerText = '⚠ Zadejte jméno a příjmení (max 4 slova)';
        return false;
      }

      nameAlert.innerText = '';
      return true;
    }

    function validateEmail() {
      const emailInput = document.querySelector('.email-input');
      const email = emailInput.value;

      if (!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        emailAlert.classList.add('alert-email');
        emailAlert.innerText = '⚠ Prosím zadejte platný email';
        return false;
      }

      emailAlert.innerText = '';
      return true;
    }

    if (validateName() && validateEmail()) {
      success.classList.add('alert-success');
      success.innerText = 'Email byl úspěšně odeslán';
      setTimeout(() => {
        success.innerText = '';
      }, 5000);

      /* Uncomment and use emailjs if you want email functionality:
      emailjs.sendForm('service_o8shb7p', 'template_v13g6dh', e.target, 'user_wiV7wq7ZpAMgeS9KKMtWf')
        .then((result) => {
          console.log(result.text);
        }, (error) => {
          console.log(error.text);
        });
      */
    }
  }

  return (
    <Layout>
      <Helmet
        title={`Kontakt | Tábor Vysočina 3. turnus`}
        meta={[
          {
            name: `description`,
            content: 'Kontakty a další informace o táboře Vysočina 3. turnus v Novém Městě na Moravě',
          },
          {
            name: "keywords",
            content: 'Tábor, Vysočina, PČR, Policie, Dětský tábor, Nové Město na Moravě, 3. turnus, Kontakty, adresa, mapa',
          },
        ]} />
      <main className="telo telo-kontakt">
        <div className="kontakt scroll-reveal-contact">
          <div className="adress">
            <div>
              <h1 className="titulek1">Kde nás najdete?</h1>
            </div>
            <div id="map">
              {/* Using Google Maps */}
              <LoadScript googleMapsApiKey="AIzaSyCtC_fvpareTXqKCblZ09lqFR2ocPfQjI0">
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={14}
                >
                  {/* Marker */}
                  <Marker position={center} />
                </GoogleMap>
              </LoadScript>
            </div>
            <div className="adresa">
              <p>ÚZ Vysočina, PS 28, Nové Město na Moravě, 592 31</p>
            </div>
          </div>
          <iframe name="hidden_iframe" id="hidden_iframe" style={{ display: 'none' }} onLoad="if(submitted) {window.location='../kontakt/';}" />
          <div className="formular scroll-reveal-contact">
            <h1 className="titulek2">Napište nám email</h1>
            <form className="pole" onSubmit={sendEmail}>
              <input className="name-input" id="jmeno" type="text" name="entry.1230703347" placeholder="Jméno a příjmení" />
              <input className="email-input" id="email" name="entry.977340822" type="email" placeholder="Vaše emailová adresa" />
              <input id="predmet" type="text" name="entry.27718538" placeholder="Předmět zprávy" />
              <textarea id="zprava" name="entry.342859044" placeholder="Napište nám zprávu" required defaultValue={""} />
              <div id="button">
                <input type="submit" defaultValue="Odeslat" name="submit" className="tlacitko-formular" />
              </div>
              <p className="alert-name"></p>
              <p className="alert-email"></p>
              <p className="alert-success"></p>
            </form>
          </div>
        </div>
        <div className="contacts scroll-reveal-contact">
          <div className="rotation-back">
            <div className="contact">
              <img src={persona} width={50} alt="person icon" />
              <p className="contact-entity"><strong>Dominik Brych</strong></p>
            </div>
            <div className="contact">
              <img src={telefon} width={50} alt="cell phone icon" />
              <a className="contact-entity" href="tel:+420731553002"><strong>+420731553002</strong></a>
            </div>
            <div className="contact">
              <img src={info} width={50} alt="information icon" />
              <p className="contact-entity">Zřizovatel: <strong>PČR Praha</strong></p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Kontakt;
