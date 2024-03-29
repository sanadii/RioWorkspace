import { topPages, allData, monthData, halfyearData, allaudiencesMetricsData, monthaudiencesMetricsData, halfyearaudiencesMetricsData, yaeraudiencesMetricsData, todayDeviceData, lastWeekDeviceData, lastMonthDeviceData, currentYearDeviceData, todayaudiencesCountryData, lastWeekaudiencesCountryData, lastMonthaudiencesCountryData, currentyearaudiencesCountryData } from "./analytics";
import {
  crmWidgets,
  dealsStatus,
  tasks,
  activities,
  closingDeals,
  todayBalanceData, lastWeekBalanceData, lastMonthBalanceData, currentYearBalanceData, todayDealData, weeklyDealData, monthlyDealData, yealyDealData, octData, novData, decData, janData
} from "./dashboardcrm";
import {
  ecomWidgets,
  bestSellingProducts,
  topSellers,
  recentOrders,
  topCategories,
  allRevenueData, monthRevenueData, halfYearRevenueData, yearRevenueData
} from "./dashboardEcommerce";
import {
  cyptoWidgets,
  currencies,
  recentActivity,
  topPerformers,
  newsFeed,
  cryptoSlider,
  btcPortfolioData, usdPortfolioData, euroPortfolioData, MarketGraphAll, MarketGraphYear, MarketGraphMonth, MarketGraphWeek, MarketGraphHour
} from "./crypto";
import {
  projectsWidgets,
  activeProjects,
  projectTasks,
  teamMembers,
  overviewCounter, allProjectData, monthProjectData, halfyearProjectData, yearProjectData, allTimeData, lastWeekData, lastMonthData, lastquarterData, dashboardChat
} from "./dashboardProjects";
import { topartWork, featuredNFTData, popularityData, recentNFTsData, topCollectionData, popularCreatorsData, allMarketplaceData, monthMarketplaceData, halfyearMarketplaceData, yearMarketplaceData } from "./dashboardNFT";
import {
  tileBoxs1,
  tileBoxs2,
  tileBoxs3,
  tileBoxes4,
  tileBoxes5,
  widgetsActivities,
  widgetsAudiences,
  widgetsPortfolio,
  widgetsTasks,
  otherWidgets2
} from "./widgets";
import { taskWidgets, allTask, kanbanBoardData } from "./taskList";
import { RevenueWidgets, RevenueTable } from "./RevenueList";
import {
  projectList,
} from "./projectList";

import { calenderDefaultCategories, events, defaultevent } from "./calender";
import { chatMessage, messages, chatContactData } from "./chat";
import { mailbox } from "./mailbox";
import { Revenues, buysellWidgets, market, CryptoOrders, watchlist, marketStatus, CryptoicoWidgets, icoWidgetsList } from "./cryptoPage";
import { ticketsWidgets, ticketsTable } from "./supportTickets";

// Pages
import { gallery, pricing1, pricing2, pricing3, projects, documents, SearchGallery, news, video, swiper, team } from "./pagesData";

//Ecommerce
import {
  productsData,
  productDetailsWidgets,
  reviews,
  orders,
  productDetails,
  customerList,
  shoppingCart,
  orderSummary,
  sellersList,
  revenueWidgets,
  productsReview,
} from "./ecommerce";

import { crmcontacts, companies, leads, deals } from "./crm";

import {
  expolreNow, aution, NFTRanking, creatorsData, creatorsListData, walletConnectData, topDrop, topCreator, topCollection, tradingArtworkData,
  nftArtworkData,
  popularCreatorsNFT, marketPlacewidget
} from "./NFTMarketplace";

import { connectData, discoverItemsData, featuresData, productData, topCreatorData } from "./LandingNFT";

import { recentFile, folderList } from "./fileManager";

import { todoTaskList, todoCollapse } from "./todoData";

import { jobApplication, jobCategories, jobCandidates, jobCandidatesList } from "./appsJobs";
import { apiKey } from "./apiKey";
import country from "./country";
import { headData, tasklist, AddTeamMember } from "./kanban";

export {
  country,
  topPages,
  crmWidgets,
  cryptoSlider,
  dealsStatus,
  tasks,
  headData, tasklist, AddTeamMember,
  activities,
  closingDeals,
  ecomWidgets,
  bestSellingProducts,
  topSellers,
  recentOrders,
  topCategories,
  cyptoWidgets,
  currencies,
  topPerformers,
  recentActivity,
  newsFeed,
  projectsWidgets,
  activeProjects,
  projectTasks,
  teamMembers,
  overviewCounter,
  tileBoxs1,
  tileBoxs2,
  tileBoxs3,
  tileBoxes4,
  tileBoxes5,
  widgetsActivities,
  widgetsAudiences,
  widgetsPortfolio,
  widgetsTasks,
  taskWidgets,
  allTask,
  kanbanBoardData,
  RevenueWidgets,
  RevenueTable,
  projectList,
  chatMessage,
  messages,
  calenderDefaultCategories,
  events,
  defaultevent,
  mailbox,
  productsData,
  jobCategories,
  productDetailsWidgets,
  reviews,
  orders,
  productDetails,
  customerList,
  shoppingCart,
  orderSummary,
  sellersList,
  revenueWidgets,
  productsReview,
  crmcontacts,
  companies,
  leads,
  deals,
  Revenues,
  buysellWidgets,
  market,
  CryptoOrders,
  watchlist,
  marketStatus,
  CryptoicoWidgets,
  icoWidgetsList,
  ticketsWidgets,
  ticketsTable,
  otherWidgets2,
  expolreNow,
  aution,
  NFTRanking,
  creatorsData,
  creatorsListData,
  walletConnectData,
  topDrop,
  topCreator,
  topCollection,
  topartWork, featuredNFTData, popularityData, recentNFTsData, topCollectionData, popularCreatorsData, tradingArtworkData,
  nftArtworkData,
  popularCreatorsNFT, marketPlacewidget,
  connectData, discoverItemsData, featuresData, productData, topCreatorData, allData, monthData, halfyearData, allaudiencesMetricsData, monthaudiencesMetricsData, halfyearaudiencesMetricsData, yaeraudiencesMetricsData, todayDeviceData, lastWeekDeviceData, lastMonthDeviceData, currentYearDeviceData, todayBalanceData, lastWeekBalanceData, lastMonthBalanceData, currentYearBalanceData, todayDealData, weeklyDealData, monthlyDealData, yealyDealData, octData, novData, decData, janData, allRevenueData, monthRevenueData, halfYearRevenueData, yearRevenueData, btcPortfolioData, usdPortfolioData, euroPortfolioData, MarketGraphAll, MarketGraphYear, MarketGraphMonth, MarketGraphWeek, MarketGraphHour, allProjectData, monthProjectData, halfyearProjectData, yearProjectData, allTimeData, lastWeekData, lastMonthData, lastquarterData, allMarketplaceData, monthMarketplaceData, halfyearMarketplaceData, yearMarketplaceData, todayaudiencesCountryData, lastWeekaudiencesCountryData, lastMonthaudiencesCountryData, currentyearaudiencesCountryData, dashboardChat, gallery, pricing1, pricing2, pricing3, projects, documents, SearchGallery, news, video, swiper, team,
  recentFile, folderList, todoTaskList, chatContactData, todoCollapse,
  jobApplication, apiKey, jobCandidates, jobCandidatesList
};
