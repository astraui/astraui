import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Modern separator for visual breaks
const separator = () => console.log(chalk.dim('─'.repeat(60)));

/**
 * Initialize Astra in the current project
 * @param {Object} options - Configuration options
 */
export async function init(options) {
  separator();
  console.log(chalk.bold.cyan('Astra Setup'));
  separator();

  // Check if the project has a package.json
  if (!fs.existsSync('package.json')) {
    console.log(chalk.bold.red('ERROR: Could not find a package.json file'));
    console.log(chalk.dim('Please run this command in your project root directory'));
    separator();
    process.exit(1);
  }

  // Skip prompts if --yes or --defaults flag is passed
  if (!options.yes && !options.defaults) {
    const response = await prompts({
      type: 'confirm',
      name: 'continue',
      message: 'Would you like to continue with the setup?',
      initial: true,
    });

    if (!response.continue) {
      console.log(chalk.yellow('Setup cancelled by user'));
      separator();
      process.exit(0);
    }
  }

  // Display initialization parameters
  console.log(chalk.dim('Initializing with the following settings:'));
  console.log(chalk.dim(`  ${chalk.white('Force:')}      ${options.force ? chalk.white('yes') : chalk.white('no')}`));
  console.log(chalk.dim(`  ${chalk.white('Defaults:')}   ${options.defaults ? chalk.white('yes') : chalk.white('no')}`));
  separator();

  // Create configuration
  const config = {
    ui: {
      tailwind: {
        config: 'tailwind.config.js',
        baseColor: 'slate',
        cssVariables: true,
      },
      components: {
        path: './components/ui',
        typescript: true,
      },
    },
  };

  // Write configuration with spinner
  const configSpinner = ora({
    text: 'Creating Astra configuration',
    color: 'cyan'
  }).start();

  try {
    await fs.writeJSON('astra.config.json', config, { spaces: 2 });
    configSpinner.succeed(chalk.bold('Astra configuration created successfully'));

    // Create the components directory with spinner
    const dirSpinner = ora({
      text: 'Creating components directory structure',
      color: 'cyan'
    }).start();

    try {
      await fs.ensureDir('./components/ui');
      dirSpinner.succeed(`Components directory created at ${chalk.dim('./components/ui')}`);
    } catch (error) {
      dirSpinner.warn(`Components directory already exists at ${chalk.dim('./components/ui')}`);
    }

    // Create the cn utility function with spinner
    const utilsSpinner = ora({
      text: 'Setting up utility functions',
      color: 'cyan'
    }).start();

    if (!fs.existsSync('./lib/utils.ts')) {
      try {
        await fs.ensureDir('./lib');
        const utilsContent = `
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;
        await fs.writeFile('./lib/utils.ts', utilsContent.trim());
        utilsSpinner.succeed(`Utility function created at ${chalk.dim('./lib/utils.ts')}`);
      } catch (error) {
        utilsSpinner.fail(`Could not create utility function: ${error.message}`);
      }
    } else {
      utilsSpinner.info(`Utility function already exists at ${chalk.dim('./lib/utils.ts')}`);
    }

    // Check and install required dependencies
    const depsSpinner = ora({
      text: 'Checking required dependencies',
      color: 'cyan'
    }).start();

    const packageJson = await fs.readJSON('package.json');
    const requiredDeps = {
      'clsx': '^2.0.0',
      'tailwind-merge': '^2.0.0'
    };
    const missingDeps = [];

    for (const [dep, version] of Object.entries(requiredDeps)) {
      if (!packageJson.dependencies?.[dep] && !packageJson.devDependencies?.[dep]) {
        missingDeps.push(`${dep}@${version}`);
      }
    }

    if (missingDeps.length > 0) {
      depsSpinner.warn('Required dependencies missing');
      separator();
      console.log(chalk.bold('Missing Dependencies:'));
      missingDeps.forEach(dep => {
        console.log(`  ${chalk.yellow('-')} ${chalk.white(dep)}`);
      });
      console.log(chalk.dim('\nInstallation Command:'));
      console.log(`  ${chalk.cyan(`npm install ${missingDeps.join(' ')}`)}`);
      separator();
    } else {
      depsSpinner.succeed('All required dependencies are installed');
    }

    // Final success message
    separator();
    console.log(chalk.bold.green('INSTALLATION COMPLETE'));
    console.log(chalk.bold('Astra is ready to use'));
    separator();

    // Next steps
    console.log(chalk.bold('Next Steps:'));
    console.log(`  ${chalk.dim('1.')} Add components:`);
    console.log(`     ${chalk.cyan('astui add <component>')}`);
    console.log(`  ${chalk.dim('2.')} List available components:`);
    console.log(`     ${chalk.cyan('astui list')}`);
    separator();

  } catch (error) {
    configSpinner.fail('Failed to create Astra configuration');
    console.error(chalk.red(`Error: ${error.message}`));
    separator();
    process.exit(1);
  }
}