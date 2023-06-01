import { serve } from "https://deno.land/std@0.190.0/http/mod.ts";

async function reqHandler(req: Request) {
	const reqPath = new URL(req.url).pathname;
	console.time(`fetch ${reqPath}`);
	const backendResponse = await fetch("https://thequietus.com" + reqPath, {
		headers: req.headers,
	});
	console.timeEnd(`fetch ${reqPath}`);

	const backendBody = await backendResponse.text();

	const newBody = backendBody
		// src="/ -> src="https://thequietus.com/
		.replace(
			/(src=["'])(\/)/gm,
			"$1https://thequietus.com/",
		)
		// <link href="/ -> <link href="https://thequietus.com/
		.replace(
			/(<link .*href=["'])(\/)/gm,
			"$1https://thequietus.com/",
		)
		// <a href="/ -> <a href="https://thequietus.com/
		.replace(/(<a .*href=["'])(https?:\/\/thequietus.com)/gm, "$1")
		.replace(/http:/gm, "https:");

	const response = new Response(newBody, backendResponse);

	// Prevent search engines from indexing this site
	response.headers.set("X-Robots-Tag", "noindex");

	return response;
}

serve(reqHandler);
