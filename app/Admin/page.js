// app/Admin/page.js

async function getData() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  return res.json();
}

import AdminDashboardClient from "./AdminDashboardClient";

export default async function Page() {
  const myData = await getData();
  return <AdminDashboardClient products={myData} />;
}
