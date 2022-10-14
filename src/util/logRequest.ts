import { NextRequest, NextResponse } from 'next/server';

export function logRequest(req: NextRequest, res: NextResponse): void {
	console.log(req.url);
	console.log(req.method);
	console.log(res.status);
} 