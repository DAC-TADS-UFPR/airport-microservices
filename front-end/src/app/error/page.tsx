"use client";
import React from 'react';
import { Helmet } from 'react-helmet';

// Copie a string inteira do seu data-payload original:
const PAYLOAD = 'eyJjZG5CYXNlIjoiaHR0cHM6Ly9jZG4ubmdyb2suY29tLyIsImNvZGUiOiI2MDI0IiwiaG9zdHBvcnQiOiI1YTc5LTI4MDQtN2Y0LTNkNDAtZDQ5NS03YzNkLTI1M2QtYjQ3ZS00NTkwLm5ncm9rLWZyZWUuYXBwIiwibWVzc2FnZSI6IllvdSBhcmUgYWJvdXQgdG8gdmlzaXQgNWE3OS0yODA0LTdmNC0zZDQwLWQ0OTUtN2MzZC0yNTNkLWI0N2UtNDU5MC5uZ3Jvay1mcmVlLmFwcCwgc2VydmVkIGJ5IDI4MDQ6N2Y0OjNkNDA6ZDQ5NTo3YzNkOjI1M2Q6YjQ3ZTo0NTkwLiBUaGlzIHdlYnNpdGUgaXMgc2VydmVkIGZvciBmcmVlIHRocm91Z2ggbmdyb2suY29tLiBZb3Ugc2hvdWxkIG9ubHkgdmlzaXQgdGhpcyB3ZWJzaXRlIGlmIHlvdSB0cnVzdCB3aG9ldmVyIHNlbnQgdGhlIGxpbmsgdG8geW91LiIsInNlcnZpbmdJUCI6IjI4MDQ6N2Y0OjNkNDA6ZDQ5NTo3YzNkOjI1M2Q6YjQ3ZTo0NTkwIiwidGl0bGUiOiJPSyJ9';

const ErrorPage = () => (
  <>
    <Helmet>
      {/* Define atributos do <html> */}
      <html lang="en-US" dir="ltr" className="h-full" />

      {/* Preloads das fonts */}
      <link
        rel="preload"
        href="https://cdn.ngrok.com/static/fonts/euclid-square/EuclidSquare-Regular-WebS.woff"
        as="font"
        type="font/woff"
      />
      {/* repita para as outras WOFFs… */}

      {/* Meta tags */}
      <meta charSet="utf-8" />
      <meta name="author" content="ngrok" />
      <meta
        name="description"
        content="ngrok is the fastest way to put anything on the internet with a single command."
      />
      <meta name="robots" content="noindex, nofollow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* CSS */}
      <link
        id="style"
        rel="stylesheet"
        href="https://cdn.ngrok.com/static/css/error.css"
      />
    </Helmet>

    {/* Corpo da página */}
    <div className="h-full" id="ngrok">
      <div id="root" data-payload={PAYLOAD}></div>
    </div>

    {/* Script final */}
    <Helmet>
      <script
        id="script"
        src="https://cdn.ngrok.com/static/js/error.js"
        type="text/javascript"
      ></script>
    </Helmet>
  </>
);

export default ErrorPage;
