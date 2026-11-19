# Weekly product refresh: scheduled task prompt

Paste the text below as the prompt of a weekly scheduled task (for example, Mondays at 06:58 UK time). The task needs push access to `sweetrollsmilkshake/switchedon-media-website`.

---

Refresh the product list for the Switched On picks site (repo sweetrollsmilkshake/switchedon-media-website, GitHub Pages, link-in-bio for the UK home-tech Instagram account @switchedon.home).

1. Clone the repo (or pull main). Read README.md, data/products.json and scripts/validate_products.py.
2. Research (5–10 web searches): what's popular and well reviewed in UK smart home, home cinema and home gadgets right now. Look at new launches, award lists, "best of" guides and seasonal moments (sales events, dark evenings, holidays). Use reputable UK-facing reviewers such as What Hi-Fi?, Expert Reviews, TechRadar, Tech Advisor, Which?, T3, Trusted Reviews and Matter Alpha. Use guides that were updated recently.
3. Update data/products.json:
   - Keep 14–24 products, spread across home-cinema, smart-home and gadgets.
   - Swap out 2–5 products that are stale, discontinued or no longer recommended, and add timely, well-reviewed ones. Keep the rest.
   - Every product needs a source URL that you retrieved this run, and its "why" and "bestFor" must be supported by that source. Keep "why" to 1–2 short sentences. Mention one real downside if the source gives one.
   - Never include prices, discount claims or claims that the owner has used or tested a product.
   - Use "kit" values from the README to pick the illustration. Set "added" to today's date for new items, and set "asin" to null unless you have verified the exact Amazon UK ASIN.
   - Rewrite "thisWeek" with one timely, factual tip (headline of 10 words or fewer, plus a 1-sentence note). Every date in it must be checked.
   - Set "updated" to today's date (Europe/London).
4. Never edit data/config.json (it holds the owner's Amazon tag).
5. Run `python3 scripts/validate_products.py`. Fix anything it reports until it passes.
6. Commit to main with a short message listing what was added and removed, then push.
7. Notify the owner: which products were added or removed and why, the new "This week" tip, and the sources used. If anything failed (no repo access, validation won't pass), notify the owner instead and don't push a broken file.
