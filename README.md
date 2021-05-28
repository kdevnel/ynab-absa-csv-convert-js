# YNAB ABSA Bank CSV converter

A JavaScript CSV converter to make Absa Bank (South Africa) statements compatible with You Need A Budget (YNAB).

The converter does the following:

- Adds a "Memo" column to all records
- Changes the date format to YYYY-MM-DD
- Splits the descriptions into Details and Notes columns for ease of use
- Converts the CSV format into a more standardised format with quotes around all description and memo fields

## Testing

- Download the codebase to your computer
- Open index.html in your preferred browser (tested with Firefox)
- Use the /testing/input-sample.csv file in the file uploader
- You should an array of objects logged to the console and a table containing the formatted CSV data on the page
