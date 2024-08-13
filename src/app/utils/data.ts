import allItem from "../../../assets/images/rightSideMenuImage/allItem.png";
import cartShopping from "../../../assets/images/createListImages/chooseIcons/cart-shopping.png";
import child from "../../../assets/images/createListImages/chooseIcons/child.png";
import wheelChair from "../../../assets/images/createListImages/chooseIcons/wheelchair.png";
import dog from "../../../assets/images/createListImages/chooseIcons/dog.png";
import burgerSoda from "../../../assets/images/createListImages/chooseIcons/burger-soda.png";
import pipeValve from "../../../assets/images/createListImages/chooseIcons/pipe-valve.png";
import leaf from "../../../assets/images/createListImages/chooseIcons/leaf.png";
import siren from "../../../assets/images/createListImages/chooseIcons/siren.png";
import speaker from "../../../assets/images/createListImages/chooseIcons/speaker.png";
import music from "../../../assets/images/createListImages/chooseIcons/music.png";
import star from "../../../assets/images/createListImages/chooseIcons/star.png";
import infoCircle from "../../../assets/images/createListImages/chooseIcons/info-circle.png";
import bin from "../../../assets/images/createListImages/chooseIcons/bin.png";
import locate from "../../../assets/images/createListImages/chooseIcons/map-placeholder.png";
import StHelierLogo from "../../../assets/images/createListImages/purchaseImage.png";
import { FaUtensils } from "react-icons/fa6";
import { FaPeopleLine } from "react-icons/fa6";
import { LuPopcorn } from "react-icons/lu";
import { FaFaceSmileBeam } from "react-icons/fa6";
import { FaHeartPulse } from "react-icons/fa6";
import { FaRunning } from "react-icons/fa";
// Home	import { FaHome } from "react-icons/fa";
import { FaChild } from "react-icons/fa";
import { FaDog } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { FaHotel } from "react-icons/fa6";
import { FaMoneyBill } from "react-icons/fa";
import { FaCar } from "react-icons/fa6";
import { FaPlane } from "react-icons/fa6";
import { FaBus } from "react-icons/fa6";
import { FaBriefcase } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa6";

import {
  utensils,
  utensil,
  holidayDas,
  beachumbrella,
  poundIcon,
  clock,
  globes,
  phoneBlack,
  locationDot,
  cartShopping1,
  cartShopping2,
  cartShopping3,
  cartShopping4,
  cartShopping5,
  cartShopping6,
  sun,
  news,
  van,
  sos,
  tides,
  flight,
  saling,
  network,
  castle,
  event,
  shopping,
  camera,
  hotel,
  personHiking,
  compass,
  glass,
  ellipsis,
  parking,
  radio,
  taxi,
  mapNew,
  mapWhite,
  arrowTop,
  arrowRight,
  arrowBottom,
  arrowLeft,
  more,
  cycle,
  family,
  pro,
  shield,
  gorey,
  aubin,
  archirondel,
  trinity,
  hongue,
  pulente,
  cycleBlack,
  gardernCenter,
  furniture,
  homeware,
  localShops,
  mensClothing,
  giftIdeas,
  sunglassesSes,
  woomenClothing,
  greenGlocers,
} from "@/app/utils/ImagePath";

export const topSideMenu = [
  {
    name: "weather",
    image: sun,
  },
  {
    name: "tides",
    image: tides,
    width: 18,
    height: 16,
  },
  {
    name: "news",
    image: news,
  },
  {
    name: "taxis",
    image: taxi,
    width: 18,
    height: 16,
  },
  {
    name: "flight",
    image: flight,
    width: 18,
    height: 16,
  },
  {
    name: "sailing",
    image: saling,
  },
  {
    name: "sos",
    image: sos,
    width: 20,
    height: 16,
  },
  {
    name: "radio",
    image: radio,
    width: 20,
    height: 16,
  },
  {
    name: "CycleRoutes",
    image: cycleBlack,
    width: 20,
    height: 16,
  },
  // {
  //   name: "parking",
  //   image: parking,
  //   width: 18,
  //   height: 16,
  // },
  // {
  //   name: "buses",
  //   image: van,
  //   width: 20,
  //   height: 16,
  // },
];

export const rightSideMenu = [
  {
    name: "To do",
    image: castle,
    width: 25,
    height: 20,
    url: "Todo",
    id: "6645d5578bf8ac8d2d5bd622",
  },
  {
    name: "Dine",
    image: utensils,
    width: 18,
    height: 20,
    url: "Dine out",
    id: "66439bfe5e177a8bc6196a38",
  },
  {
    name: "Shop",
    image: shopping,
    width: 23,
    height: 20,
    url: "Local shops",
    id: "663f71d6cc049eb2b028d9c8",
  },
  {
    name: "Events",
    image: event,
    width: 18,
    height: 20,
    url: "upcomming-events",
    id: "Events",
  },
  {
    name: "Tours",
    image: camera,
    width: 16,
    height: 16,
    url: "tours",
    id: "6645d5578bf8ac8d2d5bd626",
  },
  {
    name: "Hotels",
    image: hotel,
    width: 20,
    height: 20,
    url: "Hotels",
    id: "663f72bc9c9e03a31898b9cc",
  },
  {
    name: "Activities",
    image: personHiking,
    width: 15,
    height: 20,
    url: "activity",
    id: "activity-list",
  },
  {
    name: "Travel",
    image: compass,
    width: 20,
    height: 20,
    url: "Travel agents",
    id: "663f72bd9c9e03a31898b9dc",
  },
  {
    name: "Nightlife",
    image: glass,
    width: 23,
    height: 20,
    url: "Nightlife",
    id: "6645ef914cb7487a15119086",
  },
  {
    name: "Holidays",
    image: holidayDas,
    width: 25,
    height: 20,
    url: "holiday",
    id: "6645d5578bf8ac8d2d5bd62a",
  },
  {
    name: "Beaches",
    image: beachumbrella,
    width: 23,
    height: 20,
    url: "Beaches",
    id: "6645d5578bf8ac8d2d5bd620",
  },
  {
    name: "All",
    image: ellipsis,
    width: 16,
    height: 16,
  },
];

export const rightSideMenuMobile = [
  {
    name: "To do",
    image:
      "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2Fcastle.png?alt=media&token=05f28617-9c06-4e6a-80b1-1022a36ff7df",
    width: 25,
    height: 20,
    url: "Todo",
    id: "6645d5578bf8ac8d2d5bd622",
  },
  {
    name: "Dine",
    image:
      "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2Futensils.png?alt=media&token=75675b22-33ab-4495-a75e-88e2695e21c6",
    width: 18,
    height: 20,
    url: "Dine out",
    id: "66439bfe5e177a8bc6196a38",
  },
  {
    name: "Events",
    image:
      "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2Fcalendar.png?alt=media&token=232e231d-db2b-4571-b388-7d92fbb532c7",
    width: 18,
    height: 20,
    url: "upcomming-events",
  },
  {
    name: "Map",
    image: mapWhite,
    // "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2FStore.png?alt=media&token=b40746b0-2430-426a-9c69-79337bb82e3b",
    width: 23,
    height: 20,
  },
];

export const LocalCuisineMenuItem = [
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2Futensils%20(1).png?alt=media&token=6a2790ab-b228-4acd-a03b-013dd47f7d65",
    menuName: "St Helier",
    resturantName: "Banjo",
    rating: 3.5,
    likeCount: 128,
    time: "5:00 PM",
    headerImage:
      "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FAppImage%2Fbanjo.jpg?alt=media&token=e20e5e98-87f9-4a6c-8dda-7f2372d5f7dc",
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2Futensils%20(1).png?alt=media&token=6a2790ab-b228-4acd-a03b-013dd47f7d65",
    menuName: "Restaurant",
    resturantName: "La Bouche",
    rating: 4.7,
    likeCount: 166,
    time: "12:00 AM",
    deliverActive: true,
    headerImage:
      "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FIcon%2Frestaurant1.jpg?alt=media&token=c48ad7ce-9020-4dc9-b91f-1c866cb3e836",
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2Futensils%20(1).png?alt=media&token=6a2790ab-b228-4acd-a03b-013dd47f7d65",
    menuName: "St Aubin",
    resturantName: "Salty Dog Bar...",
    rating: 4.5,
    likeCount: 143,
    time: "2:00 PM",
    NewRes: true,
    headerImage:
      "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FIcon%2Frestaurant2.jpg?alt=media&token=a867a48c-4ca1-4326-8336-cfbce9e1f291",
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2Futensils%20(1).png?alt=media&token=6a2790ab-b228-4acd-a03b-013dd47f7d65",
    menuName: "Gorey Pier",
    resturantName: "Feast Restaurant",
    rating: 3.9,
    likeCount: 178,
    time: "10:00 PM",
    NewRes: true,
    headerImage:
      "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FIcon%2Frestaurant3.jpg?alt=media&token=dcbdddfe-24ea-4ad7-bca4-24b2ba5f9154",
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2Futensils%20(1).png?alt=media&token=6a2790ab-b228-4acd-a03b-013dd47f7d65",
    menuName: "St Helier",
    resturantName: "Banjo",
    rating: 4.1,
    likeCount: 199,
    time: "06:00 PM",
    headerImage:
      "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FIcon%2Frestaurant4.jpg?alt=media&token=e77e9515-ee4f-4eb8-b61b-93feb22f56d0",
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FmobileDash%2Futensils%20(1).png?alt=media&token=6a2790ab-b228-4acd-a03b-013dd47f7d65",
    menuName: "St Helier",
    resturantName: "Banjo",
    rating: 2.9,
    likeCount: 108,
    time: "11:00 PM",
    headerImage:
      "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FIcon%2Frestaurant5.jpg?alt=media&token=3ab8f184-5388-4bd6-8236-7733cdb84731",
  },
];

export const EnjoyShineMenuItem = [
  {
    image: poundIcon,
    menuName: "From £7",
    resturantName: "Kalimukti Yoga",
    headerImage:
      "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FIcon%2Frestaurant1.jpg?alt=media&token=c48ad7ce-9020-4dc9-b91f-1c866cb3e836",
  },
  {
    image: poundIcon,
    menuName: "25-30",
    resturantName: "Wild Adventures",
    headerImage:
      "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FIcon%2Frestaurant2.jpg?alt=media&token=a867a48c-4ca1-4326-8336-cfbce9e1f291",
  },
  {
    image: poundIcon,
    menuName: "FREE",
    resturantName: "BeachAbility",
    headerImage:
      "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FIcon%2Frestaurant3.jpg?alt=media&token=dcbdddfe-24ea-4ad7-bca4-24b2ba5f9154",
  },
  {
    image: poundIcon,
    menuName: "From £30",
    resturantName: "Kayak Nomad",
    headerImage:
      "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FIcon%2Frestaurant4.jpg?alt=media&token=e77e9515-ee4f-4eb8-b61b-93feb22f56d0",
  },
  {
    image: poundIcon,
    menuName: "St Helier",
    resturantName: "Banjo",
    headerImage:
      "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FIcon%2Frestaurant5.jpg?alt=media&token=3ab8f184-5388-4bd6-8236-7733cdb84731",
  },
  {
    image: poundIcon,
    menuName: "St Helier",
    resturantName: "Banjo",
    headerImage:
      "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FIcon%2Frestaurant6.jpg?alt=media&token=9ce0e1b4-6bdc-4850-85ef-89ddc0a6d4a1",
  },
];

export const community = [
  {
    name: "Kids Activities...",
    image: cartShopping1,
    color: "#BB6BD9",
  },
  {
    name: "Shops in St Brelade",
    image: cartShopping2,
    color: "#56CCF2",
  },
  {
    name: "Best Breakfasts...",
    image: cartShopping3,
    color: "#EB5757",
  },
  {
    name: "Outdoor Dining",
    image: cartShopping4,
    color: "#27AE60",
  },
  {
    name: "History",
    image: cartShopping5,
    color: "#F2994A",
  },
  {
    name: "Beans & Crapauds",
    image: cartShopping6,
    color: "#56CCF2",
  },
  {
    name: "Kids Activities...",
    image: cartShopping1,
    color: "#BB6BD9",
  },
  {
    name: "Shops in St Brelade",
    image: cartShopping2,
    color: "#56CCF2",
  },
  {
    name: "Best Breakfasts...",
    image: cartShopping3,
    color: "#EB5757",
  },
];

export const ActivitiesListData = [
  {
    name: "March - October",
    image:
      "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FIcon%2FEventICON%2Fcalendar.png?alt=media&token=4dcb085b-44bc-4182-8893-27dda5f0325f",
    width: 14,
    height: 24,
  },
  {
    name: "Today: 09:00 - 18:00",
    image:
      "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FIcon%2FEventICON%2Fclock.png?alt=media&token=5f80c9da-b46f-4c37-8018-db55c0cfd72e",
    width: 16,
    height: 24,
  },
  {
    name: "£30 - £75",
    image:
      "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FIcon%2FEventICON%2Fgbp.png?alt=media&token=30f60889-d511-46d9-a8ce-30ef112929e8",
    width: 10,
    height: 24,
  },
  {
    name: "+44 (0) 7829 772222",
    image: phoneBlack,
    width: 12,
    height: 24,
  },
  {
    name: "info@jerseyseafaris.com",
    image:
      "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FIcon%2FEventICON%2Fenvelope.png?alt=media&token=08ba6331-d66b-485c-b274-4d85de7f76b0",
    width: 16,
    height: 24,
  },
  {
    name: "www.jerseyseafaris.com",
    image:
      "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FIcon%2FEventICON%2Fglobe.png?alt=media&token=0fa8a5a4-35c8-46ae-bb83-45c00d6d7328",
    width: 16,
    height: 24,
  },
  {
    name: "St. Catherine's Break Water, La Route de St. Catherine, St. Martin, JE3 6DD",
    image:
      "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FIcon%2FEventICON%2Flocation-dot.png?alt=media&token=d6ea3348-daab-4b8e-acb6-977148c16e1f",
    width: 12,
    height: 24,
  },
];

export const ResturantDetailData = [
  {
    name: "Open ⋅ Closes 11 pm",
    image: clock,
  },
  {
    name: "colmar.je",
    image: globes,
  },
  {
    name: "01534 662992",
    image: phoneBlack,
  },
  {
    name: "51-53 King St, St Helier, Jersey",
    image: locationDot,
  },
];
export const SoryByItem = [
  {
    key: 1,
    label: "Assending",
  },
  {
    key: 2,
    label: "Descending",
  },
];
export const RestroListData = [
  {
    id: 1,
    resturantName: "Jersey War Tunnels",
    rating: 2.5,
    likeCount: 128,
    headerImage:
      "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FListCommunity%2F%23Image1.png?alt=media&token=4a81e303-0aa5-4244-bcf7-7995d369ba81",
    time: "5:00 PM",
  },
  {
    id: 2,
    resturantName: "Mont Orgueil Castle",
    rating: 3.5,
    likeCount: 128,
    headerImage:
      "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FListCommunity%2F%23Image2.png?alt=media&token=505b980e-f012-4822-a0fe-3f7e0104fc7b",
    time: "10:00 PM",
  },
  {
    id: 3,
    resturantName: "Jersey Zoo",
    rating: 4.5,
    likeCount: 128,
    headerImage:
      "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FListCommunity%2F%23Image3.png?alt=media&token=4d77cc4a-38a3-4b26-a046-a615e07f5be6",
    time: "8:00 PM",
  },
  {
    id: 4,
    resturantName: "La Houge Bie",
    rating: 3.5,
    likeCount: 128,
    headerImage:
      "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FListCommunity%2F%23Image4.png?alt=media&token=3ee4dc31-caa6-44c0-8571-a00b3e9cdbdd",
    time: "10:00 AM",
  },
  {
    id: 5,
    resturantName: "La Mare Wine Estate",
    rating: 2.5,
    likeCount: 128,
    headerImage:
      "https://firebasestorage.googleapis.com/v0/b/roc-web-app.appspot.com/o/display%2FListCommunity%2F%23Image.png?alt=media&token=0327e704-db2f-4c98-a60b-f207f6dc8862",
    time: "7:00 PM",
  },
];

interface DataItem {
  image: any;
  // other properties
}

interface Item {
  data: DataItem[];
}

export const DirectoryItem: any = [
  {
    data: [
      {
        image: FaUtensils,
        title: "Food and drink",
        url: "attration",
      },
      {
        image: FaPeopleLine,
        title: "Activities",
        url: "food-drinks",
      },
    ],
  },
  {
    data: [
      {
        image: LuPopcorn,
        title: "Entertainment",
        url: "shopsandMarket",
      },
      {
        image: FaFaceSmileBeam,
        title: "Hair and Beauty",
        url: "tour",
      },
    ],
  },
  {
    data: [
      {
        image: FaHeartPulse,
        title: "Health Fitness and Wellbeing	",
        url: "accommodations",
      },
      {
        image: FaRunning,
        title: "Sports",
        url: "activity",
      },
    ],
  },
  {
    data: [
      {
        image: FaChild,
        title: "Kids",
        url: "tourOperator",
      },
      {
        image: FaDog,
        title: "Pets",
        url: "bar-pubs",
      },
    ],
  },
  {
    data: [
      {
        image: FaCalendar,
        title: "Event Planning",
        url: "holidays",
      },
      {
        image: FaShoppingBag,
        title: "Shopping",
        url: "beaches",
      },
    ],
  },
  {
    data: [
      {
        image: FaHotel,
        title: "Accommodation",
        url: "holidays",
      },
      {
        image: FaMoneyBill,
        title: "Budget",
        url: "beaches",
      },
    ],
  },
  {
    data: [
      {
        image: FaCar,
        title: "Vehicles",
        url: "holidays",
      },
      {
        image: FaPlane,
        title: "Travel",
        url: "beaches",
      },
    ],
  },
  {
    data: [
      {
        image: FaBus,
        title: "Transport",
        url: "holidays",
      },
      {
        image: FaBriefcase,
        title: "Recruitment",
        url: "beaches",
      },
    ],
  },
  {
    data: [
      {
        image: FaUserTie,
        title: "Professional Services",
        url: "holidays",
      },
      {
        image: FaBriefcase,
        title: "Recruitment",
        url: "beaches",
      },
    ],
  },
];

export const walkData = [
  {
    name: "Gorey",
    color: "#BB6BD9",
    icon: gorey,
    url: "https://hub.roc.je/walks/gorey-walk",
  },
  {
    name: "St Aubin",
    color: "#56CCF2",
    icon: aubin,
    url: "https://hub.roc.je/walks/st-aubin-walk",
  },
  {
    name: "Archirondel",
    color: "#EB5757",
    icon: archirondel,
    url: "https://hub.roc.je/walks/archirondel-walk",
  },
  {
    name: "Trinity",
    color: "#27AE60",
    icon: trinity,
    url: "https://hub.roc.je/walks/trinity-walk",
  },
  {
    name: "La Hougue Bie",
    color: "#F2994A",
    icon: hongue,
    url: "https://hub.roc.je/walks/la-Hougue-bie-walk",
  },
  {
    name: "La Pulente",
    color: "#F2994A",
    icon: pulente,
    url: "https://hub.roc.je/walks/la-pulente-walk",
  },
];
export const cycleRouteData = [
  {
    name: "Easy",
    color: "#56CCF2",
    icon: family,
    url: "https://hub.roc.je/cycle/cycle-routes-easy",
  },
  {
    name: "Medium",
    color: "#BB6BD9",
    icon: cycle,
    url: "https://hub.roc.je/cycle/cycle-routes-medium",
  },
  {
    name: "Difficult",
    color: "#EB5757",
    icon: pro,
    url: "https://hub.roc.je/cycle/cycle-routes-difficult",
  },
  {
    name: "Cycling safety",
    color: "#F2994A",
    icon: shield,
    url: "https://hub.roc.je/cycle/cycling-safety",
  },
  {
    name: "Cycle hire",
    color: "#27AE60",
    icon: cycle,
    url: "https://www.jersey.com/things-to-do/outdoor-activities/cycle-hire/",
  },
];

export const relatedTypes = [
  "restaurant",
  "meal_delivery",
  "meal_takeaway",
  "bar",
  "liquor_store",
  "cafe",
];

export const reservationTypes = [
  "restaurant",
  "cafe",
  "bar",
  "night_club",
  "lodging",
];

export const shoppingImages = [
  {
    votes: 11,
    iconName: "apple",
    bgColor: "#EB5757",
    status: "Approved",
    categoryId: "663f71d5cc049eb2b028d9be",
    image: gardernCenter,
    listName: "Garden Centres",
  },
  {
    votes: 4,
    iconName: "bowlFood",
    bgColor: "#F2994A",
    status: "Approved",
    categoryId: "663f71d6cc049eb2b028d9c8",
    image: localShops,
    listName: "Local shops",
  },
  {
    votes: 3,
    iconName: "home",
    bgColor: "#2F80ED",
    status: "Approved",
    categoryId: "663f71d6cc049eb2b028d9c5",
    image: homeware,
    listName: "Homeware",
  },
  {
    votes: 3,
    iconName: "man",
    bgColor: "#27AE60",
    status: "Approved",
    categoryId: "663f71d6cc049eb2b028d9cc",
    image: mensClothing,
    listName: "Mens clothing",
  },
  {
    votes: 2,
    iconName: "gift",
    bgColor: "#EB5757",
    status: "Approved",
    categoryId: "663f71d6cc049eb2b028d9d2",
    image: giftIdeas,
    listName: "Gift ideas",
  },
  {
    votes: 2,
    iconName: "home",
    bgColor: "#F2C94C",
    status: "Approved",
    categoryId: "663f71d6cc049eb2b028d9c2",
    image: furniture,
    listName: "Furniture",
  },
  {
    votes: 0,
    iconName: "sportHelmat",
    bgColor: "#2F80ED",
    status: "Approved",
    categoryId: "663f71d6cc049eb2b028d9d8",
    image: sunglassesSes,
    listName: "Sunglasses",
  },
  {
    votes: 0,
    iconName: "rice,",
    bgColor: "#2F80ED",
    status: "Approved",
    categoryId: "663f71d6cc049eb2b028d9e4",
    image: greenGlocers,
    listName: "Green Grocers",
  },
  {
    votes: 0,
    iconName: "TravelDress",
    bgColor: "#4F4F4F",
    status: "Approved",
    categoryId: "663f71d6cc049eb2b028d9cf",
    image: woomenClothing,
    listName: "Ladies clothing",
  },
];

export const SearchFilterData = [
  { id: "100", name: "Any" },
  { id: "1", name: "Saint Helier" },
  { id: "2", name: "Saint Clement" },
  { id: "3", name: "Saint Saviour" },
  { id: "4", name: "Saint Lawrence" },
  { id: "5", name: "Saint Ouen" },
  { id: "6", name: "Saint Mary" },
  { id: "7", name: "Saint John" },
  { id: "8", name: "Trinity" },
  { id: "9", name: "Saint Martin" },
  { id: "10", name: "Saint Peter" },
  { id: "11", name: "Saint Brélade" },
  { id: "12", name: "Grouville" },
  { id: "13", name: "Jersey" },
];

export const events: { id: string; listName: string }[] = [
  { id: "upcomming-events", listName: "All Events" },
  {
    id: "669ecfbf9a4bf462b63f37f7",
    listName: "Arts & Cultural",
  },
  {
    id: "669ecfbf9a4bf462b63f3840",
    listName: "Family Friendly",
  },
  {
    id: "669ecfbf9a4bf462b63f3896",
    listName: "Festivals",
  },
  {
    id: "669ecfbf9a4bf462b63f38c5",
    listName: "Food & Drink",
  },
  {
    id: "669ecfbf9a4bf462b63f38d2",
    listName: "Health & Wellbeing",
  },
  {
    id: "669ecfbf9a4bf462b63f38de",
    listName: "History & Heritage",
  },
  {
    id: "669ecfbf9a4bf462b63f38ec",
    listName: "Music",
  },
  {
    id: "669ecfbf9a4bf462b63f38f9",
    listName: "Outdoor",
  },
  {
    id: "669ecfc09a4bf462b63f391e",
    listName: "Participant",
  },
  {
    id: "669ecfc09a4bf462b63f392b",
    listName: "Seasonal",
  },
  {
    id: "669ecfc09a4bf462b63f3935",
    listName: "Spectator",
  },
  {
    id: "669ecfc09a4bf462b63f394c",
    listName: "Sports",
  },
];

export const activities = [
  { id: "activity", listName: "All Activities" },
  {
    id: "669f5b7f9a4bf462b6a29c73",
    listName: "Active & Adrenaline",
  },
  {
    id: "669f5b809a4bf462b6a29d92",
    listName: "Beaches",
  },
  {
    id: "669f5b829a4bf462b6a29eca",
    listName: "Boat",
  },
  {
    id: "669f5b829a4bf462b6a29edb",
    listName: "Car Hire Driving",
  },
  {
    id: "669f5b829a4bf462b6a29ee6",
    listName: "Cycling",
  },
  {
    id: "669f5b829a4bf462b6a29f11",
    listName: "Equipment Hire",
  },
  {
    id: "669f5b829a4bf462b6a29f61",
    listName: "Family",
  },
  {
    id: "669f5b829a4bf462b6a29f6e",
    listName: "Fishing Charters",
  },
  {
    id: "669f5b839a4bf462b6a29fa6",
    listName: "Fitness & Leisure",
  },
  {
    id: "669f5b839a4bf462b6a29fbe",
    listName: "Food & Drink",
  },
  {
    id: "669f5b839a4bf462b6a29fca",
    listName: "Golf",
  },
  {
    id: "669f5b839a4bf462b6a29fd7",
    listName: "History & Culture",
  },
  {
    id: "669f5b839a4bf462b6a2a05a",
    listName: "Indoor Sports",
  },
  {
    id: "669f5b839a4bf462b6a2a078",
    listName: "Outdoor Sports",
  },
  {
    id: "669f5b849a4bf462b6a2a0aa",
    listName: "Nature & Wildlife",
  },
  {
    id: "669f5b849a4bf462b6a2a0c1",
    listName: "Spa & Health",
  },
  {
    id: "669f5b849a4bf462b6a2a0d4",
    listName: "Swimming",
  },
  {
    id: "669f5b849a4bf462b6a2a0fa",
    listName: "Walking",
  },
  {
    id: "669f5b849a4bf462b6a2a12e",
    listName: "Water Sports",
  },
];
