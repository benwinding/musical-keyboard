#!/usr/bin/env node

const commander = require("commander");
const chalk = require("chalk");
const keybored = require("./index");

const scaletypes = [
  "major", "naturalMinor", "harmonicMinor", "melodicMinor", 
  "pentatonicMajor", "pentatonicMinor", "blues", "minorBlues", 
  "pentatonicBlues", "minorPentatonicBlues",
];

commander
  .command("play")
  .description("Plays keybored in default scale")
  .option(
    "--scale <scale>",
    `Where the musical <scale> can be:
        ${chalk.blue(scaletypes.join(", "))}
`
  )
  .action((options) => {
    const scale = scaletypes.includes(options.scale) ? options.scale : "major";
    console.log(`starting 'Keybored' in the "${scale}" scale...`);
    keybored.begin(options.scale);
  });

commander.parse(process.argv);
