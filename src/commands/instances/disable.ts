import { Command } from "@oclif/core";
import { gql, gqlRequest } from "../../graphql";

export default class DisableCommand extends Command {
  static description = "Disable an Instance";
  static args = [
    {
      name: "instance",
      required: true,
      description: "ID of an instance",
    },
  ];

  async run() {
    const {
      args: { instance },
    } = await this.parse(DisableCommand);

    const result = await gqlRequest({
      document: gql`
        mutation disableInstance($id: ID!) {
          updateInstance(input: { id: $id, enabled: false }) {
            instance {
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
        id: instance,
      },
    });

    this.log(result.updateInstance.instance.id);
  }
}
