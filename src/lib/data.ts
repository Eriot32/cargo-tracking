import { CargoTracking } from './types';

export const cargoData: CargoTracking[] = [
  {
    "id": "1",
    "ponum_pib": "100125/PE/POMI/26",
    "pengirim": "QUINTA RADDISON INC",
    "mawb": "18018999282",
    "hawb": "NAEH-72171",
    "pieces_weight": "1 pcs / 15 kg",
    "routing": "JFK - ICN -> ICN - CGK ",
    "image_url": "/tracking-images/image1.png",
    "flights": [
      {
        "flight": "KE0270",
        "route": "JFK - ICN",
        "date_time": "Departure: 04 Feb 2026 Sat Dec 30 1899 12:17:00 GMT+0707 (Western Indonesia Time)"
      },
      {
        "flight": "KE0437",
        "route": "ICN - CGK ",
        "date_time": "Arrival: 06 Feb 2026 Sat Dec 30 1899 19:40:00 GMT+0707 (Western Indonesia Time)"
      }
    ],
    "search_text": "100125/PE/POMI/26 QUINTA RADDISON INC NAEH-72171 18018999282 JFK - ICN -> ICN - CGK  KE0270 JFK - ICN KE0437 ICN - CGK "
  },
  {
    "id": "2",
    "ponum_pib": "92682/PE/POMI/24",
    "pengirim": "JAPAN MACHINERY COMPANY",
    "mawb": "13149844922",
    "hawb": "UCI-70030563",
    "pieces_weight": "1 pcs / 178 kg",
    "routing": "NRT  -> CGK ",
    "image_url": "/tracking-images/image2.png",
    "flights": [
      {
        "flight": "JL725",
        "route": "NRT ",
        "date_time": "Departure: 29 Jan 2025 Sat Dec 30 1899 10:55:00 GMT+0707 (Western Indonesia Time)"
      },
      {
        "flight": "JL725",
        "route": "CGK ",
        "date_time": "Arrival: 29 Jan 2025 Sat Dec 30 1899 17:24:00 GMT+0707 (Western Indonesia Time)"
      }
    ],
    "search_text": "92682/PE/POMI/24 JAPAN MACHINERY COMPANY UCI-70030563 13149844922 NRT  -> CGK  JL725 NRT  JL725 CGK "
  },
  {
    "id": "3",
    "ponum_pib": "94549/PE/POMI/24",
    "pengirim": "APT POWERDRIVE",
    "mawb": "67226080176",
    "hawb": "UK25002547",
    "pieces_weight": "1 pcs / 100 kg",
    "routing": "LHR - BWN  -> BWN - CGK ",
    "image_url": "/tracking-images/image3.png",
    "flights": [
      {
        "flight": "BI098",
        "route": "LHR - BWN ",
        "date_time": "Departure: 02 Mar 2025 Sat Dec 30 1899 17:15:00 GMT+0707 (Western Indonesia Time)"
      },
      {
        "flight": "BI795",
        "route": "BWN - CGK ",
        "date_time": "Arrival: 04 Mar 2025 Sat Dec 30 1899 20:15:00 GMT+0707 (Western Indonesia Time)"
      }
    ],
    "search_text": "94549/PE/POMI/24 APT POWERDRIVE UK25002547 67226080176 LHR - BWN  -> BWN - CGK  BI098 LHR - BWN  BI795 BWN - CGK "
  },
  {
    "id": "4",
    "ponum_pib": "94907/PE/POMI/25",
    "pengirim": "MCMASTER CARR SUPPLY CO",
    "mawb": "29763771061",
    "hawb": "CAEH-59149",
    "pieces_weight": "1 pcs / 9 kg",
    "routing": "ORD - TPE  -> TPE - CGK",
    "image_url": "/tracking-images/image4.png",
    "flights": [
      {
        "flight": "CI5239",
        "route": "ORD - TPE ",
        "date_time": "Departure: 30 Jan 2025 Sat Dec 30 1899 21:33:00 GMT+0707 (Western Indonesia Time)"
      },
      {
        "flight": "CI5855",
        "route": "TPE - CGK",
        "date_time": "Arrival: 08 Feb 2025 Sat Dec 30 1899 12:31:00 GMT+0707 (Western Indonesia Time)"
      }
    ],
    "search_text": "94907/PE/POMI/25 MCMASTER CARR SUPPLY CO CAEH-59149 29763771061 ORD - TPE  -> TPE - CGK CI5239 ORD - TPE  CI5855 TPE - CGK"
  },
  {
    "id": "5",
    "ponum_pib": "94970/PE/POMI/25",
    "pengirim": "M.C.V S.P.A",
    "mawb": "61824259303",
    "hawb": "IT25000880",
    "pieces_weight": "1 pcs / 475 kg",
    "routing": "MXP - SIN  -> SIN - SUB",
    "image_url": "/tracking-images/image5.png",
    "flights": [
      {
        "flight": "SQ0355",
        "route": "MXP - SIN ",
        "date_time": "Departure: 16 Mar 2025 Sat Dec 30 1899 23:25:00 GMT+0707 (Western Indonesia Time)"
      },
      {
        "flight": "TR0262",
        "route": "SIN - SUB",
        "date_time": "Arrival: 22 Mar 2025 Sat Dec 30 1899 18:40:00 GMT+0707 (Western Indonesia Time)"
      }
    ],
    "search_text": "94970/PE/POMI/25 M.C.V S.P.A IT25000880 61824259303 MXP - SIN  -> SIN - SUB SQ0355 MXP - SIN  TR0262 SIN - SUB"
  },
  {
    "id": "6",
    "ponum_pib": "94976/PE/POMI/25",
    "pengirim": "PILGRIM INTERNATIONAL LTD",
    "mawb": "61821250051",
    "hawb": "SE25000840",
    "pieces_weight": "1 pcs / 17.5 kg",
    "routing": "ARN - SIN  -> SIN - SUB ",
    "image_url": "/tracking-images/image6.png",
    "flights": [
      {
        "flight": "SQ0351",
        "route": "ARN - SIN ",
        "date_time": "Departure: 22 Mei 2025 Sat Dec 30 1899 11:55:00 GMT+0707 (Western Indonesia Time)"
      },
      {
        "flight": "SQ0928",
        "route": "SIN - SUB ",
        "date_time": "Arrival: 23 Mei 2025 Sat Dec 30 1899 18:18:00 GMT+0707 (Western Indonesia Time)"
      }
    ],
    "search_text": "94976/PE/POMI/25 PILGRIM INTERNATIONAL LTD SE25000840 61821250051 ARN - SIN  -> SIN - SUB  SQ0351 ARN - SIN  SQ0928 SIN - SUB "
  },
  {
    "id": "7",
    "ponum_pib": "94979/PE/POMI/25",
    "pengirim": "BEAUDREY PORTUGAL LDA",
    "mawb": "61836071114",
    "hawb": "00014769",
    "pieces_weight": "1 pcs / 165 kg",
    "routing": "SIN -> SUB",
    "image_url": "/tracking-images/image7.png",
    "flights": [
      {
        "flight": "SQ0922",
        "route": "SIN",
        "date_time": "Departure: 01 Jul 2025 Sat Dec 30 1899 07:50:00 GMT+0707 (Western Indonesia Time)"
      },
      {
        "flight": "SQ0922",
        "route": "SUB",
        "date_time": "Arrival: 01 Jul 2025 Sat Dec 30 1899 09:10:00 GMT+0707 (Western Indonesia Time)"
      }
    ],
    "search_text": "94979/PE/POMI/25 BEAUDREY PORTUGAL LDA 00014769 61836071114 SIN -> SUB SQ0922 SIN SQ0922 SUB"
  },
  {
    "id": "8",
    "ponum_pib": "95311/PE/POMI/25",
    "pengirim": "QUINTA RADDISON INC",
    "mawb": "18026227121",
    "hawb": "NAEH-71121",
    "pieces_weight": "1 pcs / 5 kg",
    "routing": "JFK - ICN -> ICN - CGK ",
    "image_url": "/tracking-images/image8.png",
    "flights": [
      {
        "flight": "KE8250",
        "route": "JFK - ICN",
        "date_time": "Departure: 03 Mar 2025 Sat Dec 30 1899 12:15:00 GMT+0707 (Western Indonesia Time)"
      },
      {
        "flight": "KE0439",
        "route": "ICN - CGK ",
        "date_time": "Arrival: 08 Mar 2025 Sat Dec 30 1899 17:06:00 GMT+0707 (Western Indonesia Time)"
      }
    ],
    "search_text": "95311/PE/POMI/25 QUINTA RADDISON INC NAEH-71121 18026227121 JFK - ICN -> ICN - CGK  KE8250 JFK - ICN KE0439 ICN - CGK"
  },
  {
    "id": "9",
    "ponum_pib": "95749/PE/POMI/25",
    "pengirim": "QUINTA RADDISON INC",
    "mawb": "18026227246",
    "hawb": "NAEH-71200",
    "pieces_weight": "1 pcs / 4 kg",
    "routing": "JFK - ICN -> ICN - CGK ",
    "image_url": "/tracking-images/image9.png",
    "flights": [
      {
        "flight": "KE250",
        "route": "JFK - ICN",
        "date_time": "Departure: 28 Mar 2025 Sat Dec 30 1899 11:49:00 GMT+0707 (Western Indonesia Time)"
      },
      {
        "flight": "KE0627",
        "route": "ICN - CGK ",
        "date_time": "Arrival: 07 Apr 2025 Sat Dec 30 1899 15:16:00 GMT+0707 (Western Indonesia Time)"
      }
    ],
    "search_text": "95749/PE/POMI/25 QUINTA RADDISON INC NAEH-71200 18026227246 JFK - ICN -> ICN - CGK  KE250 JFK - ICN KE0627 ICN - CGK "
  },
  {
    "id": "10",
    "ponum_pib": "95985/PE/POMI/25",
    "pengirim": "KENSEI SANGYO CO., LTD",
    "mawb": "61844301924",
    "hawb": "UCI-70032102",
    "pieces_weight": "1 pcs / 200.4 kg",
    "routing": "NRT - SIN  -> SIN - CGK",
    "image_url": "/tracking-images/image10.png",
    "flights": [
      {
        "flight": "TR0809",
        "route": "NRT - SIN ",
        "date_time": "Departure: 08 Jul 2025 Sat Dec 30 1899 08:47:00 GMT+0707 (Western Indonesia Time)"
      },
      {
        "flight": "SQ0928",
        "route": "SIN - CGK",
        "date_time": "Arrival: 09 Jul 2025 Sat Dec 30 1899 18:18:00 GMT+0707 (Western Indonesia Time)"
      }
    ],
    "search_text": "95985/PE/POMI/25 KENSEI SANGYO CO., LTD UCI-70032102 61844301924 NRT - SIN  -> SIN - CGK TR0809 NRT - SIN  SQ0928 SIN - CGK"
  },
  {
    "id": "11",
    "ponum_pib": "96149/PE/POMI/25",
    "pengirim": "QUINTA RADDISON INC",
    "mawb": "18018840393",
    "hawb": "NAEH-71947",
    "pieces_weight": "1 pcs / 5 kg",
    "routing": "JFK - ICN -> ICN - CGK ",
    "image_url": "/tracking-images/image11.png",
    "flights": [
      {
        "flight": "KE0250",
        "route": "JFK - ICN",
        "date_time": "Departure: 22 Nov 2025 Sat Dec 30 1899 11:49:00 GMT+0707 (Western Indonesia Time)"
      },
      {
        "flight": "KE0437",
        "route": "ICN - CGK ",
        "date_time": "Arrival: 23 Nov 2025 Sat Dec 30 1899 19:40:00 GMT+0707 (Western Indonesia Time)"
      }
    ],
    "search_text": "96149/PE/POMI/25 QUINTA RADDISON INC NAEH-71947 18018840393 JFK - ICN -> ICN - CGK  KE0250 JFK - ICN KE0437 ICN - CGK "
  },
  {
    "id": "12",
    "ponum_pib": "96717/PE/POMI/25",
    "pengirim": "NEWMANS VALVE",
    "mawb": "61848094686",
    "hawb": "H701388146",
    "pieces_weight": "1 pcs / 109 kg",
    "routing": "MXP - SIN  -> SIN - SUB ",
    "image_url": "/tracking-images/image12.png",
    "flights": [
      {
        "flight": "SQ0355",
        "route": "MXP - SIN ",
        "date_time": "Departure: 03 Des 2025 Sat Dec 30 1899 23:25:00 GMT+0707 (Western Indonesia Time)"
      },
      {
        "flight": "SQ0922",
        "route": "SIN - SUB ",
        "date_time": "Arrival: 06 Des 2025 Sat Dec 30 1899 09:10:00 GMT+0707 (Western Indonesia Time)"
      }
    ],
    "search_text": "96717/PE/POMI/25 NEWMANS VALVE H701388146 61848094686 MXP - SIN  -> SIN - SUB  SQ0355 MXP - SIN  SQ0922 SIN - SUB "
  },
  {
    "id": "13",
    "ponum_pib": "96733/PE/POMI/25",
    "pengirim": "EXIM & MFR ENTERPRISE",
    "mawb": "12690436603",
    "hawb": "RL202511005",
    "pieces_weight": "3 pcs / 24 kg",
    "routing": "SIN - CGK -> SUB",
    "image_url": "/tracking-images/image13.png",
    "flights": [
      {
        "flight": "GA0823",
        "route": "SIN - CGK",
        "date_time": "Departure: 17 Nov 2025 Sat Dec 30 1899 07:09:00 GMT+0707 (Western Indonesia Time)"
      },
      {
        "flight": "GA0320",
        "route": "SUB",
        "date_time": "Arrival: 17 Nov 2025 Sat Dec 30 1899 16:12:00 GMT+0707 (Western Indonesia Time)"
      }
    ],
    "search_text": "96733/PE/POMI/25 EXIM & MFR ENTERPRISE RL202511005 12690436603 SIN - CGK -> SUB GA0823 SIN - CGK GA0320 SUB"
  },
  {
    "id": "14",
    "ponum_pib": "96809/PE/POMI/25",
    "pengirim": "QUINTA RADDISON INC",
    "mawb": "18026407721",
    "hawb": "NAEH-71543",
    "pieces_weight": "1 pcs / 5 kg",
    "routing": "JFK - ICN → ICN - CGK",
    "image_url": "/tracking-images/image14.png",
    "flights": [
      {
        "flight": "KE0252",
        "route": "JFK - ICN",
        "date_time": "Departure: 08 Jul 2025 01:45"
      },
      {
        "flight": "KE0349",
        "route": "ICN - CGK",
        "date_time": "Arrival: 17 Jul 2025 03:20"
      }
    ],
    "search_text": "96809/PE/POMI/25 QUINTA RADDISON INC NAEH-71543 18026407721 JFK - ICN → ICN - CGK KE0252 JFK - ICN KE0349 ICN - CGK"
  },
  {
    "id": "15",
    "ponum_pib": "97000/PE/POMI/25",
    "pengirim": "CAJIMA CORPORATION LTD",
    "mawb": "61846278256",
    "hawb": "UCI-10056003",
    "pieces_weight": "1 pcs / 1 kg",
    "routing": "KIX - SIN → SIN - SUB",
    "image_url": "/tracking-images/image15.png",
    "flights": [
      {
        "flight": "SQ0621",
        "route": "KIX - SIN",
        "date_time": "Departure: 15 Aug 2025 17:22"
      },
      {
        "flight": "SQ0922",
        "route": "SIN - SUB",
        "date_time": "Arrival: 16 Aug 2025 09:10"
      }
    ],
    "search_text": "97000/PE/POMI/25 CAJIMA CORPORATION LTD UCI-10056003 61846278256 KIX - SIN → SIN - SUB SQ0621 KIX - SIN SQ0922 SIN - SUB"
  },
  {
    "id": "16",
    "ponum_pib": "97405/PE/POMI/25",
    "pengirim": "BUFFALO PUMPS",
    "mawb": "16001350996",
    "hawb": "S00002940",
    "pieces_weight": "1 pcs / 13 kg",
    "routing": "ORD - HKG → HKG - SUB",
    "image_url": "/tracking-images/image16.png",
    "flights": [
      {
        "flight": "CX3291",
        "route": "ORD - HKG",
        "date_time": "Departure: 04 Dec 2025 05:07"
      },
      {
        "flight": "CX779",
        "route": "HKG - SUB",
        "date_time": "Arrival: 06 Dec 2025 18:18"
      }
    ],
    "search_text": "97405/PE/POMI/25 BUFFALO PUMPS S00002940 16001350996 ORD - HKG → HKG - SUB CX3291 ORD - HKG CX779 HKG - SUB"
  },
  {
    "id": "17",
    "ponum_pib": "97547/PE/POMI/25",
    "pengirim": "YOKOTA MANUFACTURING CO.,LTD",
    "mawb": "23216101562",
    "hawb": "SAF-80058650",
    "pieces_weight": "1 pcs / 6 kg",
    "routing": "KIX -KUL → KUL - SUB",
    "image_url": "/tracking-images/image17.png",
    "flights": [
      {
        "flight": "MH0053",
        "route": "KIX -KUL",
        "date_time": "Departure: 01 Apr 2026 09:44"
      },
      {
        "flight": "MH0871",
        "route": "KUL - SUB",
        "date_time": "Arrival: 02 Apr 2026 09:10"
      }
    ],
    "search_text": "97547/PE/POMI/25 YOKOTA MANUFACTURING CO.,LTD SAF-80058650 23216101562 KIX -KUL → KUL - SUB MH0053 KIX -KUL MH0871 KUL - SUB"
  },
  {
    "id": "18",
    "ponum_pib": "97714/PE/POMI/25",
    "pengirim": "JOHN THOMPSON ENGINEERING PTY LTD",
    "mawb": "61846648125",
    "hawb": "MELAA3082371",
    "pieces_weight": "2 pcs / 18 kg",
    "routing": "MEL - SIN → SIN - SUB",
    "image_url": "/tracking-images/image18.png",
    "flights": [
      {
        "flight": "SQ0238",
        "route": "MEL - SIN",
        "date_time": "Departure: 12 Feb 2026 10:15"
      },
      {
        "flight": "SQ0922",
        "route": "SIN - SUB",
        "date_time": "Arrival: 15 Feb 2026 09:10"
      }
    ],
    "search_text": "97714/PE/POMI/25 JOHN THOMPSON ENGINEERING PTY LTD MELAA3082371 61846648125 MEL - SIN → SIN - SUB SQ0238 MEL - SIN SQ0922 SIN - SUB"
  },
  {
    "id": "19",
    "ponum_pib": "97816/PE/POMI/25",
    "pengirim": "QUINTA RADDISON INC",
    "mawb": "18018840581",
    "hawb": "NAEH-72012",
    "pieces_weight": "1 pcs / 1 kg",
    "routing": "JFK - ICN → ICN - CGK",
    "image_url": "/tracking-images/image19.png",
    "flights": [
      {
        "flight": "KE0252",
        "route": "JFK - ICN",
        "date_time": "Departure: 17 Dec 2025 01:45"
      },
      {
        "flight": "KE0437",
        "route": "ICN - CGK",
        "date_time": "Arrival: 19 Dec 2025 12:45"
      }
    ],
    "search_text": "97816/PE/POMI/25 QUINTA RADDISON INC NAEH-72012 18018840581 JFK - ICN → ICN - CGK KE0252 JFK - ICN KE0437 ICN - CGK"
  },
  {
    "id": "21",
    "ponum_pib": "98209/PE/POMI/25",
    "pengirim": "AESCO INTERNATIONAL PTE LTD",
    "mawb": "61847610861",
    "hawb": "202509-00012",
    "pieces_weight": "1 pcs / 78.5 kg",
    "routing": "SIN → SUB",
    "image_url": "/tracking-images/image21.png",
    "flights": [
      {
        "flight": "SQ0928",
        "route": "SIN",
        "date_time": "Departure: 24 Sept 2025 17:10"
      },
      {
        "flight": "SQ0928",
        "route": "SUB",
        "date_time": "Arrival: 24 Sept 2025 18:20"
      }
    ],
    "search_text": "98209/PE/POMI/25 AESCO INTERNATIONAL PTE LTD 202509-00012 61847610861 SIN → SUB SQ0928 SIN SQ0928 SUB"
  },
  {
    "id": "22",
    "ponum_pib": "98393/PE/POMI/25",
    "pengirim": "MCMASTER CARR SUPPLY COMPANY",
    "mawb": "29769793146",
    "hawb": "CAEH-59687",
    "pieces_weight": "1 pcs / 22 kg",
    "routing": "ORD - TPE → TPE - CGK",
    "image_url": "/tracking-images/image22.png",
    "flights": [
      {
        "flight": "CI5313",
        "route": "ORD - TPE",
        "date_time": "Departure: 18 Oct 2025 14:12"
      },
      {
        "flight": "CI0761",
        "route": "TPE - CGK",
        "date_time": "Arrival: 21 Oct 2025 14:02"
      }
    ],
    "search_text": "98393/PE/POMI/25 MCMASTER CARR SUPPLY COMPANY CAEH-59687 29769793146 ORD - TPE → TPE - CGK CI5313 ORD - TPE CI0761 TPE - CGK"
  },
  {
    "id": "23",
    "ponum_pib": "98497/PE/POMI/25",
    "pengirim": "QUINTA RADDISON INC",
    "mawb": "12690483606",
    "hawb": "RL202512007",
    "pieces_weight": "2 pcs / 21 kg",
    "routing": "SIN → SUB",
    "image_url": "/tracking-images/image23.png",
    "flights": [
      {
        "flight": "GA0855",
        "route": "SIN",
        "date_time": "Departure: 13 Dec 2025 19:16"
      },
      {
        "flight": "GA0855",
        "route": "SUB",
        "date_time": "Arrival: 13 Dec 2025 20:41"
      }
    ],
    "search_text": "98497/PE/POMI/25 QUINTA RADDISON INC RL202512007 12690483606 SIN → SUB GA0855 SIN GA0855 SUB"
  },
  {
    "id": "24",
    "ponum_pib": "98773/PE/POMI/25",
    "pengirim": "DEPCOM INTERNATIONAL",
    "mawb": "12690483632",
    "hawb": "RL202512009",
    "pieces_weight": "2 pcs / 25 kg",
    "routing": "SIN → SUB",
    "image_url": "/tracking-images/image24.png",
    "flights": [
      {
        "flight": "GA0855",
        "route": "SIN",
        "date_time": "Departure: 18 Dec 2025 19:17"
      },
      {
        "flight": "GA0855",
        "route": "SUB",
        "date_time": "Arrival: 18 Dec 2025 22:02"
      }
    ],
    "search_text": "98773/PE/POMI/25 DEPCOM INTERNATIONAL RL202512009 12690483632 SIN → SUB GA0855 SIN GA0855 SUB"
  },
  {
    "id": "25",
    "ponum_pib": "98890/PE/POMI/25",
    "pengirim": "HOWDEN AXIAL FANS APS",
    "mawb": "61834679470",
    "hawb": "DK26000095",
    "pieces_weight": "1 pcs / 5.5 kg",
    "routing": "CPH - SIN → SIN - SUB",
    "image_url": "/tracking-images/image25.png",
    "flights": [
      {
        "flight": "SQ0351",
        "route": "CPH - SIN",
        "date_time": "Departure: 17 Jan 2026 11:55"
      },
      {
        "flight": "SQ0928",
        "route": "SIN - SUB",
        "date_time": "Arrival: 18 Jan 2026 18:20"
      }
    ],
    "search_text": "98890/PE/POMI/25 HOWDEN AXIAL FANS APS DK26000095 61834679470 CPH - SIN → SIN - SUB SQ0351 CPH - SIN SQ0928 SIN - SUB"
  },
  {
    "id": "26",
    "ponum_pib": "99391/PE/POMI/25",
    "pengirim": "QUINTA RADDISON INC",
    "mawb": "18018840544",
    "hawb": "NAEH-71994",
    "pieces_weight": "1 pcs / 4 kg",
    "routing": "JFK - ICN → ICN - CGK",
    "image_url": "/tracking-images/image26.png",
    "flights": [
      {
        "flight": "KE8258",
        "route": "JFK - ICN",
        "date_time": "Departure: 10 Dec 2025 11:00"
      },
      {
        "flight": "KE0437",
        "route": "ICN - CGK",
        "date_time": "Arrival: 12 Dec 2025 12:45"
      }
    ],
    "search_text": "99391/PE/POMI/25 QUINTA RADDISON INC NAEH-71994 18018840544 JFK - ICN → ICN - CGK KE8258 JFK - ICN KE0437 ICN - CGK"
  },
  {
    "id": "27",
    "ponum_pib": "99643/PE/POMI/25",
    "pengirim": "MCMASTER CARR SUPPLY COMPANY",
    "mawb": "29769793242",
    "hawb": "CAEH-59826",
    "pieces_weight": "1 pcs / 5 kg",
    "routing": "ORD - TPE → TPE - CGK",
    "image_url": "/tracking-images/image27.png",
    "flights": [
      {
        "flight": "CI5239",
        "route": "ORD - TPE",
        "date_time": "Departure: 20 Dec 2025 02:06"
      },
      {
        "flight": "CI5869",
        "route": "TPE - CGK",
        "date_time": "Arrival: 24 Dec 2025 09:45"
      }
    ],
    "search_text": "99643/PE/POMI/25 MCMASTER CARR SUPPLY COMPANY CAEH-59826 29769793242 ORD - TPE → TPE - CGK CI5239 ORD - TPE CI5869 TPE - CGK"
  },
  {
    "id": "28",
    "ponum_pib": "99696/PE/POMI/25",
    "pengirim": "DEPCOM INTERNATIONAL",
    "mawb": "61850819344",
    "hawb": "JL202604060",
    "pieces_weight": "1 pcs / 13 kg",
    "routing": "SIN → SUB",
    "image_url": "/tracking-images/image28.png",
    "flights": [
      {
        "flight": "SQ0922",
        "route": "SIN",
        "date_time": "Departure: 16 Apr 2026 07:50"
      },
      {
        "flight": "SQ0922",
        "route": "SUB",
        "date_time": "Arrival: 16 Apr 2026 09:10"
      }
    ],
    "search_text": "99696/PE/POMI/25 DEPCOM INTERNATIONAL JL202604060 61850819344 SIN → SUB SQ0922 SIN SQ0922 SUB"
  }
];
