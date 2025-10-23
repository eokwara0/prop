import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
/** @type {import('next').NextConfig} */
const nextConfig : NextConfig = {
    redirects: async () => {
      return [
        {
          source: '/',
          destination: '/login',
          permanent: true,
        },
      ];
    },
};
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
export default withNextIntl(nextConfig);
