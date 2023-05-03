#!/usr/bin/env node

const commander = require("commander");
const chalk = require("chalk");
const scales = require("./scales");
const songs = require("./songs");

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
    scales.begin(options.scale);
  });

commander
  .command("song")
  .description("Plays song while typing")
  .action((options) => {
    songs.begin();
  });

commander.parse(process.argv);
