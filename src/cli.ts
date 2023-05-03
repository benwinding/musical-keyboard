#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import * as scales from "./scales";
import * as songs from "./songs";

const scaletypes = [
  "major", "naturalMinor", "harmonicMinor", "melodicMinor",
  "pentatonicMajor", "pentatonicMinor", "blues", "minorBlues",
  "pentatonicBlues", "minorPentatonicBlues",
];

const program = new Command();
program
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

program
  .command("song")
  .description("Plays song while typing")
  .action((options) => {
    songs.begin();
  });

program.version(require("../package.json").version);

program.parse(process.argv);
