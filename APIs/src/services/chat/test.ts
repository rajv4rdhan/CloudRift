import ChatClient from './client';

async function main() {
  const client = new ChatClient('rnpaf-34-81-230-112.a.free.pinggy.link:38639');
  try {
    const response = await client.sendMessage("create hello world page");
    
    // Parse and format the response
    const parsedResponse = typeof response === 'string' ? JSON.parse(response) : response;
    
    console.log("Message:", parsedResponse.message.content);
    console.log("Files generated:", parsedResponse.files.length);
    
    parsedResponse.files.forEach((file: any, index: number) => {
      console.log(`\nFile ${index + 1}: ${file.filename}`);
      console.log("Content:", file.content);
    });
    
  } catch (err) {
    console.error("gRPC error:", err);
  }
}

main();
