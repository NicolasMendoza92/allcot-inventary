const technos = ['AFOLU', 'Any transportation project', 'ARR', 'Biomas to Electricity', 'Biomas to heat', 'Cogeneration', 'Combined cycle', 'Cookstove', 'Energy Efficiency - Agriculture Sector',
'Energy Efficiency - Commercial Sector', 'Energy Efficiency - Domestic', 'Energy Efficiency - Industrial', 'Energy Efficiency - Public Sector', 'Gheotermal', 'HFC', 'Hydro',
'IFM', 'Landfill gas', 'Landfill to energy', 'Mangroves', 'Manufacturing industries', 'Manure management', 'Methane Recovery', 'Mine Methane Utilization Project', 'N20 destrutction',
'Oil Management', 'Run of river', 'REDD', 'REDD+', 'SF6', 'Small Renewable energy projects', 'Small Hydro', 'Solar', 'Solar Cookstove', 'Waste', 'Waste to compost', 'Wind']

const enableusers = ["mdo@karbon-x.com", "nm@allcot.com", "lmp@allcot.com", 'dvp@allcot.com', 'wp.co@allcot.com', "tg.ch@allcot.com", "jrc@karbon-x.com", "c.mckenzie@karbon-x.com", "wbullock@karbon-x.com",
  "a.schneider@karbon-x.com", "j.olejak@karbon-x.com", "ng@karbon-x.com"
]
const adminUsers = ["mdo@karbon-x.com", "nm@allcot.com"]


export default function isEnableUser(session) {
  if (enableusers.includes(session?.user.email)) {
    return true;
  } else {
    return false;
  }
}

export function isAdminUser(session) {
  return adminUsers.includes(session?.user?.email);
}
