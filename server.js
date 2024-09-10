const dataSimple = require("./public/simple.json");
const dataDamo = require("./public/damo.json");
const express = require("express");
const cors = require("cors");
const app = express();
const _ = require("lodash");
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/api/getPopulation", (req, res) => {
  const groupedData = _.groupBy(dataDamo, "countryName");
  let result = [];
  let id = 0;

  if (!_.isEmpty(groupedData)) {
    for (const [key, value] of Object.entries(groupedData)) {
      let tempPopulation = [];

      id = id + 1;
      value.forEach((item) => {
        if (key === item.countryName) {
          value.icon = item.icon || "";

          if (!item.region) {
            value.color = "#BCBCBC";
          }
          if (item.region === "asia") {
            value.color = "#4C4CFF";
          }
          if (item.region === "europe") {
            value.color = "#8484FF";
          }

          if (item.region === "africa") {
            value.color = "#EA75B2";
          }

          if (item.region === "america") {
            value.color = "#FFD966";
          }

          tempPopulation.push(item.population);
        }
      });

      result.push({
        id: id,
        country: key,
        population: tempPopulation,
        icon: value.icon || "",
        color: value.color,
      });
    }
  }

  res.send({
    status: 200,
    message: "",
    data: {
      dataGraph: result,
      region: [
        { key: "Asia", color: "#4C4CFF" },
        { key: "Europe", color: "#8484FF" },
        { key: "Africa", color: "#EA75B2" },
        { key: "America", color: "#FFD966" },
      ],
    },
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
