Recruitment Dashboard
=====================

KPI and applicant dashboard for volunteer recruitment. Companion piece to the volunteer recruitment beta service: [volunteer.samaritans.org](https://volunteer.samaritans.org).

Although the public-facing service is used nationally, this dashboard only concerns itself with applications to branches in a pilot area.

Key features include:

- KPIs for the entire pilot, over the last thirty days, which can be broken down by branch
- A list of recent applicants and upcoming interviews, which can be broken down by branch
- A detailed profile view of each applicant, showing their progress though the journey
- Export data in CSV format for further analysis
- Reschedule applicants' interviews on their behalf

Environment variables
---------------------

The app needs the following environment variables set to run:

* Standard AWS credentials of `AWS_REGION`, `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`
* `DYNAMODB_TABLE`, the AWS DynamoDB table to scan
* `DATABASE_URL`, a postgres connection string
* `IPSTACK_API_KEY`, an API key for the IPstack geolocation service
* `FRONTEND_HOST`, the location of the Samaritans volunteer front-end app on the web
* `EVENTBRITE_TOKEN`, an Oauth API Token from Eventbrite, to calculate some KPIs
* `USER` and `PASSWORD`, to secure the app

Running locally
---------------

To develop locally, you need `node` and `npm` installed, and to make sure all environment variables are set. Then:

1. Clone this repository and `cd` into it.
2. Run `npm install` and `npm run dev`.

That should start a dev server and gulp, which builds and watches front-end SASS and JS.

Deployment
----------

This app is hosted on Heroku. Changes to the master branch will be reflected automatically on Heroku.


Database import job
-------------------

To list recent applicants, this app uses a postgres database one step removed from the live DynamoDB database that applications are written to as they come in.

This is partly because of limitations querying DynamoDB. This doesn't hurt data integrity since no data is editable from this dashboard.

The postgres database is synced daily at 4am using a Heroku scheduler job, which runs the following tasks sequentially:

- `utils/dynamodb` will scan the source DynamoDB table and save the results to a file `enquiries.json`
- `seeders/seed-enquiries` will use that JSON file to seed a postgres database, according tos a defined schema

Use `npm run migrate` to make sure the schema is up to date, and then `npm run sync` to run the whole job manually.

To just re-seed the database from a pre-existing enquiries.json file (because AWS DynamoDB scans are expensive and slow), run `npm run seed` instead.
