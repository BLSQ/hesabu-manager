/* globals describe, it, expect */

import { getExcerpt } from "./getExcerptFromString";

const fullText =
  "<h1>Lorem ipsum dolor sit amet, an ridens albucius molestiae eos.</h1>" +
  "<p>Ad nam fierent accusamus scripserit, <strong>sit nibh</strong> fugit consulatu id, duo ex oblique" +
  "diceret atomorum. Vim dissentias consectetuer te, cu vix fugit commodo aliquid, " +
  "cu fugit doming nostrum quo. Utinam salutatus hendrerit et eum.</p>";

const excerpt = getExcerpt(fullText);

describe("getExcerptFromString", () => {
  it("should return a text without html entities", () => {
    expect(excerpt).not.toMatch(/<\/?[^>]+(>|$)/g);
  });

  it("should return a text with maximum 200 chars", () => {
    expect(excerpt.length).toBeLessThanOrEqual(200);
  });
});
