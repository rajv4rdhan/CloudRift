import {lambdaClient} from "../../config/lambda";
import { InvokeCommand } from "@aws-sdk/client-lambda";

export const getStats = async (project: string[], last_processed: Date) => {
    try {
        last_processed.setDate(last_processed.getDate() - 1);
        const command = new InvokeCommand({
            FunctionName: "hostrift-aws-lambda",
            Payload: Buffer.from(JSON.stringify({
                usernames: project,
                last_processed: last_processed.toISOString()
            })),
        });

        const response = await lambdaClient.send(command);
        
        const stats = JSON.parse(new TextDecoder().decode(response.Payload));
        console.log("Lambda response:", stats);
        return stats;
    } catch (error) {
        console.error("Error invoking Lambda function:", error);
        return { error: "Failed to update stats" };
    }
};