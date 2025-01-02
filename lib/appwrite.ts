import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";
export const config = {
  platform: "com.alirezatalebizadeh.HomeShop",
  endpoint: `${process.env.EXPO_PUBLIC_APPWRITE_APPWRITE_ENDPOINT}`,
  projectId: `${process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID}`,
};

export const client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

export const avatar = new Avatars(client);
export const account = new Account(client);

export async function login() {
  try {
    // ایجاد توکن OAuth
    const redirectUri = Linking.createURL("/");
    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );
    if (!response)
      throw new Error("ایجاد توکن OAuth2 از گوگل با شکست مواجه شد");

    // باز کردن جلسه احراز هویت
    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri
    );
    if (browserResult.type !== "success") {
      throw new Error(`خطا در احراز هویت: وضعیت ${browserResult.type}`);
    }

    // استخراج پارامترها از URL
    const url = new URL(browserResult.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();
    if (!secret || !userId)
      throw new Error("پارامترهای OAuth در URL ردirection وجود ندارند");

    // ایجاد جلسه
    const session = await account.createSession(userId, secret);
    if (!session) throw new Error("ایجاد جلسه با اطلاعات کاربر ناموفق بود");

    return true;
  } catch (error) {
    console.error(`خطا در فرآیند ورود: ${error.message}`);
    return false;
  }
}

export async function logout() {
  try {
    const result = await account.deleteSession("current");
    return result;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getCurrentUser() {
  try {
    const result = await account.get();
    if (result.$id) {
      const userAvatar = avatar.getInitials(result.name);

      return {
        ...result,
        avatar: userAvatar.toString(),
      };
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
