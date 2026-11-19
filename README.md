# Switched On · Gadgets worth buying

The link-in-bio shop page for [@switchedon.home](https://www.instagram.com/switchedon.home/). It's a plain static site (HTML, CSS, a little JavaScript) hosted free on GitHub Pages.

## How it works

- `data/products.json` is the product list. Each product has a short "why", a "best for" line and a link to the expert review it's based on.
- Every day (UK time) the page shows a different **Pick of the day** and reshuffles **Today's shortlist**. This happens in the visitor's browser, so nothing needs to run on a server.
- The list itself is refreshed weekly by a scheduled Claude task that researches what's popular and well reviewed, then updates `data/products.json`.
- No prices are shown. Prices change constantly, and Amazon's Associates rules only allow prices that come from its own API.

## Add your Amazon Associates tag

Once you're approved for [Amazon Associates UK](https://affiliate-program.amazon.co.uk/), put your tracking ID in `data/config.json`:

```json
{ "amazonDomain": "www.amazon.co.uk", "amazonTag": "yourtag-21", "instagram": "switchedon.home" }
```

Every "Check price on Amazon" button picks it up automatically. Until then the buttons link to Amazon without a tag, so they work but earn nothing.

Links go to an Amazon search for the product. If you add a product's 10-character ASIN to its `asin` field, the button links straight to that product page instead.

## Product photos

Each card shows an original illustration unless the product has an `image`. To use a real photo:

1. Put the file in `assets/products/` (a square JPG or PNG on a white background works best, around 800×800).
2. Add `"image": "assets/products/<file>.jpg"` to that product, plus an optional `"imageCredit": "Photo: …"`.

Only use photos you have the right to use:

- **Your own photos** of kit you own. This works best for an honest-verdicts account.
- **Manufacturer press or media kits**, where the brand's terms allow retailers or press to use them. Check each brand's terms first.
- **Amazon's own images**, but only through Amazon's API (the Creators API, which replaced PA-API) once your Associates account qualifies. Don't save or hotlink images from Amazon product pages, because that breaks the Associates agreement. The validator rejects Amazon image URLs added by hand.

If a photo fails to load, the card falls back to the illustration.

## Turn on GitHub Pages (one time)

1. In this repo on GitHub, open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**, then pick **main** and **/ (root)**, and click **Save**.
3. After a minute or two, the site is live at `https://sweetrollsmilkshake.github.io/switchedon-media-website/`. Put that link in your Instagram bio.

## Edit the list by hand

Edit `data/products.json` on GitHub and commit. Then run `python3 scripts/validate_products.py` (or let the weekly task do it) to check the file. Allowed values:

- `category`: `home-cinema`, `smart-home`, `gadgets`
- `kit` (picks the illustration): `soundbar`, `system`, `stick`, `box`, `tvlight`, `hub`, `plug`, `bulb`, `lamp`, `doorbell`, `vacuum`, `sunrise`

## Rules this site follows

- Every pick links to the published expert review it's based on. The site never claims hands-on testing.
- The illustrations are original. No product photos, brand logos or press images are used.
- The Amazon Associates disclosure ("As an Amazon Associate I earn from qualifying purchases") is in the footer, and affiliate links use `rel="sponsored"`.
- When you share a link to this page on Instagram, mark the post as an ad (`#ad`) under UK ASA rules.

## Run it locally

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

Fonts: Bricolage Grotesque, JetBrains Mono and Inter, self-hosted under the SIL Open Font License (see `assets/fonts/`).
