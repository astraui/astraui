import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Path to your UI components source - relative to this file
const COMPONENTS_PATH = join(__dirname, '../components/ui');

// Map of component dependencies
const COMPONENT_DEPENDENCIES = {
  'accordion': ['collapsible'],
};

// Modern separator for visual breaks
const separator = () => console.log(chalk.dim('─'.repeat(60)));

/**
 * Automatically initializes the project with default configuration
 * @param {Object} options - Configuration options
 * @returns {Object} The created configuration
 */
async function autoInitialize(options) {
  const spinner = ora({
    text: 'Automatically initializing AstraNext UI...',
    color: 'cyan'
  }).start();

  try {
    // Create a default configuration
    const defaultConfig = {
      ui: {
        components: {
          path: options.path || './components/ui',
          typescript: true
        }
      }
    };

    // Write the configuration file
    await fs.writeJSON('astranext.config.json', defaultConfig, { spaces: 2 });

    // Ensure the components directory exists
    await fs.ensureDir(defaultConfig.ui.components.path);

    spinner.succeed(chalk.bold('AstraNext UI has been automatically initialized'));
    return defaultConfig;
  } catch (error) {
    spinner.fail(chalk.bold.red('Failed to initialize AstraNext UI'));
    console.error(chalk.red(error.message));
    process.exit(1);
  }
}

/**
 * Add components to the project
 * @param {string[]} components - List of components to add
 * @param {Object} options - Configuration options
 */
export async function add(components, options) {
  separator();
  console.log(chalk.bold.cyan(`AstraNext UI Component Installation`));
  console.log(chalk.dim(`Date: 2025-04-05 23:52:34`));
  separator();

  let config;

  // Check if project is initialized with AstraNext
  if (!fs.existsSync('astranext.config.json')) {
    console.log(chalk.yellow(chalk.bold('AstraNext UI is not initialized.') + ' Initializing automatically...'));
    config = await autoInitialize(options);
  } else {
    // Load existing configuration
    config = await fs.readJSON('astranext.config.json');
  }

  const componentsPath = options.path || config.ui.components.path;
  const useTypeScript = config.ui.components.typescript !== false; // Default to TypeScript if not specified

  console.log(chalk.dim(`Target directory: ${chalk.white(componentsPath)}`));
  console.log(chalk.dim(`TypeScript: ${useTypeScript ? chalk.white('enabled') : chalk.white('disabled')}`));
  separator();

  // Ensure the components directory exists
  await fs.ensureDir(componentsPath);

  // Track dependencies to be installed
  const installQueue = [...components];
  const installedComponents = new Set();
  const failedComponents = new Set();

  // Process all components including dependencies
  while (installQueue.length > 0) {
    const component = installQueue.shift();

    // Skip if already processed
    if (installedComponents.has(component) || failedComponents.has(component)) {
      continue;
    }

    const spinner = ora({
      text: `Adding ${chalk.bold(component)} component`,
      color: 'cyan'
    }).start();

    try {
      // Check if component exists in the repository
      const componentSourceDir = path.join(COMPONENTS_PATH, component);
      if (!fs.existsSync(componentSourceDir)) {
        spinner.fail(`Component ${chalk.bold(component)} not found`);
        failedComponents.add(component);
        continue;
      }

      // Create component directory in target project
      const componentDestDir = path.join(process.cwd(), componentsPath, component);

      // Check if component already exists
      if (fs.existsSync(componentDestDir) && !options.force) {
        spinner.warn(`Component ${chalk.bold(component)} already exists. Use ${chalk.cyan('--force')} to overwrite`);
        installedComponents.add(component); // Consider it installed to avoid dependency warnings
        continue;
      }

      // Copy component files
      await fs.copy(componentSourceDir, componentDestDir, { overwrite: options.force });

      // Process TypeScript files to update imports
      const files = await fs.readdir(componentDestDir);
      for (const file of files) {
        if (file.endsWith('.tsx') || file.endsWith('.ts')) {
          const filePath = path.join(componentDestDir, file);
          let content = await fs.readFile(filePath, 'utf8');

          // Update import paths
          content = content.replace(
            /from ['"]@\/lib\/utils['"]/g,
            `from '@/lib/utils'`
          );

          // Update component imports
          content = content.replace(
            /from ['"]@\/components\/ui\/([^'"]+)['"]/g,
            `from '@/components/ui/$1'`
          );

          await fs.writeFile(filePath, content);
        }
      }

      spinner.succeed(`Added ${chalk.bold(component)} component to ${chalk.dim(componentDestDir)}`);
      installedComponents.add(component);

      // Add dependencies to the installation queue
      const dependencies = COMPONENT_DEPENDENCIES[component] || [];
      for (const dep of dependencies) {
        if (!installedComponents.has(dep) && !installQueue.includes(dep)) {
          console.log(chalk.dim(`  └─ Dependency required: ${chalk.italic(dep)}`));
          installQueue.push(dep);
        }
      }

    } catch (error) {
      spinner.fail(`Failed to add ${chalk.bold(component)} component`);
      console.error(chalk.red('  └─ ' + error.message));
      failedComponents.add(component);
    }
  }

  separator();

  // Installation summary
  if (installedComponents.size > 0) {
    console.log(chalk.green.bold(`Installation Summary`));
    console.log(chalk.green(`Successfully added ${chalk.bold(installedComponents.size)} component(s):`));
    console.log(chalk.green(`  ${Array.from(installedComponents).join(', ')}`));
  }

  if (failedComponents.size > 0) {
    console.log(chalk.red.bold(`\nFailures`));
    console.log(chalk.red(`Failed to add ${chalk.bold(failedComponents.size)} component(s):`));
    console.log(chalk.red(`  ${Array.from(failedComponents).join(', ')}`));
    console.log(chalk.yellow(`\nRun ${chalk.bold('astranext list')} to verify available components.`));
  }

  separator();
}