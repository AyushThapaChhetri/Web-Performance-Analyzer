import { VercelRequest, VercelResponse } from "@vercel/node";
import puppeteer from "puppeteer";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const url = req.query.url as string;

  if (!url) {
    return res.status(400).json({ error: "Missing URL" });
  }

  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "load" });

    // Timing
    const timing = await page.evaluate(() =>
      JSON.parse(JSON.stringify(window.performance.timing))
    );

    // Resources
    const entries: { transferSize: number }[] = await page.evaluate(() =>
      JSON.parse(JSON.stringify(performance.getEntriesByType("resource")))
    );

    const totalBytes = entries.reduce(
      (sum, entry) => sum + (entry.transferSize || 0),
      0
    );

    await browser.close();

    res.status(200).json({
      loadTime: timing.loadEventEnd - timing.navigationStart,
      totalSizeKB: (totalBytes / 1024).toFixed(2),
      requests: entries.length,
    });
  } catch (error: unknown) {
    console.error("Error during analysis:", error);

    res.status(500).json({
      error: "Failed to analyze site",
      details: error instanceof Error ? error.message : String(error),
    });
  }
}
