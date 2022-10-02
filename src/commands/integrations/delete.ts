import { Command } from "@oclif/core";
import { gql, gqlRequest } from "../../graphql";

export default class DeleteCommand extends Command {
  static description = "Delete an Integration";
  static args = [
    {
      name: "integration",
      required: true,
      description: "ID of the integration to delete",
    },
  ];

  async run() {
    const {
      args: { integration },
    } = await this.parse(DeleteCommand);

    await gqlRequest({
      document: gql`
        mutation deleteIntegration($id: ID!) {
          deleteIntegration(input: { id: $id }) {
            integration {
              id
            }
            errors {
              field
              messages
            }
          }
        }
      `,
      variables: {
        id: integration,
      },
    });
  }
}
