// https://play.tailwindcss.com/gJZ7cv86PM?size=1100x720

import { withOGImage } from "next-api-og-image";

export default withOGImage({
  template: {
    react: ({ heading, text }) => (
      <>
        <head>
          <link
            href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
            rel="stylesheet"
          />
          <link
            href="https://unpkg.com/@fontsource/lexend@4.5.1/latin.css"
            rel="stylesheet"
          />
        </head>
        <div
          className="min-h-screen bg-gray-100 p-12 flex flex-col justify-center gap-4"
          style={{ fontFamily: "Lexend" }}
        >
          <h1 className="text-6xl font-bold text-blue-400 leading-tight">
            {heading}
          </h1>
          <p className="font-medium text-3xl text-gray-500">{text}</p>
        </div>
      </>
    ),
  },
});
