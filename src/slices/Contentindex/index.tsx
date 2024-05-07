import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import ContentList from "./ContentList";
import { promises } from "dns";
import { createClient } from "@/prismicio";
/**
 * Props for `Contentindex`.
 */
export type ContentindexProps = SliceComponentProps<Content.ContentindexSlice>;

/**
 * Component for "Contentindex" Slices.
 */
const Contentindex = async ({ slice }: 
  ContentindexProps): Promise<JSX.Element> => {
    const client = createClient();
    const blogPosts = await client.getAllByType("blog_post");
    const projects = await client.getAllByType("project");
    
    const contentType = slice.primary.content_type || "Blog";

    const items = contentType === "Blog" ? blogPosts : projects;
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading size="lg" className="mb-8">
      {slice.primary.heading}
      </Heading>
      {isFilled.richText(slice.primary.description)&&(
        <div className="prose prose-xl prose-invert mb-10">
          <PrismicRichText field={slice.primary.description}/>
        </div>
      )}
      <ContentList items={items} contentType={contentType}
      viewMoreText={slice.primary.view_more_text}
      fallbackItemImage={slice.primary.fallback_item_image}/>
    </Bounded>
  );
};

export default Contentindex;
