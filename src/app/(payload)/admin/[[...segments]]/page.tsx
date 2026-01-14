import type { Metadata } from "next";

import config from "@payload-config";
import { RootPage, generatePageMetadata } from "@payloadcms/next/views";
import { importMap } from "../importMap";

type Args = {
  params: Promise<{
    segments: string[];
  }>;
  // Use Record, but remove 'undefined' to match Payload's expected type
  searchParams: Promise<Record<string, string | string[]>>;
};

export const generateMetadata = ({
  params,
  searchParams,
}: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams });

const Page = ({ params, searchParams }: Args) =>
  RootPage({ config, params, searchParams, importMap });

export default Page;
