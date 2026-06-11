const MATCHES = [
  {
    "dateTime": "2026-06-11T21:00:00+02:00",
    "summary": "MŚ 2026: Meksyk – RPA",
    "description": "Faza grupowa - Grupa A. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Mexico City, Meksyk. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Mexico City, Meksyk",
    "phase": "Faza grupowa",
    "group": "Grupa A",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-12T04:00:00+02:00",
    "summary": "MŚ 2026: Korea Południowa – Czechy",
    "description": "Faza grupowa - Grupa A. Transmisja: TVP2, TVP SPORT, TVPSPORT.PL. Miejsce: Guadalajara, Meksyk. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Guadalajara, Meksyk",
    "phase": "Faza grupowa",
    "group": "Grupa A",
    "broadcast": "TVP2, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-12T21:00:00+02:00",
    "summary": "MŚ 2026: Kanada – Bośnia i Hercegowina",
    "description": "Faza grupowa - Grupa B. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Toronto, Kanada. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Toronto, Kanada",
    "phase": "Faza grupowa",
    "group": "Grupa B",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-13T03:00:00+02:00",
    "summary": "MŚ 2026: USA – Paragwaj",
    "description": "Faza grupowa - Grupa D. Transmisja: TVP2, TVP SPORT, TVPSPORT.PL. Miejsce: Los Angeles, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Los Angeles, USA",
    "phase": "Faza grupowa",
    "group": "Grupa D",
    "broadcast": "TVP2, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-13T21:00:00+02:00",
    "summary": "MŚ 2026: Katar – Szwajcaria",
    "description": "Faza grupowa - Grupa B. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Santa Clara, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Santa Clara, USA",
    "phase": "Faza grupowa",
    "group": "Grupa B",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-14T00:00:00+02:00",
    "summary": "MŚ 2026: Brazylia – Maroko",
    "description": "Faza grupowa - Grupa C. Transmisja: TVP2, TVP SPORT, TVPSPORT.PL. Miejsce: New Jersey, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "New Jersey, USA",
    "phase": "Faza grupowa",
    "group": "Grupa C",
    "broadcast": "TVP2, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-14T03:00:00+02:00",
    "summary": "MŚ 2026: Haiti – Szkocja",
    "description": "Faza grupowa - Grupa C. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Boston, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Boston, USA",
    "phase": "Faza grupowa",
    "group": "Grupa C",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-14T06:00:00+02:00",
    "summary": "MŚ 2026: Australia – Turcja",
    "description": "Faza grupowa - Grupa D. Transmisja: TVP2, TVP SPORT, TVPSPORT.PL. Miejsce: Vancouver, Kanada. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Vancouver, Kanada",
    "phase": "Faza grupowa",
    "group": "Grupa D",
    "broadcast": "TVP2, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-14T19:00:00+02:00",
    "summary": "MŚ 2026: Niemcy – Curaçao",
    "description": "Faza grupowa - Grupa E. Transmisja: TVP2, TVP SPORT, TVPSPORT.PL. Miejsce: Houston, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Houston, USA",
    "phase": "Faza grupowa",
    "group": "Grupa E",
    "broadcast": "TVP2, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-14T22:00:00+02:00",
    "summary": "MŚ 2026: Holandia – Japonia",
    "description": "Faza grupowa - Grupa F. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Dallas / Arlington, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Dallas / Arlington, USA",
    "phase": "Faza grupowa",
    "group": "Grupa F",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-15T01:00:00+02:00",
    "summary": "MŚ 2026: WKS – Ekwador",
    "description": "Faza grupowa - Grupa E. Transmisja: TVP2, TVP SPORT, TVPSPORT.PL. Miejsce: Filadelfia, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Filadelfia, USA",
    "phase": "Faza grupowa",
    "group": "Grupa E",
    "broadcast": "TVP2, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-15T04:00:00+02:00",
    "summary": "MŚ 2026: Szwecja – Tunezja",
    "description": "Faza grupowa - Grupa F. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Monterrey, Meksyk. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Monterrey, Meksyk",
    "phase": "Faza grupowa",
    "group": "Grupa F",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-15T18:00:00+02:00",
    "summary": "MŚ 2026: Hiszpania – Republika Zielonego Przylądka",
    "description": "Faza grupowa - Grupa H. Transmisja: TVP2, TVP SPORT, TVPSPORT.PL. Miejsce: Atlanta, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Atlanta, USA",
    "phase": "Faza grupowa",
    "group": "Grupa H",
    "broadcast": "TVP2, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-15T21:00:00+02:00",
    "summary": "MŚ 2026: Belgia – Egipt",
    "description": "Faza grupowa - Grupa G. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Seattle, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Seattle, USA",
    "phase": "Faza grupowa",
    "group": "Grupa G",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-16T00:00:00+02:00",
    "summary": "MŚ 2026: Arabia Saudyjska – Urugwaj",
    "description": "Faza grupowa - Grupa H. Transmisja: TVP2, TVP SPORT, TVPSPORT.PL. Miejsce: Miami, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Miami, USA",
    "phase": "Faza grupowa",
    "group": "Grupa H",
    "broadcast": "TVP2, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-16T03:00:00+02:00",
    "summary": "MŚ 2026: Iran – Nowa Zelandia",
    "description": "Faza grupowa - Grupa G. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Los Angeles, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Los Angeles, USA",
    "phase": "Faza grupowa",
    "group": "Grupa G",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-16T21:00:00+02:00",
    "summary": "MŚ 2026: Francja – Senegal",
    "description": "Faza grupowa - Grupa I. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: New Jersey, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "New Jersey, USA",
    "phase": "Faza grupowa",
    "group": "Grupa I",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-17T00:00:00+02:00",
    "summary": "MŚ 2026: Irak – Norwegia",
    "description": "Faza grupowa - Grupa I. Transmisja: TVP2, TVP SPORT, TVPSPORT.PL. Miejsce: Boston, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Boston, USA",
    "phase": "Faza grupowa",
    "group": "Grupa I",
    "broadcast": "TVP2, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-17T03:00:00+02:00",
    "summary": "MŚ 2026: Argentyna – Algieria",
    "description": "Faza grupowa - Grupa J. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Kansas City, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Kansas City, USA",
    "phase": "Faza grupowa",
    "group": "Grupa J",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-17T06:00:00+02:00",
    "summary": "MŚ 2026: Austria – Jordania",
    "description": "Faza grupowa - Grupa J. Transmisja: TVP2, TVP SPORT, TVPSPORT.PL. Miejsce: Santa Clara, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Santa Clara, USA",
    "phase": "Faza grupowa",
    "group": "Grupa J",
    "broadcast": "TVP2, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-17T19:00:00+02:00",
    "summary": "MŚ 2026: Portugalia – DR Konga",
    "description": "Faza grupowa - Grupa K. Transmisja: TVP2, TVP SPORT, TVPSPORT.PL. Miejsce: Houston, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Houston, USA",
    "phase": "Faza grupowa",
    "group": "Grupa K",
    "broadcast": "TVP2, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-17T22:00:00+02:00",
    "summary": "MŚ 2026: Anglia – Chorwacja",
    "description": "Faza grupowa - Grupa L. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Dallas / Arlington, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Dallas / Arlington, USA",
    "phase": "Faza grupowa",
    "group": "Grupa L",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-18T01:00:00+02:00",
    "summary": "MŚ 2026: Ghana – Panama",
    "description": "Faza grupowa - Grupa L. Transmisja: TVP2, TVP SPORT, TVPSPORT.PL. Miejsce: Boston, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Boston, USA",
    "phase": "Faza grupowa",
    "group": "Grupa L",
    "broadcast": "TVP2, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-18T04:00:00+02:00",
    "summary": "MŚ 2026: Uzbekistan – Kolumbia",
    "description": "Faza grupowa - Grupa K. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Mexico City, Meksyk. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Mexico City, Meksyk",
    "phase": "Faza grupowa",
    "group": "Grupa K",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-18T18:00:00+02:00",
    "summary": "MŚ 2026: Czechy – RPA",
    "description": "Faza grupowa - Grupa A. Transmisja: TVP2, TVP SPORT, TVPSPORT.PL. Miejsce: Atlanta, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Atlanta, USA",
    "phase": "Faza grupowa",
    "group": "Grupa A",
    "broadcast": "TVP2, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-18T21:00:00+02:00",
    "summary": "MŚ 2026: Szwajcaria – Bośnia i Hercegowina",
    "description": "Faza grupowa - Grupa B. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Los Angeles, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Los Angeles, USA",
    "phase": "Faza grupowa",
    "group": "Grupa B",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-19T00:00:00+02:00",
    "summary": "MŚ 2026: Kanada – Katar",
    "description": "Faza grupowa - Grupa B. Transmisja: TVP2, TVP SPORT, TVPSPORT.PL. Miejsce: Vancouver, Kanada. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Vancouver, Kanada",
    "phase": "Faza grupowa",
    "group": "Grupa B",
    "broadcast": "TVP2, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-19T03:00:00+02:00",
    "summary": "MŚ 2026: Meksyk – Korea Południowa",
    "description": "Faza grupowa - Grupa A. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Guadalajara, Meksyk. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Guadalajara, Meksyk",
    "phase": "Faza grupowa",
    "group": "Grupa A",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-19T21:00:00+02:00",
    "summary": "MŚ 2026: USA – Australia",
    "description": "Faza grupowa - Grupa D. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Seattle, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Seattle, USA",
    "phase": "Faza grupowa",
    "group": "Grupa D",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-20T00:00:00+02:00",
    "summary": "MŚ 2026: Szkocja – Maroko",
    "description": "Faza grupowa - Grupa C. Transmisja: TVP2, TVP SPORT, TVPSPORT.PL. Miejsce: Boston, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Boston, USA",
    "phase": "Faza grupowa",
    "group": "Grupa C",
    "broadcast": "TVP2, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-20T02:30:00+02:00",
    "summary": "MŚ 2026: Brazylia – Haiti",
    "description": "Faza grupowa - Grupa C. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Filadelfia, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Filadelfia, USA",
    "phase": "Faza grupowa",
    "group": "Grupa C",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-20T05:00:00+02:00",
    "summary": "MŚ 2026: Turcja – Paragwaj",
    "description": "Faza grupowa - Grupa D. Transmisja: TVP2, TVP SPORT, TVPSPORT.PL. Miejsce: Santa Clara, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Santa Clara, USA",
    "phase": "Faza grupowa",
    "group": "Grupa D",
    "broadcast": "TVP2, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-20T19:00:00+02:00",
    "summary": "MŚ 2026: Holandia – Szwecja",
    "description": "Faza grupowa - Grupa F. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Houston, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Houston, USA",
    "phase": "Faza grupowa",
    "group": "Grupa F",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-20T22:00:00+02:00",
    "summary": "MŚ 2026: Niemcy – WKS",
    "description": "Faza grupowa - Grupa E. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Toronto, Kanada. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Toronto, Kanada",
    "phase": "Faza grupowa",
    "group": "Grupa E",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-21T02:00:00+02:00",
    "summary": "MŚ 2026: Ekwador – Curaçao",
    "description": "Faza grupowa - Grupa E. Transmisja: TVP2, TVP SPORT, TVPSPORT.PL. Miejsce: Kansas City, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Kansas City, USA",
    "phase": "Faza grupowa",
    "group": "Grupa E",
    "broadcast": "TVP2, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-21T06:00:00+02:00",
    "summary": "MŚ 2026: Tunezja – Japonia",
    "description": "Faza grupowa - Grupa F. Transmisja: TVP2, TVP SPORT, TVPSPORT.PL. Miejsce: Monterrey, Meksyk. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Monterrey, Meksyk",
    "phase": "Faza grupowa",
    "group": "Grupa F",
    "broadcast": "TVP2, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-21T18:00:00+02:00",
    "summary": "MŚ 2026: Hiszpania – Arabia Saudyjska",
    "description": "Faza grupowa - Grupa H. Transmisja: TVP2, TVP SPORT, TVPSPORT.PL. Miejsce: Atlanta, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Atlanta, USA",
    "phase": "Faza grupowa",
    "group": "Grupa H",
    "broadcast": "TVP2, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-21T21:00:00+02:00",
    "summary": "MŚ 2026: Belgia – Iran",
    "description": "Faza grupowa - Grupa G. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Los Angeles, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Los Angeles, USA",
    "phase": "Faza grupowa",
    "group": "Grupa G",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-22T00:00:00+02:00",
    "summary": "MŚ 2026: Urugwaj – Republika Zielonego Przylądka",
    "description": "Faza grupowa - Grupa H. Transmisja: TVP2, TVP SPORT, TVPSPORT.PL. Miejsce: Miami, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Miami, USA",
    "phase": "Faza grupowa",
    "group": "Grupa H",
    "broadcast": "TVP2, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-22T03:00:00+02:00",
    "summary": "MŚ 2026: Nowa Zelandia – Egipt",
    "description": "Faza grupowa - Grupa G. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Vancouver, Kanada. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Vancouver, Kanada",
    "phase": "Faza grupowa",
    "group": "Grupa G",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-22T19:00:00+02:00",
    "summary": "MŚ 2026: Argentyna – Austria",
    "description": "Faza grupowa - Grupa J. Transmisja: TVP2, TVP SPORT, TVPSPORT.PL. Miejsce: Dallas / Arlington, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Dallas / Arlington, USA",
    "phase": "Faza grupowa",
    "group": "Grupa J",
    "broadcast": "TVP2, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-22T23:00:00+02:00",
    "summary": "MŚ 2026: Francja – Irak",
    "description": "Faza grupowa - Grupa I. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Filadelfia, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Filadelfia, USA",
    "phase": "Faza grupowa",
    "group": "Grupa I",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-23T02:00:00+02:00",
    "summary": "MŚ 2026: Norwegia – Senegal",
    "description": "Faza grupowa - Grupa I. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: New Jersey, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "New Jersey, USA",
    "phase": "Faza grupowa",
    "group": "Grupa I",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-23T05:00:00+02:00",
    "summary": "MŚ 2026: Jordania – Algieria",
    "description": "Faza grupowa - Grupa J. Transmisja: TVP2, TVP SPORT, TVPSPORT.PL. Miejsce: Santa Clara, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Santa Clara, USA",
    "phase": "Faza grupowa",
    "group": "Grupa J",
    "broadcast": "TVP2, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-23T19:00:00+02:00",
    "summary": "MŚ 2026: Portugalia – Uzbekistan",
    "description": "Faza grupowa - Grupa K. Transmisja: TVP2, TVP SPORT, TVPSPORT.PL. Miejsce: Houston, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Houston, USA",
    "phase": "Faza grupowa",
    "group": "Grupa K",
    "broadcast": "TVP2, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-23T22:00:00+02:00",
    "summary": "MŚ 2026: Anglia – Ghana",
    "description": "Faza grupowa - Grupa L. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Boston, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Boston, USA",
    "phase": "Faza grupowa",
    "group": "Grupa L",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-24T01:00:00+02:00",
    "summary": "MŚ 2026: Panama – Chorwacja",
    "description": "Faza grupowa - Grupa L. Transmisja: TVP2, TVP SPORT, TVPSPORT.PL. Miejsce: Toronto, Kanada. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Toronto, Kanada",
    "phase": "Faza grupowa",
    "group": "Grupa L",
    "broadcast": "TVP2, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-24T04:00:00+02:00",
    "summary": "MŚ 2026: Kolumbia – DR Konga",
    "description": "Faza grupowa - Grupa K. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Guadalajara, Meksyk. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Guadalajara, Meksyk",
    "phase": "Faza grupowa",
    "group": "Grupa K",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-24T21:00:00+02:00",
    "summary": "MŚ 2026: Szwajcaria – Kanada",
    "description": "Faza grupowa - Grupa B. Transmisja: TVP1, TVPSPORT.PL. Miejsce: Vancouver, Kanada. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Vancouver, Kanada",
    "phase": "Faza grupowa",
    "group": "Grupa B",
    "broadcast": "TVP1, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-24T21:00:00+02:00",
    "summary": "MŚ 2026: Bośnia i Hercegowina – Katar",
    "description": "Faza grupowa - Grupa B. Transmisja: TVP SPORT, TVPSPORT.PL. Miejsce: Seattle, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Seattle, USA",
    "phase": "Faza grupowa",
    "group": "Grupa B",
    "broadcast": "TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-25T00:00:00+02:00",
    "summary": "MŚ 2026: Maroko – Haiti",
    "description": "Faza grupowa - Grupa C. Transmisja: TVP SPORT, TVPSPORT.PL. Miejsce: Atlanta, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Atlanta, USA",
    "phase": "Faza grupowa",
    "group": "Grupa C",
    "broadcast": "TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-25T00:00:00+02:00",
    "summary": "MŚ 2026: Szkocja – Brazylia",
    "description": "Faza grupowa - Grupa C. Transmisja: TVP1, TVPSPORT.PL. Miejsce: Miami, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Miami, USA",
    "phase": "Faza grupowa",
    "group": "Grupa C",
    "broadcast": "TVP1, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-25T03:00:00+02:00",
    "summary": "MŚ 2026: RPA – Korea Południowa",
    "description": "Faza grupowa - Grupa A. Transmisja: TVP SPORT, TVPSPORT.PL. Miejsce: Monterrey, Meksyk. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Monterrey, Meksyk",
    "phase": "Faza grupowa",
    "group": "Grupa A",
    "broadcast": "TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-25T03:00:00+02:00",
    "summary": "MŚ 2026: Czechy – Meksyk",
    "description": "Faza grupowa - Grupa A. Transmisja: TVP2, TVP SPORT, TVPSPORT.PL. Miejsce: Mexico City, Meksyk. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Mexico City, Meksyk",
    "phase": "Faza grupowa",
    "group": "Grupa A",
    "broadcast": "TVP2, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-25T22:00:00+02:00",
    "summary": "MŚ 2026: Curaçao – WKS",
    "description": "Faza grupowa - Grupa E. Transmisja: TVP SPORT, TVPSPORT.PL. Miejsce: Filadelfia, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Filadelfia, USA",
    "phase": "Faza grupowa",
    "group": "Grupa E",
    "broadcast": "TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-25T22:00:00+02:00",
    "summary": "MŚ 2026: Ekwador – Niemcy",
    "description": "Faza grupowa - Grupa E. Transmisja: TVP1, TVPSPORT.PL. Miejsce: New Jersey, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "New Jersey, USA",
    "phase": "Faza grupowa",
    "group": "Grupa E",
    "broadcast": "TVP1, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-26T01:00:00+02:00",
    "summary": "MŚ 2026: Japonia – Szwecja",
    "description": "Faza grupowa - Grupa F. Transmisja: TVP1, TVPSPORT.PL. Miejsce: Dallas / Arlington, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Dallas / Arlington, USA",
    "phase": "Faza grupowa",
    "group": "Grupa F",
    "broadcast": "TVP1, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-26T01:00:00+02:00",
    "summary": "MŚ 2026: Tunezja – Holandia",
    "description": "Faza grupowa - Grupa F. Transmisja: TVP SPORT, TVPSPORT.PL. Miejsce: Kansas City, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Kansas City, USA",
    "phase": "Faza grupowa",
    "group": "Grupa F",
    "broadcast": "TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-26T04:00:00+02:00",
    "summary": "MŚ 2026: Paragwaj – Australia",
    "description": "Faza grupowa - Grupa D. Transmisja: TVP SPORT, TVPSPORT.PL. Miejsce: Santa Clara, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Santa Clara, USA",
    "phase": "Faza grupowa",
    "group": "Grupa D",
    "broadcast": "TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-26T04:00:00+02:00",
    "summary": "MŚ 2026: Turcja – USA",
    "description": "Faza grupowa - Grupa D. Transmisja: TVP1, TVPSPORT.PL. Miejsce: Los Angeles, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Los Angeles, USA",
    "phase": "Faza grupowa",
    "group": "Grupa D",
    "broadcast": "TVP1, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-26T21:00:00+02:00",
    "summary": "MŚ 2026: Norwegia – Francja",
    "description": "Faza grupowa - Grupa I. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Boston, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Boston, USA",
    "phase": "Faza grupowa",
    "group": "Grupa I",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-26T21:00:00+02:00",
    "summary": "MŚ 2026: Senegal – Irak",
    "description": "Faza grupowa - Grupa I. Transmisja: TVP SPORT, TVPSPORT.PL. Miejsce: Toronto, Kanada. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Toronto, Kanada",
    "phase": "Faza grupowa",
    "group": "Grupa I",
    "broadcast": "TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-27T02:00:00+02:00",
    "summary": "MŚ 2026: Republika Zielonego Przylądka – Arabia Saudyjska",
    "description": "Faza grupowa - Grupa H. Transmisja: TVP SPORT, TVPSPORT.PL. Miejsce: Houston, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Houston, USA",
    "phase": "Faza grupowa",
    "group": "Grupa H",
    "broadcast": "TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-27T02:00:00+02:00",
    "summary": "MŚ 2026: Urugwaj – Hiszpania",
    "description": "Faza grupowa - Grupa H. Transmisja: TVP1, TVPSPORT.PL. Miejsce: Guadalajara, Meksyk. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Guadalajara, Meksyk",
    "phase": "Faza grupowa",
    "group": "Grupa H",
    "broadcast": "TVP1, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-27T05:00:00+02:00",
    "summary": "MŚ 2026: Egipt – Iran",
    "description": "Faza grupowa - Grupa G. Transmisja: TVP SPORT, TVPSPORT.PL. Miejsce: Seattle, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Seattle, USA",
    "phase": "Faza grupowa",
    "group": "Grupa G",
    "broadcast": "TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-27T05:00:00+02:00",
    "summary": "MŚ 2026: Nowa Zelandia – Belgia",
    "description": "Faza grupowa - Grupa G. Transmisja: TVP2, TVP SPORT, TVPSPORT.PL. Miejsce: Vancouver, Kanada. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Vancouver, Kanada",
    "phase": "Faza grupowa",
    "group": "Grupa G",
    "broadcast": "TVP2, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-27T23:00:00+02:00",
    "summary": "MŚ 2026: Chorwacja – Ghana",
    "description": "Faza grupowa - Grupa L. Transmisja: TVP1, TVPSPORT.PL. Miejsce: Filadelfia, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Filadelfia, USA",
    "phase": "Faza grupowa",
    "group": "Grupa L",
    "broadcast": "TVP1, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-27T23:00:00+02:00",
    "summary": "MŚ 2026: Panama – Anglia",
    "description": "Faza grupowa - Grupa L. Transmisja: TVP SPORT, TVPSPORT.PL. Miejsce: New Jersey, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "New Jersey, USA",
    "phase": "Faza grupowa",
    "group": "Grupa L",
    "broadcast": "TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-28T01:30:00+02:00",
    "summary": "MŚ 2026: DR Konga – Uzbekistan",
    "description": "Faza grupowa - Grupa K. Transmisja: TVP SPORT, TVPSPORT.PL. Miejsce: Atlanta, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Atlanta, USA",
    "phase": "Faza grupowa",
    "group": "Grupa K",
    "broadcast": "TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-28T01:30:00+02:00",
    "summary": "MŚ 2026: Kolumbia – Portugalia",
    "description": "Faza grupowa - Grupa K. Transmisja: TVP1, TVPSPORT.PL. Miejsce: Miami, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Miami, USA",
    "phase": "Faza grupowa",
    "group": "Grupa K",
    "broadcast": "TVP1, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-28T04:00:00+02:00",
    "summary": "MŚ 2026: Algieria – Austria",
    "description": "Faza grupowa - Grupa J. Transmisja: TVP SPORT, TVPSPORT.PL. Miejsce: Kansas City, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Kansas City, USA",
    "phase": "Faza grupowa",
    "group": "Grupa J",
    "broadcast": "TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-28T04:00:00+02:00",
    "summary": "MŚ 2026: Jordania – Argentyna",
    "description": "Faza grupowa - Grupa J. Transmisja: TVP2, TVP SPORT, TVPSPORT.PL. Miejsce: Dallas / Arlington, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Dallas / Arlington, USA",
    "phase": "Faza grupowa",
    "group": "Grupa J",
    "broadcast": "TVP2, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-28T21:00:00+02:00",
    "summary": "MŚ 2026: 2A – 2B",
    "description": "1/16 finału - Mecz 73. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Los Angeles, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Los Angeles, USA",
    "phase": "1/16 finału",
    "group": "",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-29T19:00:00+02:00",
    "summary": "MŚ 2026: 1C – 2F",
    "description": "1/16 finału - Mecz 76. Transmisja: TVP2, TVP SPORT, TVPSPORT.PL. Miejsce: Houston, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Houston, USA",
    "phase": "1/16 finału",
    "group": "",
    "broadcast": "TVP2, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-29T22:30:00+02:00",
    "summary": "MŚ 2026: 1E – 3ABCDF",
    "description": "1/16 finału - Mecz 74. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Boston, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Boston, USA",
    "phase": "1/16 finału",
    "group": "",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-30T03:00:00+02:00",
    "summary": "MŚ 2026: 1F – 2C",
    "description": "1/16 finału - Mecz 75. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Monterrey, Meksyk. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Monterrey, Meksyk",
    "phase": "1/16 finału",
    "group": "",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-30T19:00:00+02:00",
    "summary": "MŚ 2026: 2E – 2I",
    "description": "1/16 finału - Mecz 78. Transmisja: TVP2, TVP SPORT, TVPSPORT.PL. Miejsce: Dallas / Arlington, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Dallas / Arlington, USA",
    "phase": "1/16 finału",
    "group": "",
    "broadcast": "TVP2, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-06-30T23:00:00+02:00",
    "summary": "MŚ 2026: 1I – 3CDFGH",
    "description": "1/16 finału - Mecz 77. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: New Jersey, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "New Jersey, USA",
    "phase": "1/16 finału",
    "group": "",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-07-01T03:00:00+02:00",
    "summary": "MŚ 2026: 1A – 3CEFHI",
    "description": "1/16 finału - Mecz 79. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Mexico City, Meksyk. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Mexico City, Meksyk",
    "phase": "1/16 finału",
    "group": "",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-07-01T18:00:00+02:00",
    "summary": "MŚ 2026: 1L – 3EHIJK",
    "description": "1/16 finału - Mecz 80. Transmisja: TVP2, TVP SPORT, TVPSPORT.PL. Miejsce: Atlanta, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Atlanta, USA",
    "phase": "1/16 finału",
    "group": "",
    "broadcast": "TVP2, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-07-01T22:00:00+02:00",
    "summary": "MŚ 2026: 1G – 3AEHIJ",
    "description": "1/16 finału - Mecz 82. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Seattle, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Seattle, USA",
    "phase": "1/16 finału",
    "group": "",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-07-02T02:00:00+02:00",
    "summary": "MŚ 2026: 1D – 3BEFIJ",
    "description": "1/16 finału - Mecz 81. Transmisja: TVP2, TVP SPORT, TVPSPORT.PL. Miejsce: Santa Clara, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Santa Clara, USA",
    "phase": "1/16 finału",
    "group": "",
    "broadcast": "TVP2, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-07-02T21:00:00+02:00",
    "summary": "MŚ 2026: 1H – 2J",
    "description": "1/16 finału - Mecz 84. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Los Angeles, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Los Angeles, USA",
    "phase": "1/16 finału",
    "group": "",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-07-03T01:00:00+02:00",
    "summary": "MŚ 2026: 2K – 2L",
    "description": "1/16 finału - Mecz 83. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Toronto, Kanada. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Toronto, Kanada",
    "phase": "1/16 finału",
    "group": "",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-07-03T05:00:00+02:00",
    "summary": "MŚ 2026: 1B – 3EFGIJ",
    "description": "1/16 finału - Mecz 85. Transmisja: TVP2, TVP SPORT, TVPSPORT.PL. Miejsce: Vancouver, Kanada. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Vancouver, Kanada",
    "phase": "1/16 finału",
    "group": "",
    "broadcast": "TVP2, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-07-03T20:00:00+02:00",
    "summary": "MŚ 2026: 2D – 2G",
    "description": "1/16 finału - Mecz 88. Transmisja: TVP2, TVP SPORT, TVPSPORT.PL. Miejsce: Dallas / Arlington, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Dallas / Arlington, USA",
    "phase": "1/16 finału",
    "group": "",
    "broadcast": "TVP2, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-07-04T00:00:00+02:00",
    "summary": "MŚ 2026: 1J – 2H",
    "description": "1/16 finału - Mecz 86. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Miami, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Miami, USA",
    "phase": "1/16 finału",
    "group": "",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-07-04T03:30:00+02:00",
    "summary": "MŚ 2026: 1K – 3DEIJL",
    "description": "1/16 finału - Mecz 87. Transmisja: TVP2, TVP SPORT, TVPSPORT.PL. Miejsce: Kansas City, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Kansas City, USA",
    "phase": "1/16 finału",
    "group": "",
    "broadcast": "TVP2, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-07-04T19:00:00+02:00",
    "summary": "MŚ 2026: 2A/2B – 1F/2C",
    "description": "1/8 finału - Mecz 90. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Houston, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Houston, USA",
    "phase": "1/8 finału",
    "group": "",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-07-04T23:00:00+02:00",
    "summary": "MŚ 2026: 1E/3ABCDF – 1I/3CDFGH",
    "description": "1/8 finału - Mecz 89. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Filadelfia, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Filadelfia, USA",
    "phase": "1/8 finału",
    "group": "",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-07-05T22:00:00+02:00",
    "summary": "MŚ 2026: 1C/2F – 2E/2I",
    "description": "1/8 finału - Mecz 91. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: East Rutherford / New Jersey, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "East Rutherford / New Jersey, USA",
    "phase": "1/8 finału",
    "group": "",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-07-06T02:00:00+02:00",
    "summary": "MŚ 2026: 1A/3CEFHI – 1L/3EHIJK",
    "description": "1/8 finału - Mecz 92. Transmisja: TVP2, TVP SPORT, TVPSPORT.PL. Miejsce: Mexico City, Meksyk. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Mexico City, Meksyk",
    "phase": "1/8 finału",
    "group": "",
    "broadcast": "TVP2, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-07-06T21:00:00+02:00",
    "summary": "MŚ 2026: 2K/2L – 1H/2J",
    "description": "1/8 finału - Mecz 93. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Dallas / Arlington, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Dallas / Arlington, USA",
    "phase": "1/8 finału",
    "group": "",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-07-07T02:00:00+02:00",
    "summary": "MŚ 2026: 1D/3BEFIJ – 1G/3AEHIJ",
    "description": "1/8 finału - Mecz 94. Transmisja: TVP2, TVP SPORT, TVPSPORT.PL. Miejsce: Seattle, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Seattle, USA",
    "phase": "1/8 finału",
    "group": "",
    "broadcast": "TVP2, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-07-07T18:00:00+02:00",
    "summary": "MŚ 2026: 1J/2H – 2D/2G",
    "description": "1/8 finału - Mecz 95. Transmisja: TVP2, TVP SPORT, TVPSPORT.PL. Miejsce: Atlanta, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Atlanta, USA",
    "phase": "1/8 finału",
    "group": "",
    "broadcast": "TVP2, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-07-07T22:00:00+02:00",
    "summary": "MŚ 2026: 1B/3EFGIJ – 1K/3DEIJL",
    "description": "1/8 finału - Mecz 96. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Vancouver, Kanada. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Vancouver, Kanada",
    "phase": "1/8 finału",
    "group": "",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-07-09T22:00:00+02:00",
    "summary": "MŚ 2026: #1 – #2",
    "description": "Ćwierćfinał - Mecz 97. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Boston, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Boston, USA",
    "phase": "Ćwierćfinał",
    "group": "",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-07-10T21:00:00+02:00",
    "summary": "MŚ 2026: #5 – #6",
    "description": "Ćwierćfinał - Mecz 98. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Los Angeles, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Los Angeles, USA",
    "phase": "Ćwierćfinał",
    "group": "",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-07-11T23:00:00+02:00",
    "summary": "MŚ 2026: #3 – #4",
    "description": "Ćwierćfinał - Mecz 99. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Miami, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Miami, USA",
    "phase": "Ćwierćfinał",
    "group": "",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-07-12T03:00:00+02:00",
    "summary": "MŚ 2026: #7 – #8",
    "description": "Ćwierćfinał - Mecz 100. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Kansas City, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Kansas City, USA",
    "phase": "Ćwierćfinał",
    "group": "",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-07-14T21:00:00+02:00",
    "summary": "MŚ 2026: #1 – #2",
    "description": "Półfinał - Mecz 101. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Dallas / Arlington, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Dallas / Arlington, USA",
    "phase": "Półfinał",
    "group": "",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-07-15T21:00:00+02:00",
    "summary": "MŚ 2026: #3 – #4",
    "description": "Półfinał - Mecz 102. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Atlanta, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Atlanta, USA",
    "phase": "Półfinał",
    "group": "",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-07-18T23:00:00+02:00",
    "summary": "MŚ 2026: Mecz o 3. miejsce",
    "description": "Mecz o 3. miejsce - Mecz 103. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: Miami, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "Miami, USA",
    "phase": "Mecz o 3. miejsce",
    "group": "",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  },
  {
    "dateTime": "2026-07-19T21:00:00+02:00",
    "summary": "MŚ 2026: Finał mistrzostw świata",
    "description": "Finał - Mecz 104. Transmisja: TVP1, TVP SPORT, TVPSPORT.PL. Miejsce: New Jersey, USA. Źródła: terminarz FIFA/Sky Sports; plan transmisji TVP za Wirtualne Media/TVP Sport. Godziny w czasie Polski (Europe/Warsaw).",
    "location": "New Jersey, USA",
    "phase": "Finał",
    "group": "",
    "broadcast": "TVP1, TVP SPORT, TVPSPORT.PL"
  }
];
