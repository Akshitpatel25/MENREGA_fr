// getting exact month, district, state and fin_year data with the help of user location

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StackedBarChart from "../StackedBarChart/StackedBarChart";
import TableData from "../table/TableData";
import DonutChart from "../donutChart/DonutChart";
import {
  setDataSet,
  setFinYear,
  setMonth,
  setDistrict,
  setState,
  setAllDistrict,
  setIsLoading,
} from "../../store/features/data/dataSlice";
import { Loader } from "lucide-react";

const EcommerceDashboard = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.value);
  const dataset = useSelector((state) => state.dataset.value);
  const state = useSelector((state) => state.dataset.state);
  const district = useSelector((state) => state.dataset.district);
  const allDistrict = useSelector((state) => state.dataset.allDistrict);
  const finYear = useSelector((state) => state.dataset.finYear);
  const month = useSelector((state) => state.dataset.month);
  const isLoading = useSelector((state) => state.dataset.isLoading);
  const [userState, setUserState] = useState(state || "");
  const [userDistrict, setUserDistrict] = useState(district || "");
  const [allDistrictOfState, setAllDistrictOfState] = useState(
    allDistrict || []
  );
  const [userFinYear, setUserFinYear] = useState(finYear || "");
  const [monthName, setMonthName] = useState([
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]);
  const [selectedMonth, setSelectedMonth] = useState(month);
  const indianStatesAndUTs = {
    "UTTAR PRADESH": "UTTAR PRADESH",
    "MADHYA PRADESH": "MADHYA PRADESH",
    BIHAR: "BIHAR",
    ASSAM: "ASSAM",
    MAHARASHTRA: "MAHARASHTRA",
    GUJARAT: "GUJARAT",
    RAJASTHAN: "RAJASTHAN",
    "TAMIL NADU": "TAMIL NADU",
    CHHATTISGARH: "CHHATTISGARH",
    KARNATAKA: "KARNATAKA",
    TELANGANA: "TELANGANA",
    ODISHA: "ODISHA",
    "ANDHRA PRADESH": "ANDHRA PRADESH",
    PUNJAB: "PUNJAB",
    JHARKHAND: "JHARKHAND",
    HARYANA: "HARYANA",
    "ARUNACHAL PRADESH": "ARUNACHAL PRADESH",
    "JAMMU AND KASHMIR": "JAMMU AND KASHMIR",
    MANIPUR: "MANIPUR",
    UTTARAKHAND: "UTTARAKHAND",
    KERALA: "KERALA",
    "HIMACHAL PRADESH": "HIMACHAL PRADESH",
    MEGHALAYA: "MEGHALAYA",
    "WEST BENGAL": "WEST BENGAL",
    MIZORAM: "MIZORAM",
    NAGALAND: "NAGALAND",
    TRIPURA: "TRIPURA",
    SIKKIM: "SIKKIM",
    "ANDAMAN AND NICOBAR": "ANDAMAN AND NICOBAR",
    LADAKH: "LADAKH",
    PUDUCHERRY: "PUDUCHERRY",
    GOA: "GOA",
    "DN HAVELI AND DD": "DN HAVELI AND DD",
    LAKSHADWEEP: "LAKSHADWEEP",
  };


  // getting user coordinates
  useEffect(() => {
    if (dataset.length == 0) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetch(
            `https://menrega.onrender.com/api/reverse-geocode?lat=${position.coords.latitude}&lon=${position.coords.longitude}`
          )
            .then((res) => res.json())
            .then((data) => {
              // console.log(data?.address?.state?.toUpperCase())
              dispatch(
                setState(
                  indianStatesAndUTs[data?.address?.state?.toUpperCase()]
                )
              );
              dispatch(
                setDistrict(data?.address?.state_district?.toUpperCase())
              );
              setUserDistrict(data?.address?.state_district?.toUpperCase());
            })
            .catch((error) => {
              console.log(error);
            });

          // fetch(`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`)
          //   .then(res => res.json())
          //   .then(data => {
          //     console.log("user location",data)
          //     dispatch(setState(indianStatesAndUTs[data?.address?.state?.toUpperCase()]))
          //     dispatch(setDistrict(data?.address?.state_district?.toUpperCase()))
          //     setUserDistrict(data?.address?.state_district?.toUpperCase())
          //   });

          // THIS IS FOR THE AWS LAMBDA API RESPONSE
        },
        (error) => {
          console.error("Location error:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    }
  }, []);

  // all district of state
  useEffect(() => {
    if (dataset?.length == 0 && state) {
      console.log("all district fetcing...");
      gettingAllDistrictByState();
    }
  }, [dataset, state, userState]);

  // exact user district and store it to redux
  // get specific data of user with state, district, month, fin_year
  useEffect(() => {
    if (
      state &&
      district &&
      dataset.length == 0 &&
      allDistrictOfState?.length > 0
    ) {
      allDistrictOfState.forEach((s) => {
        if (userDistrict.startsWith(s.slice(0, 3))) {
          // console.log("setting up district", s);
          dispatch(setDistrict(s));
        }
      });
      // console.log("calling");
      gettingData();
    }
  }, [state, district, allDistrictOfState]);

  const [sumData, setSumData] = useState({
    Total_Households_Worked: 0,
    Total_Individuals_Worked: 0,
    Average_Wage_rate_per_day_per_person: 0,
    Wages: 0,
    Total_Exp: 0,
    Number_of_Ongoing_Works: 0,
    Number_of_Completed_Works: 0,
    Women_Persondays: 0,
    SC_persondays: 0,
    ST_persondays: 0,
    percentage_payment_15d: 0,
  });

  useEffect(() => {
    // console.log(dataset)

    globalSum();
  }, [dataset]);


  function globalSum() {
    let THW = 0,
      TIW = 0,
      AWSRPDPP = 0,
      W = 0.0,
      TE = 0,
      NFOW = 0,
      NFCW = 0,
      WP = 0,
      SCP = 0,
      STP = 0,
      PPGW15D = 0.0;
    // if (dataset?.records?.lenght > 0) {
    // console.log("inside the global sum");
    dataset?.records &&
      dataset?.records?.forEach((d) => {
        THW += parseInt(d.Total_Households_Worked);
        TIW += parseInt(d.Total_Individuals_Worked);
        AWSRPDPP += parseFloat(d.Average_Wage_rate_per_day_per_person);
        W += parseInt(d.Wages);
        TE += parseFloat(d.Total_Exp);
        NFOW += parseInt(d.Number_of_Ongoing_Works);
        NFCW += parseInt(d.Number_of_Completed_Works);
        WP += parseInt(d.Women_Persondays);
        SCP += parseInt(d.SC_persondays);
        STP += parseInt(d.ST_persondays);
        PPGW15D += parseInt(d.percentage_payments_gererated_within_15_days);
      });
    setSumData({
      Total_Households_Worked: THW,
      Total_Individuals_Worked: TIW,
      Average_Wage_rate_per_day_per_person: AWSRPDPP,
      Wages: W / dataset?.records?.length,
      Total_Exp: TE.toFixed(2),
      Number_of_Ongoing_Works: NFOW,
      Number_of_Completed_Works: NFCW,
      Women_Persondays: WP,
      SC_persondays: SCP,
      ST_persondays: STP,
      percentage_payment_15d: (PPGW15D / dataset?.records?.length).toFixed(2),
    });
    // }
  }

  // getting data from api for exact month, district, state and fin_year
  async function gettingData() {
    console.log("calling main api", state, district, finYear, selectedMonth);
    await fetch(
      `https://api.data.gov.in/resource/ee03643a-ee4c-48c2-ac30-9f2ff26ab722?api-key=579b464db66ec23bdd000001d4c9c328a2ed4c3c5308bd4690cf55c0&format=json&limit=100&filters[state_name]=${state}&filters[district_name]=${district}&filters[fin_year]=${finYear}&filters[month]=${selectedMonth}&fields=Total_Households_Worked,Total_Individuals_Worked,Average_Wage_rate_per_day_per_person,Wages,Total_Exp,Number_of_Ongoing_Works,ST_persondays,SC_persondays,percentage_payments_gererated_within_15_days,month,fin_year,district_name,Number_of_Completed_Works,Women_Persondays`
    )
      .then((response) => response.json())
      .then((data) => dispatch(setDataSet(data), dispatch(setIsLoading(true))))
      .catch((error) => console.error(error));
  }

  // getting all district of state and storing it to redux
  async function gettingAllDistrictByState() {
    let allDistricts;
    await fetch(
      `https://api.data.gov.in/resource/ee03643a-ee4c-48c2-ac30-9f2ff26ab722?api-key=579b464db66ec23bdd000001d4c9c328a2ed4c3c5308bd4690cf55c0&format=json&limit=1000&filters[state_name]=${state}&filters[fin_year]=2024-2025&filters[month]=Jan&fields=district_name`
    )
      .then((response) => response.json())
      .then((data) => (allDistricts = data))
      .catch((error) => console.error(error));

    const distinctValues = new Set(
      allDistricts?.records.map((item) => item.district_name)
    );
    setAllDistrictOfState(Array.from(distinctValues));
    dispatch(setAllDistrict(Array.from(distinctValues)));
    dispatch(setDistrict(Array.from(distinctValues)[0]));
    // setUserDistrict(Array.from(distinctValues)[0])
  }

  function getLastFourFinancialYears(currentYear = new Date().getFullYear()) {
    const years = [];
    for (let i = 0; i < 4; i++) {
      const endYear = currentYear - i;
      const startYear = endYear - 1;
      years.push(`${startYear}-${endYear}`);
    }
    return years;
  }

  function handleSearch() {
    // console.log("userState:", state),
    //   console.log("userDistrict:", district),
    //   console.log("userFinYear:", finYear),
    //   console.log("selectedMonth:", selectedMonth);
    dispatch(setIsLoading(false));
    gettingData();
    // dispatch(setDataSet([]));
  }

  function handleStateChange(updateState) {
    // console.log(indianStatesAndUTs[updateState]);
    setAllDistrictOfState([]);
    dispatch(setState(updateState));
    setUserState(updateState);
    dispatch(setDataSet([]));
  }

  function handleChangeFinYear(updateFinYear) {
    setUserFinYear(updateFinYear);
    dispatch(setFinYear(updateFinYear));
  }

  function handleChangeMonth(updateMonth) {
    setSelectedMonth(updateMonth);
    dispatch(setMonth(updateMonth));
  }

  function handleChangeDistrict(updateDistrict) {
    setUserDistrict(updateDistrict);
    dispatch(setDistrict(updateDistrict));
  }

  const stats = [
    {
      title: "Total Households Worked",
      value: sumData.Total_Households_Worked.toLocaleString(),
      isPositive: true,
      bgColor: isDark ? "#E3F5FF33" : "#E3F5FF",
    },
    {
      title: "Total Individuals Worked",
      value: sumData.Total_Individuals_Worked.toLocaleString(),
      isPositive: false,
      bgColor: isDark ? "#FFFFFF0D" : "#F7F9FB",
    },
    {
      title: "Total Expense",
      value: "₹ " + parseInt(sumData.Total_Exp).toLocaleString(),
      isPositive: true,
      bgColor: isDark ? "#FFFFFF0D" : "#F7F9FB",
    },
    {
      title: "Average Wages",
      value: "₹ " + parseInt(sumData.Wages).toLocaleString(),
      isPositive: true,
      bgColor: isDark ? "#E3F5FF33" : "#E5ECF6",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold pb-5">
        District-wise MGNREGA Data at a Glance
      </h1>

      <div className="flex gap-2 xl:flex-row flex-col">
        <div>
          <h3>State:</h3>
          <select
            className="border rounded"
            value={state}
            onChange={(e) => handleStateChange(e.target.value)}
          >
            {Object.entries(indianStatesAndUTs).map(([key, value]) => (
              <option key={key} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div>
          {allDistrictOfState?.length > 0 ? (
            <>
              <h3>District:</h3>
              <select
                className="border rounded"
                value={district}
                onChange={(e) => handleChangeDistrict(e.target.value)}
              >
                {allDistrictOfState.map((dis, index) => (
                  <option key={index} value={dis}>
                    {dis}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <></>
          )}
        </div>
        <div>
          <h3>Month:</h3>
          <select
            className="border rounded"
            value={selectedMonth}
            onChange={(e) => handleChangeMonth(e.target.value)}
          >
            {monthName.map((m, index) => (
              <option key={index} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h3>Financial Year:</h3>
          <select
            className="border rounded"
            value={userFinYear}
            onChange={(e) => handleChangeFinYear(e.target.value)}
          >
            {getLastFourFinancialYears().map((y, index) => (
              <option key={index} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <button
          className={`${
            isDark ? "bg-[#282828]" : "bg-[#c3c3c3]"
          } rounded p-2 m-2  border font-semibold ${isLoading ? "cursor-pointer":"cursor-not-allowed"}`}
          onClick={() => handleSearch()}
          disabled={isLoading ? false : true}
        >
          Search
        </button>
      </div>

      {isLoading ? (
        <>
          <div className="flex flex-col xl:flex-row w-full h-fit gap-6  ">
            {/* 4boxs  */}
            <div className="w-full xl:w-1/2 grid grid-cols-2  gap-3 lg:gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="rounded-2xl p-3 px-5 lg:p-6 transition-all hover:shadow-lg flex flex-col justify-around gap-2 w-full "
                  style={{ backgroundColor: stat.bgColor }}
                >
                  <h1
                    className={` lg:text-xl mb-1  ${
                      stat.title === "Total Households Worked" ||
                      stat.title === "Total Households Worked"
                        ? isDark
                          ? "text-white"
                          : "text-[#1C1C1C]"
                        : isDark
                        ? "text-white"
                        : "text-[#1C1C1C]"
                    }`}
                  >
                    {stat.title} :
                  </h1>

                  <div className="flex items-start justify-between  flex-col md:flex-row">
                    <h3
                      className={`text-lg lg:text-2xl font-semibold font-sans ${
                        stat.title === "Total Individuals Worked" ||
                        stat.title === "Total Individuals Worked"
                          ? isDark
                            ? "text-white"
                            : "text-[#1C1C1C]"
                          : isDark
                          ? "text-white"
                          : "text-[#1C1C1C]"
                      }`}
                    >
                      {stat.value}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full xl:w-1/2 h-80  ">
              <StackedBarChart
                OW={sumData.Number_of_Ongoing_Works}
                CW={sumData.Number_of_Completed_Works}
              />
            </div>
          </div>

          {/* <div className="flex flex-col xl:flex-row w-full h-fit gap-6 ">
              <div className="w-full xl:w-3/4 h-96 ">
                <LineChart />
              </div>

              <div className="w-full xl:w-1/4 h-96"><WorldMap /></div>
            </div> */}

          <div className="flex flex-col-reverse xl:flex-row w-full gap-6">
            {/* Table container - fixed height to match donut, scroll overflow */}
            <div className="w-full xl:w-3/4 overflow-y-auto">
              {/* Optional inner div to ensure full height */}
              <div className="max-h-full">
                <TableData sumData={sumData} />
              </div>
            </div>

            {/* Donut chart container - fixed height */}
            <div className="w-full xl:w-1/4 h-fit flex items-center justify-center">
              <DonutChart
                SCP={sumData.SC_persondays}
                STP={sumData.ST_persondays}
                WP={sumData.Women_Persondays}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className=" flex flex-col justify-center items-center">
            <Loader />
            <p>Please allow location access if you want to see the dashboard</p>
          </div>
        </>
      )}
      {/* Top Stats Cards */}
    </div>
  );
};

export default EcommerceDashboard;
