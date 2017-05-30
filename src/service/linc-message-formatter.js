import _ from "lodash";
const textLowerLimit = 0;
const textUpperLimit = 255;

function lProceedTypCd(loanUsage) {
  return loanUsage.split(",").map(function(loanUsageItem) { // eslint-disable-line complexity
    const strLoanDesc = loanUsageItem.trim(" ").toUpperCase();
    let retLoanDescCd = "";
    switch (strLoanDesc) {
      case "PURCHASING PROPERTY":
        retLoanDescCd = "01";
        break;
      case "PURCHASING EQUIPMENT":
        retLoanDescCd = "02";
        break;
      case "REMODELING AN EXISTING LOCATION":
        retLoanDescCd = "03";
        break;
      case "REFINANCING/CONSOLIDATING DEBT":
        retLoanDescCd = "04";
        break;
      case "HIRING EMPLOYEES/STAFF":
        retLoanDescCd = "05";
        break;
      case "WORKING CAPITAL":
        retLoanDescCd = "06";
        break;
      case "PURCHASING INVENTORY":
        retLoanDescCd = "07";
        break;
      case "MARKETING/ADVERTISING":
        retLoanDescCd = "08";
        break;
      case "BUYING AN EXISTING BUSINESS":
        retLoanDescCd = "09";
        break;
      case "OTHER":
        retLoanDescCd = "99";
        break;
      case "BUSINESS TRAINING":
        retLoanDescCd = "10";
        break;
      case "DEVELOPING A PRODUCT":
        retLoanDescCd = "11";
        break;
      case "OPENING A NEW LOCATION":
        retLoanDescCd = "12";
        break;
      case "PARTICIPATING IN TRADE SHOW":
        retLoanDescCd = "13";
        break;
      default:
        throw Error("Value not a valid LoanDescription.");
    }
    return retLoanDescCd;
  }).join();
}

function bDtlTypCd(industryType) {
  return industryType.split(",").map(function(industryTypeItem) { //eslint-disable-line complexity
    const strIndustryType = industryTypeItem.trim(" ").toUpperCase();
    let retIndustryTypeCd = "";
    switch (strIndustryType) {
      case "SERVICE":
        retIndustryTypeCd = "01";
        break;
      case "MANUFACTURING":
        retIndustryTypeCd = "02";
        break;
      case "WHOLESALE":
        retIndustryTypeCd = "03";
        break;
      case "RETAIL":
        retIndustryTypeCd = "04";
        break;
      case "RESTAURANT/BAR":
        retIndustryTypeCd = "05";
        break;
      case "HOTEL/MOTEL":
        retIndustryTypeCd = "06";
        break;
      case "AUTOMOTIVE/SERVICE STATION":
        retIndustryTypeCd = "07";
        break;
      case "OTHER":
        retIndustryTypeCd = "99";
        break;
      case "ADVERTISING/MARKETING":
        retIndustryTypeCd = "08";
        break;
      case "AGRICULTURE":
        retIndustryTypeCd = "09";
        break;
      case "CHEMICAL/PHARMACEUTICAL":
        retIndustryTypeCd = "10";
        break;
      case "CONSTRUCTION":
        retIndustryTypeCd = "11";
        break;
      case "EDUCATION":
        retIndustryTypeCd = "12";
        break;
      case "ENERGY":
        retIndustryTypeCd = "13";
        break;
      case "ENTERTAINMENT/RECREATION":
        retIndustryTypeCd = "14";
        break;
      case "FINANCIAL SERVICES":
        retIndustryTypeCd = "15";
        break;
      case "FOOD SERVICES":
        retIndustryTypeCd = "16";
        break;
      case "HEALTH CARE":
        retIndustryTypeCd = "17";
        break;
      case "HOSPITALITY":
        retIndustryTypeCd = "18";
        break;
      case "MEDIA":
        retIndustryTypeCd = "19";
        break;
      case "NON-PROFIT":
        retIndustryTypeCd = "20";
        break;
      case "PROFESSIONAL SERVICES":
        retIndustryTypeCd = "21";
        break;
      case "REAL ESTATE":
        retIndustryTypeCd = "22";
        break;
      case "TECHNOLOGY":
        retIndustryTypeCd = "23";
        break;
      case "TRANSPORTATION/LOGISTICS":
        retIndustryTypeCd = "24";
        break;
      default:
        throw Error("Value not valid as IndustryType.");
    }
    return retIndustryTypeCd;
  }).join();
}

function bAgeCd(exp) {
  let retVal = "";
  switch (exp) {
    case "Less than 1 year":
      retVal = "01";
      break;
    case "1-2 years":
      retVal = "02";
      break;
    case "2-5 years":
      retVal = "03";
      break;
    case "5+ years":
      retVal = "04";
      break;
    default:
      throw Error("Valid Industry Experience is required.");
  }
  return retVal;
}

function formatMoment() {

  const mDate = new Date();

  return (mDate.getDate() + ":" + mDate.getMonth() + ":" + mDate.getFullYear() + "-" + mDate.getHours() + ":" + mDate.getMinutes() + ":" + mDate.getSeconds());
}

function reqAmtRangeCd(loanAmount) { //eslint-disable-line complexity

  let retVal = "";
  const fiftyThousand = 50000;
  const fiftyThousandAndOne = 50001;
  const oneFiftyThousand = 150000;
  const oneFiftyThousandAndOne = 150001;
  const twoFiftyThousand = 250000;
  const twoFiftyThousandAndOne = 250001;
  const threeHundredAndFiftyThousand = 350000;
  const threeHundredAndFiftyThousandAndOne = 350001;
  const oneMillion = 1000000;
  const oneMillionAndOne = 1000001;
  const fiveMillion = 5000000;

  const loanAmt = loanAmount.replace(/\$|,/g, "");

  if (isNaN(loanAmt)) {
    // console.log("Loan Amount is not a number in reqAmtRangeCd.");
    // console.log(loanAmt);
    throw Error("Value is a not a number.");
  }

  const intLoanAmt = parseInt(loanAmt, 10);
  if (intLoanAmt <= fiftyThousand) {
    retVal = "01";
  } else if ((intLoanAmt >= fiftyThousandAndOne) && (intLoanAmt <= oneFiftyThousand)) {
    retVal = "02";
  } else if ((intLoanAmt >= oneFiftyThousandAndOne) && (intLoanAmt <= twoFiftyThousand)) {
    retVal = "03";
  } else if ((intLoanAmt >= twoFiftyThousandAndOne) && (intLoanAmt <= threeHundredAndFiftyThousand)) {
    retVal = "04";
  } else if ((intLoanAmt >= threeHundredAndFiftyThousandAndOne) && (intLoanAmt <= oneMillion)) {
    retVal = "05";
  } else if ((intLoanAmt >= oneMillionAndOne) && (intLoanAmt <= fiveMillion)) {
    retVal = "06";
  } else if (intLoanAmt > fiveMillion) {
    retVal = "07";
  }

  return retVal;
}

function mapToUnsignedByte(isVeteran) {
  return (isVeteran) ? "6" : "1";
}

function trimToSize(inputVal) {
  let retVal = "";

  if (inputVal) {
    if (inputVal.length > textLowerLimit && inputVal.length < textUpperLimit) {
      retVal = inputVal;
    } else if (inputVal.length >= textUpperLimit) {
      retVal = inputVal.substring(textLowerLimit, textUpperLimit);
    }
  }
  return retVal;
}


function userName(name) {


  let strName = name;

  if (!_.isEmpty(strName)) {
    strName = name.trim();
  }
  // const nameLowerLimit = 0;
  // const nameUpperLimit = 40;
  //if (strName.length > nameLowerLimit && strName.length < nameUpperLimit) {
  //  console.log("Name greater less than or greater than length supported by OCA");
  //}
  return strName;
}

function booleanToChar(value) {
  return value ? "Y" : "N";
}

function toNumber(value) {
  return Number(value);
}


function shorten(bufStr) {
  // we lose some uniqueness here; someday should find a better way to encode this
  const shorter = bufStr.replace(/-/g, "");
  const maxIdLength = 29;
  return shorter.substring(0, maxIdLength);
}

function formatMessage(userId, lenderMatchRegistration) {
  const firstName = 0;
  const lastName = 1;

  return {
    //UserName <= 80 chars
    "LoginID": userId,
    //UniqueID <= 30 chars
    "RequestID": shorten(lenderMatchRegistration.id),
    //LoanName <= 255 chars
    "LoanName": lenderMatchRegistration.businessName,
    //ProjectZipCd = 5 chars
    "ProjectZipCd": lenderMatchRegistration.businessZip,
    //ProjectZip4Cd = 4 chars
    "ProjectZip4Cd": "0000",
    //FirstName <= 80 chars
    "FirstName": userName(lenderMatchRegistration.name.split(" ")[firstName]),
    //LastName <= 80 chars
    "LastName": userName(lenderMatchRegistration.name.split(" ")[lastName]),
    //BusinessWebsite <= 255 chars
    "BusinessWebsite": lenderMatchRegistration.businessWebsite,
    //FinancialInd <=
    "FinancialInd": booleanToChar(lenderMatchRegistration.hasFinancialProjections),
    //RevenueInd
    "RevenueInd": booleanToChar(lenderMatchRegistration.isGeneratingRevenue),
    //PrimaryEmail <= 255 chars
    "PrimaryEmail": lenderMatchRegistration.emailAddress,
    //PrimaryPhone <= 25 chars
    "PrimaryPhone": lenderMatchRegistration.phone,
    //BusinessAgeCd = 2 chars
    "BusinessAgeCd": bAgeCd(lenderMatchRegistration.industryExperience),
    //BusinessDtlTypCd = 2 chars
    "BusinessDtlTypCd": bDtlTypCd(lenderMatchRegistration.industry),
    //BusinessDtlTypTxt <= 255 chars
    "BusinessDtlTypTxt": trimToSize(lenderMatchRegistration.loanDescription),
    //LoanProceedTypCd <= 255 comma delimited
    "LoanProceedTypCd": lProceedTypCd(lenderMatchRegistration.loanUsage),
    //ProceedOthTypTxt <= 255 chars
    "ProceedOthTypTxt": trimToSize(lenderMatchRegistration.loanDescription),
    //RequestedAmtRangeCd = decimal
    "RequestedLoanAmount": toNumber(lenderMatchRegistration.loanAmount),
    //BusinessAdvisoryInd Y for Yes or N for No
    "BusinessAdvisoryInd": booleanToChar(lenderMatchRegistration.hasFinancialProjections),
    //BusinessPlanInd Y for Yes or N for No
    "BusinessPlanInd": booleanToChar(lenderMatchRegistration.hasWrittenPlan),
    //Veteran = unsignedByte means 6 for Yes 1 for No
    "Veteran": mapToUnsignedByte(lenderMatchRegistration.isVeteran)
  };
}

export { userName, mapToUnsignedByte, reqAmtRangeCd, formatMoment, bAgeCd, bDtlTypCd, lProceedTypCd, formatMessage, booleanToChar, toNumber, trimToSize };
