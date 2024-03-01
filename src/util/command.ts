type CommandKey = 'HOME' | 'MENU' | 'ABOUT' | 'PROJECTS' | 'CONTACT' | 'RESUME';

const Command: { [key in CommandKey]: { name: string; alias: string[] } } = {
  HOME: { name: 'home', alias: [] },
  MENU: { name: 'menu', alias: [] },
  ABOUT: { name: 'about', alias: ['1'] },
  PROJECTS: { name: 'projects', alias: ['2'] },
  CONTACT: { name: 'contact', alias: ['3'] },
  RESUME: { name: 'resume', alias: ['4'] }
};

export const getCommand = (input: string): CommandKey | undefined => {
  for (const [command, { name, alias }] of Object.entries(Command)) {
    if (input === name || alias.includes(input)) {
      return command as CommandKey;
    }
  }
  return undefined;
};

export default Command;
