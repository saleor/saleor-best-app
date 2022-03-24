import {
  CreateWebhookMutation,
  WebhookEventTypeEnum,
} from "../../graphql/generated/graphql";
import { NextApiRequest, NextApiResponse } from "next";
import { SALEOR_DOMAIN_HEADER } from "../../constants";
import { createWebhook } from "../../graphql/data/mutations/webhook";
import { saleor } from "../../graphql/client";
import { getBaseURL } from "../../utils/middleware";

const handler = async (
  request: NextApiRequest,
  res: NextApiResponse
): Promise<undefined> => {
  console.log(request);
  const saleor_domain = request.headers[SALEOR_DOMAIN_HEADER];
  if (!saleor_domain) {
    res.statusCode = 400;
    res.end(
      JSON.stringify({
        success: false,
        message: "Missing saleor domain token.",
      })
    );
    return;
  }
  const auth_token = request.body?.auth_token as string;
  if (!auth_token) {
    res.statusCode = 400;
    res.end(JSON.stringify({ success: false, message: "Missing auth token." }));
    return;
  }

  // async ftw
  res.end(JSON.stringify({ success: true }));

  await saleor.mutate<CreateWebhookMutation>({
    mutation: createWebhook,
    variables: {
      name: "Best app: Product updated",
      targetUrl: `${getBaseURL(request)}/api/webhooks/product-updated`,
      events: WebhookEventTypeEnum.ProductUpdated,
      secretKey: process.env.SECRET,
    },
    context: {
      headers: {
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
    },
  });
};

export default handler;
