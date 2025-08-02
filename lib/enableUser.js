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
