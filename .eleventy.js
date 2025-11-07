const { DateTime } = require("luxon");
module.exports = function(eleventyConfig) {
  // Copy assets (images, css)
  eleventyConfig.addPassthroughCopy("assets");

  // Add a date filter (for nice readable dates)
eleventyConfig.addNunjucksGlobal("now", new Date());
  eleventyConfig.addNunjucksFilter("date", function(dateObj, format = "MMMM d, yyyy") {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(format);
  });
  eleventyConfig.setBrowserSyncConfig({
      files: './_site/**/*',
    });

    module.exports = {
      pathPrefix: "/personal-website/",
    };
  // Define the "posts" collection
  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob("./posts/*.md");
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site"
    },
    pathPrefix: "/",
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
