export default async function Home() {
  let data = null;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/`);
  data = await res.json();

  return (
    <div className="text-blue-500">
      <h1>Home</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
