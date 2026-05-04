// app/dashboard/page.jsx

async function getData() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  return res.json();
}

import DashboardClient from "./DashboardClient";

export default async function Page() {
  const myData = await getData();
  console.log(myData)
  return <DashboardClient products={myData} />;
}