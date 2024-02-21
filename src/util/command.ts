enum Command {
  HOME = 'home',
  MENU = 'menu',
  ABOUT = 'about',
  PROJECTS = 'projects',
  CONTACT = 'contact',
  RESUME = 'resume'
}

export const isStringCommand = (s: string) => {
  return Object.values(Command).includes(s as Command);
};

export default Command;
