import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { DateTime } from "luxon";
import "../App.css";
import { WiDaySunny, WiCloud, WiDayRain, WiDaySnow } from "weather-icons-react";

const DailyForecast = ({ forecastData }) => {
  if (!forecastData) return null;

  function convertTimestampToEST(timestamp) {
    const estOffset = -5 * 60 * 60; // Eastern Standard Time (EST) offset in seconds
    const estTimestamp = timestamp + estOffset;
    const date = new Date(estTimestamp * 1000);
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = date.getUTCDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function groupDataByDate(inputData) {
    const groupedData = {};

    inputData.list.forEach((item) => {
      const dateKey = convertTimestampToEST(item.dt);

      if (!groupedData[dateKey]) {
        groupedData[dateKey] = {
          data: [],
          max_temp_max: -Infinity,
          min_temp_min: Infinity,
        };
      }

      groupedData[dateKey].data.push(item);

      if (item.main.temp_max > groupedData[dateKey].max_temp_max) {
        groupedData[dateKey].max_temp_max = item.main.temp_max;
      }

      if (item.main.temp_min < groupedData[dateKey].min_temp_min) {
        groupedData[dateKey].min_temp_min = item.main.temp_min;
      }
    });

    return groupedData;
  }

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Clear":
        return <WiDaySunny />;
      case "Rain":
        return <WiDayRain />;
      case "Clouds":
        return <WiCloud />;
      case "Snow":
        return <WiDaySnow />;
      default:
        return null;
    }
  };

  const convertedData = groupDataByDate(forecastData);

  return (
    <div className="daily-forecast-container">
      {Object.keys(convertedData).map((dateKey) => {
        const entry = convertedData[dateKey];
        const date = DateTime.fromISO(dateKey, { zone: "America/New_York" });

        const dayName = new Intl.DateTimeFormat("en-US", {
          weekday: "long",
        }).format(date);
        const monthName = new Intl.DateTimeFormat("en-US", {
          month: "short",
        }).format(date);

        return (
          <Card key={dateKey} className="daily-forecast-card">
            <Card.Body>
              <span style={{ fontSize: 50 }}>
                {getWeatherIcon &&
                  getWeatherIcon(entry.data[0].weather[0].main)}
              </span>
              <Link to={`/${dateKey}`} state={convertedData[dateKey]}>
                <Card.Title className="daily-title">{`${dayName}, ${monthName} ${date.c.day}`}</Card.Title>
              </Link>
              <Card.Text>
                Max Temp: {entry.max_temp_max.toFixed(2)}°C
                <br />
                Min Temp: {entry.min_temp_min.toFixed(2)}°C
              </Card.Text>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default DailyForecast;
