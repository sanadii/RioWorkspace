// Import Images
import dribble from "assets/images/brands/dribbble.png";
import bitbucket from "assets/images/brands/bitbucket.png";
import dropbox from "assets/images/brands/dropbox.png";
import mail_chimp from "assets/images/brands/mail_chimp.png";
import slack from "assets/images/brands/slack.png";
import github from "assets/images/brands/github.png";

import company1 from "assets/images/companies/img-1.png";
import company3 from "assets/images/companies/img-3.png";
import company4 from "assets/images/companies/img-4.png";
import company5 from "assets/images/companies/img-5.png";
import company6 from "assets/images/companies/img-6.png";
import company8 from "assets/images/companies/img-8.png";

import avatar1 from "assets/images/users/avatar-1.jpg";
import avatar2 from "assets/images/users/avatar-2.jpg";
import avatar3 from "assets/images/users/avatar-3.jpg";
import avatar4 from "assets/images/users/avatar-4.jpg";
import avatar5 from "assets/images/users/avatar-5.jpg";
import avatar6 from "assets/images/users/avatar-6.jpg";
import avatar7 from "assets/images/users/avatar-7.jpg";
import avatar8 from "assets/images/users/avatar-8.jpg";
import avatar9 from "assets/images/users/avatar-9.jpg";
import avatar10 from "assets/images/users/avatar-10.jpg";

// Contacts

const crmcontacts = [
    {
        id: 1,
        contactId: "#VZ001",
        name: "Tonya Noble",
        company: "Nesta Technologies",
        email: "tonyanoble@riobrazilsalon.click",
        phone: "414-453-5725",
        score: "154",
        date: ["15 Dec, 2021", "08:58AM"],
    },
    {
        id: 2,
        contactId: "#VZ002",
        name: "Thomas Taylor",
        company: "iTest Factory",
        email: "thomastaylor@riobrazilsalon.click",
        phone: "580-464-4694",
        score: "236",
        date: ["17 Dec, 2021", "10:32AM"],
    },
    {
        id: 3,
        contactId: "#VZ003",
        name: "Nancy Martino",
        company: "Force Medicines",
        email: "nancymartino@riobrazilsalon.click",
        phone: "786-253-9927",
        score: "197",
        date: ["04 Dec, 2021", "01:36PM"],
    },
    {
        id: 4,
        contactId: "#VZ004",
        name: "Alexis Clarke",
        company: "Digitech Galaxy",
        email: "alexisclarke@riobrazilsalon.click",
        phone: "515-395-1069",
        score: "369",
        date: ["27 Oct, 2021", "03:47PM"],
    },
    {
        id: 5,
        contactId: "#VZ005",
        name: "James Price",
        company: "Themesbrand",
        email: "jamesprice@riobrazilsalon.click",
        phone: "646-276-2274",
        score: "81",
        date: ["23 Oct, 2021", "03:47PM"],
    },
    {
        id: 6,
        contactId: "#VZ006",
        name: "Mary Cousar",
        company: "Micro Design",
        email: "marycousar@riobrazilsalon.click",
        phone: "540-575-0991",
        score: "643",
        date: ["18 Oct, 2021", "11:08AM"],
    },
    {
        id: 7,
        contactId: "#VZ007",
        name: "Herbert Stokes",
        company: "Themesbrand",
        email: "herbertstokes@riobrazilsalon.click",
        phone: "949-791-0614",
        score: "784",
        date: ["01 Jan, 2022", "03:51PM"],
    },
    {
        id: 8,
        contactId: "#VZ008",
        name: "Michael Morris",
        company: "Syntyce Solutions",
        email: "michaelmorris@riobrazilsalon.click",
        phone: "484-606-3104",
        score: "361",
        date: ["20 Sep, 2021", "07:55AM"],
    },
    {
        id: 9,
        contactId: "#VZ009",
        name: "Timothy Smith",
        company: "Digitech Galaxy",
        email: "timothysmith@riobrazilsalon.click",
        phone: "231-480-8536",
        score: "732",
        date: ["02 Jan, 2022", "09:32AM"],
    },
    {
        id: 10,
        contactId: "#VZ0010",
        name: "Kevin Dawson",
        company: "Meta4Systems",
        email: "kevindawson@riobrazilsalon.click",
        phone: "745-321-9874",
        score: "00",
        date: ["-", ""],
    },
];

// COMPANIES

const companies = [
    {
        id: 1,
        compnayId: "#VZ001",
        img: dribble,
        companyName: "Nesta Technologies",
        owner: "Tonya Noble",
        industryType: "Computer Industry",
        rating: "4.5",
        location: "Los Angeles, USA",
    },
    {
        id: 2,
        compnayId: "#VZ002",
        img: bitbucket,
        companyName: "iTest Factory",
        owner: "Thomas Taylor",
        industryType: "Chemical Industries",
        rating: "3.8",
        location: "Berlin, Germany",
    },
    {
        id: 3,
        compnayId: "#VZ003",
        img: company8,
        companyName: "Force Medicines",
        owner: "Glen Matney",
        industryType: "Health Services",
        rating: "4.1",
        location: "Phoenix, USA",
    },
    {
        id: 4,
        compnayId: "#VZ004",
        img: company1,
        companyName: "Digitech Galaxy",
        owner: "Alexis Clarke",
        industryType: "Telecommunications Services",
        rating: "3.2",
        location: "Bogota, Colombia",
    },
    {
        id: 5,
        compnayId: "#VZ005",
        img: company6,
        companyName: "Zoetic Fashion",
        owner: "James Price",
        industryType: "Textiles: Clothing, Footwear",
        rating: "4.4",
        location: "Brasilia, Brazil",
    },
    {
        id: 6,
        compnayId: "#VZ006",
        img: dropbox,
        companyName: "Micro Design",
        owner: "Mary Cousar",
        industryType: "Financial Services",
        rating: "2.7",
        location: "Windhoek, Namibia",
    },
    {
        id: 7,
        compnayId: "#VZ007",
        img: mail_chimp,
        companyName: "Syntyce Solutions",
        owner: "Michael Morris",
        industryType: "Chemical Industries",
        rating: "4.0",
        location: "Damascus, Syria",
    },
    {
        id: 8,
        compnayId: "#VZ008",
        img: company3,
        companyName: "Meta4Systems",
        owner: "Nancy Martino",
        industryType: "Computer Industry",
        rating: "3.3",
        location: "London, UK",
    },
    {
        id: 9,
        compnayId: "#VZ009",
        img: company4,
        companyName: "Moetic Fashion",
        owner: "Timothy Smith",
        industryType: "Textiles: Clothing, Footwear",
        rating: "4.9",
        location: "Damascus, Syria",
    },
    {
        id: 10,
        compnayId: "#VZ0010",
        img: slack,
        companyName: "Syntyce Solutions",
        owner: "Herbert Stokes",
        industryType: "Health Services",
        rating: "2.9",
        location: "Berlin, Germany",
    },
];

// LEADS
const leads = [
    {
        id: 1,
        leadsId: "#VZ2101",
        name: "Alexis Clarke",
        company: "Force Medicines",
        score: "147",
        phone: "580-464-4694",
        location: "Los Angeles, USA",
        date: "07 Apr, 2021",
    },
    {
        id: 2,
        leadsId: "#VZ2102",
        name: "James Morris",
        company: "iTest Factory",
        score: "230",
        phone: "863-577-5537",
        location: "Phoenix, USA",
        date: "15 Feb, 2021",
    },
    {
        id: 3,
        leadsId: "#VZ2103",
        name: "Nancy Martino",
        company: "Syntyce Solutions",
        score: "159",
        phone: "786-253-9927",
        location: "London, UK",
        date: "02 Jan, 2022",
    },
    {
        id: 4,
        leadsId: "#VZ2104",
        name: "Michael Morris",
        company: "Micro Design",
        score: "352",
        phone: "786-253-9927",
        location: "Damascus, Syria",
        date: "19 May, 2021",
    },
    {
        id: 5,
        leadsId: "#VZ2105",
        name: "Kevin Dawson",
        company: "Nesta Technologies",
        score: "78",
        phone: "213-741-4294",
        location: "Bogota, Colombia",
        date: "14 Apr, 2021",
    },
    {
        id: 6,
        leadsId: "#VZ2106",
        name: "Herbert Stokes",
        company: "Zoetic Fashion",
        score: "85",
        phone: "414-453-5725",
        location: "Windhoek, Namibia",
        date: "07 Jun, 2022",
    },
    {
        id: 7,
        leadsId: "#VZ2107",
        name: "Glen Matney",
        company: "Moetic Fashion",
        score: "365",
        phone: "515-395-1069",
        location: "Berlin, Germany",
        date: "02 Nov, 2021",
    },
    {
        id: 8,
        leadsId: "#VZ2108",
        name: "Charles Kubik",
        company: "Syntyce Solutions",
        score: "236",
        phone: "231-480-8536",
        location: "Brasilia, Brazil",
        date: "25 Sep, 2021",
    },
    {
        id: 9,
        leadsId: "#VZ2109",
        name: "Thomas Taylor",
        company: "Digitech Galaxy",
        score: "754",
        phone: "231-480-8536",
        location: "Windhoek, Namibia",
        date: "16 Sep, 2021",
    },
    {
        id: 10,
        leadsId: "#VZ21010",
        name: "Tonya Noble",
        company: "Micro Design",
        score: "193",
        phone: "745-321-9874",
        location: "London, UK",
        date: "23 Nov, 2021",
    },
    {
        id: 11,
        leadsId: "#VZ21011",
        name: "Anna Martino",
        company: "Syntyce Solutions",
        score: "254",
        phone: "654-987-0123",
        location: "London, UK",
        date: "02 Jan, 2022",
    },
];

// DEALS
const deals = [
    {
        id: 1,
        bgColor: "danger",
        title: "Lead Discovered",
        price: "$265,200",
        deals: "4",
        subItem: [
            {
                id: 1,
                isRibbon: false,
                img: avatar1,
                title: "Managing sales team meeting",
                price: "$87k",
                date: "01 Jan, 2022",
                subTitle: "Nesta Technologies",
                timeDuration: "4 Days",
                timeDurationClass: "danger",
                isFooter: true,
            },
            {
                id: 2,
                isRibbon: true,
                img: avatar2,
                title: "Airbnb React Development",
                price: "$20.3k",
                date: "24 Dec, 2021",
                subTitle: "Nesta Technologies",
                timeDuration: "4 Days",
                timeDurationClass: "danger",
                isFooter: true,
            },
            {
                id: 3,
                isRibbon: false,
                img: avatar3,
                title: "Discovery Capital",
                price: "$124.3k",
                date: "29 Dec, 2021",
                subTitle: "Nesta Technologies",
                timeDuration: "4 Days",
                timeDurationClass: "danger",
                isFooter: true,
            },
            {
                id: 4,
                isRibbon: false,
                img: avatar4,
                title: "Airbnb React Development",
                price: "$33.6k",
                date: "24 Dec, 2021",
                subTitle: "Nesta Technologies",
                timeDuration: "4 Days",
                timeDurationClass: "danger",
                isFooter: true,
            },
        ],
    },
    {
        id: 2,
        bgColor: "success",
        title: "Contact Initiated",
        price: "$108,700",
        deals: "5",
        subItem: [
            {
                id: 1,
                isRibbon: true,
                img: avatar5,
                title: "Custom Mobile Apps",
                price: "$28.7k",
                date: "13 Dec, 2021",
                subTitle: "Nesta Technologies",
                timeDuration: "4 Days",
                timeDurationClass: "danger",
                isFooter: true,
            },
            {
                id: 2,
                isRibbon: false,
                img: github,
                title: "Investment Deal for Zoetic Fashion",
                price: "$32.8k",
                date: "10 Oct, 2021",
                subTitle: "Zoetic Fashion",
                timeDuration: "25 Days",
                timeDurationClass: "warning",
                isFooter: true,
            },
            {
                id: 3,
                isRibbon: false,
                img: avatar6,
                title: "Modern Design",
                price: "$23k",
                date: "03 Oct, 2021",
                subTitle: "Micro Design",
                timeDuration: "2 Month",
                timeDurationClass: "success",
                isFooter: true,
            },
            {
                id: 4,
                isRibbon: false,
                img: avatar7,
                title: "Hotel Logo Design",
                price: "$10.9k",
                date: "05 Jan, 2022",
                subTitle: "Nesta Technologies",
                timeDuration: "4 Days",
                timeDurationClass: "danger",
                isFooter: true,
            },
            {
                id: 5,
                isRibbon: false,
                img: mail_chimp,
                title: "Managing Sales",
                price: "$13.3k",
                date: "04 Sep, 2021",
                subTitle: "Nesta Technologies",
                timeDuration: "4 Days",
                timeDurationClass: "danger",
                isFooter: true,
            },
        ],
    },
    {
        id: 3,
        bgColor: "warning",
        title: "Needs Identified",
        price: "$708,200",
        deals: "7",
        subItem: [
            {
                id: 1,
                isRibbon: false,
                img: avatar9,
                title: "Art Studio Design",
                price: "$147.5k",
                date: "24 Sep, 2021",
                subTitle: "Alexis Clarke",
                timeDuration: "7 Days",
                timeDurationClass: "danger",
                isFooter: true,
            },
            {
                id: 2,
                isRibbon: false,
                img: avatar8,
                title: "Billing Page Bug",
                price: "$15.8k",
                date: "17 Dec, 2021",
                subTitle: "Meta4Systems",
                timeDuration: "35 Days",
                timeDurationClass: "warning",
                isFooter: true,
            },
            {
                id: 3,
                isRibbon: false,
                img: dribble,
                title: "Food Selection Platform",
                price: "$72.5k",
                date: "04 Jan, 2022",
                subTitle: "Syntyce Solutions",
                timeDuration: "15 Days",
                timeDurationClass: "danger",
                isFooter: true,
            },
            {
                id: 4,
                isRibbon: true,
                img: avatar1,
                title: "Skote React Development",
                price: "$89.8",
                date: "21 Nov, 2021",
                subTitle: "Themesbrand",
                timeDuration: "3 Month",
                timeDurationClass: "danger",
                isFooter: true,
            },
            {
                id: 5,
                isRibbon: true,
                img: avatar2,
                title: "Rio Brazil Salon - Admin Dashboard",
                price: "$126.7k",
                date: "30 Dec, 2021",
                subTitle: "Themesbrand",
                timeDuration: "3 Days",
                timeDurationClass: "danger",
                isFooter: true,
            },
            {
                id: 6,
                isRibbon: false,
                img: company6,
                title: "Wood Elements Design",
                price: "$120.2k",
                date: "24 Nov, 2021",
                subTitle: "iTest Factory ",
                timeDuration: "42 Days",
                timeDurationClass: "warning",
                isFooter: true,
            },
            {
                id: 7,
                isRibbon: false,
                img: avatar10,
                title: "PayPal SEO audit",
                price: "$135.7k",
                date: "23 Nov, 2021",
                subTitle: "Meta4Systems ",
                timeDuration: "6 Month",
                timeDurationClass: "success",
                isFooter: true,
            },
        ],
    },
    {
        id: 4,
        bgColor: "info",
        title: "Meeting Arranged",
        price: "$44,900",
        deals: "3",
        subItem: [
            {
                id: 1,
                isRibbon: false,
                img: company5,
                title: "SASS app workflow diagram",
                price: "$17.8k",
                date: "01 Jan, 2022",
                subTitle: "Nesta Technologies",
                timeDuration: "10 Days",
                timeDurationClass: "danger",
                isFooter: true,
            },
            {
                id: 2,
                isRibbon: false,
                img: avatar3,
                title: "Uber new brand system",
                price: "$24.5k",
                date: "22 Dec, 2021",
                subTitle: "Nesta Technologies",
                timeDuration: "4 Days",
                timeDurationClass: "danger",
                isFooter: true,
            },
            {
                id: 3,
                isRibbon: false,
                img: company8,
                title: "TripAdvisor",
                price: "$2.6k",
                date: "12 Dec, 2021",
                subTitle: "Nesta Technologies",
                timeDuration: "4 Days",
                timeDurationClass: "danger",
                isFooter: true,
            },
        ],
    },
    {
        id: 5,
        bgColor: "secondary",
        title: "Offer Accepted",
        price: "$819,300",
        deals: "8",
        subItem: [
            {
                id: 1,
                isRibbon: false,
                img: avatar10,
                title: "Coupon Website",
                price: "$27.4k",
                date: "07 Jan, 2021",
                subTitle: "Nesta Technologies",
                timeDuration: "4 Days",
                timeDurationClass: "danger",
                isFooter: true,
            },
            {
                id: 2,
                isRibbon: true,
                img: slack,
                title: "Marketing Automation Demo",
                price: "$94.8",
                date: "19 Nov, 2021",
                subTitle: "Nesta Technologies",
                timeDuration: "47 Days",
                timeDurationClass: "warning",
                isFooter: true,
            },
            {
                id: 3,
                isRibbon: false,
                img: avatar4,
                title: "New Email Design Templates",
                price: "$136.9k",
                date: "05 Jan, 2022",
                subTitle: "Nesta Technologies",
                timeDuration: "4 Days",
                timeDurationClass: "danger",
                isFooter: false,
            },
            {
                id: 4,
                isRibbon: false,
                img: avatar7,
                title: "Create New Components",
                price: "$45.9k",
                date: "26 Dec, 2021",
                subTitle: "Nesta Technologies",
                timeDuration: "4 Month",
                timeDurationClass: "success",
                isFooter: true,
            },
            {
                id: 5,
                isRibbon: true,
                img: company3,
                title: "New Test Tickets",
                price: "$118k",
                date: "01 Jan, 2022",
                subTitle: "Nesta Technologies",
                timeDuration: "4 Days",
                timeDurationClass: "danger",
                isFooter: true,
            },
            {
                id: 6,
                isRibbon: true,
                img: avatar6,
                title: "Recover Deleted Folder",
                price: "$87.3k",
                date: "03 Jan, 2022",
                subTitle: "Nesta Technologies",
                timeDuration: "14 Days",
                timeDurationClass: "danger",
                isFooter: true,
            },
            {
                id: 7,
                isRibbon: false,
                img: github,
                title: "Github SEO audit",
                price: "$241.2k",
                date: "21 Sep, 2021",
                subTitle: "Nesta Technologies",
                timeDuration: "4 Days",
                timeDurationClass: "danger",
                isFooter: true,
            },
            {
                id: 8,
                isRibbon: false,
                img: company8,
                title: "Urban Modern Design",
                price: "$67.8k",
                date: "09 Oct, 2021",
                subTitle: "Nesta Technologies",
                timeDuration: "4 Days",
                timeDurationClass: "danger",
                isFooter: true,
            },
        ],
    },
];

export {crmcontacts, companies, leads, deals};
