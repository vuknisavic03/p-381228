
// Service to fetch listings data - matches the same logic used in ListingList
const initialListings = [
  {
    id: "1",
    name: "Knez Mihailova 42",
    address: "Knez Mihailova 42",
    city: "Belgrade",
    country: "Serbia",
    postalCode: "11000",
    type: "commercial_rental",
    category: "retail",
    occupancyStatus: "occupied",
    tenant: {
      name: "Fashion Store Belgrade",
      phone: "+381 11 123 4567",
      email: "info@fashion.rs",
      type: "company"
    },
    notes: "Main pedestrian street",
    units: [
      {
        id: "1-1",
        unitNumber: "Ground Floor",
        category: "retail",
        occupancyStatus: "occupied",
        tenant: {
          name: "Fashion Store Belgrade",
          phone: "+381 11 123 4567",
          email: "info@fashion.rs",
          type: "company"
        }
      },
      {
        id: "1-2",
        unitNumber: "First Floor",
        category: "retail",
        occupancyStatus: "vacant"
      }
    ]
  },
  {
    id: "2",
    name: "Terazije 23",
    address: "Terazije 23",
    city: "Belgrade",
    country: "Serbia",
    postalCode: "11000",
    type: "commercial_rental",
    category: "office",
    occupancyStatus: "occupied",
    tenant: {
      name: "Business Center",
      phone: "+381 11 234 5678",
      email: "office@terazije.rs",
      type: "company"
    },
    notes: "Central Belgrade square"
  },
  {
    id: "3",
    name: "Kalemegdan Park 1",
    address: "Kalemegdan Park 1",
    city: "Belgrade",
    country: "Serbia",
    postalCode: "11000",
    type: "hospitality",
    category: "restaurant",
    occupancyStatus: "occupied",
    tenant: {
      name: "Kalemegdan Restaurant",
      phone: "+381 11 345 6789",
      email: "info@kalemegdan.rs",
      type: "company"
    },
    notes: "Historic fortress area"
  },
  {
    id: "4",
    name: "Skadarlija 29",
    address: "Skadarlija 29",
    city: "Belgrade",
    country: "Serbia",
    postalCode: "11000",
    type: "hospitality",
    category: "restaurant",
    occupancyStatus: "vacant",
    tenant: null,
    notes: "Bohemian quarter - available for rent"
  },
  {
    id: "5",
    name: "Makedonska 22",
    address: "Makedonska 22",
    city: "Belgrade",
    country: "Serbia",
    postalCode: "11000",
    type: "residential_rental",
    category: "apartment",
    occupancyStatus: "occupied",
    tenant: {
      name: "Marko Petrović",
      phone: "+381 11 567 8901",
      email: "marko@email.rs",
      type: "individual"
    },
    notes: "City center apartment",
    units: [
      {
        id: "5-1",
        unitNumber: "Apt 1A",
        category: "apartment_condo",
        occupancyStatus: "occupied",
        tenant: {
          name: "Marko Petrović",
          phone: "+381 11 567 8901",
          email: "marko@email.rs",
          type: "individual"
        }
      },
      {
        id: "5-2", 
        unitNumber: "Apt 1B",
        category: "apartment_condo",
        occupancyStatus: "vacant"
      },
      {
        id: "5-3",
        unitNumber: "Apt 2A",
        category: "apartment_condo", 
        occupancyStatus: "occupied",
        tenant: {
          name: "Ana Milic",
          phone: "+381 11 567 8902",
          email: "ana@email.rs",
          type: "individual"
        }
      }
    ]
  },
  {
    id: "6",
    name: "Bulevar Kralja Aleksandra 73",
    address: "Bulevar Kralja Aleksandra 73",
    city: "Belgrade",
    country: "Serbia",
    postalCode: "11000",
    type: "commercial_rental",
    category: "office",
    occupancyStatus: "vacant",
    tenant: null,
    notes: "Main boulevard - office space available"
  },
  {
    id: "7",
    name: "Nemanjina 4",
    address: "Nemanjina 4",
    city: "Belgrade",
    country: "Serbia",
    postalCode: "11000",
    type: "commercial_rental",
    category: "retail",
    occupancyStatus: "occupied",
    tenant: {
      name: "Shopping Mall Unit",
      phone: "+381 11 789 0123",
      email: "shop@nemanjina.rs",
      type: "company"
    },
    notes: "Near train station"
  },
  {
    id: "8",
    name: "Svetogorska 15",
    address: "Svetogorska 15",
    city: "Belgrade",
    country: "Serbia",
    postalCode: "11000",
    type: "residential_rental",
    category: "apartment",
    occupancyStatus: "vacant",
    tenant: null,
    notes: "Residential area - available for rent"
  }
];

export const fetchListings = async () => {
  try {
    const res = await fetch("http://localhost:5000/listings");
    const data = await res.json();
    if (data && data.length > 0) {
      console.log("Loaded listings from server:", data);
      return data;
    } else {
      console.log("No listings found on server, using Belgrade test data");
      return initialListings;
    }
  } catch (error) {
    console.error("Error fetching listings:", error);
    console.log("Server not available, using Belgrade test data");
    return initialListings;
  }
};
