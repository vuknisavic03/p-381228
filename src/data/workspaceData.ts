
export interface Workspace {
  name: string;
  owner: string;
  initials: string;
  revenueData: {
    month: string;
    value: number;
  }[];
  commissionData: {
    month: string;
    commission: number;
  }[];
}

export const workspaces: Workspace[] = [
  { 
    name: "Kevin's Workspace", 
    owner: "Kevin Anderson", 
    initials: "KA",
    revenueData: [
      { month: "Jan", value: 31 },
      { month: "Feb", value: 40 },
      { month: "Mar", value: 28 },
      { month: "Apr", value: 51 },
      { month: "May", value: 42 },
      { month: "Jun", value: 61 }
    ],
    commissionData: [
      { month: "Jan", commission: 3.1 },
      { month: "Feb", commission: 4.0 },
      { month: "Mar", commission: 2.8 },
      { month: "Apr", commission: 5.1 },
      { month: "May", commission: 4.2 },
      { month: "Jun", commission: 6.1 }
    ]
  },
  { 
    name: "Lucas's Workspace", 
    owner: "Lucas Everett", 
    initials: "LE",
    revenueData: [
      { month: "Jan", value: 25 },
      { month: "Feb", value: 35 },
      { month: "Mar", value: 45 },
      { month: "Apr", value: 30 },
      { month: "May", value: 55 },
      { month: "Jun", value: 48 }
    ],
    commissionData: [
      { month: "Jan", commission: 2.5 },
      { month: "Feb", commission: 3.5 },
      { month: "Mar", commission: 4.5 },
      { month: "Apr", commission: 3.0 },
      { month: "May", commission: 5.5 },
      { month: "Jun", commission: 4.8 }
    ]
  },
  { 
    name: "Mia's Workspace", 
    owner: "Mia Holloway", 
    initials: "MH",
    revenueData: [
      { month: "Jan", value: 40 },
      { month: "Feb", value: 30 },
      { month: "Mar", value: 50 },
      { month: "Apr", value: 45 },
      { month: "May", value: 35 },
      { month: "Jun", value: 55 }
    ],
    commissionData: [
      { month: "Jan", commission: 4.0 },
      { month: "Feb", commission: 3.0 },
      { month: "Mar", commission: 5.0 },
      { month: "Apr", commission: 4.5 },
      { month: "May", commission: 3.5 },
      { month: "Jun", commission: 5.5 }
    ]
  },
  { 
    name: "Nathan's Workspace", 
    owner: "Nathan Caldwell", 
    initials: "NC",
    revenueData: [
      { month: "Jan", value: 38 },
      { month: "Feb", value: 42 },
      { month: "Mar", value: 35 },
      { month: "Apr", value: 60 },
      { month: "May", value: 48 },
      { month: "Jun", value: 52 }
    ],
    commissionData: [
      { month: "Jan", commission: 3.8 },
      { month: "Feb", commission: 4.2 },
      { month: "Mar", commission: 3.5 },
      { month: "Apr", commission: 6.0 },
      { month: "May", commission: 4.8 },
      { month: "Jun", commission: 5.2 }
    ]
  },
  { 
    name: "Sophia's Workspace", 
    owner: "Sophia Riggins", 
    initials: "SR",
    revenueData: [
      { month: "Jan", value: 45 },
      { month: "Feb", value: 52 },
      { month: "Mar", value: 40 },
      { month: "Apr", value: 38 },
      { month: "May", value: 65 },
      { month: "Jun", value: 50 }
    ],
    commissionData: [
      { month: "Jan", commission: 4.5 },
      { month: "Feb", commission: 5.2 },
      { month: "Mar", commission: 4.0 },
      { month: "Apr", commission: 3.8 },
      { month: "May", commission: 6.5 },
      { month: "Jun", commission: 5.0 }
    ]
  },
];

export const yearlyCommissionData = [
  { year: "2018", commission: 48.2 },
  { year: "2019", commission: 53.7 },
  { year: "2020", commission: 42.1 },
  { year: "2021", commission: 61.5 },
  { year: "2022", commission: 68.2 },
  { year: "2023", commission: 72.9 },
  { year: "2024", commission: 65.3 },
];

export const monthlyCommissionData = [
  { month: "Jan", commission: 4.8 },
  { month: "Feb", commission: 5.3 },
  { month: "Mar", commission: 4.2 },
  { month: "Apr", commission: 6.2 },
  { month: "May", commission: 6.8 },
  { month: "Jun", commission: 7.2 },
  { month: "Jul", commission: 6.5 },
  { month: "Aug", commission: 5.9 },
  { month: "Sep", commission: 6.8 },
  { month: "Oct", commission: 7.1 },
  { month: "Nov", commission: 5.8 },
  { month: "Dec", commission: 6.3 },
];
