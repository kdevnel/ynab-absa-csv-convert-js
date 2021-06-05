# YNAB ABSA Bank CSV converter

A JavaScript CSV converter to make Absa Bank (South Africa) statements compatible with You Need A Budget (YNAB).

The converter does the following:

- Adds a "Memo" column to all records
- Changes the date format to YYYY-MM-DD
- Splits the descriptions into Details and Notes columns for ease of use
- Converts the CSV format into a more standardised format with quotes around all description and memo fields

## Setting up the dev environment

- Download the codebase to your computer
- Navigate to the project folder root and run `npm init`
- Start the dev server by running `npm start`
- The app should load in your browser and use live reloading
- Use the /testing/input-sample.csv file in the file uploader
- You should see an array of objects logged to the console and a table containing the formatted CSV data on the page
