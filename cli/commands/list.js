import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const COMPONENTS_PATH = join(__dirname, '../../components/ui');

// Modern separator for visual breaks
const separator = () => console.log(chalk.dim('─'.repeat(60)));

/**
 * Lists all available components in a structured format
 */
export async function listComponents() {
  separator();
  console.log(chalk.bold.cyan(`Astra Library`));
  separator();

  try {
    // Check if the components directory exists
    if (!fs.existsSync(COMPONENTS_PATH)) {
      console.log(chalk.yellow(chalk.bold('No components found.') + ' The components directory does not exist.'));
      console.log(chalk.dim(`Expected path: ${COMPONENTS_PATH}`));
      separator();
      return;
    }

    const components = await fs.readdir(COMPONENTS_PATH);

    if (components.length === 0) {
      console.log(chalk.yellow(chalk.bold('No components found.') + ' The directory is empty.'));
      separator();
      return;
    }

    // Group components by category (if you have categories)
    const categories = {};
    let totalComponents = 0;

    for (const component of components) {
      // Skip hidden directories and files
      if (component.startsWith('.')) continue;

      // Check if it's a directory
      const componentPath = path.join(COMPONENTS_PATH, component);
      const isDirectory = fs.statSync(componentPath).isDirectory();
      if (!isDirectory) continue;

      totalComponents++;

      // You could implement categories based on directory structure or metadata
      // For now using a simplified approach with just one category
      const category = 'UI Components'; // Default category

      if (!categories[category]) {
        categories[category] = [];
      }

      categories[category].push(component);
    }

    // Display component count
    console.log(chalk.dim(`Found ${chalk.white.bold(totalComponents)} components`));
    separator();

    // Display components by category
    for (const [category, componentList] of Object.entries(categories)) {
      console.log(chalk.bold(`${category}`));

      // Create a grid layout for components
      const gridWidth = process.stdout.columns >= 80 ? 3 : 2;
      const rows = Math.ceil(componentList.length / gridWidth);

      // Sort components alphabetically
      componentList.sort();

      // Display in grid format if terminal is wide enough, otherwise list format
      if (process.stdout.columns >= 60) {
        // Determine maximum component name length for padding
        const maxLength = Math.max(...componentList.map(c => c.length)) + 2;

        for (let i = 0; i < rows; i++) {
          let row = '';
          for (let j = 0; j < gridWidth; j++) {
            const index = i + j * rows;
            if (index < componentList.length) {
              const component = componentList[index];
              // Pad the component name to align columns
              row += chalk.green('• ' + component.padEnd(maxLength));
            }
          }
          console.log(`  ${row}`);
        }
      } else {
        // Fallback to simple list for narrow terminals
        componentList.forEach(component => {
          console.log(`  ${chalk.green('•')} ${component}`);
        });
      }
    }

    separator();
    console.log(chalk.bold('Installation Instructions:'));
    console.log(`Run ${chalk.cyan('astranext add <component-name>')} to add a component`);
    console.log(`Example: ${chalk.cyan('astranext add button card accordion')}`);

    // Show additional help
    console.log(`\n${chalk.dim('For more options, run:')} ${chalk.cyan('astranext add --help')}`);
    separator();

  } catch (error) {
    console.error(chalk.red('Error listing components:'), chalk.red(error.message));
    console.log(chalk.yellow(chalk.bold('No components found') + ' or error reading components directory.'));
    separator();
  }
}