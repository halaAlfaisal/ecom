import { json } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const loader = () => {
  return json(null, { status: 404 });
};

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-gray-800">
        Looks like your spaceship got lost!
      </h1>
      <p className="text-2xl text-gray-600 mt-5">
        Let's help you get back on track
      </p>
      <Link
        to="/"
        className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded mt-5"
      >
        Back to Home Base
      </Link>
    </div>
  );
}

