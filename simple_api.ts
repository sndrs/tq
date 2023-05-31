import { serve } from "https://deno.land/std@0.190.0/http/mod.ts";

async function reqHandler(req: Request) {
	const reqPath = new URL(req.url).pathname;
	const backendResponse = await fetch("https://thequietus.com" + reqPath, {
		headers: req.headers,
	});

	return backendResponse;
}

serve(reqHandler);
