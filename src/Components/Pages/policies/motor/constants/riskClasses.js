export const RISK_CLASSES = {
  private: [{ id: "motorPrivate", label: "Motor Private" }],
  commercial: [
    { id: "generalCartage", label: "General Cartage" },
    { id: "institutional", label: "Institutional Vehicles" },
    { id: "onlineTaxis", label: "Online Taxis" },
    { id: "ownGoods", label: "Own Goods" },
    {
      id: "other",
      label: "Other",
      subTypes: [
        { id: "agricultural", label: "Agricultural and Forestry Vehicles" },
        { id: "emergency", label: "Ambulance, Hearse and Firefighters" },
        { id: "chauffeur", label: "Chauffeur Driven" },
        { id: "construction", label: "Construction Vehicles" },
        { id: "drivingSchool", label: "Driving Schools" },
        { id: "primeMover", label: "Prime Mover and Tractors" },
      ],
    },
  ],
  psv: [
    { id: "motorPsv", label: "Motor PSV" },
    { id: "chauffeurTaxi", label: "Chauffeur Driven-Taxis" },
    { id: "chauffeurDriven", label: "Chauffeur Driven" },
  ],
};
