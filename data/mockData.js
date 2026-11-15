export const soilData = {
  ph: 5.4,
  nitrogen: 20,
  phosphorus: 40,
  potassium: 18,
  moisture: 32,
  temperature: 28,
};

export const robotData = {
  status: "Connected",
  battery: 87,
  connection: "Wi-Fi",
  movement: "Stopped",
  speed: 50,
};

export const scanHistory = [
  {
    date: "30 Sep 2026",
    time: "02:35 PM",
    location: "Field A",
    ph: 5.4,
    nitrogen: 20,
    phosphorus: 40,
    potassium: 18,
    moisture: 32,
    result: "Needs Attention",
  },
  {
    date: "30 Sep 2026",
    time: "01:20 PM",
    location: "Field B",
    ph: 6.2,
    nitrogen: 35,
    phosphorus: 45,
    potassium: 25,
    moisture: 48,
    result: "Normal",
  },
  {
    date: "29 Sep 2026",
    time: "04:10 PM",
    location: "Field C",
    ph: 5.8,
    nitrogen: 22,
    phosphorus: 38,
    potassium: 20,
    moisture: 35,
    result: "Needs Attention",
  },
];

export const recommendations = [
  {
    title: "Nitrogen Level",
    message:
      "Nitrogen is below the recommended level. Consider applying nitrogen fertilizer.",
    type: "warning",
  },
  {
    title: "Soil Moisture",
    message: "Moisture is low. Additional irrigation may be required.",
    type: "warning",
  },
  {
    title: "Phosphorus",
    message: "Phosphorus is currently within the normal range.",
    type: "normal",
  },
];
