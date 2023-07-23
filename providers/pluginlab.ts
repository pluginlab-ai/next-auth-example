import {OAuthConfig, OAuthUserConfig} from "next-auth/src/providers/oauth";

export class PluginLabUserInfo {
    sub: string; // the member id
    id: string; // same as sub
    email: string;
    name: string | null;
    given_name: string | null;
    family_name: string | null;
    has_password: boolean;
    is_verified: boolean;
    sign_in_method: string;
    stripe_link: string | null;
    stripe_id: string | null;
    plan_id: string | null;
    price_id: string | null;
    subscription_id: string | null;
    updated_at_ms: number;
    created_at_ms: number;
}


export function PluginLab<P extends PluginLabUserInfo>(
    options: OAuthUserConfig<P> & {
        pluginId: string;
    }
): OAuthConfig<P> {

    if (!options.pluginId) {
        throw new Error("You must specify a pluginId for PluginLab");
    }

    return {
        id: "pluginlab",
        name: "PluginLab",
        type: "oauth",
        version: "2.0",
        authorization: {
            url: `https://${options.pluginId}.auth.portal-pluginlab.ai/oauth/authorize`,
            params: { scope: "all" },
        },
        token: "https://auth.pluginlab.ai/oauth/token",
        client: {
            token_endpoint_auth_method: "client_secret_post",
        },
        userinfo: {
            url: "https://auth.pluginlab.ai/oauth/userinfo",
            async request({ client, tokens }) {
                const userinfo = await client.userinfo(tokens.access_token!)
                return userinfo;
            },
        },
        profile(profile) {
            return profile;
        },
        options,
    }
}
