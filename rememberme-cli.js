#! /usr/bin/env node
const { Command } = require("commander");
const { prompt } = require("inquirer");
const api = require("./api");
const questions = require("./questions");

const program = new Command();
program.version("0.0.1");

program
  .command("listAll")
  .alias("la")
  .description("List all entries")
  .action(() => api.getAll());

program
  .command("findName <name>")
  .alias("fn")
  .description("Find a person by name")
  .action((name) => api.getByName(name));

program
  .command("findId <id>")
  .alias("fi")
  .description("Find a person by ID")
  .action((id) => api.getById(id));

program
  .command("add")
  .alias("a")
  .description("Add a person")
  .action(() => {
    if (!process.env.REMEMBERME_API_KEY)
      return console.log("Your JWT key does not exist!");
    prompt(questions).then((answers) => api.post(answers));
  });

program
  .command("edit <id>")
  .alias("e")
  .description("Edit a person")
  .action((id) => {
    if (!process.env.REMEMBERME_API_KEY)
      return console.log("Your JWT key does not exist!");
    console.log("Leave empty if you don't want to change a value");
    prompt(questions).then((answers) => api.edit(id, answers));
  });

program
  .command("delete <id>")
  .alias("d")
  .description("Delete a person by ID")
  .action((id) => {
    api.deleteById(id);
  });

program.parse(process.argv);
