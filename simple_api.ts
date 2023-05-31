import { serve } from "https://deno.land/std@0.190.0/http/mod.ts";

async function reqHandler(req: Request) {
	const reqPath = new URL(req.url).pathname;
	console.time(`fetch ${reqPath}`);
	const backendResponse = await fetch("https://thequietus.com" + reqPath, {
		headers: req.headers,
	});
	console.timeEnd(`fetch ${reqPath}`);

	return backendResponse;
}

serve(reqHandler);
