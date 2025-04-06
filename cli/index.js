#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import { init } from './commands/init.js';
import { add } from './commands/add.js';
import { listComponents } from './commands/list.js';

const program = new Command();

// CLI metadata with modernized styling
program
  .name(chalk.bold.cyan('astui'))
  .description(chalk.bold('Design. Build. Empower.'))
  .version(chalk.gray('0.1.0'));

// Init command
program
  .command('init')
  .description('Initialize your project with Astra UI configuration')
  .option('-y, --yes', 'Skip confirmation prompt', false)
  .option('-d, --defaults', 'Use default configuration', false)
  .option('-f, --force', 'Force overwrite existing configuration', false)
  .action((options) => {
    init(options);
  });

// Add command
program
  .command('add [components...]')
  .description('Add components to your project')
  .option('-p, --path <path>', 'Path to add the component to', './components/ui')
  .option('-f, --force', 'Overwrite existing components', false)
  .action((components, options) => {
    if (components.length === 0) {
      console.log(chalk.bold.red('ERROR: No components specified'));
      console.log(chalk.dim('-'.repeat(50)));
      console.log(`${chalk.dim('USAGE:')} ${chalk.bold('astui add')} ${chalk.italic('<component>')}`);
      console.log(`${chalk.dim('HELP:')}  ${chalk.bold('astui list')} to see available components`);
      console.log(chalk.dim('-'.repeat(50)));
      process.exit(1);
    }
    add(components, options);
  });

// List command to show available components
program
  .command('list')
  .description('List all available components')
  .action(() => {
    listComponents();
  });

// Handle unknown commands with helpful message
program.on('command:*', () => {
  console.log(chalk.bold.red(`Invalid command: ${chalk.yellow(program.args.join(' '))}`));
  console.log(`For available commands, run: ${chalk.cyan('astui --help')}`);
  process.exit(1);
});

// Show custom help information on -h/--help
const originalHelp = program.helpInformation;
program.helpInformation = function () {
  const help = originalHelp.call(this);
  return `${chalk.bold.cyan('ASTRA')}\n${chalk.gray('v0.1.0')}\n\n${help}`;
};

// Display a hint when no arguments are provided
if (process.argv.length <= 2) {
  console.log(`\n${chalk.bold.cyan('ASTRA CLI')} ${chalk.gray('v0.1.0')}`);
  console.log(`${chalk.dim('Run')} ${chalk.cyan('astui --help')} ${chalk.dim('to see available commands.')}\n`);
  process.exit(0);
}

program.parse();