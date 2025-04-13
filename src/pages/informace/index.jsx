import React from 'react'

import Layout from '../../components/Layout'
import Helmet from "react-helmet"

import arrow from "../../img/arrow-icon.svg"
import budova from "../../img/budova.jpg"
import rybnik from "../../img/rybnik.jpg"
import hriste from "../../img/hriste.jpg"
import tricko from "../../img/tshirt-icon-orange.svg"
import hygiena from "../../img/hygiene-icon-orange.svg"
import karty from "../../img/cards-icon-orange.svg"

export default class Informace extends React.Component {
  render() {
    return (
      <Layout>
        <Helmet
          title={`Informace | Tábor Vysočina 3. turnus`}
          meta={[
            {
              name: `description`,
              content: 'Informace o organizaci tábora Vysočina 3. turnus v Novém Městě na Moravě. Popis lokality, zázemí, prostředí i seznam věcí, co si mají účastníci vzít s sebou.',
            },
            {
              name: "keywords",
              content: 'Vysočina, Dětský tábor, Nové Město na Moravě, 3. turnus, lokalita, prostředí, zázemí, věci s sebou, potřeby',
            },
          ]} />
        <main className="telo-lide">
          <div className="dotazy">
            <h1>Nejčastější dotazy</h1>
            <ul className="questions questions-one">
              <li>
                <a href="#arealFoto">
                  <p>Kde děti bydlí</p>
                  <img
                    src={arrow}
                    alt="arrow icon"
                    width={20}
                    className="arrow-down"
                  />
                </a>
              </li>
              <li>
                <a href="#vybaveniFoto">
                  <p>Co mají na táboře k dispozici</p>
                  <img
                    src={arrow}
                    alt="arrow icon"
                    width={20}
                    className="arrow-down"
                  />
                </a>
              </li>
              <li>
                <a href="#okoliFoto">
                  <p>Kam chodí mimo tábor</p>
                  <img
                    src={arrow}
                    alt="arrow icon"
                    width={20}
                    className="arrow-down"
                  />
                </a>
              </li>
            </ul>
            <ul className="questions questions-two">
              <li>
                <a href="#things-needed">
                  <p>Co si vzít s sebou na tábor</p>
                  <img
                    src={arrow}
                    alt="arrow icon"
                    width={20}
                    className="arrow-down"
                  />
                </a>
              </li>
              <li>
                <a href="#visits">
                  <p>Můžu dítě navštívit</p>
                  <img
                    src={arrow}
                    alt="arrow icon"
                    width={20}
                    className="arrow-down"
                  />
                </a>
              </li>
              <li>
                <a href="#post">
                  <p>Posílání pošty a balíčků</p>
                  <img
                    src={arrow}
                    alt="arrow icon"
                    width={20}
                    className="arrow-down"
                  />
                </a>
              </li>
            </ul>
          </div>
          <div className="grid-informace">
            {/*<h1 class="kapitola">Zázemí tábora</h1>*/}
            <div className="areal scroll-reveal-ambiente" id="areal">
              <h2>Areál</h2>
              <p>
                Děti jsou ubytované v rekreačním areálu PČR. Mladší táborníci bydlí v hlavní budově, ti starší v dřevěných chatkách. V hlavní budově je jídelna, toalety a sprchy. Do areálu kromě zaměstnanců nikdo cizí nesmí.
              </p>
            </div>
            <div className="arealFoto scroll-reveal-ambiente" id="arealFoto">
              <img src={budova} alt="budova" />
            </div>
            <div className="vybaveni scroll-reveal-ambiente" id="vybaveni">
              <h2>Vybavení</h2>
              <p>
                Kromě příjemného a čistého ubytování jsou v areálu k dispozici hřiště, altán, sportovní vybavení, ohniště a další společenské místnosti. Pro léčení drobných zranění a nemocí nám slouží marodka v oddělené budově.
              </p>
            </div>
            <div className="vybaveniFoto scroll-reveal-ambiente" id="vybaveniFoto">
              <img src={hriste} alt="hriste" />
            </div>
            <div className="okoli scroll-reveal-ambiente" id="okoli">
              <h2>Okolí</h2>
              <p>
                Nejraději hrajeme hry v přírodě, a proto jsme rádi, že nás obklopují krásné lesy, louky a vodní toky Žďárských vrchů. Zároveň se areál nachází i v blízkosti města, do kterého v průběhu tábora děti rády zavítají.
              </p>
            </div>
            <div className="okoliFoto scroll-reveal-ambiente" id="okoliFoto">
              <img src={rybnik} alt="rybnik" />
            </div>
          </div>
          <div className="things-needed" id="things-needed">
            {/*<h2 class="thing-heading">Seznam věcí</h2>*/}
            <div className="card clothes">
              <h2>Oblečení a obuv</h2>
              <div className="card-content">
                <div className="card-img">
                  <img
                    src={tricko}
                    alt="obleceni ikona"
                    width={200}
                  />
                </div>
                <ul className="clothes-list">
                  <li>dostatek teplých i normálních ponožek</li>
                  <li>dostatek spodního prádla</li>
                  <li>trika s krátkým rukávem</li>
                  <li>trika s dlouhým rukávem</li>
                  <li>mikiny</li>
                  <li>větrovku</li>
                  <li>krátké kalhoty (kraťasy)</li>
                  <li>tepláky (dlouhé kalhoty)</li>
                  <li>plavky</li>
                  <li>oblečení na spaní</li>
                  <li>oblečení do města</li>
                  <li>pokrývka hlavy</li>
                  <li>sportovní obuv</li>
                  <li>nepromokavé boty (holínky)</li>
                  <li>přezůvky</li>
                  <li>lahev na pití</li>
                </ul>
              </div>
            </div>
            <div className="card hygiene">
              <h2>Hygiena</h2>
              <div className="card-content">
                <div className="card-img">
                  <img
                    src={hygiena}
                    alt="hygiena ikona"
                    width={200}
                  />
                </div>
                <ul className="hygiene-list">
                  <li>ručníky</li>
                  <li>zubní kartáček a pasta</li>
                  <li>mýdlo</li>
                  <li>šampón (sprchový gel)</li>
                  <li>hřeben</li>
                  <li>opalovací krém</li>
                  <li>papírové kapesníky</li>
                </ul>
              </div>
            </div>
            <div className="card others">
              <h2>Ostatní</h2>
              <div className="card-content">
                <div className="card-img">
                  <img
                    src={karty}
                    alt="others ikona"
                    width={200}
                  />
                </div>
                <ul className="others-list">
                  <li>hry (např. karty)</li>
                  <li>dopisní papíry a obálky s poštovní známkou</li>
                  <li>psací potřeby</li>
                  <li>repelent</li>
                  <li>vak na špinavé prádlo</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="visits-posts" id="visits">
            {/*<h2>Návštěvy a pošta</h2>*/}
            <div className="section visits">
              <h3>Návštěvy</h3>
              <p>
              Aby měli všichni táborníci stejné podmínky a užili si nerušeně celý tábor, návštěvy do areálu nepovolujeme. Vždy nás (i děti) ale potěší, když můžeme předávat radost a pozdravy třeba skrze poslané pohledy nebo menší balíčky.
              </p>
            </div>
            <div className="section post" id="post">
              <h3>Pošta</h3>
              <p>
              Do tábora není problém poslat dopis, pohled nebo menší balíček. Adresu najdete v <a href='../kontakt/'>kontaktech</a>. Ze zkušenosti víme, že pohledy dělají radost i dospělým, a proto doporučujeme dětem pár pohledů předepsat, ať také mohou odpovědět.
              </p>
            </div>
          </div>
        </main>
      </Layout >
    )
  }
}