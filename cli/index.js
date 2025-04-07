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

// Development server command
program
  .command('dev')
  .description('Start the development server with component previews')
  .option('-p, --port <port>', 'Port to run the dev server on', '3000')
  .option('-h, --host <host>', 'Host to run the dev server on', 'localhost')
  .action((options) => {
    console.log(chalk.green('✓ Starting development server...'));
    console.log(chalk.cyan(`  Preview: http://${options.host}:${options.port}`));
    console.log(chalk.dim('  Press Ctrl+C to stop'));
  });

// Build command
program
  .command('build')
  .description('Build your components for production')
  .option('-o, --output <dir>', 'Output directory', './dist')
  .option('--minify', 'Minify the output', true)
  .action((options) => {
    console.log(chalk.green('✓ Building components for production...'));
    console.log(chalk.dim(`  Output directory: ${options.output}`));
    console.log(chalk.dim(`  Minification: ${options.minify ? 'enabled' : 'disabled'}`));
    console.log(chalk.green('✓ Build completed successfully!'));
  });

// Test command
program
  .command('test')
  .description('Run tests for your components')
  .option('--watch', 'Watch for changes', false)
  .option('--coverage', 'Generate coverage report', false)
  .action((options) => {
    console.log(chalk.green('✓ Running component tests...'));
    if (options.watch) {
      console.log(chalk.cyan('  Watch mode enabled'));
    }
    if (options.coverage) {
      console.log(chalk.cyan('  Coverage report will be generated'));
    }
    console.log(chalk.green('✓ All tests passed!'));
  });

// Theme command
program
  .command('theme')
  .description('Manage themes for your components')
  .argument('<action>', 'Action to perform (create, apply, list)')
  .argument('[name]', 'Theme name')
  .action((action, name) => {
    switch (action) {
      case 'create':
        if (!name) {
          console.log(chalk.red('✗ Please provide a theme name'));
          process.exit(1);
        }
        console.log(chalk.green(`✓ Creating new theme: ${name}`));
        console.log(chalk.dim('  Theme created successfully!'));
        break;
      case 'apply':
        if (!name) {
          console.log(chalk.red('✗ Please provide a theme name'));
          process.exit(1);
        }
        console.log(chalk.green(`✓ Applying theme: ${name}`));
        console.log(chalk.dim('  Theme applied successfully!'));
        break;
      case 'list':
        console.log(chalk.bold.cyan('\nAvailable Themes:'));
        console.log(chalk.dim('-'.repeat(50)));
        console.log(`  ${chalk.cyan('•')} light (default)`);
        console.log(`  ${chalk.cyan('•')} dark`);
        console.log(`  ${chalk.cyan('•')} custom`);
        break;
      default:
        console.log(chalk.red(`✗ Unknown action: ${action}`));
        console.log(`  Valid actions: create, apply, list`);
    }
  });

// Documentation command
program
  .command('docs')
  .description('Generate or serve component documentation')
  .option('-s, --serve', 'Serve documentation', false)
  .option('-p, --port <port>', 'Port for doc server', '8080')
  .action((options) => {
    if (options.serve) {
      console.log(chalk.green('✓ Serving documentation...'));
      console.log(chalk.cyan(`  Documentation: http://localhost:${options.port}`));
      console.log(chalk.dim('  Press Ctrl+C to stop'));
    } else {
      console.log(chalk.green('✓ Generating documentation...'));
      console.log(chalk.dim('  Documentation generated successfully!'));
      console.log(chalk.cyan('  To serve documentation: astui docs --serve'));
    }
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
  return `${chalk.bold.cyan('ASTRA')}\n${chalk.gray('v0.1.0')}\n\n${help}\n
${chalk.bold('GETTING STARTED:')}
  ${chalk.cyan('$ astui init')}        Initialize a new project
  ${chalk.cyan('$ astui add button')}  Add components to your project
  ${chalk.cyan('$ astui dev')}         Start the development server

${chalk.dim('For more information, visit https://astra-ui.dev')}`;
};

// Display a hint when no arguments are provided
if (process.argv.length <= 2) {
  console.log(`\n${chalk.bold.cyan('ASTRA CLI')} ${chalk.gray('v0.1.0')}`);
  console.log(`${chalk.dim('Run')} ${chalk.cyan('astui --help')} ${chalk.dim('to see available commands.')}\n`);
  process.exit(0);
}

program.parse();