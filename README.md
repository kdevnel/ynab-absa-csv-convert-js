# YNAB ABSA Bank CSV converter

A JavaScript CSV converter to make Absa Bank (South Africa) statements compatible with You Need A Budget (YNAB).

The main issue with YNAB is that it truncates description fields that are over a certain length. Absa statement descriptions add information at the start which causes the payee info to be cut off. For example:

`POS PURCHASE (EFFEC 17082020) PNP CRP WATERFRONT WATER CARD NO. 0123`

Would be imported as:

`POS PURCHASE (EFFEC 17082020)`

Which removes all useful information. This converter will split that and add the following to the memo and description columns:

- Memo - POS PURCHASE (EFFEC 17082020)
- Description - PNP CRP WATERFRONT WATER CARD NO. 0123

The converter also does the following:

- Adds a "Memo" column to all records
- Changes the date format to YYYY-MM-DD
- Converts the CSV format into a more standardised format with quotes around all description and memo fields

## Usage

You can either visit https://kdevnel.github.io/ynab-absa-csv-convert-js/ and use the converter from there or download the latest version inside the `/docs` folder - download the folder and open index.html in your browser.

## Setting up a dev environment

- Download the codebase to your computer
- Navigate to the project folder root and run `npm install`
- Start the dev server by running `npm start`
- The app should load in your browser and use live reloading and inline source-mapping
- Use the /testing/input-sample.csv file in the file uploader
- You should see a dynamically generated table containing the formatted CSV data on the page
- You should see a download button to download a formatted CSV file to your computer

## Bundling updated files to /docs

To create a production-ready set of bundled files in `/docs` run `npm run build` after following the steps to setup a dev environment.
This will minify the files and use `source-maps`.
