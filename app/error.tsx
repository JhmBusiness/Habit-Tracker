// error.tsx can be placed in routes and catches all errors aside from layout.tsx and template.tsx. error.tsx is great for assigning a specific error message for a dashboard route, etc.
"use client";
export const metadata = {
  title: "Error",
};

export default function Error() {
  return <h1>Error!!!</h1>;
}
