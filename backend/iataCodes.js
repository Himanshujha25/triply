const cityToIata = {
  delhi: "DEL",
  mumbai: "BOM",
  kolkata: "CCU",
  chennai: "MAA",
  bangalore: "BLR",
  hyderabad: "HYD",
  ahmedabad: "AMD",
  jaipur: "JAI",
  goa: "GOI",
  lucknow: "LKO",
  patna: "PAT",
  varanasi: "VNS",
  pune: "PNQ",
  chandigarh: "IXC",
  indore: "IDR",
  bhopal: "BHO",
  kochi: "COK",
  trivandrum: "TRV",

  newyork: "JFK",
  losangeles: "LAX",
  chicago: "ORD",
  sanfrancisco: "SFO",
  miami: "MIA",
  boston: "BOS",
  seattle: "SEA",

  london: "LHR",
  paris: "CDG",
  berlin: "BER",
  rome: "FCO",
  madrid: "MAD",
  amsterdam: "AMS",

  dubai: "DXB",
  abudhabi: "AUH",
  doha: "DOH",
  riyadh: "RUH",
  istanbul: "IST",

  sydney: "SYD",
  melbourne: "MEL",
  perth: "PER",

  tokyo: "HND",
  osaka: "KIX",
  seoul: "ICN",
  beijing: "PEK",
  shanghai: "PVG",
  hongkong: "HKG",
  bangkok: "BKK",
  singapore: "SIN",
  kualalumpur: "KUL",

  toronto: "YYZ",
  vancouver: "YVR",
  montreal: "YUL",

  capetown: "CPT",
  johannesburg: "JNB",
  nairobi: "NBO"
};

function getIataByCity(cityName) {
  if (!cityName) return null;
  const formatted = cityName.toLowerCase().replace(/\s+/g, "");
  return cityToIata[formatted] || null;
}

module.exports = { getIataByCity };
