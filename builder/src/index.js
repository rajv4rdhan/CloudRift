const { handleProject } = require('./handleProject');



async function main() {
  try {
    await handleProject('esevs', '2312');
  } catch (error) {
    console.error('Error connecting to clients:', error);
  }
}
main();
