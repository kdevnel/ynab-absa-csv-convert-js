# YNAB ABSA Bank CSV converter

A JavaScript CSV converter to make Absa Bank (South Africa) statements compatible with You Need A Budget (YNAB).

The converter does the following:

- Adds a "Memo" column to all records
- Changes the date format to YYYY-MM-DD
- Splits the descriptions into Details and Notes columns for ease of use
- Converts the CSV format into a more standardised format with quotes around all description and memo fields

## Usage

The latest bundled version is found inside the `/dist` folder - you can download the folder and open index.html in your browser.

## Setting up the dev environment

- Download the codebase to your computer
- Navigate to the project folder root and run `npm install`
- Start the dev server by running `npm start`
- The app should load in your browser and use live reloading and inline source-mapping
- Use the /testing/input-sample.csv file in the file uploader
- You should see a dynamically generated table containing the formatted CSV data on the page
- You should see a download button to download a formatted CSV file to your computer

## Bundling updated files to /dist

To create a production-ready set of bundled files in `/dist` run `npm run build` after following the steps to setup a dev environment.
This will minify the files and use `source-maps`.
