import { CargoTracking } from './types';

export const cargoData: CargoTracking[] = [
  {
    "id": "1",
    "ponum_pib": "100125/PE/POMI/26",
    "pengirim": "QUINTA RADDISON INC",
    "hawb": "NAEH-72171",
    "mawb": "18018999282",
    "pieces_weight": "1 pcs / 15 kg",
    "routing": "JFK - ICN → 2/6/26",
    "flights": [
      {
        "flight": "KE0270",
        "route": "JFK - ICN",
        "date_time": "Departed: 05 Feb 2026 12:17"
      },
      {
        "flight": "03:32:00",
        "route": "2/6/26",
        "date_time": "Arrived: ICN - CGK KE043"
      }
    ],
    "search_text": "100125/PE/POMI/26 QUINTA RADDISON INC NAEH-72171 18018999282 JFK - ICN → 2/6/26 KE0270 JFK - ICN 03:32:00 2/6/26"
  },
  {
    "id": "2",
    "ponum_pib": "92682/PE/POMI/24",
    "pengirim": "JAPAN MACHINERY COMPANY",
    "hawb": "UCI-70030563",
    "mawb": "13149844922",
    "pieces_weight": "1 pcs / 178 kg",
    "routing": "NRT - CGK → 1/30/25",
    "flights": [
      {
        "flight": "JL725",
        "route": "NRT - CGK",
        "date_time": "Departed: 30 Jan 2025 10:55"
      },
      {
        "flight": "17:24:00",
        "route": "1/30/25",
        "date_time": "Arrived: TBA"
      }
    ],
    "search_text": "92682/PE/POMI/24 JAPAN MACHINERY COMPANY UCI-70030563 13149844922 NRT - CGK → 1/30/25 JL725 NRT - CGK 17:24:00 1/30/25"
  },
  {
    "id": "3",
    "ponum_pib": "94549/PE/POMI/24",
    "pengirim": "APT POWERDRIVE",
    "hawb": "UK25002547",
    "mawb": "67226080176",
    "pieces_weight": "1 pcs / 100 kg",
    "routing": "LHR - BWN → 3/4/25",
    "flights": [
      {
        "flight": "BI098",
        "route": "LHR - BWN",
        "date_time": "Departed: 03 Mar 2025 17:15"
      },
      {
        "flight": "09:20:00",
        "route": "3/4/25",
        "date_time": "Arrived: BWN - CGK BI795"
      }
    ],
    "search_text": "94549/PE/POMI/24 APT POWERDRIVE UK25002547 67226080176 LHR - BWN → 3/4/25 BI098 LHR - BWN 09:20:00 3/4/25"
  },
  {
    "id": "4",
    "ponum_pib": "94907/PE/POMI/25",
    "pengirim": "MCMASTER CARR SUPPLY CO",
    "hawb": "CAEH-59149",
    "mawb": "29763771061",
    "pieces_weight": "1 pcs / 9 kg",
    "routing": "ORD - TPE → 2/1/25",
    "flights": [
      {
        "flight": "CI5239",
        "route": "ORD - TPE",
        "date_time": "Departed: 31 Jan 2025 21:33"
      },
      {
        "flight": "12:40:00",
        "route": "2/1/25",
        "date_time": "Arrived: TPE - CGK CI585"
      }
    ],
    "search_text": "94907/PE/POMI/25 MCMASTER CARR SUPPLY CO CAEH-59149 29763771061 ORD - TPE → 2/1/25 CI5239 ORD - TPE 12:40:00 2/1/25"
  },
  {
    "id": "5",
    "ponum_pib": "94970/PE/POMI/25",
    "pengirim": "M.C.V S.P.A",
    "hawb": "IT25000880",
    "mawb": "61824259303",
    "pieces_weight": "1 pcs / 475 kg",
    "routing": "MXP - SIN → 3/18/25",
    "flights": [
      {
        "flight": "SQ0355",
        "route": "MXP - SIN",
        "date_time": "Departed: 17 Mar 2025 23:25"
      },
      {
        "flight": "04:45:00",
        "route": "3/18/25",
        "date_time": "Arrived: SIN - SUB TR026"
      }
    ],
    "search_text": "94970/PE/POMI/25 M.C.V S.P.A IT25000880 61824259303 MXP - SIN → 3/18/25 SQ0355 MXP - SIN 04:45:00 3/18/25"
  },
  {
    "id": "6",
    "ponum_pib": "94976/PE/POMI/25",
    "pengirim": "PILGRIM INTERNATIONAL LTD",
    "hawb": "SE25000840",
    "mawb": "61821250051",
    "pieces_weight": "1 pcs / 17.5 kg",
    "routing": "ARN - SIN → 5/23/25",
    "flights": [
      {
        "flight": "SQ0351",
        "route": "ARN - SIN",
        "date_time": "Departed: 23 May 2025 11:55"
      },
      {
        "flight": "06:25:00",
        "route": "5/23/25",
        "date_time": "Arrived: SIN - SUB SQ092"
      }
    ],
    "search_text": "94976/PE/POMI/25 PILGRIM INTERNATIONAL LTD SE25000840 61821250051 ARN - SIN → 5/23/25 SQ0351 ARN - SIN 06:25:00 5/23/25"
  },
  {
    "id": "7",
    "ponum_pib": "94979/PE/POMI/25",
    "pengirim": "BEAUDREY PORTUGAL LDA",
    "hawb": "00014769",
    "mawb": "61836071114",
    "pieces_weight": "1 pcs / 165 kg",
    "routing": "SIN-SUB → 7/2/25",
    "flights": [
      {
        "flight": "SQ0922",
        "route": "SIN-SUB",
        "date_time": "Departed: 02 Jul 2025 07:50"
      },
      {
        "flight": "09:10:00",
        "route": "7/2/25",
        "date_time": "Arrived: TBA"
      }
    ],
    "search_text": "94979/PE/POMI/25 BEAUDREY PORTUGAL LDA 00014769 61836071114 SIN-SUB → 7/2/25 SQ0922 SIN-SUB 09:10:00 7/2/25"
  },
  {
    "id": "8",
    "ponum_pib": "95311/PE/POMI/25",
    "pengirim": "QUINTA RADDISON INC",
    "hawb": "NAEH-71121",
    "mawb": "18026227121",
    "pieces_weight": "1 pcs / 5 kg",
    "routing": "JFK - ICN → 3/5/25",
    "flights": [
      {
        "flight": "KE8250",
        "route": "JFK - ICN",
        "date_time": "Departed: 04 Mar 2025 12:15"
      },
      {
        "flight": "03:28:00",
        "route": "3/5/25",
        "date_time": "Arrived: ICN - CGK KE034"
      }
    ],
    "search_text": "95311/PE/POMI/25 QUINTA RADDISON INC NAEH-71121 18026227121 JFK - ICN → 3/5/25 KE8250 JFK - ICN 03:28:00 3/5/25"
  },
  {
    "id": "9",
    "ponum_pib": "95749/PE/POMI/25",
    "pengirim": "QUINTA RADDISON INC",
    "hawb": "NAEH-71200",
    "mawb": "18026227246",
    "pieces_weight": "1 pcs / 4 kg",
    "routing": "JFK - ICN → 3/30/25",
    "flights": [
      {
        "flight": "KE0250",
        "route": "JFK - ICN",
        "date_time": "Departed: 29 Mar 2025 11:49"
      },
      {
        "flight": "02:45:00",
        "route": "3/30/25",
        "date_time": "Arrived: ICN - CGK KE062"
      }
    ],
    "search_text": "95749/PE/POMI/25 QUINTA RADDISON INC NAEH-71200 18026227246 JFK - ICN → 3/30/25 KE0250 JFK - ICN 02:45:00 3/30/25"
  },
  {
    "id": "10",
    "ponum_pib": "95985/PE/POMI/25",
    "pengirim": "KENSEI SANGYO CO., LTD",
    "hawb": "UCI-70032102",
    "mawb": "61844301924",
    "pieces_weight": "1 pcs / 200.4 kg",
    "routing": "NRT - SIN → 7/9/25",
    "flights": [
      {
        "flight": "TR0809",
        "route": "NRT - SIN",
        "date_time": "Departed: 09 Jul 2025 08:47"
      },
      {
        "flight": "14:59:00",
        "route": "7/9/25",
        "date_time": "Arrived: SIN - CGK SQ092"
      }
    ],
    "search_text": "95985/PE/POMI/25 KENSEI SANGYO CO., LTD UCI-70032102 61844301924 NRT - SIN → 7/9/25 TR0809 NRT - SIN 14:59:00 7/9/25"
  },
  {
    "id": "11",
    "ponum_pib": "96149/PE/POMI/25",
    "pengirim": "QUINTA RADDISON INC",
    "hawb": "NAEH-71947",
    "mawb": "18018840393",
    "pieces_weight": "1 pcs / 5 kg",
    "routing": "JFK - ICN → 11/24/25",
    "flights": [
      {
        "flight": "KE0250",
        "route": "JFK - ICN",
        "date_time": "Departed: 23 Nov 2025 11:49"
      },
      {
        "flight": "02:45:00",
        "route": "11/24/25",
        "date_time": "Arrived: ICN - CGK KE043"
      }
    ],
    "search_text": "96149/PE/POMI/25 QUINTA RADDISON INC NAEH-71947 18018840393 JFK - ICN → 11/24/25 KE0250 JFK - ICN 02:45:00 11/24/25"
  },
  {
    "id": "12",
    "ponum_pib": "96717/PE/POMI/25",
    "pengirim": "NEWMANS VALVE",
    "hawb": "H701388146",
    "mawb": "61848094686",
    "pieces_weight": "1 pcs / 109 kg",
    "routing": "MXP - SIN → 12/5/25",
    "flights": [
      {
        "flight": "SQ0355",
        "route": "MXP - SIN",
        "date_time": "Departed: 04 Dec 2025 23:25"
      },
      {
        "flight": "04:45:00",
        "route": "12/5/25",
        "date_time": "Arrived: SIN - SUB SQ092"
      }
    ],
    "search_text": "96717/PE/POMI/25 NEWMANS VALVE H701388146 61848094686 MXP - SIN → 12/5/25 SQ0355 MXP - SIN 04:45:00 12/5/25"
  },
  {
    "id": "13",
    "ponum_pib": "96733/PE/POMI/25",
    "pengirim": "EXIM & MFR ENTERPRISE",
    "hawb": "RL202511005",
    "mawb": "12690436603",
    "pieces_weight": "3 pcs / 24 kg",
    "routing": "SIN - CGK → 11/18/25",
    "flights": [
      {
        "flight": "GA0823",
        "route": "SIN - CGK",
        "date_time": "Departed: 18 Nov 2025 07:09"
      },
      {
        "flight": "08:55:00",
        "route": "11/18/25",
        "date_time": "Arrived: SUB GA032"
      }
    ],
    "search_text": "96733/PE/POMI/25 EXIM & MFR ENTERPRISE RL202511005 12690436603 SIN - CGK → 11/18/25 GA0823 SIN - CGK 08:55:00 11/18/25"
  },
  {
    "id": "14",
    "ponum_pib": "96809/PE/POMI/25",
    "pengirim": "QUINTA RADDISON INC",
    "hawb": "NAEH-71543",
    "mawb": "18026407721",
    "pieces_weight": "1 pcs / 5 kg",
    "routing": "JFK - ICN → 7/8/25",
    "flights": [
      {
        "flight": "KE0252",
        "route": "JFK - ICN",
        "date_time": "Departed: 08 Jul 2025 01:45"
      },
      {
        "flight": "16:50:00",
        "route": "7/8/25",
        "date_time": "Arrived: ICN - CGK KE034"
      }
    ],
    "search_text": "96809/PE/POMI/25 QUINTA RADDISON INC NAEH-71543 18026407721 JFK - ICN → 7/8/25 KE0252 JFK - ICN 16:50:00 7/8/25"
  },
  {
    "id": "15",
    "ponum_pib": "97000/PE/POMI/25",
    "pengirim": "CAJIMA CORPORATION LTD",
    "hawb": "UCI-10056003",
    "mawb": "61846278256",
    "pieces_weight": "1 pcs / 1 kg",
    "routing": "KIX - SIN → 8/15/25",
    "flights": [
      {
        "flight": "SQ0621",
        "route": "KIX - SIN",
        "date_time": "Departed: 15 Aug 2025 17:22"
      },
      {
        "flight": "22:32:00",
        "route": "8/15/25",
        "date_time": "Arrived: SIN - SUB SQ092"
      }
    ],
    "search_text": "97000/PE/POMI/25 CAJIMA CORPORATION LTD UCI-10056003 61846278256 KIX - SIN → 8/15/25 SQ0621 KIX - SIN 22:32:00 8/15/25"
  },
  {
    "id": "16",
    "ponum_pib": "97405/PE/POMI/25",
    "pengirim": "BUFFALO PUMPS",
    "hawb": "S00002940",
    "mawb": "16001350996",
    "pieces_weight": "1 pcs / 13 kg",
    "routing": "ORD - HKG → 12/5/25",
    "flights": [
      {
        "flight": "CX3291",
        "route": "ORD - HKG",
        "date_time": "Departed: 04 Dec 2025 05:07"
      },
      {
        "flight": "15:03:00",
        "route": "12/5/25",
        "date_time": "Arrived: HKG - SUB CX077"
      }
    ],
    "search_text": "97405/PE/POMI/25 BUFFALO PUMPS S00002940 16001350996 ORD - HKG → 12/5/25 CX3291 ORD - HKG 15:03:00 12/5/25"
  },
  {
    "id": "17",
    "ponum_pib": "97547/PE/POMI/25",
    "pengirim": "YOKOTA MANUFACTURING CO.,LTD",
    "hawb": "SAF-80058650",
    "mawb": "23216101562",
    "pieces_weight": "1 pcs / 6 kg",
    "routing": "KIX -KUL → 4/1/26",
    "flights": [
      {
        "flight": "MH0053",
        "route": "KIX -KUL",
        "date_time": "Departed: 01 Apr 2026 09:44"
      },
      {
        "flight": "15:53:00",
        "route": "4/1/26",
        "date_time": "Arrived: KUL - SUB MH087"
      }
    ],
    "search_text": "97547/PE/POMI/25 YOKOTA MANUFACTURING CO.,LTD SAF-80058650 23216101562 KIX -KUL → 4/1/26 MH0053 KIX -KUL 15:53:00 4/1/26"
  },
  {
    "id": "18",
    "ponum_pib": "97714/PE/POMI/25",
    "pengirim": "JOHN THOMPSON ENGINEERING PTY LTD",
    "hawb": "MELAA3082371",
    "mawb": "61846648125",
    "pieces_weight": "2 pcs / 18 kg",
    "routing": "MEL - SIN → 2/12/26",
    "flights": [
      {
        "flight": "SQ0238",
        "route": "MEL - SIN",
        "date_time": "Departed: 12 Feb 2026 10:15"
      },
      {
        "flight": "15:15:00",
        "route": "2/12/26",
        "date_time": "Arrived: SIN - SUB SQ092"
      }
    ],
    "search_text": "97714/PE/POMI/25 JOHN THOMPSON ENGINEERING PTY LTD MELAA3082371 61846648125 MEL - SIN → 2/12/26 SQ0238 MEL - SIN 15:15:00 2/12/26"
  },
  {
    "id": "19",
    "ponum_pib": "97816/PE/POMI/25",
    "pengirim": "QUINTA RADDISON INC",
    "hawb": "NAEH-72012",
    "mawb": "18018840581",
    "pieces_weight": "1 pcs / 1 kg",
    "routing": "JFK - ICN → 12/18/25",
    "flights": [
      {
        "flight": "KE0252",
        "route": "JFK - ICN",
        "date_time": "Departed: 17 Dec 2025 01:45"
      },
      {
        "flight": "16:51:00",
        "route": "12/18/25",
        "date_time": "Arrived: ICN - CGK KE043"
      }
    ],
    "search_text": "97816/PE/POMI/25 QUINTA RADDISON INC NAEH-72012 18018840581 JFK - ICN → 12/18/25 KE0252 JFK - ICN 16:51:00 12/18/25"
  },
  {
    "id": "20",
    "ponum_pib": "98209/PE/POMI/25",
    "pengirim": "AESCO INTERNATIONAL PTE LTD",
    "hawb": "202509-00012",
    "mawb": "61847610861",
    "pieces_weight": "1 pcs / 78.5 kg",
    "routing": "SIN - SUB → 9/24/25",
    "flights": [
      {
        "flight": "SQ0928",
        "route": "SIN - SUB",
        "date_time": "Departed: 24 Sept 2025 17:10"
      },
      {
        "flight": "18:33:00",
        "route": "9/24/25",
        "date_time": "Arrived: TBA"
      }
    ],
    "search_text": "98209/PE/POMI/25 AESCO INTERNATIONAL PTE LTD 202509-00012 61847610861 SIN - SUB → 9/24/25 SQ0928 SIN - SUB 18:33:00 9/24/25"
  },
  {
    "id": "21",
    "ponum_pib": "98393/PE/POMI/25",
    "pengirim": "MCMASTER CARR SUPPLY COMPANY",
    "hawb": "CAEH-59687",
    "mawb": "29769793146",
    "pieces_weight": "1 pcs / 22 kg",
    "routing": "ORD - TPE → 10/19/25",
    "flights": [
      {
        "flight": "CI5313",
        "route": "ORD - TPE",
        "date_time": "Departed: 18 Oct 2025 14:12"
      },
      {
        "flight": "05:23:00",
        "route": "10/19/25",
        "date_time": "Arrived: TPE - CGK CI076"
      }
    ],
    "search_text": "98393/PE/POMI/25 MCMASTER CARR SUPPLY COMPANY CAEH-59687 29769793146 ORD - TPE → 10/19/25 CI5313 ORD - TPE 05:23:00 10/19/25"
  },
  {
    "id": "22",
    "ponum_pib": "98497/PE/POMI/25",
    "pengirim": "QUINTA RADDISON INC",
    "hawb": "RL202512007",
    "mawb": "12690483606",
    "pieces_weight": "2 pcs / 21 kg",
    "routing": "SIN -SUB → 12/13/25",
    "flights": [
      {
        "flight": "GA0855",
        "route": "SIN -SUB",
        "date_time": "Departed: 13 Dec 2025 19:16"
      },
      {
        "flight": "20:41:00",
        "route": "12/13/25",
        "date_time": "Arrived: TBA"
      }
    ],
    "search_text": "98497/PE/POMI/25 QUINTA RADDISON INC RL202512007 12690483606 SIN -SUB → 12/13/25 GA0855 SIN -SUB 20:41:00 12/13/25"
  },
  {
    "id": "23",
    "ponum_pib": "98773/PE/POMI/25",
    "pengirim": "DEPCOM INTERNATIONAL",
    "hawb": "RL202512009",
    "mawb": "12690483632",
    "pieces_weight": "2 pcs / 25 kg",
    "routing": "SIN - SUB → 12/18/25",
    "flights": [
      {
        "flight": "GA0855",
        "route": "SIN - SUB",
        "date_time": "Departed: 18 Dec 2025 19:17"
      },
      {
        "flight": "22:02:00",
        "route": "12/18/25",
        "date_time": "Arrived: TBA"
      }
    ],
    "search_text": "98773/PE/POMI/25 DEPCOM INTERNATIONAL RL202512009 12690483632 SIN - SUB → 12/18/25 GA0855 SIN - SUB 22:02:00 12/18/25"
  },
  {
    "id": "24",
    "ponum_pib": "98890/PE/POMI/25",
    "pengirim": "HOWDEN AXIAL FANS APS",
    "hawb": "DK26000095",
    "mawb": "61834679470",
    "pieces_weight": "1 pcs / 5.5 kg",
    "routing": "CPH - SIN → 1/17/26",
    "flights": [
      {
        "flight": "SQ0351",
        "route": "CPH - SIN",
        "date_time": "Departed: 17 Jan 2026 11:55"
      },
      {
        "flight": "18:25:00",
        "route": "1/17/26",
        "date_time": "Arrived: SIN - SUB SQ092"
      }
    ],
    "search_text": "98890/PE/POMI/25 HOWDEN AXIAL FANS APS DK26000095 61834679470 CPH - SIN → 1/17/26 SQ0351 CPH - SIN 18:25:00 1/17/26"
  },
  {
    "id": "25",
    "ponum_pib": "99391/PE/POMI/25",
    "pengirim": "QUINTA RADDISON INC",
    "hawb": "NAEH-71994",
    "mawb": "18018840544",
    "pieces_weight": "1 pcs / 4 kg",
    "routing": "JFK - ICN → 12/11/25",
    "flights": [
      {
        "flight": "KE8258",
        "route": "JFK - ICN",
        "date_time": "Departed: 10 Dec 2025 11:00"
      },
      {
        "flight": "02:28:00",
        "route": "12/11/25",
        "date_time": "Arrived: ICN - CGK KE043"
      }
    ],
    "search_text": "99391/PE/POMI/25 QUINTA RADDISON INC NAEH-71994 18018840544 JFK - ICN → 12/11/25 KE8258 JFK - ICN 02:28:00 12/11/25"
  },
  {
    "id": "26",
    "ponum_pib": "99643/PE/POMI/25",
    "pengirim": "MCMASTER CARR SUPPLY COMPANY",
    "hawb": "CAEH-59826",
    "mawb": "29769793242",
    "pieces_weight": "1 pcs / 5 kg",
    "routing": "ORD - TPE → 12/20/25",
    "flights": [
      {
        "flight": "CI5239",
        "route": "ORD - TPE",
        "date_time": "Departed: 20 Dec 2025 02:06"
      },
      {
        "flight": "17:31:00",
        "route": "12/20/25",
        "date_time": "Arrived: TPE - CGK CI586"
      }
    ],
    "search_text": "99643/PE/POMI/25 MCMASTER CARR SUPPLY COMPANY CAEH-59826 29769793242 ORD - TPE → 12/20/25 CI5239 ORD - TPE 17:31:00 12/20/25"
  },
  {
    "id": "27",
    "ponum_pib": "99696/PE/POMI/25",
    "pengirim": "DEPCOM INTERNATIONAL",
    "hawb": "JL202604060",
    "mawb": "61850819344",
    "pieces_weight": "1 pcs / 13 kg",
    "routing": "SIN - SUB → 4/16/26",
    "flights": [
      {
        "flight": "SQ0922",
        "route": "SIN - SUB",
        "date_time": "Departed: 16 Apr 2026 07:50"
      },
      {
        "flight": "09:10:00",
        "route": "4/16/26",
        "date_time": "Arrived: TBA"
      }
    ],
    "search_text": "99696/PE/POMI/25 DEPCOM INTERNATIONAL JL202604060 61850819344 SIN - SUB → 4/16/26 SQ0922 SIN - SUB 09:10:00 4/16/26"
  }
];
