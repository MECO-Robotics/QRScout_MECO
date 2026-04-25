QRScout is deployed on GitHub Pages.
Live site: https://meco-robotics.github.io/QRScout_MECO/

QRScout

A QR Code-based scouting system for FRC

Table of Contents
Getting Started
Development
Using QRScout
Hosting a Custom JSON Config
config.json
Root
Individual Sections
Individual Fields
Custom Scoring & Zero Values
Using Multi-Select Input
Using Multi-Counter Input
Using Image Input
Using Timer Input
Using Action Tracker Input
Using The Blue Alliance (TBA) Integration
Getting Started

QRScout is a web app. To open it, visit https://meco-robotics.github.io/QRScout_MECO/
.

QRScout collects scouting data during an FRC match and turns it into a QR code with the form values joined into a delimited list. The code can then be scanned into tools like Microsoft Excel or Google Sheets for analysis.

Development

QRScout uses Vite, so local development is straightforward:

Install dependencies with npm install.
Start the dev server with npm run dev.
Open the local URL printed in the terminal, usually http://localhost:5173/.

Useful scripts:

npm run build type-checks the app and produces a production build in dist/.
npm run preview serves the production build locally after a build.
npm run deploy builds the app and publishes dist/ to GitHub Pages.
Using QRScout

When you visit QRScout, you're shown a screen that looks something like this:


At the top of the page are the form fields used to capture scouting data.

Some of these fields are required and others are optional. QRScout will not let you submit the form until every required field is filled out.

Down at the bottom of the page are the Commit and Reset Form buttons. The Commit button generates a QR code from the form data you entered above and shows it on screen alongside the encoded text. The Reset Form button resets most of the form fields so it can be used again without reloading the page. It does not reset most of the Prematch column because that data is often reused from match to match.

There are also the Copy Column Names and Edit Config buttons. Clicking Copy Column Names copies the names of each column to your clipboard. The Edit Config button opens the config.json editor. The three buttons beneath this switch between light mode, dark mode, and your system theme, which is the default.

The text shown alongside the QR code always uses commas for readability. The encoded payload and optional clipboard copy use the delimiter you configured.

Clicking on Edit Config leads you to the following screen:


The text editor allows you to edit the config.json file described below. Click Save after making changes.

Once you create a custom config.json file for your team, there are 2 ways to leverage it in competition:

Download the custom config.json file to each tablet / device for your scouts and upload it to QRScout using the "Upload Config" button in the options menu.
Host the custom config.json file in a public GitHub repository and load it into QRScout using the "Load from URL" button in the settings menu.

You can also download the config.json file to your device and reset the config.json to the default.

Hosting a custom JSON config for your team

To host your JSON config in a GitHub repository and make it available publicly via GitHub Pages, follow these steps:

Create a new repository on GitHub or use an existing one.
Add your JSON config file to the repository.
Enable GitHub Pages for the repository:
Go to the repository's "Settings" tab.
Scroll down to the "GitHub Pages" section.
Select the branch you want to use for GitHub Pages (e.g., main).
Click "Save".
After enabling GitHub Pages, your JSON config file will be available at a URL like https://<username>.github.io/<repository>/<path-to-config>.json.

You can now use this URL to load the JSON config in QRScout.

config.json

The config.json file controls the form layout, page title, team metadata, theme, and the delimiter used in the QR code.

The config.json file can be edited to change most parts of QRScout, including the line delimiter used by the QR code.

Individual fields:

title: The name of this field
type: One of "text", "number", "boolean", "range", "select", "counter", "multi-counter", "timer", "multi-select", "image", "action-tracker", "TBA-team-and-robot", or "TBA-match-number".
required: a boolean indicating if this must be filled out before the QR code is generated.
code: camelCase string with a unique name indicating what this field is.
disabled: Boolean indicating if this field is disabled.
formResetBehavior: One of "reset", "preserve", or "increment".
choices: Object mapping values (used in select/multi-select).
defaultValue: The default value of this field.

Custom Scoring & Zero Values

You can configure subjective performance metrics such as scoring effectiveness and feeding/passing skill using range, select, or number inputs.

Example using a range field:

{
  "title": "Scoring Effectiveness",
  "type": "range",
  "code": "scoringEffectiveness",
  "min": 0,
  "max": 5,
  "step": 1,
  "defaultValue": 0
}
{
  "title": "Passing / Feeding Skill",
  "type": "range",
  "code": "passingSkill",
  "min": 0,
  "max": 5,
  "step": 1,
  "defaultValue": 0
}
Adjust the range to match your team’s scale (e.g., 0–3, 0–10).
Setting defaultValue to 0 ensures scouts can explicitly record no effectiveness.

For fuel tracking, QRScout supports explicit 0 values by default when using counters.

Make sure the following fields use defaultValue: 0 so zero is recorded properly:

Fuel scored in Autonomous
Fuel scored in Teleop
Fuel fed in Teleop

Example:

{
  "title": "Auto Fuel Scored",
  "type": "multi-counter",
  "code": "autoFuelScored",
  "defaultValue": 0
}
{
  "title": "Teleop Fuel Scored",
  "type": "multi-counter",
  "code": "teleopFuelScored",
  "defaultValue": 0
}
{
  "title": "Teleop Fuel Fed",
  "type": "multi-counter",
  "code": "teleopFuelFed",
  "defaultValue": 0
}

This ensures there is a clear distinction between:

0 → robot did not perform the action
blank/missing → data was not recorded
